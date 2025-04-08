import { right } from '@/core/either'
import { Destination } from '../../enterprise/entities/destination'
import { DestinationsRepository } from '../repositories/destinations-repository'

interface CreateDestinationUseCaseRequest {
  zipCode: string
  address: string
  addressNumber: number
  neighborhood: string
  city: string
  state: string
  country: string
  addressComplement?: string

  customerName: string
  customerPhone?: string
  customerEmail?: string
}

export class CreateDestinationUseCase {
  constructor(private destinationsRepository: DestinationsRepository) {}

  async execute({
    zipCode,
    address,
    addressNumber,
    neighborhood,
    city,
    state,
    country,
    addressComplement,
    customerName,
    customerPhone,
    customerEmail,
  }: CreateDestinationUseCaseRequest) {
    const destination = Destination.create({
      zipCode,
      address,
      addressNumber,
      neighborhood,
      city,
      state,
      country,
      addressComplement,
      customerName,
      customerPhone,
      customerEmail,
    })

    await this.destinationsRepository.create(destination)

    return right({
      destination,
    })
  }
}
