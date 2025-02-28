import { randomUUID } from 'node:crypto'

interface UserProps {
  name: string
  cpf: string
  password: string

  id?: string
  role?: 'ADMIN' | 'DELIVERYMAN'
}

// normal Delivery Man
export class User {
  public id: string
  public name: string
  public cpf: string
  public password: string
  public role: 'ADMIN' | 'DELIVERYMAN'

  constructor(props: UserProps) {
    this.name = props.name
    this.cpf = props.cpf
    this.password = props.password

    this.id = props.id ?? randomUUID()
    this.role = props.role ?? 'DELIVERYMAN'
  }
}
