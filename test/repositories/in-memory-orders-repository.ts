import { OrdersRepository } from '@/domain/delivery-control/application/repositories/orders-repository'
import { Order } from '@/domain/delivery-control/enterprise/entities/order'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  async create(order: Order) {
    this.items.push(order)
  }
}
