import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class BaseController {
  public dataResponse({ response }: HttpContextContract, data) {
    response.status(200).json({
      data: data,
    })
  }

  public paginateResponse({ response }: HttpContextContract, data) {
    const { rows, pages } = data

    response.status(200).json({
      data: rows,
      metadata: {
        total: pages.total,
        limit: pages.perPage,
        lastPage: pages.lastPage,
      },
    })
  }

  public errorResponse({ response }: HttpContextContract, errorMessage: string) {
    response.status(500).json({
      message: errorMessage,
    })
  }
}
