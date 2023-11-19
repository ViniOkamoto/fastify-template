import { FastifyInstance } from 'fastify'
import UserController from './controller'

export async function usersRoutes(app: FastifyInstance) {
  const userController = new UserController()

  app.post('/users', userController.register)
}
