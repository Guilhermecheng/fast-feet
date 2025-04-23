import { DestinationsRepository } from '@/domain/delivery-control/application/repositories/destinations-repository'
import { Destination } from '@/domain/delivery-control/enterprise/entities/destination'

export class InMemoryDestinationsRepository implements DestinationsRepository {
  public items: Destination[] = []

  async create(destination: Destination) {
    this.items.push(destination)
  }

  async delete(destination: Destination) {
    const destinationIndex = this.items.findIndex(
      (item) => item.id.toString() === destination.id.toString(),
    )
    if (destinationIndex !== -1) {
      this.items.splice(destinationIndex, 1)
    }
  }

  async findById(id: string) {
    const destination = this.items.find((item) => item.id.toString() === id)

    if (!destination) {
      return null
    }

    return destination
  }

  async findManyByCity(city: string) {
    const destinations = this.items.filter((item) => item.city === city)

    return destinations
  }

  async findManyByState(state: string) {
    const destinations = this.items.filter((item) => item.state === state)

    return destinations
  }
}
