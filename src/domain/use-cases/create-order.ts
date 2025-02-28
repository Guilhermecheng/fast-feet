import { Order } from '../entities/order'
import { OrdersRepository } from '../repositories/orders-repository'

interface CreateOrderUseCaseRequest {
  destinationId: string
  authorId: string
  state: string
}

export class CreateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({ destinationId, authorId, state }: CreateOrderUseCaseRequest) {
    const order = new Order({
      destinationId,
      authorId,
      state,
    })

    await this.ordersRepository.create(order)

    return order
  }
}
