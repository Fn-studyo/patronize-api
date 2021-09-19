import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from 'App/Core/Http/base-controller'
import TransactionService from './service'

export default class TransactionController extends BaseController {
  private transactionService: TransactionService
  constructor() {
    super()
    this.transactionService = new TransactionService()
  }
  public async all({ auth, response }: HttpContextContract) {
    try {
      const user = await auth.use('api').authenticate()
      return await this.transactionService.allTransaction(user.id)
    } catch (e) {
      return response.internalServerError({
        error: e.message,
      })
    }
  }
}
