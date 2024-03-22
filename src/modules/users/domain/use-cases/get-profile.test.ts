/* eslint-disable prettier/prettier */
import { expect, describe, it, beforeEach, vi } from 'vitest'

import { UserRepository } from '../repository/user-repository'
import { GetProfileUseCase } from './get-profile'
import { UserDoesNotExistError } from '../errors/user-does-not-exist-error'

describe('Get Profile Use Case', () => {
  let usersRepository: UserRepository
  let sut: GetProfileUseCase
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
    } as unknown as UserRepository

    sut = new GetProfileUseCase(usersRepository)
  })

  it('should be able to get user', async () => {
    const spyFindById = vi.spyOn(usersRepository, 'findById')

    const user = await sut.execute('123')

    expect(spyFindById).toHaveBeenCalled()

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to get user with wrong id', async () => {
    await expect(() => sut.execute('456')).rejects.toBeInstanceOf(
      UserDoesNotExistError
    )
  })
})
