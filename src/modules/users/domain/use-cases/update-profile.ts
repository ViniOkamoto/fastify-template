import { UserRepository } from '../repository/user-repository'
import { User } from '../models/user'
import { UserDoesNotExistError } from '../errors/user-does-not-exist-error'

export class UpdateProfileUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute(id: string, name: string): Promise<User> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new UserDoesNotExistError()
    }

    const updatedUser = await this.usersRepository.update(id, name)

    return updatedUser
  }
}
