import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Accounts extends BaseSchema {
  protected tableName = 'accounts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('user_id').references('users.id').onDelete('CASCADE')
      table.string('account_number').unique()
      table.string('bank_name')
      table.integer('balance').defaultTo(0)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
