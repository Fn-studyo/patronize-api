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
  {
    url: '/sign-in',
    verbs: ['POST'],
    action: 'authenticateUser',
    middleware: null,
  },
  {
    url: '/resend-verification/:email',
    verbs: ['POST'],
    action: 'resendVerification',
    middleware: null,
  },
  {
    url: '/verify-email/:token',
    verbs: ['GET'],
    action: 'verifyUserEmail',
    middleware: null,
  },
  {
    url: '/recover-password',
    verbs: ['POST'],
    action: 'recoverPassword',
    middleware: null,
  },
  {
    url: '/reset-password/:token',
    verbs: ['POST'],
    action: 'resetPassword',
    middleware: null,
  },
]

export { isGroup, groupName, groupMiddleware, routes }
