import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'

export default class Sufficient {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const account = await Account.findOrFail(request.param('id'))
    if (request.body().amount > account.balance) {
      return response.forbidden({
        error: 'Insufficient funds, kindly top up your account',
      })
    }
    await next()
  }
}
