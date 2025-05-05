import { left, right } from '@/core/either'
import { InvalidCredentialsError } from '@/core/errors/errors/invalid-credentials-error'
import { Encrypter } from '../../cryptography/encrypter'
import { HashComparer } from '../../cryptography/hash-comparer'
import { UsersRepository } from '../../repositories/users-repository'

interface AuthenticateWithCpfUseCaseRequest {
  cpf: string
  password: string
}

export class AuthenticateWithCpfUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({ cpf, password }: AuthenticateWithCpfUseCaseRequest) {
    const user = await this.usersRepository.findByCpf(cpf)

    if (!user) {
      return left(new InvalidCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return left(new InvalidCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
