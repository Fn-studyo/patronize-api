import Route from '@ioc:Adonis/Core/Route'

export default class Router {
  public static registerModules(modules: string[]) {
    let moduleRoutes: any
    modules.forEach((module: string) => {
      console.log(module)
      moduleRoutes = require(`../../modules/${module}/routes`)
      if (moduleRoutes.isGroup) {
        this.registerGroupRoutes(moduleRoutes, module)
        return
      }

      moduleRoutes.routes.forEach((route: any) => registerRoute(route, module))
    })
  }

  public static registerGroupRoutes(moduleRoutes: any, module: any) {
    let routesGroup = Route.group(() => {
      moduleRoutes.routes.forEach((route) => registerRoute(route, module))
    }).prefix(moduleRoutes.groupName)
    if (moduleRoutes.groupMiddleware) {
      routesGroup.middleware(moduleRoutes.groupMiddleware)
    }
  }
}

function registerRoute(route, module) {
  let newRoute = Route.route(
    route.url,
    route.verbs,
    `../../../app/Modules/${module}/controller.${route.action}`
  )
  if (route.middleware) {
    newRoute.middleware(route.middleware)
  }

  return newRoute
}
