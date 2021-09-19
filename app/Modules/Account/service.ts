import Account from 'App/Models/Account'
import User from 'App/Models/User'

export default class AccountService {
  public async allAccounts(id: string): Promise<User[]> {
    return await User.query().where('id', id).preload('accounts')
  }

  public async single(account_id: string): Promise<Account> {
    return await Account.findOrFail(account_id)
  }

  public async transactions(id: string): Promise<User[]> {
    return await User.query().where('id', id).preload('transactions')
  }
}
