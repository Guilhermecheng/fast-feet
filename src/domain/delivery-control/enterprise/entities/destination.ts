import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface DestinationProps {
  address: string
  createdAt: Date
}

export class Destination extends Entity<DestinationProps> {
  get address() {
    return this.props.address
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<DestinationProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const destination = new Destination(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return destination
  }
}
