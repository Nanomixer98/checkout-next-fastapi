import type { Customer } from '../entities/customer';
import type { Payment } from '../entities/payment';
import type { Order } from '../entities/order';

export interface PaymentResult {
  success: boolean;
  orderId: string;
  message?: string;
}

export interface PaymentRepository {
  processPayment(
    customer: Customer,
    payment: Payment,
    order: Order
  ): Promise<PaymentResult>;
  getPaymentStatus(
    customer: Customer,
    payment: Payment,
    order: Order
  ): Promise<PaymentResult>;
  getPayments(
    customer: Customer,
    payment: Payment,
    order: Order
  ): Promise<PaymentResult>;
}
