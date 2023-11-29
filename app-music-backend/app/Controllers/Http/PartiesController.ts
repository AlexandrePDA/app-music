/* eslint-disable @typescript-eslint/naming-convention */
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/* EN BREF :
    on reçoit 3 infos : partyName, numberPlayer et numberSong
    Fait : 
    vérifier si ces infos existent
    vérifier si request correspond au validator :  const payload = await request.validate(CreateUserValidator)
    crée une partie avec user.id avec ces trois infos 
*/

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Party from 'App/Models/Party'
import CreatePartyValidator from 'App/Validators/CreatePartyValidator'

export default class PartiesController {
  public async createParty({ auth, request, response }: HttpContextContract) {
    const user = await auth.authenticate()

    if (!user) {
      return response.unauthorized({ error: 'Oups, Not authorized' })
    }

    console.log('****user****', user.email)

    const { party_name, number_player, number_song } = request.all()
    if (!party_name || !number_player || !number_song) {
      return response.badRequest({ error: 'Oups, missing partyName, numberPlayer or numberSong' })
    }

    console.log('****USER.ID****', user.id)

    try {
      const userId = user.id

      if (userId === undefined) {
        return response.unauthorized({ error: 'User not authenticated' })
      }
      const payload = await request.validate(CreatePartyValidator)
      payload.user_id = userId
      const party = await Party.create(payload)
      response.json({ message: 'Party created', party })
    } catch (error) {
      console.log(error.messages.errors)
      return response.badRequest({ error: 'Oups, probleme dans catch' })
    }
  }
}
