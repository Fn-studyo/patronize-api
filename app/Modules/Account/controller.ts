import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from 'App/Core/Http/base-controller'
import SendMoney from 'App/Validators/SendMoneyValidator'
import AccountService from './service'

export default class AccountController extends BaseController {
  private accountService: AccountService

  constructor() {
    super()
    this.accountService = new AccountService()
  }
  public async getAll({ auth, request, response }: HttpContextContract) {
    try {
      const user = await auth.use('api').authenticate()
      return await this.accountService.allAccounts(user.id)
    } catch (e) {
      return response.badRequest(e.messages || e.message)
    }
  }

  public async getSingle({ request, response }: HttpContextContract) {
    try {
      return await this.accountService.single(request.param('id'))
    } catch (e) {
      return response.badRequest(e.messages || e.message)
    }
  }

  public async p2p({ auth, request, response }: HttpContextContract) {
    try {
      //Validate request payload
      const payload = await request.validate(SendMoney)
      const accountId: string = request.param('id')
      return await this.accountService.single(accountId)
    } catch (e) {
      return response.badRequest(e.messages || e.message)
    }
  }

  public async transactions({ auth, request, response }: HttpContextContract) {
    try {
      const user = await auth.use('api').authenticate()
      return await this.accountService.transactions(user.id)
    } catch (e) {
      return response.badRequest(e.messages || e.message)
    }
  }
}
