import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetProfileUsecase } from './domain/use-cases/factories/make-get-profile-use-case'
import { UserDoesNotExistError } from './domain/errors/user-does-not-exist-error'
import { makeDeleteProfileUsecase } from './domain/use-cases/factories/make-delete-profile-use-case'

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

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.sub

    try {
      const deleteProfileUseCase = makeDeleteProfileUsecase()
      await deleteProfileUseCase.execute(userId)

      return reply.status(204).send()
    } catch (error) {
      if (error instanceof UserDoesNotExistError) {
        return reply.status(404).send({ message: error.message })
      }
      throw error
    }
  }
}
