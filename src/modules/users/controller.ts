import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from './domain/errors/user-already-exist-error'
import { z } from 'zod'
import { makeRegisterUseCase } from './domain/use-cases/factories/make-register-use-case'

export default class UsersController {
  async register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
      const registerUseCase = makeRegisterUseCase()

      await registerUseCase.execute({
        name,
        email,
        password,
      })
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ message: err.message })
      }

      throw err
    }

    return reply.status(201).send({ message: 'User created.' })
  }
}
