import { PrismaUsersRepository } from '@/modules/users/data/respository/prisma/prisma-user-repository'
import { AuthenticateUseCase } from '../authenticate'
import { UserRepository } from '../../repository/user-repository'

export function makeAuthenticateUseCase() {
  const authenticationRepository = new PrismaUsersRepository() as UserRepository
  const authenticateUseCase = new AuthenticateUseCase(authenticationRepository)

  return authenticateUseCase
}
