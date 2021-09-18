import { RouteObj } from 'App/types/interfaces'

const isGroup = true
const groupName = 'auth'
const groupMiddleware = null
const routes: Array<RouteObj> = [
  {
    url: '/sign-up',
    verbs: ['POST'],
    action: 'createUser',
    middleware: null,
  },
]

export { isGroup, groupName, groupMiddleware, routes }
