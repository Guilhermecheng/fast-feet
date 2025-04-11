import { InMemoryDestinationsRepository } from 'test/repositories/in-memory-destinations-repository'
import { CreateDestinationUseCase } from './create-destination'

let inMemoryDestinationsRepository: InMemoryDestinationsRepository
let sut: CreateDestinationUseCase

describe('Create Destination', () => {
  beforeEach(() => {
    inMemoryDestinationsRepository = new InMemoryDestinationsRepository()
    sut = new CreateDestinationUseCase(inMemoryDestinationsRepository)
  })

  it('should be able to create a destination', async () => {
    const result = await sut.execute({
      zipCode: '03040-123',
      address: 'Rua Vergueiro',
      addressNumber: 123,
      neighborhood: 'Ipiranga',
      city: 'São Paulo',
      state: 'São Paulo',
      country: 'Brasil',
      addressComplement: 'apto 321',
      customerName: 'Guilherme',
      customerPhone: '11 1231 3455',
      customerEmail: 'teste email@teste.com',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      destination: expect.objectContaining({
        address: 'Rua Vergueiro',
        neighborhood: 'Ipiranga',
      }),
    })
  })
})
