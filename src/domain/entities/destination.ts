import { randomUUID } from 'node:crypto'

interface DestinationProps {
  address: string
  id?: string
}
export class Destination {
  public id: string
  public address: string

  constructor(props: DestinationProps) {
    this.id = props.id ?? randomUUID()
    this.address = props.address
  }
}
