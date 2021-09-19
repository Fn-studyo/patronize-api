import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from 'App/Core/Http/base-controller'
import BeneficiaryValidator from 'App/Validators/BeneficiaryValidator'
import BeneficiaryService from './service'
import CoreService from 'App/helpers/fintech-core'

export default class BeneficiaryController extends BaseController {
  private beneficiary: BeneficiaryService
  private rave: CoreService

  constructor() {
    super()
    this.beneficiary = new BeneficiaryService()
    this.rave = new CoreService()
  }
  public async create({ auth, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(BeneficiaryValidator)
      const user = await auth.use('api').authenticate()
      const { data } = await this.rave.validateAccount(payload)
      const body = {
        ...payload,
        account_name: data.account_name,
        user_id: user.id,
      }
      return await this.beneficiary.createBeneficiary(body)
    } catch (e) {
      return response.internalServerError({
        error: e.messages || e.message,
      })
    }
  }
}
