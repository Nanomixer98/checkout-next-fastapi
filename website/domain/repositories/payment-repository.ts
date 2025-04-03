import type { Customer } from '../entities/customer';
import type { Payment } from '../entities/payment';
import type { Order } from '../entities/order';

export interface GenericResponse {
  success: boolean;
  orderId: string;
  message?: string;
}

export interface PaymentApiBody {
  amount: number;
  currency: string;
  description: string;
  customer_email: string;
  customer_name: string;
}

export interface PaymentResponse {
  success: boolean;
  message?: string;
  data?: PaymentResult;
}

export interface PaymentResult {
  amount: number;
  currency: string;
  status: string;
  type: null;
  description: null;
  metadata: Metadata;
  id: string;
  created_at: Date;
}

export interface Metadata {}

export interface PaymentRepository {
  processPayment(apiBody: PaymentApiBody): Promise<PaymentResponse>;
  getPaymentStatus(
    customer: Customer,
    payment: Payment,
    order: Order
  ): Promise<GenericResponse>;
  getPayments(
    customer: Customer,
    payment: Payment,
    order: Order
  ): Promise<GenericResponse>;
}
