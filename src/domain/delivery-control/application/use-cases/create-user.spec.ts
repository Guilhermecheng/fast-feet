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
    const user = await sut.execute({
      cpf: '12345678910',
      email: 'guilherme@testeemail.com',
      password: '123456',
      name: 'Guilherme',
      role: 'DELIVERYMAN',
    })

    expect(inMemoryUsersRepository.items[0].name).toEqual('Guilherme')
    expect(user.email).toEqual('guilherme@testeemail.com')
    expect(user.id).toBeTruthy()
  })

  it('should be able to create an user with an ADMIN role ', async () => {
    const user = await sut.execute({
      cpf: '12345678910',
      email: 'guilherme@testeemail.com',
      password: '123456',
      name: 'Guilherme',
      role: 'ADMIN',
    })

    expect(inMemoryUsersRepository.items[0].name).toEqual('Guilherme')
    expect(user.id).toBeTruthy()
    expect(user.role).toEqual('ADMIN')
  })

  it('should be able to create an user with a DELIVERYMAN role ', async () => {
    const user = await sut.execute({
      cpf: '12345678910',
      email: 'guilherme_entregador@testeemail2.com',
      password: '321654',
      name: 'Guilherme Entregador',
      role: 'DELIVERYMAN',
    })

    expect(inMemoryUsersRepository.items[0].name).toEqual(
      'Guilherme Entregador',
    )
    expect(user.id).toBeTruthy()
    expect(user.role).toEqual('DELIVERYMAN')
  })

  it('should NOT be able to create an user with any other type of role', async () => {
    await expect(() =>
      sut.execute({
        cpf: '12345678910',
        email: 'guilherme_entregador@testeemail2.com',
        password: '321654',
        name: 'Guilherme Entregador',
        role: 'EXAMPLE_ROLE',
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })

  it('should NOT be able to create other user with the same email', async () => {
    await sut.execute({
      cpf: '12345678910',
      email: 'guilherme_entregador@testeemail2.com',
      password: '321654',
      name: 'Guilherme Entregador',
      role: 'DELIVERYMAN',
    })

    await expect(() =>
      sut.execute({
        cpf: '12345678910',
        email: 'guilherme_entregador@testeemail2.com',
        password: '321654',
        name: 'Guilherme Admin',
        role: 'ADMIN',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should NOT be able to create other user with the same CPF', async () => {
    await sut.execute({
      cpf: '12345678910',
      email: 'guilherme_entregador@testeemail2.com',
      password: '321654',
      name: 'Guilherme 1',
      role: 'DELIVERYMAN',
    })

    await expect(() =>
      sut.execute({
        cpf: '12345678910',
        email: 'guilherme_teste2@teste.com',
        password: '321654',
        name: 'Guilherme 2',
        role: 'ADMIN',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
