import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from 'App/Core/Http/base-controller'

export default class MainController extends BaseController {
  public async action({ request }: HttpContextContract) {
    if (request.ip() === '35.242.133.146') {
      //perform action
      //add to transaction table
      //update wallet balance
      let data = await request.body()
    }
  }
}
