import { RouteObj } from 'App/types/interfaces'

const isGroup = true
const groupName = 'account'
const groupMiddleware = null
const routes: Array<RouteObj> = [
  {
    url: '/all',
    verbs: ['GET'],
    action: 'getAll',
    middleware: 'auth',
  },
  {
    url: '/:id',
    verbs: ['GET'],
    action: 'getSingle',
    middleware: 'auth',
  },
  {
    url: '/send/:email',
    verbs: ['POST'],
    action: 'p2p',
    middleware: 'auth',
  },
  {
    url: '/:id/transactions',
    verbs: ['GET'],
    action: 'transactions',
    middleware: 'auth',
  },
]

export { isGroup, groupName, groupMiddleware, routes }
