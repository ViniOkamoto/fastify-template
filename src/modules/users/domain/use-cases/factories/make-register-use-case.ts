import { PrismaUsersRepository } from '@/modules/users/data/respository/prisma/prisma-user-repository'
import { RegisterUserUseCase } from '../register-user-use-case'
import { UsersRepository } from '@/modules/users/data/respository/user-repository'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository() as UsersRepository
  const registerUseCase = new RegisterUserUseCase(usersRepository)

  return registerUseCase
}
