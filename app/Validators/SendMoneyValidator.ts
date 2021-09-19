import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SendMoneyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    credit_account_id: schema.string({}, [rules.exists({ table: 'accounts', column: 'id' })]),
    email: schema.string({}, [rules.email(), rules.exists({ table: 'users', column: 'email' })]),
    amount: schema.number(),
    description: schema.string.optional(),
  })

  public messages = {
    'credit_account_id.required':
      'The account id to credit the user is required, since every user have 2 accounts by default',
    'email.exists': 'This reciepient email address does not exist on our platform',
  }
}
