import fetch from 'node-fetch'
import Env from '@ioc:Adonis/Core/Env'
import { generateReference } from './randomizer'
import { AccountObj } from 'App/types/interfaces'
import Account from 'App/Models/Account'

export default class RaveService {
  public async generateAccountNumber(user: any) {
    try {
      const response = await fetch(
        'https://sandbox.monnify.com/api/v2/bank-transfer/reserved-accounts',
        {
          method: 'post',
          body: JSON.stringify({
            accountReference: generateReference(),
            accountName: `${user.lastname} ${user.firstname}`,
            currencyCode: 'NGN',
            contractCode: '7125599672',
            customerEmail: user.email,
            bvn: '21212121212',
            customerName: `${user.lastname} ${user.firstname}`,
            getAllAvailableBanks: true,
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Env.get('MONNIFY_TOKEN')}`,
          },
        }
      )
      const data = await response.json()
      const accounts: Array<AccountObj> = data.responseBody.accounts
      accounts.forEach(async (e: any) => {
        //Store account to db
        await Account.create({
          user_id: user.id,
          bank_name: e.bankName,
          account_number: e.accountNumber,
          account_name: e.accountName,
          bank_code: e.bankCode,
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
}
