import type { Customer } from '../../domain/entities/customer';
import type { Payment } from '../../domain/entities/payment';
import type { Order } from '../../domain/entities/order';
import type {
  PaymentApiBody,
  PaymentRepository,
  PaymentResponse,
} from '../../domain/repositories/payment-repository';

export class ProcessPaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(
    customer: Customer,
    payment: Payment,
    order: Order
  ): Promise<PaymentResponse> {
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

    const apiBody: PaymentApiBody = {
      amount: order.getTotal(),
      currency: 'USD',
      description: 'Payment for order',
      customer_email: customer.getEmail(),
      customer_name: customer.getFullName(),
    };

    // Procesar el pago
    const result = await this.paymentRepository.processPayment(apiBody);

    // Actualizar el ID de la orden si el pago fue exitoso
    if (result.success && !!result.data) {
      order.setOrderId(result.data.id);
      return result;
    }

    throw new Error(result.message);
  }
}
