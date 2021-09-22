import fetch from 'node-fetch'
import Flutterwave from 'flutterwave-node'
import Env from '@ioc:Adonis/Core/Env'
import { generateReference } from './randomizer'
import Account from 'App/Models/Account'
import UserService from 'App/Modules/User/service'
import AccountService from 'App/Modules/Account/service'
import { TransactionType } from 'App/types/interfaces/enum'

export default class CoreService {
  private userService: UserService
  private accountService: AccountService
  private rave: Flutterwave
  constructor() {
    this.userService = new UserService()
    this.accountService = new AccountService()
    this.rave = new Flutterwave(Env.get('RAVE_PUBLIC'), Env.get('RAVE_SECRET'), false)
  }
  public async generateAccountNumber(user: any) {
    try {
      const payload = {
        email: user.email,
        is_permanent: 'true',
        bvn: user.bvn,
        tx_ref: generateReference(),
        firstname: user.firstname,
        lastname: user.lastname,
        narration: `${user.lastname} ${user.firstname}`,
      }
      const response: any = await this.rave.VirtualAccount.accountNumber(payload)
      const { bankname, accountnumber } = response.data
      await Account.create({
        user_id: user.id,
        bank_name: bankname,
        account_number: accountnumber,
      })
    } catch (e) {
      //delete the user so that he/she can make the request again
      await this.userService.deleteById(user.id)
      throw new Error(e.message)
    }
  }

  public async validateAccount(body: any) {
    try {
      //flutterwave-node doesnt have account verify
      const response = await fetch('https://api.flutterwave.com/v3/accounts/resolve', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Env.get('RAVE_SECRET')}`,
        },
      })
      const data = await response.json()
      if (data.status === 'success') {
        return data
      }
      throw new Error(data.message)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  public async disbursment(main: any, benefit: any, sender: any) {
    try {
      const payload = {
        account_bank: benefit.account_bank,
        account_number: benefit.account_number,
        amount: String(main.amount),
        narration: main.narration,
        beneficiary_name: benefit.account_name,
        destination_branch_code: '',
        currency: 'NGN',
        reference: generateReference(),
      }
      const { status, data }: any = await this.rave.Transfer.initiate(payload)
      if (status === 'success') {
        //debit the user account
        await this.accountService.action(sender.id, data.amount, TransactionType.DEBIT)
        return {
          message: `Withdrawal to beneficiary to ${payload.account_bank} successful`,
        }
      }
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
