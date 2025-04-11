import { InMemoryDestinationsRepository } from 'test/repositories/in-memory-destinations-repository'
import { FetchDestinationByCityUseCase } from './fetch-destinations-by-city'
import { makeDestination } from 'test/factories/make-destination'

let inMemoryDestinationsRepository: InMemoryDestinationsRepository
let sut: FetchDestinationByCityUseCase

describe('Fetch Destinations by City', () => {
  beforeEach(() => {
    inMemoryDestinationsRepository = new InMemoryDestinationsRepository()
    sut = new FetchDestinationByCityUseCase(inMemoryDestinationsRepository)
  })

  it('should be able to fetch all destinations in a city', async () => {
    const destination1 = await makeDestination({
      city: 'São Paulo',
    })
    const destination2 = await makeDestination({
      city: 'São Paulo',
    })
    const destination3 = await makeDestination({
      city: 'São Paulo',
    })

    const destination4 = await makeDestination({
      city: 'Rio de Janeiro',
    })

    await inMemoryDestinationsRepository.create(destination1)
    await inMemoryDestinationsRepository.create(destination2)
    await inMemoryDestinationsRepository.create(destination3)
    await inMemoryDestinationsRepository.create(destination4)

    const result = await sut.execute({
      city: 'São Paulo',
    })

    console.log(result.value)
    expect(result.isRight()).toBe(true)
    //@ts-ignore
    expect(result.value?.destinations).toHaveLength(3)
  })
})
