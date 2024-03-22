import { FastifyInstance } from 'fastify'
import AuthenticationController from './authentication-controller'
import { verifyJwt } from '@/middleware/auth'
import UserController from './user-controller'

export async function usersRoutes(app: FastifyInstance) {
  const authController = new AuthenticationController()
  const userController = new UserController()

  app.post('/register', authController.register)
  app.post('/authenticate', authController.authenticate)

  app.get('/profile', { preHandler: verifyJwt }, userController.get)
}
