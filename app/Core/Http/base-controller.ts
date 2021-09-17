export default class BaseController {
  public dataResponse(response, statusCode = 200, data) {
    response.status(statusCode).json({
      data: data,
    })
  }

  public paginateResponse(response, statusCode = 200, data) {
    const { rows, pages } = data

    response.status(statusCode).json({
      data: rows,
      metadata: {
        total: pages.total,
        limit: pages.perPage,
        lastPage: pages.lastPage,
      },
    })
  }

  public errorResponse(response, statusCode = 500, errorMessage = '') {
    response.status(statusCode).json({
      message: errorMessage,
    })
  }
}
