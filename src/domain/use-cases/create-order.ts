import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '../entities/order'
import { OrdersRepository } from '../repositories/orders-repository'

interface CreateOrderUseCaseRequest {
  destinationId: string
  authorId: string
  userId: string
  state: string
}

export class CreateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    destinationId,
    authorId,
    userId,
    state,
  }: CreateOrderUseCaseRequest) {
    const order = Order.create({
      destinationId: new UniqueEntityID(destinationId),
      authorId: new UniqueEntityID(authorId),
      userId: new UniqueEntityID(userId),
      state,
    })

    await this.ordersRepository.create(order)

    return order
  }
}
