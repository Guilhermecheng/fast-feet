import { randomUUID } from 'node:crypto'

// Admin User
export class Admin {
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
