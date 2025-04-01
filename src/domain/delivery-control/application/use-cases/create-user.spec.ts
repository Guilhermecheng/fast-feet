import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'

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
      role: 'ADMIN',
    })

    expect(inMemoryUsersRepository.items[0].name).toEqual('Guilherme')
    expect(user.email).toEqual('guilherme@testeemail.com')
    expect(user.id).toBeTruthy()
  })
})
