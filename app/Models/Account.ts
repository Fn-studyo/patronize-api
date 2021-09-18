import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 } from 'uuid'

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
  public account_name: string

  @column()
  public bank_code: string

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
}
