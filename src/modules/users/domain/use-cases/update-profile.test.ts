/* eslint-disable prettier/prettier */
import { afterEach, beforeEach, describe, it, vi } from 'vitest'
import { User } from '@prisma/client'
import { UserRepository } from '../repository/user-repository'
import { UpdateProfileUseCase } from './update-profile'
import { UserDoesNotExistError } from '../errors/user-does-not-exist-error'

describe('UserProfileUseCase', () => {
  let userRepository: UserRepository
  let updateProfileUseCase: UpdateProfileUseCase

  beforeEach(() => {
    userRepository = {
      findById: vi.fn().mockImplementation(async (id) => {
        if (id === '123') {
          return {
            id: '123',
            name: 'foo',
            email: 'foo@foo.ca',
          } as User
        }
        return null
      }),
      update: vi.fn().mockImplementation(async (id, name) => {
        return {
          id,
          name,
          email: 'foo@foo.ca',
        } as User
      }),
    } as unknown as UserRepository

    updateProfileUseCase = new UpdateProfileUseCase(userRepository)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should update user', async ({ expect }) => {
    const spyUpdate = vi.spyOn(userRepository, 'update')
    const spyFindById = vi.spyOn(userRepository, 'findById')

    const user = await updateProfileUseCase.execute('123', 'foo Doe')

    expect(user.id).toEqual('123')
    expect(user.name).toEqual('foo Doe')
    expect(user.email).toEqual('foo@foo.ca')
    expect(spyUpdate).toHaveBeenCalled()
    expect(spyFindById).toHaveBeenCalled()
  })

  it('should throw an error if user does not exist', async ({ expect }) => {
    await expect(() =>
      updateProfileUseCase.execute('456', 'foo')
    ).rejects.toBeInstanceOf(UserDoesNotExistError)
  })
})
