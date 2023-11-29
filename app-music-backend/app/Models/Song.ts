import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Player from './Player'
import Party from './Party'

export default class Song extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public party_id: number

  @column()
  public player_id: number

  @column()
  public song_name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Player)
  public player: BelongsTo<typeof Player>
  @belongsTo(() => Party)
  public party: BelongsTo<typeof Party>
}
