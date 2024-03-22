import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from './domain/errors/user-already-exist-error'
import { z } from 'zod'
import { makeRegisterUseCase as makeRegisterRegister } from './domain/use-cases/factories/make-register-use-case'
import { makeAuthenticateUseCase } from './domain/use-cases/factories/make-authenticate-use-case'

export default class AuthenticationController {
  async register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
      const registerUseCase = makeRegisterRegister()

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

  async authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    try {
      const token = await reply.jwtSign(
        {
          name: user.name,
          email: user.email,
        },
        {
          sign: {
            sub: user.id,
          },
        }
      )

      return reply.status(200).send({
        token,
      })
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ message: err.message })
      }

      throw err
    }
  }
}
