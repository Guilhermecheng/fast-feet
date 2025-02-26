interface DeliverDeliveryUseCaseProps {
  user: string
  receiverAddress: string
}

export class DeliverDeliveryUseCase {
  execute({ user, receiverAddress }: DeliverDeliveryUseCaseProps) {}
}
