import Beneficiary from 'App/Models/Beneficiary'
import User from 'App/Models/User'
import { BeneficiaryObj } from 'App/types/interfaces'

export default class BeneficiaryService {
  public async createBeneficiary(body: BeneficiaryObj): Promise<Beneficiary> {
    return await Beneficiary.create(body)
  }

  public async getAll(id: string): Promise<User[]> {
    return await User.query().where('id', id).preload('beneficiaries')
  }

  public async removeSingle(id: string): Promise<any> {
    const deleted = await Beneficiary.query().where('id', id).delete()
    if (deleted) {
      return {
        message: 'Beneficiary deleted successfully',
      }
    }
  }

  public async updateBeneficiary(id: string, data: any): Promise<any> {
    await Beneficiary.query()
      .where('id', id)
      .update({ ...data })
    return {
      message: 'Beneficiary deleted successfully',
    }
  }
}
