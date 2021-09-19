import Transaction from 'App/Models/Transaction'
import { TransactionObj } from 'App/types/interfaces'

export default class TransactionService {
  public async save(body: TransactionObj) {
    return await Transaction.create(body)
  }

  public async allTransaction(id: string): Promise<Transaction[]> {
    return await Transaction.query().where('user_id', id)
  }
}
