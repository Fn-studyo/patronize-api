import { RouteObj } from 'App/types/interfaces'

const isGroup = true
const groupName = 'account'
const groupMiddleware = null
const routes: Array<RouteObj> = [
  {
    url: '/fund',
    verbs: ['POST'],
    action: 'fund',
    middleware: null,
  },
]

export { isGroup, groupName, groupMiddleware, routes }
