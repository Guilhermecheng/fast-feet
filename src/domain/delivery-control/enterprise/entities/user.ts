import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface UserProps {
  createdAt: Date
  updatedAt?: Date

  name: string
  cpf: string
  email: string
  password: string

  role: string // 'ADMIN' | 'DELIVERYMAN'
}

// normal Delivery Man
export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get cpf() {
    return this.props.cpf
  }

  get role() {
    return this.props.role
  }

  get createdAt() {
    return this.props.createdAt
  }

  get password() {
    return this.props.password
  }

  canEditOrders(): boolean {
    return this.role === 'ADMIN'
  }

  canDeleteOrders(): boolean {
    return this.role === 'ADMIN'
  }

  canEditDestinations(): boolean {
    return this.role === 'ADMIN'
  }

  canDeleteDestinations(): boolean {
    return this.role === 'ADMIN'
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return user
  }
}
