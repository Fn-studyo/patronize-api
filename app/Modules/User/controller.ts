import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from 'App/Core/Http/base-controller'

export default class Controller extends BaseController {
  public async index() {
    return {
      msg: 'Hello World',
    }
  }

  // public async create({ request, response }: HttpContextContract) {
  //   //
  // }

  // public async store({ request, response }: HttpContextContract) {
  //   //
  // }

  // public async show({ request, response }: HttpContextContract) {
  //   //
  // }

  // public async edit({ request, response }: HttpContextContract) {
  //   //
  // }

  // public async update({ request, response }: HttpContextContract) {
  //   //
  // }

  // public async destroy({ request, response }: HttpContextContract) {
  //   //
  // }
}
