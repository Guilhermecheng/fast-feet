import { left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { OrderNotFoundError } from '@/core/errors/errors/order-not-found-error'
import { UserNotFoundError } from '@/core/errors/errors/user-not-found-error'
import { OrdersRepository } from '../../repositories/orders-repository'
import { UsersRepository } from '../../repositories/users-repository'

interface EditOrderUseCaseRequest {
  orderId: string
  authorId: string

  destinationId: string
  userId: string

  title: string
  state: string
  quantity: number

  widthdrawnDate?: Date | null
  deliveryDate?: Date | null
}

export class EditOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    orderId,
    authorId,
    destinationId,
    userId,
    title,
    state,
    quantity,
    deliveryDate = null,
    widthdrawnDate = null,
  }: EditOrderUseCaseRequest) {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return left(new OrderNotFoundError())
    }

    const author = await this.usersRepository.findById(authorId)

    if (!author) {
      return left(new UserNotFoundError())
    }

    if (!author.canEditOrders()) {
      return left(new NotAllowedError())
    }

    order.userId = new UniqueEntityID(userId)
    order.destinationId = new UniqueEntityID(destinationId)
    order.title = title
    order.state = state
    order.quantity = quantity

    order.deliveryDate = deliveryDate
    order.widthdrawnDate = widthdrawnDate

    await this.ordersRepository.update(order)

    return right(null)
  }
}
