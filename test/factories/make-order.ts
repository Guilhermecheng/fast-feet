import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Order,
  OrderProps,
} from '@/domain/delivery-control/enterprise/entities/order'

export function makeOrder(
  overrride: Partial<OrderProps> = {},
  id?: UniqueEntityID,
) {
  const order = Order.create(
    {
      destinationId: new UniqueEntityID(),
      authorId: new UniqueEntityID(),
      userId: new UniqueEntityID(),
      state: 'PENDING',

      title: faker.commerce.productName(),
      quantity: Math.round(Math.random() * 20),

      ...overrride,
    },
    id,
  )

  return order
}
