import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface DestinationProps {
  zipCode: string
  address: string
  addressNumber: number
  neighborhood: string
  city: string
  state: string
  country: string
  addressComplement?: string

  customerName: string
  customerPhone?: string
  customerEmail?: string

  createdAt: Date
}

export class Destination extends Entity<DestinationProps> {
  get zipCode() {
    return this.props.zipCode
  }

  get address() {
    return this.props.address
  }

  get addressNumber() {
    return this.props.addressNumber
  }

  get neighborhood() {
    return this.props.neighborhood
  }

  get city() {
    return this.props.city
  }

  get state() {
    return this.props.state
  }

  get country() {
    return this.props.country
  }

  get addressComplement() {
    return this.props.addressComplement
  }

  get customerName() {
    return this.props.customerName
  }

  get customerPhone() {
    return this.props.customerPhone
  }

  get customerEmail() {
    return this.props.customerEmail
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
