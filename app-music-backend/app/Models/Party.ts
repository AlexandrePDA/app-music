import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Player from './Player'
import Song from './Song'
import User from './User'

export default class Party extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public party_name: string

  @column()
  public number_player: number

  @column()
  public number_song: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Player)
  public player: HasMany<typeof Player>
  @hasMany(() => Song)
  public song: HasMany<typeof Song>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
