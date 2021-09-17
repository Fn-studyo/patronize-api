import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DepositBank extends BaseSchema {
  protected tableName = 'deposit_banks'
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('account_name')
      table.string('account_bank')
      table.string('bank_code')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
