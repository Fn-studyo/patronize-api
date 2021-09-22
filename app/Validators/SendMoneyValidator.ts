import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SendMoneyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.exists({ table: 'users', column: 'email' })]),
    amount: schema.number(),
    description: schema.string.optional(),
  })

  public messages = {
    'email.exists': 'This reciepient email address does not exist on our platform',
  }
}
