/* eslint-disable prettier/prettier */
import { expect, describe, it, beforeEach, vi } from 'vitest'

import { UserRepository } from '../repository/user-repository'
import { UserDoesNotExistError } from '../errors/user-does-not-exist-error'
import { DeleteProfileUseCase } from './delete-user'

describe('Delete Profile Use Case', () => {
  let usersRepository: UserRepository
  let sut: DeleteProfileUseCase
  beforeEach(() => {
    usersRepository = {
      findById: vi.fn().mockImplementation(async (id) => {
        if (id === '123') {
          return {
            id: '123',
            name: 'foo',
            email: 'foo@email.com',
          }
        }
        return null
      }),
      delete: vi.fn(),
    } as unknown as UserRepository

    sut = new DeleteProfileUseCase(usersRepository)
  })

  it('should be able to delete user', async () => {
    const spyFindById = vi.spyOn(usersRepository, 'findById')

    await sut.execute('123')

    expect(spyFindById).toHaveBeenCalled()
    expect(usersRepository.delete).toHaveBeenCalled()
  })

  it('should not be able to get user with wrong id', async () => {
    await expect(() => sut.execute('456')).rejects.toBeInstanceOf(
      UserDoesNotExistError
    )
  })
})
