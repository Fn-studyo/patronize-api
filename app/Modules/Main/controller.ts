import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from 'App/Core/Http/base-controller'

export default class MainController extends BaseController {
  public async action({ request }: HttpContextContract) {
    console.log(await request.body())
  }
}
