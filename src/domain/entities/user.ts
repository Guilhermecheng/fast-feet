import { randomUUID } from 'node:crypto'

// normal Delivery Man
export class User {
  public id: string
  public name: string
  public cpf: string
  public password: string

  constructor(name: string, cpf: string, password: string, id?: string) {
    this.id = id ?? randomUUID()
    this.name = name
    this.cpf = cpf
    this.password = password
  }
}
