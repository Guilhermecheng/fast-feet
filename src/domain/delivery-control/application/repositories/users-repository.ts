import { User } from '../../enterprise/entities/user'

export interface UsersRepository {
  create(user: User): Promise<void>
  // delete(user: User): Promise<void>
  // save(user: User): Promise<void>

  // findById(id: string): Promise<User | null>
  // findManyRecent(): Promise<User[]>
  // findManyOlder(): Promise<User[]>
}
