import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from 'App/Core/Http/base-controller'
import BeneficiaryValidator from 'App/Validators/BeneficiaryValidator'
import BeneficiaryService from './service'
import CoreService from 'App/helpers/fintech-core'
import BeneficiaryValidatorUpdate from 'App/Validators/BeneficiaryUpdateValidator'
import WithdrawValidator from 'App/Validators/WithdrawValidator'
import AccountService from '../Account/service'

export default class BeneficiaryController extends BaseController {
  private beneficiary: BeneficiaryService
  private account: AccountService
  private rave: CoreService

  constructor() {
    super()
    this.beneficiary = new BeneficiaryService()
    this.account = new AccountService()
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

  public async all({ auth, response }: HttpContextContract) {
    try {
      const user = await auth.use('api').authenticate()
      return await this.beneficiary.getAll(user.id)
    } catch (e) {
      return response.internalServerError({
        error: e.messages || e.message,
      })
    }
  }

  public async remove({ request, response }: HttpContextContract) {
    try {
      return await this.beneficiary.removeSingle(request.param('id'))
    } catch (e) {
      return response.internalServerError({
        error: e.messages || e.message,
      })
    }
  }

  public async update({ auth, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(BeneficiaryValidatorUpdate)
      const user = await auth.use('api').authenticate()
      const { data } = await this.rave.validateAccount(payload)
      const body = {
        account_bank: payload.account_bank,
        account_number: payload.account_number,
        account_name: data.account_name,
        user_id: user.id,
      }
      return await this.beneficiary.updateBeneficiary(request.param('id'), body)
    } catch (e) {
      return response.internalServerError({
        error: e.messages || e.message,
      })
    }
  }

  public async withdraw({ auth, request, response }: HttpContextContract) {
    try {
      await auth.use('api').authenticate()
      //validate request
      const payload = await request.validate(WithdrawValidator)
      const account = await this.account.single(payload.account_id)
      //get beneficiary
      const benefit = await this.beneficiary.getSingle(request.param('id'))
      return await this.rave.disbursment(payload, benefit, account)
    } catch (e) {
      return response.internalServerError({
        error: e.messages || e.message,
      })
    }
  }
}
