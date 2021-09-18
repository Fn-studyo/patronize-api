import { DateTime } from 'luxon'
import { v4 } from 'uuid'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  beforeCreate,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Account from './Account'
import Transaction from './Transaction'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public firstname: string

  @column()
  public lastname: string

  @column()
  public email: string

  @column()
  public bvn: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = v4()
  }

  @hasMany(() => Account, {
    foreignKey: 'user_id',
  })
  public posts: HasMany<typeof Account>

  @hasMany(() => Transaction, {
    foreignKey: 'user_id',
  })
  public transactions: HasMany<typeof Transaction>
}
