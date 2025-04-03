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
        .get('/payments', {
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
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     // Simulamos un pago exitoso (95% de las veces)
    //     if (Math.random() > 0.05) {
    //       const orderId = `ORD-${Date.now()}-${Math.floor(
    //         Math.random() * 1000
    //       )}`;
    //       resolve({
    //         success: true,
    //         orderId: orderId,
    //       });
    //     } else {
    //       // Simulamos un fallo en el pago (5% de las veces)
    //       reject(new Error('Payment processing failed. Please try again.'));
    //     }
    //   }, 1500); // Simulamos retraso de red
    // });
  }
}
