import { Order } from '../../enterprise/entities/order'

export interface OrdersRepository {
  create(order: Order): Promise<void>
  delete(order: Order): Promise<void>
  // save(order: Order): Promise<void>

  findById(id: string): Promise<Order | null>
  // findManyRecent(): Promise<Order[]>
  // findManyOlder(): Promise<Order[]>
}
