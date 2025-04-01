import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'

interface CreateUserUseCaseRequest {
  name: string
  cpf: string
  email: string
  password: string
  role: string
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    cpf,
    email,
    password,
    role,
  }: CreateUserUseCaseRequest) {
    const user = User.create({
      name,
      cpf,
      role,
      email,
      password,
      createdAt: new Date(),
    })

    await this.usersRepository.create(user)

    return user
  }
}
