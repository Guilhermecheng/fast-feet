import { left, right } from '@/core/either'
import { InvalidCredentialsError } from '@/core/errors/errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { UsersRepository } from '../repositories/users-repository'

interface AuthenticateWithCpfUseCaseRequest {
  cpf: string
  password: string
}

export class AuthenticateWithCpfUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ cpf, password }: AuthenticateWithCpfUseCaseRequest) {
    const user = await this.usersRepository.findByCpf(cpf)

    if (!user) {
      return left(new InvalidCredentialsError())
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      return left(new InvalidCredentialsError())
    }

    return right({
      user,
    })
  }
}
