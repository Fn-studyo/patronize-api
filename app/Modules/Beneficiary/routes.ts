import { RouteObj } from 'App/types/interfaces'

const isGroup = true
const groupName = 'beneficiary'
const groupMiddleware = null
const routes: Array<RouteObj> = [
  {
    url: '/create',
    verbs: ['POST'],
    action: 'create',
    middleware: 'auth',
  },
  {
    url: '/beneficiaries',
    verbs: ['GET'],
    action: 'all',
    middleware: 'auth',
  },
  {
    url: '/remove/:id',
    verbs: ['DELETE'],
    action: 'remove',
    middleware: 'auth',
  },
  {
    url: '/update/:id',
    verbs: ['PUT', 'PATCH'],
    action: 'update',
    middleware: 'auth',
  },
  {
    url: '/withdraw/:id',
    verbs: ['POST'],
    action: 'withdraw',
    middleware: 'auth',
  },
]

export { isGroup, groupName, groupMiddleware, routes }
