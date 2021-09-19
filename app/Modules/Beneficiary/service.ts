import Beneficiary from 'App/Models/Beneficiary'
import { BeneficiaryObj } from 'App/types/interfaces'

export default class BeneficiaryService {
  public async createBeneficiary(body: BeneficiaryObj) {
    return await Beneficiary.create(body)
  }
}
