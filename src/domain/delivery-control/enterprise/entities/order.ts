import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface OrderProps {
  destinationId: UniqueEntityID
  authorId: UniqueEntityID
  userId: UniqueEntityID

  state: string
  createdAt: Date
  updatedAt?: Date

  title: string
  quantity: number
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

  get title() {
    return this.props.title
  }

  get quantity() {
    return this.props.quantity
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set userId(userId: UniqueEntityID) {
    this.props.userId = userId
    this.touch()
  }

  set destinationId(destinationId: UniqueEntityID) {
    this.props.destinationId = destinationId
    this.touch()
  }

  set title(title: string) {
    this.props.title = title
    this.touch()
  }

  set state(state: string) {
    this.props.state = state
    this.touch()
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity
    this.touch()
  }

  static create(props: Optional<OrderProps, 'createdAt'>, id?: UniqueEntityID) {
    const order = new Order(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return order
  }
}
