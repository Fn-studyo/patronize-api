import { TransactionType } from './enum'

export interface RouteObj {
  url: string
  verbs: Array<String>
  action: string
  middleware: any
}

export interface CreateUserDto {
  firstname: string
  lastname: string
  bvn: string
  email: string
  password: string
}

export interface AccountObj {
  bankCode: string
  bankName: string
  accountNumber: string
  accountName: string
}

export interface TransactionObj {
  amount: number
  reference: string
  payment_reference: string
  account_id: string
  user_id: string
  type: TransactionType
}

export interface BeneficiaryObj {
  account_name: string
  account_bank: string
  account_number: string
  user_id: string
}
