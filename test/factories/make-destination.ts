import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Destination,
  DestinationProps,
} from '@/domain/delivery-control/enterprise/entities/destination'

export function makeDestination(
  overrride: Partial<DestinationProps> = {},
  id?: UniqueEntityID,
) {
  const destination = Destination.create(
    {
      zipCode: faker.location.zipCode(),
      address: faker.location.streetAddress(),
      addressNumber: Math.random() * 1000,
      neighborhood: 'Itaim bibi',
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),

      customerName: faker.person.fullName(),
      customerPhone: faker.phone.number(),
      customerEmail: faker.internet.email(),

      createdAt: new Date(),

      ...overrride,
    },
    id,
  )

  return destination
}
