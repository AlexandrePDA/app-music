import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Party from './Party'
import Player from './Player'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public provider: string

  @column()
  public access_token: string

  @column()
  public email: string

  @column()
  public name: string

  @hasMany(() => Party)
  public party: HasMany<typeof Party>
  @hasMany(() => Player)
  public player: HasMany<typeof Player>
}
