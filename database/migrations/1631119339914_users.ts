import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('firstname').notNullable().unique()
      table.string('lastname').notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('bvn').notNullable().unique()
      table.text('password').notNullable()
      table.string('accountVerifyToken').nullable()
      table.boolean('accountVerified').defaultTo(false)
      table.datetime('accountVerifyExpires').nullable()
      table.datetime('passwordChangedAt').nullable()
      table.string('passwordResetToken').nullable()
      table.string('passwordResetExpires').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
