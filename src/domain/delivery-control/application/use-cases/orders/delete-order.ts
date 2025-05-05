import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { OrderNotFoundError } from '@/core/errors/errors/order-not-found-error'
import { UserNotFoundError } from '@/core/errors/errors/user-not-found-error'
import { OrdersRepository } from '../../repositories/orders-repository'
import { UsersRepository } from '../../repositories/users-repository'

interface DeleteOrderUseCaseRequest {
  authorId: string
  orderId: string
}

type DeleteOrderUseCaseResponse = Either<NotAllowedError, null>

export class DeleteOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    authorId,
    orderId,
  }: DeleteOrderUseCaseRequest): Promise<DeleteOrderUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return left(new OrderNotFoundError())
    }

    const author = await this.usersRepository.findById(authorId)

    if (!author) {
      return left(new UserNotFoundError())
    }

    if (!author.canDeleteOrders()) {
      return left(new NotAllowedError())
    }

    await this.ordersRepository.delete(order)

    return right(null)
  }
}
