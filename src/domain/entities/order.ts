import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface OrderProps {
  destinationId: UniqueEntityID
  authorId: UniqueEntityID
  userId: UniqueEntityID

  state: string
  createdAt: Date
  updatedAt?: Date
}

// Admin User
export class Order extends Entity<OrderProps> {
  get destinationId() {
    return this.props.destinationId
  }

  get authorId() {
    return this.props.authorId
  }

  get userId() {
    return this.props.userId
  }

  get state() {
    return this.props.state
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<OrderProps, 'createdAt'>, id?: UniqueEntityID) {
    const order = new Order(
      {
        ...props,
        createdAt: new Date(),
      },
      id?.toString(),
    )

    return order
  }
}
