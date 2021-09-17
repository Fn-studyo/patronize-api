import { RouteObj } from 'App/types/interfaces'

const isGroup = true
const groupName = 'users'
const groupMiddleware = null
const routes: Array<RouteObj> = [
  {
    url: '/auth/register',
    verbs: ['POST'],
    action: 'store',
    middleware: null,
  },
]

export { isGroup, groupName, groupMiddleware, routes }
