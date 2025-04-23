import { left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { DestinationNotFoundError } from '@/core/errors/errors/destination-not-found-error'
import { UserNotFoundError } from '@/core/errors/errors/user-not-found-error'
import { DestinationsRepository } from '../repositories/destinations-repository'
import { UsersRepository } from '../repositories/users-repository'

interface EditDestinationUseCaseRequest {
  destinationId: string
  authorId: string

  zipCode: string
  address: string
  addressNumber: number
  neighborhood: string
  city: string
  state: string
  country: string
  addressComplement?: string | null

  customerName: string
  customerPhone?: string | null
  customerEmail?: string | null
}

export class EditDestinationUseCase {
  constructor(
    private destinationsRepository: DestinationsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    destinationId,
    authorId,
    zipCode,
    address,
    addressNumber,
    neighborhood,
    city,
    state,
    country,
    customerName,
    addressComplement = null,
    customerPhone = null,
    customerEmail = null,
  }: EditDestinationUseCaseRequest) {
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

    if (!author.canEditDestinations()) {
      return left(new NotAllowedError())
    }

    destination.zipCode = zipCode
    destination.address = address
    destination.addressNumber = addressNumber
    destination.neighborhood = neighborhood
    destination.city = city
    destination.state = state
    destination.country = country
    destination.addressComplement = addressComplement
    destination.customerName = customerName
    destination.customerPhone = customerPhone
    destination.customerEmail = customerEmail

    await this.destinationsRepository.update(destination)

    return right(null)
  }
}
