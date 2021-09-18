import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from 'App/Core/Http/base-controller'
import Account from 'App/Models/Account'
import Transaction from 'App/Models/Transaction'
import { TransactionType } from 'App/types/interfaces/enum'
import UserService from '../User/service'

export default class MainController extends BaseController {
  private userService: UserService
  constructor() {
    super()
    this.userService = new UserService()
  }
  public async action({ request }: HttpContextContract) {
    if (request.ip() === '35.242.133.146') {
      //perform action
      //add to transaction table
      //update wallet balance
      let data = await request.body()
      const user = await this.userService.getUserByEmail(data.customer.email)
      //Todo->fetch account
      await Transaction.create({
        amount: Number(data.amountPaid),
        reference: data.transactionReference,
        payment_reference: data.paymentReference,
        account_id: 'eb0a98ff-bb84-4c47-b51b-3d713131e615',
        user_id: user.id,
        type: data.paymentStatus === 'PAID' ? TransactionType.CREDIT : TransactionType.DEBIT,
      })
      //Fund account
      const update = await Account.findOrFail('eb0a98ff-bb84-4c47-b51b-3d713131e615')
      update.balance = Number(update.balance) + Number(data.amountPaid)
      update.save()
    }
  }
}
