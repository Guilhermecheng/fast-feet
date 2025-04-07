import { right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '../../enterprise/entities/order'
import { OrdersRepository } from '../repositories/orders-repository'

interface CreateOrderUseCaseRequest {
  destinationId: string
  authorId: string
  userId: string
  state: string

  title: string
  quantity: number
}

export class CreateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    destinationId,
    authorId,
    userId,
    state,
    title,
    quantity,
  }: CreateOrderUseCaseRequest) {
    const order = Order.create({
      destinationId: new UniqueEntityID(destinationId),
      authorId: new UniqueEntityID(authorId),
      userId: new UniqueEntityID(userId),
      state,

      title,
      quantity,
    })

    await this.ordersRepository.create(order)

    return right({
      order,
    })
  }
}
