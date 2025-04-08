import { makeOrder } from 'test/factories/make-order'
import { makeUser } from 'test/factories/make-user'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { EditOrderUseCase } from './edit-order'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: EditOrderUseCase

describe('Edit Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new EditOrderUseCase(
      inMemoryOrdersRepository,
      inMemoryUsersRepository,
    )
  })

  it("should be able to edit an order's state", async () => {
    const admin = await makeUser({ role: 'ADMIN' })

    const order = await makeOrder({
      authorId: admin.id,
    })

    await inMemoryUsersRepository.create(admin)
    await inMemoryOrdersRepository.create(order)

    await sut.execute({
      authorId: admin.id.toString(),
      orderId: order.id.toString(),

      destinationId: 'new-destination-id',
      userId: order.userId.toString(),
      title: order.title,
      state: 'DELIVERED',
      quantity: order.quantity,
    })

    expect(inMemoryOrdersRepository.items[0].state).toEqual('DELIVERED')
  })

  it("should be able to edit an order's title and quantity", async () => {
    const admin = await makeUser({ role: 'ADMIN' })

    const order = await makeOrder({
      authorId: admin.id,
    })

    await inMemoryUsersRepository.create(admin)
    await inMemoryOrdersRepository.create(order)

    const res = await sut.execute({
      authorId: admin.id.toString(),
      orderId: order.id.toString(),

      destinationId: order.destinationId.toString(),
      userId: order.userId.toString(),
      title: 'new changed title',
      state: order.state,
      quantity: 10,
    })

    expect(inMemoryOrdersRepository.items[0].title).toEqual('new changed title')
    expect(inMemoryOrdersRepository.items[0].quantity).toEqual(10)
  })

  it("should be able to edit an order's user and destiny ids", async () => {
    const admin = await makeUser({ role: 'ADMIN' })

    const order = await makeOrder({
      authorId: admin.id,
    })

    await inMemoryUsersRepository.create(admin)
    await inMemoryOrdersRepository.create(order)

    await sut.execute({
      authorId: admin.id.toString(),
      orderId: order.id.toString(),

      destinationId: 'new-destination-id',
      userId: 'new-user-id',
      title: order.title,
      state: order.state,
      quantity: order.quantity,
    })

    expect(inMemoryOrdersRepository.items[0].destinationId.toString()).toEqual(
      'new-destination-id',
    )
    expect(inMemoryOrdersRepository.items[0].userId.toString()).toEqual(
      'new-user-id',
    )
  })

  it("should be able to set an order's widthdrawn date", async () => {
    const admin = await makeUser({ role: 'ADMIN' })

    const order = await makeOrder({
      authorId: admin.id,
    })

    await inMemoryUsersRepository.create(admin)
    await inMemoryOrdersRepository.create(order)

    await sut.execute({
      authorId: admin.id.toString(),
      orderId: order.id.toString(),

      destinationId: order.destinationId.toString(),
      userId: order.userId.toString(),
      title: order.title,
      state: 'WITHDRAWN',
      widthdrawnDate: new Date('22/03/2025'),
      quantity: order.quantity,
    })

    expect(inMemoryOrdersRepository.items[0].state).toEqual('WITHDRAWN')
    expect(inMemoryOrdersRepository.items[0].widthdrawnDate).toEqual(
      new Date('22/03/2025'),
    )
  })

  it("should be able to set an order's delivered date", async () => {
    const admin = await makeUser({ role: 'ADMIN' })

    const order = await makeOrder({
      authorId: admin.id,
    })

    await inMemoryUsersRepository.create(admin)
    await inMemoryOrdersRepository.create(order)

    await sut.execute({
      authorId: admin.id.toString(),
      orderId: order.id.toString(),

      destinationId: order.destinationId.toString(),
      userId: order.userId.toString(),
      title: order.title,
      state: 'DELIVERED',
      deliveryDate: new Date('22/04/2025'),
      quantity: order.quantity,
    })

    expect(inMemoryOrdersRepository.items[0].state).toEqual('DELIVERED')
    expect(inMemoryOrdersRepository.items[0].deliveryDate).toEqual(
      new Date('22/04/2025'),
    )
  })

  it('should NOT be able to edit an order if user is not admiin', async () => {
    const admin = await makeUser({ role: 'DELIVERYMAN' })

    const order = await makeOrder({
      authorId: admin.id,
    })

    await inMemoryUsersRepository.create(admin)
    await inMemoryOrdersRepository.create(order)

    expect(inMemoryOrdersRepository.items).toHaveLength(1)

    const result = await sut.execute({
      authorId: admin.id.toString(),
      orderId: order.id.toString(),

      destinationId: 'new-destination-id',
      userId: order.userId.toString(),
      title: order.title,
      state: 'DELIVERED',
      quantity: order.quantity,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryOrdersRepository.items[0].state).toEqual('PENDING')
  })
})
