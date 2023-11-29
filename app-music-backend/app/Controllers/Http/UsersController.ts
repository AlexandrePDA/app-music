import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SocialToken from 'App/Models/SocialToken'
import User from 'App/Models/User'

export default class UsersController {
  public async redirect({ ally }: HttpContextContract) {
    return ally.use('spotify').stateless().redirect()
  }

  public async handleCallback({ ally, auth, response }: HttpContextContract) {
    try {
      const spotify = ally.use('spotify').stateless()

      if (spotify.accessDenied()) {
        return 'Access was denied'
      }

      if (spotify.stateMisMatch()) {
        return 'Request expired. try again'
      }

      if (spotify.hasError()) {
        return spotify.getError()
      }

      const user = await spotify.user()
      const { token } = user

      const findUser = {
        email: user.email as string,
      }

      const userDetails = {
        name: user.name as string,
        email: user.email as string,
        provider: 'spotify',
        access_token: token.token as any,
      }

      const newUser = await User.firstOrCreate(findUser, userDetails)

      if (!newUser) {
        return response.json({
          status: false,
          message: 'Something went wrong.',
        })
      }

      let socialToken = await SocialToken.query().where('user_id', newUser.id).first()

      socialToken = socialToken ? socialToken : new SocialToken()
      socialToken.user_id = newUser.id
      socialToken.token = token.token
      socialToken.refreshToken = token.refreshToken
      socialToken.type = token.type
      socialToken.expiresAt = token.expiresAt?.toString()

      await socialToken.save()
      console.log('*** socialToken ***', socialToken)

      const userToken = await auth.use('api').generate(newUser, {
        expiresIn: '90 mins',
      })

      response.json({ newUser, userToken, socialToken })
    } catch (err) {
      response.json({
        err,
        status: false,
        message: 'Something went wrong.',
      })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()
    return response.json({
      revoked: true,
      message: 'Logout successfully.',
    })
  }

  public async deleteUser({ auth, response }: HttpContextContract) {
    try {
      const user = await auth.authenticate()
      if (!user) {
        return response.unauthorized({ error: 'Oups, Not authorized' })
      }
      await user.delete()
      return response.json({
        deleted: true,
        message: 'User deleted successfully.',
      })
    } catch (error) {
      console.log(error.messages.errors)
      return response.badRequest({ error: 'Oups, probleme dans suppression user' })
    }
  }
}
