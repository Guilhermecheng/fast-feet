import { randomUUID } from 'node:crypto'

// Delivery Address
export class ReceiverAddress {
  public id: string
  public address: string

  constructor(address: string, id?: string) {
    this.id = id ?? randomUUID()
    this.address = address
  }
}
