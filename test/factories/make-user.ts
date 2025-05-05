import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  User,
  UserProps,
} from '@/domain/delivery-control/enterprise/entities/user'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
      cpf: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
      role: 'DELIVERYMAN', // if ADMIN, send trough override
      ...override,
    },
    id,
  )

  return user
}
