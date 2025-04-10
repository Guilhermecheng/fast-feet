import { UseCaseError } from '@/core/errors/use-case-error'

export class OrderNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Order not found')
  }
}
