import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from 'App/Core/Http/base-controller'
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

  public async p2p({ auth, request }: HttpContextContract) {
    //
  }

  public async transactions({ auth, request }: HttpContextContract) {
    //
  }
}
