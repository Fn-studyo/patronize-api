import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from 'App/Core/Http/base-controller'
import Env from '@ioc:Adonis/Core/Env'
import EmailService from 'App/helpers/email'
import RaveService from 'App/helpers/rave'
import CreateUser from 'App/Validators/CreateUserValidator'
import UserService from '../User/service'

export default class AuthController extends BaseController {
  private authService: UserService
  private rave: RaveService
  private mailer: EmailService

  constructor() {
    super()
    this.authService = new UserService()
    this.rave = new RaveService()
    this.mailer = new EmailService()
  }

  public async createUser({ auth, request, response }: HttpContextContract) {
    try {
      //Validate request payload
      const payload = await request.validate(CreateUser)
      //Create user
      const { email } = await this.authService.createUser(payload)
      //Get the user
      const user = await this.authService.getUserByEmail(email)
      //Generate account number
      await this.rave.generateAccountNumber(user.id)
      // sign token
      const token = await auth.use('api').generate(user)
      //generate verify token
      const verifyToken = await this.authService.generateVerifyTokenForUser(email)
      //Generate link
      const link = `${Env.get('APP_URL')}/verify/${verifyToken}`
      //send verification email
      await this.mailer.sendVerificationEmail(email, link)
      //return user
      return {
        token,
        user,
      }
    } catch (error) {
      return response.badRequest(error.messages || error.message)
    }
  }
}
