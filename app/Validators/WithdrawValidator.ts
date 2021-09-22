import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class WithdrawValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    account_id: schema.string({}, [
      rules.uuid(),
      rules.exists({ table: 'accounts', column: 'id' }),
    ]),
    amount: schema.number(),
    narration: schema.string.optional(),
  })

  public messages = {}
}
