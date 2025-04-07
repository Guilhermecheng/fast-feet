import { User } from '../../enterprise/entities/user'

export interface UsersRepository {
  create(user: User): Promise<void>
  // delete(user: User): Promise<void>
  // save(user: User): Promise<void>

  findByEmail(email: string): Promise<User | null>
  findByCpf(cpf: string): Promise<User | null>

  // findById(id: string): Promise<User | null>
  // findManyRecent(): Promise<User[]>
  // findManyOlder(): Promise<User[]>
}
