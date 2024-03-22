import { PrismaUsersRepository } from '@/modules/users/data/respository/prisma/prisma-user-repository'
import { UserRepository } from '../../repository/user-repository'
import { GetProfileUseCase } from '../get-profile'

export function makeGetProfileUsecase() {
  const userRepository = new PrismaUsersRepository() as UserRepository
  const getProfileUseCase = new GetProfileUseCase(userRepository)

  return getProfileUseCase
}
