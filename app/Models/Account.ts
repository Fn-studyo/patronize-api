import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 } from 'uuid'
import User from './User'

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public user_id: string

  @column()
  public bank_name: string

  @column()
  public account_number: string

  @column()
  public balance: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(account: Account) {
    account.id = v4()
  }

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
