import { RouteObj } from 'App/types/interfaces'

const isGroup = true
const groupName = 'beneficiary'
const groupMiddleware = null
const routes: Array<RouteObj> = [
  {
    url: '/create',
    verbs: ['POST'],
    action: 'create',
    middleware: null,
  },
  {
    url: '/beneficiaries',
    verbs: ['GET'],
    action: 'all',
    middleware: null,
  },
  {
    url: '/remove/:id',
    verbs: ['DELETE'],
    action: 'remove',
    middleware: null,
  },
  {
    url: '/update/:id',
    verbs: ['PUT', 'PATCH'],
    action: 'update',
    middleware: null,
  },
]

export { isGroup, groupName, groupMiddleware, routes }
