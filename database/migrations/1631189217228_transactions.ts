import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transaction extends BaseSchema {
  protected tableName = 'transactions'
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.enum('type', ['DEBIT', 'CREDIT']).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
