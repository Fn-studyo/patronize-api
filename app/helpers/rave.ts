import Ravepay from 'flutterwave-node'
import Env from '@ioc:Adonis/Core/Env'
import Account from 'App/Models/Account'

export default class RaveService {
  private rave: Ravepay
  constructor() {
    this.rave = new Ravepay(Env.get('RAVE_PUBLIC'), Env.get('RAVE_SECRET'), false)
  }

  public async generateAccountNumber(email: string) {
    const payload = {
      email,
      is_permanent: 'true',
    }
    try {
      const response = await this.rave.VirtualAccount.accountNumber(payload)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}
