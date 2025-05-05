import { InMemoryDestinationsRepository } from 'test/repositories/in-memory-destinations-repository'
import { FetchDestinationByStateUseCase } from './fetch-destinations-by-state'
import { makeDestination } from 'test/factories/make-destination'

let inMemoryDestinationsRepository: InMemoryDestinationsRepository
let sut: FetchDestinationByStateUseCase

describe('Fetch Destinations by State', () => {
  beforeEach(() => {
    inMemoryDestinationsRepository = new InMemoryDestinationsRepository()
    sut = new FetchDestinationByStateUseCase(inMemoryDestinationsRepository)
  })

  it('should be able to fetch all destinations in a state', async () => {
    const destination1 = await makeDestination({
      state: 'Paraná',
    })
    const destination2 = await makeDestination({
      state: 'Paraná',
    })
    const destination3 = await makeDestination({
      state: 'São Paulo',
    })

    const destination4 = await makeDestination({
      state: 'Rio de Janeiro',
    })

    await inMemoryDestinationsRepository.create(destination1)
    await inMemoryDestinationsRepository.create(destination2)
    await inMemoryDestinationsRepository.create(destination3)
    await inMemoryDestinationsRepository.create(destination4)

    const result = await sut.execute({
      state: 'Paraná',
    })

    expect(result.isRight()).toBe(true)
    //@ts-ignore
    expect(result.value?.destinations).toHaveLength(2)
  })

  it('should not be able to fetch a destination from another state', async () => {
    const destination = await makeDestination({
      state: 'Rio de Janeiro',
    })

    await inMemoryDestinationsRepository.create(destination)

    const result = await sut.execute({
      state: 'São Paulo',
    })

    expect(result.isRight()).toBe(true)
    //@ts-ignore
    expect(result.value?.destinations).toHaveLength(0)
  })
})
