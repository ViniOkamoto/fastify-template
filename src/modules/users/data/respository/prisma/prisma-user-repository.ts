import { PrismaClient } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { UserRepository } from '@/modules/users/domain/repository/user-repository'
import { User } from '@/modules/users/domain/models/user'
import { UserRequest } from '@/modules/users/domain/models/user-request'

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

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany()

    return users
  }

  async create(request: UserRequest): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: request.name,
        email: request.email,
        password: request.password,
      },
    })
    return user
  }

  async update(id: string, name: string): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })

    return user
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    })
  }

  dispose() {
    this.prisma.$disconnect()
  }
}
