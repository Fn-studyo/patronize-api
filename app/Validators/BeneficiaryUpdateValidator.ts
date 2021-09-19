import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BeneficiaryUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    account_number: schema.string.optional(),
    account_bank: schema.string.optional(),
  })

  public messages = {}
}
