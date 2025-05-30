import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { CreateOrderUseCase } from './create-order'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: CreateOrderUseCase

describe('Create Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new CreateOrderUseCase(inMemoryOrdersRepository)
  })

  it('should be able to create an order', async () => {
    const result = await sut.execute({
      destinationId: 'destiny',
      authorId: '123',
      userId: 'usuario123',
      state: 'PENDING',
      title: 'Um produto novo',
      quantity: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      order: expect.objectContaining({
        state: 'PENDING',
      }),
    })
  })
})
