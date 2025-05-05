import { left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { UserAlreadyExistsError } from '@/core/errors/errors/user-already-exists'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'
import { hash } from 'bcryptjs'

interface CreateUserUseCaseRequest {
  name: string
  cpf: string
  email: string
  password: string
  role?: 'ADMIN' | 'DELIVERYMAN'
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    cpf,
    email,
    password,
    role = 'DELIVERYMAN',
  }: CreateUserUseCaseRequest) {
    if (!['ADMIN', 'DELIVERYMAN'].includes(role)) {
      return left(new NotAllowedError())
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    const userWithSameCpf = await this.usersRepository.findByCpf(cpf)

    if (userWithSameEmail || userWithSameCpf) {
      return left(new UserAlreadyExistsError())
    }

    const password_hash = await hash(password, 6)

    const user = User.create({
      name,
      cpf,
      role,
      email,
      password_hash,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
