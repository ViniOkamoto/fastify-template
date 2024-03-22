import { UserRepository } from '../repository/user-repository'
import { UserDoesNotExistError } from '../errors/user-does-not-exist-error'

export class DeleteProfileUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new UserDoesNotExistError()
    }
    await this.usersRepository.delete(id)
  }
}
