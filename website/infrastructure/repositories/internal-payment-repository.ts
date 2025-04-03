import type { Customer } from '../../domain/entities/customer';
import type { Payment } from '../../domain/entities/payment';
import type { Order } from '../../domain/entities/order';
import type {
  PaymentRepository,
  PaymentResult,
} from '../../domain/repositories/payment-repository';
import BackendApi from '../axios/BackendApi';

export class InternalPaymentRepository implements PaymentRepository {
  async processPayment(
    customer: Customer,
    payment: Payment,
    order: Order
  ): Promise<PaymentResult> {
    return new Promise((resolve) => {
      BackendApi.getInstance()
        .post('/transactions', {
          params: {
            email: customer.getEmail(),
            paymentInfo: payment.getInfo(),
            orderTotal: order.getTotal(),
          },
        })
        .then((response) => {
          console.log(response);
          resolve({
            success: true,
            orderId: '',
          });
        });
    });
  }

  async getPaymentStatus(
    customer: Customer,
    payment: Payment,
    order: Order
  ): Promise<PaymentResult> {
    return new Promise((resolve) => {
      const id = 1;
      BackendApi.getInstance()
        .get(`/transactions/${id}`, {
          params: {
            email: customer.getEmail(),
            paymentInfo: payment.getInfo(),
            orderTotal: order.getTotal(),
          },
        })
        .then((response) => {
          console.log(response);
          resolve({
            success: true,
            orderId: '',
          });
        });
    });
  }

  getPayments(
    customer: Customer,
    payment: Payment,
    order: Order
  ): Promise<PaymentResult> {
    return new Promise((resolve) => {
      const id = BackendApi.getInstance()
        .get('/transactions/', {
          params: {
            email: customer.getEmail(),
            paymentInfo: payment.getInfo(),
            orderTotal: order.getTotal(),
          },
        })
        .then((response) => {
          console.log(response);
          resolve({
            success: true,
            orderId: '',
          });
        });
    });
  }
}
