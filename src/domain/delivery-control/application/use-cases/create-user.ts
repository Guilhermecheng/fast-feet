import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from '@/core/errors/errors/user-already-exists'

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
    if (!['ADMIN', 'DELIVERYMAN'].includes(role)) {
      throw new NotAllowedError()
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    const userWithSameCpf = await this.usersRepository.findByCpf(cpf)

    if (userWithSameEmail || userWithSameCpf) {
      throw new UserAlreadyExistsError()
    }

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
