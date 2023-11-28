import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SocialToken from 'App/Models/SocialToken'
import User from 'App/Models/User'

export default class UsersController {
  public async redirect({ ally }: HttpContextContract) {
    return ally.use('spotify').stateless().redirect()
  }

  public async handleCallback({ ally, response }: HttpContextContract) {
    try {
      const spotify = ally.use('spotify').stateless()

      /**
       * User has explicitly denied the login request
       */
      if (spotify.accessDenied()) {
        return 'Access was denied'
      }

      /**
       * Unable to verify the CSRF state
       */
      if (spotify.stateMisMatch()) {
        return 'Request expired. try again'
      }

      /**
       * There was an unknown error during the redirect
       */
      if (spotify.hasError()) {
        return spotify.getError()
      }
      /**
       * Managing error states here
       */

      const user = await spotify.user()
      console.log('*** user *** ', user) /* ça crée user */
      const { token } = user
      console.log('*** token ***', token) /* ça crée token */

      const findUser = {
        email: user.email as string,
      }
      console.log('*** findUser ***', findUser) /* ça crée findUser */

      const userDetails = {
        name: user.name as string,
        email: user.email as string,
        provider: 'spotify',
        access_token: token.token as any,
      }

      console.log('*** userDetails ***', userDetails) /* ça crée userDetails */

      const newUser = await User.firstOrCreate(findUser, userDetails)
      console.log('*** newUser ***', newUser) /* ça crée newUser */

      if (!newUser) {
        return response.json({
          status: false,
          message: 'Something went wrong.',
        })
      }

      /* Save Social Token */
      let socialToken = await SocialToken.query().where('user_id', newUser.id).first()

      socialToken = socialToken ? socialToken : new SocialToken()
      socialToken.user_id = newUser.id
      socialToken.token = token.token
      socialToken.refreshToken = token.refreshToken
      socialToken.type = token.type
      socialToken.expiresAt = token.expiresAt?.toString()

      await socialToken.save()
      console.log('*** socialToken ***', socialToken)
      /* Save Social Token */

      // Generate API token

      response.json({ newUser, socialToken })
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
}
