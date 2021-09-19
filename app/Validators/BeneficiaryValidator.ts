import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BeneficiaryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    account_number: schema.string({}, [rules.required()]),
    account_bank: schema.string({}, [rules.required()]),
  })

  public messages = {}
}
