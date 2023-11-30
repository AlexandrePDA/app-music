import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Party from 'App/Models/Party'

/*
    EN BREF : 
    - recuperer id de party et user
    - recuperer nombre de joueur dans la party 
    - faire un autant de formulaire qu'il n'y a de joueurs
    - dans formulaire : name player, submit 
*/

export default class PlayersController {
  public async createPlayer({ auth, response }: HttpContextContract) {
    const user = await auth.authenticate()
    if (!user) {
      return response.json({
        status: false,
        message: 'User not found',
      })
    }

    try {
      // Récupérer la partie associée à l'utilisateur
      const party = await Party.findBy('user_id', user.id)
      // vérfifie si party existe
      if (!party) {
        return response.json({
          status: false,
          message: 'Party not found for the user',
        })
      }

      // Récupérer le nombre de joueurs attendus
      const expectedPlayerCount = party.number_player

      console.log(expectedPlayerCount)

      return response.json({ message: 'Players created successfully' })
    } catch (error) {
      console.error(error)
      return response.json({ status: false, message: 'Internal server error' })
    }
  }
}
