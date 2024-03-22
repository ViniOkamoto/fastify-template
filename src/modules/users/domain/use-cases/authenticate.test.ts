/* eslint-disable prettier/prettier */
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach, vi } from 'vitest'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { AuthenticateUseCase } from './authenticate'
import { UserRepository } from '../repository/user-repository'

describe('Authenticate Use Case', () => {
  let usersRepository: UserRepository
  let sut: AuthenticateUseCase
  beforeEach(() => {
    usersRepository = {
      findByEmail: vi.fn().mockImplementation(async (email) => {
        if (email === 'foo@email.com') {
          return {
            id: '123',
            name: 'foo',
            email: 'foo@email.com',
            password: await hash('123456', 6),
          }
        }
        return null
      }),
    } as unknown as UserRepository

    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const spyFindByEmail = vi.spyOn(usersRepository, 'findByEmail')

    const { user } = await sut.execute({
      email: 'foo@email.com',
      password: '123456',
    })

    expect(spyFindByEmail).toHaveBeenCalled()

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
