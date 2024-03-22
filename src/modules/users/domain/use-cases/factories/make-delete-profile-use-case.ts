import { PrismaUsersRepository } from '@/modules/users/data/respository/prisma/prisma-user-repository'
import { UserRepository } from '../../repository/user-repository'
import { DeleteProfileUseCase } from '../delete-user'

export function makeDeleteProfileUsecase() {
  const userRepository = new PrismaUsersRepository() as UserRepository
  const deleteProfileUseCase = new DeleteProfileUseCase(userRepository)

  return deleteProfileUseCase
}
