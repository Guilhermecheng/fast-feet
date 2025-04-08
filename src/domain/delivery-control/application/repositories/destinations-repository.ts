import { Destination } from '../../enterprise/entities/destination'

export interface DestinationsRepository {
  create(destination: Destination): Promise<void>
  // delete(destination: Destination): Promise<void>
  // save(destination: Destination): Promise<void>

  // findById(id: string): Promise<Destination | null>
  // findManyRecent(): Promise<Destination[]>
  // findManyOlder(): Promise<Destination[]>
}
