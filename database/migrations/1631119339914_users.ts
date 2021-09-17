import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('firstname').notNullable().unique()
      table.string('lastname').notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('accountVerifyToken')
      table.boolean('accountVerified').defaultTo(false)
      table.datetime('accountVerifyExpires')
      table.datetime('passwordChangedAt')
      table.string('passwordResetToken')
      table.string('passwordResetExpires')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
