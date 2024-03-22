/* eslint-disable prettier/prettier */
import { afterEach, beforeEach, describe, it, vi } from 'vitest'
import { RegisterUserUseCase } from './register'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exist-error'
import { UserRepository } from '../repository/user-repository'

describe('RegisterUserUseCase', () => {
  let userRepository: UserRepository
  let registerUserUseCase: RegisterUserUseCase

  beforeEach(() => {
    userRepository = {
      create: vi.fn().mockImplementation(async ({ name, email, password }) => {
        return {
          id: '123',
          name,
          email,
          password,
          role: 'MEMBER',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      }),
      findByEmail: vi.fn().mockImplementation(async () => {
        return null
      }),
    } as unknown as UserRepository
    registerUserUseCase = new RegisterUserUseCase(userRepository)
  })

  afterEach(() => {
    // restoring date after each test run
    vi.restoreAllMocks()
  })

  it('should create a new user', async ({ expect }) => {
    const spyCreate = vi.spyOn(userRepository, 'create')
    const spyFindByEmail = vi.spyOn(userRepository, 'findByEmail')

    const { user } = await registerUserUseCase.execute({
      name: 'foo',
      email: 'foo@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
    expect(user.id).toEqual('123')
    expect(user.name).toEqual('foo')
    expect(user.email).toEqual('foo@example.com')
    expect(user.role).toEqual('MEMBER')
    expect(spyCreate).toHaveBeenCalled()
    expect(spyFindByEmail).toHaveBeenCalled()
  })

  it('should throw an error if user already exists', async ({ expect }) => {
    const spyFindByEmail = vi
      .spyOn(userRepository, 'findByEmail')
      .mockImplementation(async () => {
        return {
          id: '123',
          name: 'foo',
          email: 'foo@example.com',
        } as User
      })
    const spyCreate = vi.spyOn(userRepository, 'create')
    await expect(
      registerUserUseCase.execute({
        name: 'foo',
        email: 'foo@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)

    expect(spyFindByEmail).toHaveBeenCalled()
    expect(spyCreate).not.toHaveBeenCalled()
  })
  it('should throw an error if user creation fails', async ({ expect }) => {
    const spy = vi.spyOn(userRepository, 'create').mockImplementation(() => {
      throw new Error('Test error')
    })

    await expect(
      registerUserUseCase.execute({
        name: 'foo Doe',
        email: 'foo.doe@example.com',
        password: '123456',
      })
    ).rejects.toThrow('Test error')
    expect(spy).toHaveBeenCalled()
  })
})
