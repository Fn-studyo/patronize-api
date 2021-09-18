import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from 'App/Core/Http/base-controller'
import Env from '@ioc:Adonis/Core/Env'
import EmailService from 'App/helpers/email'
import RaveService from 'App/helpers/rave'
import CreateUser from 'App/Validators/CreateUserValidator'
import UserService from '../User/service'
import LoginUser from 'App/Validators/LoginUserValidator'

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
      //await this.rave.generateAccountNumber(user.id)
      // sign token
      const token = await auth.use('api').generate(user)
      //generate verify token
      const verifyToken = await this.authService.generateVerifyTokenForUser(user.id)
      //Generate link
      const link = `${Env.get('APP_URL')}/verify/${verifyToken}`
      //send verification email
      await this.mailer.sendVerificationEmail(email, link)
      //return user
      return {
        token,
        user,
      }
    } catch (e) {
      return response.badRequest(e.messages || e.message)
    }
  }

  public async authenticateUser({ auth, request, response }: HttpContextContract) {
    try {
      //Validate request payload
      const payload = await request.validate(LoginUser)
      return await (
        await auth.use('api').attempt(payload.email, payload.password, {
          expiresIn: '7days',
        })
      ).toJSON()
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async resendVerification({ request, response }: HttpContextContract) {
    try {
      // create user
      const user = await this.authService.getUserByEmail(request.param('email'))

      // generate verification token
      const verifyToken = await this.authService.generateVerifyTokenForUser(user.id)

      const link = `${Env.get('APP_URL')}/verify/${verifyToken}`

      //send token to user mail for verification
      await this.mailer.sendVerificationEmail(user.email, link)

      // return user, token and their setting
      return {
        message: 'Check your email',
      }
    } catch (e) {
      return response.badRequest(e.messages || e.message)
    }
  }

  public async verifyUserEmail({ request, response }: HttpContextContract) {
    // Get user based on the token
    let user = await this.authService.getUserByVerificationToken(token)

    // 2) If there is a user, set the new password
    user = await this.authService.verifyUser(user.uid)

    return user
  }
}
