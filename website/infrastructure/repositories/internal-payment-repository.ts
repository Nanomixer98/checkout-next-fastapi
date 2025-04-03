import type { Customer } from '../../domain/entities/customer';
import type { Payment } from '../../domain/entities/payment';
import type { Order } from '../../domain/entities/order';
import type {
  PaymentApiBody,
  GenericResponse,
  PaymentRepository,
  PaymentResponse,
} from '../../domain/repositories/payment-repository';
import BackendApi from '../axios/BackendApi';

export class InternalPaymentRepository implements PaymentRepository {
  processPayment(apiBody: PaymentApiBody): Promise<PaymentResponse> {
    return new Promise((resolve) => {
      BackendApi.getInstance()
        .post('/transactions', apiBody)
        .then((response) => {
          resolve({
            success: true,
            data: response.data,
          });
        })
        .catch((error) => {
          console.error('Payment processing error:', error);
          resolve({
            success: false,
            message:
              error instanceof Error
                ? error.message
                : 'Payment processing failed',
          });
        });
    });
  }

  async getPaymentStatus(
    customer: Customer,
    payment: Payment,
    order: Order
  ): Promise<GenericResponse> {
    const id = 1;
    return new Promise((resolve) => {
      BackendApi.getInstance()
        .get(`/transactions/${id}`)
        .then((response) => {
          resolve({
            success: true,
            orderId: response.data.id || '',
            message: 'Payment status retrieved successfully',
          });
        })
        .catch((error) => {
          console.error('Error getting payment status:', error);
          resolve({
            success: false,
            orderId: '',
            message:
              error instanceof Error
                ? error.message
                : 'Failed to get payment status',
          });
        });
    });
  }

  async getPayments(
    customer: Customer,
    payment: Payment,
    order: Order
  ): Promise<GenericResponse> {
    return new Promise((resolve) => {
      BackendApi.getInstance()
        .get('/transactions')
        .then((response) => {
          resolve({
            success: true,
            orderId: '',
            message: 'Payments retrieved successfully',
          });
        })
        .catch((error) => {
          console.error('Error getting payments:', error);
          resolve({
            success: false,
            orderId: '',
            message:
              error instanceof Error ? error.message : 'Failed to get payments',
          });
        });
    });
  }
}
