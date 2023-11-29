import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Song from './Song'
import Party from './Party'

export default class Player extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public party_id: number

  @column()
  public user_id: number

  @column()
  public player_name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public score: number

  @hasMany(() => Song)
  public song: HasMany<typeof Song>

  @belongsTo(() => Party)
  public party: BelongsTo<typeof Party>
}
