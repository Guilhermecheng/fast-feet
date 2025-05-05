import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { UserAlreadyExistsError } from '@/core/errors/errors/user-already-exists'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to create an user', async () => {
    const result = await sut.execute({
      cpf: '12345678910',
      email: 'guilherme@testeemail.com',
      password: '123456',
      name: 'Guilherme',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[0],
    })
    expect(inMemoryUsersRepository.items[0].role).toEqual('DELIVERYMAN')
  })

  it('should be able to create an user with an ADMIN role ', async () => {
    const result = await sut.execute({
      cpf: '12345678910',
      email: 'guilherme@testeemail.com',
      password: '123456',
      name: 'Guilherme',
      role: 'ADMIN',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: expect.objectContaining({
        role: 'ADMIN',
      }),
    })
  })

  it("should be able to hash the user's password", async () => {
    const result = await sut.execute({
      cpf: '12345678910',
      email: 'guilherme@testeemail.com',
      password: '123456',
      name: 'Guilherme',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[0],
    })
    expect(inMemoryUsersRepository.items[0].password_hash).not.toEqual('123456')
  })

  it('should NOT be able to create an user with any other type of role', async () => {
    const result = await sut.execute({
      cpf: '12345678910',
      email: 'guilherme_entregador@testeemail2.com',
      password: '321654',
      name: 'Guilherme Entregador',

      //@ts-ignore
      role: 'EXAMPLE_ROLE',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should NOT be able to create other user with the same email', async () => {
    await sut.execute({
      cpf: '12345678910',
      email: 'guilherme_entregador@testeemail2.com',
      password: '321654',
      name: 'Guilherme Entregador',
      role: 'DELIVERYMAN',
    })

    const result = await sut.execute({
      cpf: '12345678910',
      email: 'guilherme_entregador@testeemail2.com',
      password: '321654',
      name: 'Guilherme Admin',
      role: 'ADMIN',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should NOT be able to create other user with the same CPF', async () => {
    await sut.execute({
      cpf: '12345678910',
      email: 'guilherme_entregador@testeemail2.com',
      password: '321654',
      name: 'Guilherme 1',
      role: 'DELIVERYMAN',
    })

    const result = await sut.execute({
      cpf: '12345678910',
      email: 'guilherme_teste2@teste.com',
      password: '321654',
      name: 'Guilherme 2',
      role: 'ADMIN',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })
})
