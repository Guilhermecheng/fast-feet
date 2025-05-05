import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makeOrder } from 'test/factories/make-order'
import { makeUser } from 'test/factories/make-user'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { DeleteOrderUseCase } from './delete-order'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: DeleteOrderUseCase

describe('Delete Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new DeleteOrderUseCase(
      inMemoryOrdersRepository,
      inMemoryUsersRepository,
    )
  })

  it('should be able to delete an order', async () => {
    const admin = await makeUser({ role: 'ADMIN' })

    const order = await makeOrder({
      state: 'PENDING',
      title: 'Um produto novo',
      quantity: 2,
      authorId: admin.id,
    })

    await inMemoryUsersRepository.create(admin)
    await inMemoryOrdersRepository.create(order)

    expect(inMemoryOrdersRepository.items).toHaveLength(1)

    await sut.execute({
      authorId: admin.id.toString(),
      orderId: order.id.toString(),
    })

    expect(inMemoryOrdersRepository.items).toHaveLength(0)
  })

  it('should NOT be able to delete an order if user role is DELIVERYMAN', async () => {
    const author = await makeUser({ role: 'DELIVERYMAN' })

    const order = await makeOrder({
      state: 'PENDING',
      title: 'Um produto novo',
      quantity: 2,
      authorId: author.id,
    })

    await inMemoryUsersRepository.create(author)
    await inMemoryOrdersRepository.create(order)

    expect(inMemoryOrdersRepository.items).toHaveLength(1)

    const result = await sut.execute({
      authorId: author.id.toString(),
      orderId: order.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryOrdersRepository.items).toHaveLength(1)
  })
})
