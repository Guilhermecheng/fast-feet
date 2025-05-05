import { right } from '@/core/either'
import { DestinationsRepository } from '../../repositories/destinations-repository'

interface FetchDestinationByCityUseCaseRequest {
  city: string
}

export class FetchDestinationByCityUseCase {
  constructor(private destinationsRepository: DestinationsRepository) {}

  async execute({ city }: FetchDestinationByCityUseCaseRequest) {
    const destinations = await this.destinationsRepository.findManyByCity(city)

    return right({
      destinations,
    })
  }
}
