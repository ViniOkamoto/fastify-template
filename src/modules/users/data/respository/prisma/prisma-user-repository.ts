import { Prisma, PrismaClient } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { UserRepository } from '@/modules/users/domain/repository/user-repository'
import { User } from '@/modules/users/domain/models/user'

export class PrismaUsersRepository implements UserRepository {
  private readonly prisma: PrismaClient
  constructor() {
    this.prisma = prisma
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findAll() {
    const users = await this.prisma.user.findMany()

    return users
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await this.prisma.user.create({
      data,
    })

    return user
  }

  dispose() {
    this.prisma.$disconnect()
  }
}
