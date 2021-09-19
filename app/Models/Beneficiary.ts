import { DateTime } from 'luxon'
import { v4 } from 'uuid'
import { BaseModel, beforeCreate, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Beneficiary extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public user_id: string

  @column()
  public account_number: string

  @column()
  public account_name: string

  @column()
  public account_bank: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @beforeCreate()
  public static assignUuid(beneficiary: Beneficiary) {
    beneficiary.id = v4()
  }
}
