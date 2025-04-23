import { makeDestination } from 'test/factories/make-destination'
import { makeUser } from 'test/factories/make-user'
import { InMemoryDestinationsRepository } from 'test/repositories/in-memory-destinations-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { EditDestinationUseCase } from './edit-destination'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryDestinationsRepository: InMemoryDestinationsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: EditDestinationUseCase

describe('Edit Destination', () => {
  beforeEach(() => {
    inMemoryDestinationsRepository = new InMemoryDestinationsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new EditDestinationUseCase(
      inMemoryDestinationsRepository,
      inMemoryUsersRepository,
    )
  })

  it('should be able to edit a destination', async () => {
    const admin = await makeUser({ role: 'ADMIN' })

    const destination = await makeDestination({
      city: 'Rio de Janeiro',
    })

    await inMemoryUsersRepository.create(admin)
    await inMemoryDestinationsRepository.create(destination)

    expect(inMemoryDestinationsRepository.items).toHaveLength(1)

    await sut.execute({
      authorId: admin.id.toString(),
      destinationId: destination.id.toString(),

      zipCode: '03132-080',
      address: 'Rua da Esperança',
      addressNumber: 123,
      neighborhood: 'Vila Esperança',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
      addressComplement: 'Apto 123',
      customerName: 'João da Silva',
      customerPhone: '(11) 91234-5678',
    })

    expect(inMemoryDestinationsRepository.items[0]).toMatchObject({
      city: 'São Paulo',
      zipCode: '03132-080',
      customerName: 'João da Silva',
    })
  })

  it('should NOT be able to edit a destination if user is not admin', async () => {
    const admin = await makeUser({ role: 'DELIVERYMAN' })

    const destination = await makeDestination({
      city: 'Rio de Janeiro',
    })

    await inMemoryUsersRepository.create(admin)
    await inMemoryDestinationsRepository.create(destination)

    expect(inMemoryDestinationsRepository.items).toHaveLength(1)

    const result = await sut.execute({
      authorId: admin.id.toString(),
      destinationId: destination.id.toString(),

      zipCode: '03132-080',
      address: 'Rua da Esperança',
      addressNumber: 123,
      neighborhood: 'Vila Esperança',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
      addressComplement: 'Apto 123',
      customerName: 'João da Silva',
      customerPhone: '(11) 91234-5678',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryDestinationsRepository.items[0].city).toEqual(
      'Rio de Janeiro',
    )
  })
})
