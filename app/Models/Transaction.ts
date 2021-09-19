import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 } from 'uuid'
import { TransactionType } from 'App/types/interfaces/enum'
import User from './User'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public user_id: string

  @column()
  public account_id: string

  @column()
  public reference: string

  @column()
  public payment_reference: string

  @column()
  public amount: number

  @column()
  public type: TransactionType

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(transaction: Transaction) {
    transaction.id = v4()
  }

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
