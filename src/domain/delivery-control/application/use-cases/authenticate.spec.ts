import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { AuthenticateWithCpfUseCase } from './authenticate-with-cpf'
import { makeUser } from 'test/factories/make-user'
import { hash } from 'bcryptjs'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateWithCpfUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateWithCpfUseCase(inMemoryUsersRepository)
  })

  it('should be able to authenticate an user with the CPF', async () => {
    const user = await makeUser({
      cpf: '12345678910',
      password_hash: await hash('123456', 6),
    })

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      cpf: user.cpf,
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user,
    })
  })

  it('should be able to authenticate an user with the CPF', async () => {
    const user = await makeUser({
      cpf: '12345678910',
      password_hash: await hash('123456', 6),
    })

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      cpf: user.cpf,
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user,
    })
  })

  it('should NOT be able to authenticate an user with the wrong password', async () => {
    const user = await makeUser({
      cpf: '12345678910',
      password_hash: await hash('123456', 6),
    })

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      cpf: user.cpf,
      password: '1234',
    })

    expect(result.isLeft()).toBe(true)
  })
})
