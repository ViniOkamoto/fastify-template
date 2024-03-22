import { User } from '../models/user'
import { UserRequest } from '../models/user-request'

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  findAll(): Promise<User[]>
  create(request: UserRequest): Promise<User>
  delete(id: string): Promise<void>
  update(id: string, name: string): Promise<User>
}
