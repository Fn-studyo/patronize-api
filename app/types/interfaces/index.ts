export interface RouteObj {
  url: string
  verbs: Array<String>
  action: string
  middleware: string
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
