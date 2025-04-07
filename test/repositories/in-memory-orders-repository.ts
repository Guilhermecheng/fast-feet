import { OrdersRepository } from '@/domain/delivery-control/application/repositories/orders-repository'
import { Order } from '@/domain/delivery-control/enterprise/entities/order'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  async create(order: Order) {
    this.items.push(order)
  }

  async delete(order: Order) {
    const orderIndex = this.items.findIndex((item) => item.id === order.id)

    if (orderIndex !== -1) {
      this.items.splice(orderIndex, 1)
    }
  }

  async findById(id: string): Promise<Order | null> {
    const order = this.items.find((item) => item.id.toString() === id)

    if (!order) {
      return null
    }

    return order
  }
}
