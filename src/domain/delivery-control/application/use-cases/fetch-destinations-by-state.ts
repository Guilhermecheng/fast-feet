import { right } from '@/core/either'
import { DestinationsRepository } from '../repositories/destinations-repository'

interface FetchDestinationByStateUseCaseRequest {
  state: string
}

export class FetchDestinationByStateUseCase {
  constructor(private destinationsRepository: DestinationsRepository) {}

  async execute({ state }: FetchDestinationByStateUseCaseRequest) {
    const destinations = await this.destinationsRepository.findManyByState(
      state,
    )

    return right({
      destinations,
    })
  }
}
