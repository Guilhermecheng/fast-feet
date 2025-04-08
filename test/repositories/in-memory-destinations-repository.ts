import { DestinationsRepository } from '@/domain/delivery-control/application/repositories/destinations-repository'
import { Destination } from '@/domain/delivery-control/enterprise/entities/destination'

export class InMemoryDestinationsRepository implements DestinationsRepository {
  public items: Destination[] = []

  async create(destination: Destination) {
    this.items.push(destination)
  }
}
