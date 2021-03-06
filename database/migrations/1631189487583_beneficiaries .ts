import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DepositBank extends BaseSchema {
  protected tableName = 'beneficiaries'
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('account_name')
      table.string('account_bank')
      table.string('account_number')
      table.string('user_id').references('users.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }
  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
