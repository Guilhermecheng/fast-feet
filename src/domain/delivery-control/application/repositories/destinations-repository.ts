import { Destination } from '../../enterprise/entities/destination'

export interface DestinationsRepository {
  create(destination: Destination): Promise<void>
  delete(destination: Destination): Promise<void>
  update(destination: Destination): Promise<void>

  findById(id: string): Promise<Destination | null>

  findManyByCity(city: string): Promise<Destination[]>
  findManyByState(state: string): Promise<Destination[]>

  // findManyByCustomerName(customerName: string): Promise<Destination[]>
}
