import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface DestinationProps {
  zipCode: string
  address: string
  addressNumber: number
  neighborhood: string
  city: string
  state: string
  country: string
  addressComplement?: string | null

  customerName: string
  customerPhone?: string | null
  customerEmail?: string | null

  createdAt: Date
  updatedAt?: Date
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

  get addressComplement(): string | null {
    if (this.props.addressComplement) {
      return this.props.addressComplement
    }

    return null
  }

  get customerName() {
    return this.props.customerName
  }

  get customerPhone(): string | null {
    if (this.props.customerPhone) {
      return this.props.customerPhone
    }

    return null
  }

  get customerEmail(): string | null {
    if (this.props.customerEmail) {
      return this.props.customerEmail
    }

    return null
  }

  get createdAt() {
    return this.props.createdAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set zipCode(zipCode: string) {
    this.props.zipCode = zipCode
    this.touch()
  }

  set address(address: string) {
    this.props.address = address
    this.touch()
  }

  set addressNumber(addressNumber: number) {
    this.props.addressNumber = addressNumber
    this.touch()
  }

  set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood
    this.touch()
  }

  set city(city: string) {
    this.props.city = city
    this.touch()
  }

  set state(state: string) {
    this.props.state = state
    this.touch()
  }

  set country(country: string) {
    this.props.country = country
    this.touch()
  }

  set addressComplement(addressComplement: string | null) {
    this.props.addressComplement = addressComplement
    this.touch()
  }

  set customerName(customerName: string) {
    this.props.customerName = customerName
    this.touch()
  }

  set customerPhone(customerPhone: string | null) {
    this.props.customerPhone = customerPhone
    this.touch()
  }

  set customerEmail(customerEmail: string | null) {
    this.props.customerEmail = customerEmail
    this.touch()
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
