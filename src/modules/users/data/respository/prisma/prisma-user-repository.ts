import { Prisma, PrismaClient } from '@prisma/client'
import { UsersRepository } from '../user-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  private readonly prisma: PrismaClient
  constructor() {
    this.prisma = prisma
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
    const user = await this.prisma.user.findMany()

    return user
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
