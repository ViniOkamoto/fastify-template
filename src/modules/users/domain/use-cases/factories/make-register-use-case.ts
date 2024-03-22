import { PrismaUsersRepository } from '@/modules/users/data/respository/prisma/prisma-user-repository'
import { RegisterUserUseCase } from '../register'
import { UserRepository } from '../../repository/user-repository'

export function makeRegisterUseCase() {
  const authRepository = new PrismaUsersRepository() as UserRepository
  const registerUseCase = new RegisterUserUseCase(authRepository)

  return registerUseCase
}
