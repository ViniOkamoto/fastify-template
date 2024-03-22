import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetProfileUsecase } from './domain/use-cases/factories/make-get-profile-use-case'
import { UserDoesNotExistError } from './domain/errors/user-does-not-exist-error'

export default class UserController {
  async get(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.sub

    try {
      const getProfileUseCase = makeGetProfileUsecase()
      const user = await getProfileUseCase.execute(userId)

      return reply.send(user)
    } catch (error) {
      if (error instanceof UserDoesNotExistError) {
        return reply.status(404).send({ message: error.message })
      }
      throw error
    }
  }
}
