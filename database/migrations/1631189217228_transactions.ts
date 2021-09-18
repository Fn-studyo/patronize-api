import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transaction extends BaseSchema {
  protected tableName = 'transactions'
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('user_id').references('users.id').onDelete('CASCADE')
      table.string('account_id').references('accounts.id').onDelete('CASCADE')
      table.string('reference').notNullable()
      table.string('payment_reference').notNullable()
      table.integer('amount').unsigned()
      table.enum('type', ['DEBIT', 'CREDIT']).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
