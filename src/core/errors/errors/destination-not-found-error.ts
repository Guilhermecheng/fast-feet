import { UseCaseError } from '@/core/errors/use-case-error'

export class DestinationNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Destination not found')
  }
}
