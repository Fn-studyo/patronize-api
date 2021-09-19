import Account from 'App/Models/Account'
import User from 'App/Models/User'
import { TransactionType } from 'App/types/interfaces/enum'

export default class AccountService {
  public async allAccounts(id: string): Promise<User[]> {
    return await User.query().where('id', id).preload('accounts')
  }

  public async single(account_id: string): Promise<Account> {
    return await Account.findOrFail(account_id)
  }

  public async byEmail(email: string) {
    return await Account.query().where('email', email).first()
  }

  public async transactions(id: string): Promise<User[]> {
    return await User.query().where('id', id).preload('transactions')
  }

  public async action(id: string, amount: number, action: TransactionType) {
    const account = await this.single(id)
    const balance = action === 'DEBIT' ? account.balance - amount : account.balance + amount
    return await Account.query().where('id', id).update({ balance })
  }
}
