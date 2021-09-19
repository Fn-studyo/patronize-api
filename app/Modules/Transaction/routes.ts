import { RouteObj } from 'App/types/interfaces'

const isGroup = true
const groupName = 'transaction'
const groupMiddleware = null
const routes: Array<RouteObj> = [
  {
    url: '/all',
    verbs: ['GET'],
    action: 'all',
    middleware: null,
  },
]

export { isGroup, groupName, groupMiddleware, routes }
