import type { Customer } from '../../domain/entities/customer';
import type { Payment } from '../../domain/entities/payment';
import type { Order } from '../../domain/entities/order';
import type {
  PaymentRepository,
  PaymentResult,
} from '../../domain/repositories/payment-repository';

export class ProcessPaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(
    customer: Customer,
    payment: Payment,
    order: Order
  ): Promise<PaymentResult> {
    // Validaciones de negocio
    if (!customer || !payment || !order) {
      console.error('Missing required information for payment processing');
      throw new Error('Missing required information for payment processing');
    }

    if (!payment.isValid()) {
      throw new Error('Invalid payment information');
    }

    if (order.getTotal() <= 0) {
      throw new Error('Order total must be greater than zero');
    }

    // Procesar el pago
    const result = await this.paymentRepository.processPayment(
      customer,
      payment,
      order
    );

    // Actualizar el ID de la orden si el pago fue exitoso
    if (result.success) {
      order.setOrderId(result.orderId);
    }

    return result;
  }
}
