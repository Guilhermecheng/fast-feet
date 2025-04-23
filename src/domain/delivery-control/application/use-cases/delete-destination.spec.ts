import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makeDestination } from 'test/factories/make-destination'
import { makeUser } from 'test/factories/make-user'
import { InMemoryDestinationsRepository } from 'test/repositories/in-memory-destinations-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { DeleteDestinationUseCase } from './delete-destination'

let inMemoryDestinationsRepository: InMemoryDestinationsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: DeleteDestinationUseCase

describe('Delete Destination', () => {
  beforeEach(() => {
    inMemoryDestinationsRepository = new InMemoryDestinationsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new DeleteDestinationUseCase(
      inMemoryDestinationsRepository,
      inMemoryUsersRepository,
    )
  })

  it('should be able to delete an destination', async () => {
    const admin = await makeUser({ role: 'ADMIN' })

    const destination = await makeDestination({
      city: 'São Paulo',
    })

    await inMemoryUsersRepository.create(admin)
    await inMemoryDestinationsRepository.create(destination)

    expect(inMemoryDestinationsRepository.items).toHaveLength(1)

    await sut.execute({
      authorId: admin.id.toString(),
      destinationId: destination.id.toString(),
    })

    expect(inMemoryDestinationsRepository.items).toHaveLength(0)
  })

  it('should NOT be able to delete an destination if user role is DELIVERYMAN', async () => {
    const author = await makeUser({ role: 'DELIVERYMAN' })

    const destination = await makeDestination({
      city: 'São Paulo',
    })

    await inMemoryUsersRepository.create(author)
    await inMemoryDestinationsRepository.create(destination)

    expect(inMemoryDestinationsRepository.items).toHaveLength(1)

    const result = await sut.execute({
      authorId: author.id.toString(),
      destinationId: destination.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryDestinationsRepository.items).toHaveLength(1)
  })
})
