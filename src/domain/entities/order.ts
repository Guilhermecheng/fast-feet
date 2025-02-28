import { randomUUID } from 'node:crypto'

interface OrderProps {
  destinationId: string
  authorId: string

  id?: string
  state?: string
  userId?: string
}

// Admin User
export class Order {
  public id: string
  public authorId: string
  public destinationId: string

  public userId?: string | null
  public state: string

  constructor(props: OrderProps) {
    this.id = props.id ?? randomUUID()

    this.destinationId = props.destinationId
    this.authorId = props.authorId

    this.state = props.state ?? 'PENDING'
    this.userId = props.userId ?? null
  }
}
