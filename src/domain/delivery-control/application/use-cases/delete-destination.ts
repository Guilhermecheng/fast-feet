import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { UserNotFoundError } from '@/core/errors/errors/user-not-found-error'
import { DestinationsRepository } from '../repositories/destinations-repository'
import { UsersRepository } from '../repositories/users-repository'
import { DestinationNotFoundError } from '@/core/errors/errors/destination-not-found-error'

interface DeleteDestinationUseCaseRequest {
  authorId: string
  destinationId: string
}

type DeleteDestinationUseCaseResponse = Either<NotAllowedError, null>

export class DeleteDestinationUseCase {
  constructor(
    private destinationsRepository: DestinationsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    authorId,
    destinationId,
  }: DeleteDestinationUseCaseRequest): Promise<DeleteDestinationUseCaseResponse> {
    const destination = await this.destinationsRepository.findById(
      destinationId,
    )

    if (!destination) {
      return left(new DestinationNotFoundError())
    }

    const author = await this.usersRepository.findById(authorId)

    if (!author) {
      return left(new UserNotFoundError())
    }

    if (!author.canDeleteDestinations()) {
      return left(new NotAllowedError())
    }

    await this.destinationsRepository.delete(destination)

    return right(null)
  }
}
