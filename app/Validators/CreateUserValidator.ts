import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstname: schema.string({ trim: true }),
    lastname: schema.string(),
    bvn: schema.string({}, [rules.unique({ table: 'users', column: 'bvn' })]),
    email: schema.string({}, [
      rules.confirmed(),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({}, [rules.confirmed()]),
  })

  public messages = {
    'required': 'The {{ field }} is required to create a new account',
    'email.unique': 'Email address already exist',
    'bvn.unique': 'This been has been used already by another person',
  }
}
