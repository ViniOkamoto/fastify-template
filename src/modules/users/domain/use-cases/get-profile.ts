import { UserRepository } from '../repository/user-repository'
import { User } from '../models/user'
import { UserDoesNotExistError } from '../errors/user-does-not-exist-error'

export class GetProfileUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new UserDoesNotExistError()
    }
    return user
  }
}
