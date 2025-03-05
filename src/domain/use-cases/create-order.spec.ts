import { CreateOrderUseCase } from './create-order'
import { OrdersRepository } from '../repositories/orders-repository'
import { Order } from '../entities/order'

const fakeOrdersRepository: OrdersRepository = {
  create: async (order: Order) => {
    return
  },
}

test('create an order', async () => {
  const createOrder = new CreateOrderUseCase(fakeOrdersRepository)

  const order = await createOrder.execute({
    destinationId: 'destiny',
    authorId: '123',
    userId: 'usuario123',
    state: 'PENDING',
  })

  expect(order.state).toEqual('PENDING')
})
