import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from 'App/Core/Http/base-controller'
import { generateTransactionReference } from 'App/helpers/randomizer'
import { TransactionType } from 'App/types/interfaces/enum'
import SendMoney from 'App/Validators/SendMoneyValidator'
import TransactionService from '../Transaction/service'
import AccountService from './service'

export default class AccountController extends BaseController {
  private accountService: AccountService
  private transactionService: TransactionService

  constructor() {
    super()
    this.accountService = new AccountService()
    this.transactionService = new TransactionService()
  }
  public async getAll({ auth, response }: HttpContextContract) {
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
      const user = await auth.use('api').authenticate()
      //Validate request payload
      const payload: any = await request.validate(SendMoney)
      //account we are debiting
      const debit = await this.accountService.single(request.param('id'))
      //account we are crediting
      const credit = await this.accountService.byEmail(payload.email)
      //debit sender
      await this.accountService.action(debit.id, payload.amount, TransactionType.DEBIT)
      //credit recipient
      await this.accountService.action(credit.id, payload.amount, TransactionType.CREDIT)
      //save into transaction db
      await this.transactionService.save({
        amount: Number(payload.amount),
        reference: `TRAN-${generateTransactionReference()}`,
        payment_reference: `PAYMENT-${generateTransactionReference()}`,
        account_id: debit.id,
        user_id: user.id,
        type: TransactionType.DEBIT,
      })
      return response.ok({
        message: `Your transaction was successful with reference TRAN-${generateTransactionReference()}`,
      })
    } catch (e) {
      return response.badRequest(e.messages || e.message)
    }
  }

  public async transactions({ auth, response }: HttpContextContract) {
    try {
      const user = await auth.use('api').authenticate()
      return await this.accountService.transactions(user.id)
    } catch (e) {
      return response.badRequest(e.messages || e.message)
    }
  }
}
