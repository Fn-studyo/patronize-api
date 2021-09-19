import { RouteObj } from 'App/types/interfaces'

const isGroup = true
const groupName = 'app'
const groupMiddleware = null
const routes: Array<RouteObj> = [
  {
    url: '/webhook',
    verbs: ['POST'],
    action: 'action',
    middleware: '',
  },
]

export { isGroup, groupName, groupMiddleware, routes }
