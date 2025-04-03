import { Customer, type CustomerInfo } from '@/domain/entities/customer';
import { Payment, type PaymentInfo } from '@/domain/entities/payment';
import type { OrderItem } from '@/domain/entities/order';
import type { ProcessPaymentUseCase } from '@/application/use-cases/process-payment-use-case';
import type { ValidateCustomerInfoUseCase } from '@/application/use-cases/validate-customer-info-use-case';
import type { CreateOrderUseCase } from '@/application/use-cases/create-order-use-case';

// DTO para la respuesta del procesamiento de pago
export interface PaymentResponseDTO {
  success: boolean;
  orderId: string;
  amount: number;
  message?: string;
}

/**
 * Presenter que actúa como intermediario entre la UI y los casos de uso
 * Convierte los datos de la UI al formato que esperan los casos de uso
 * y viceversa
 */
export class CheckoutPresenter {
  constructor(
    private validateCustomerInfoUseCase: ValidateCustomerInfoUseCase,
    private createOrderUseCase: CreateOrderUseCase,
    private processPaymentUseCase: ProcessPaymentUseCase
  ) {}

  /**
   * Valida la información del cliente
   */
  validateCustomerInfo(customerInfoData: CustomerInfo): Customer {
    return this.validateCustomerInfoUseCase.execute(customerInfoData);
  }

  /**
   * Procesa el pago y devuelve un DTO con la información necesaria para la UI
   */
  async processPayment(
    customerInfoData: CustomerInfo,
    paymentInfoData: PaymentInfo
  ): Promise<PaymentResponseDTO> {
    // Crear entidades de dominio
    const customer = new Customer(customerInfoData);
    const payment = new Payment(paymentInfoData);

    // Crear items de orden (en un caso real vendrían del estado de la aplicación)
    const items: OrderItem[] = [
      { id: 1, name: 'Product 1', price: 29.99, quantity: 1 },
      { id: 2, name: 'Product 2', price: 49.99, quantity: 2 },
    ];

    // Crear orden
    const order = this.createOrderUseCase.execute(items);

    // Procesar pago
    const result = await this.processPaymentUseCase.execute(
      customer,
      payment,
      order
    );

    // Convertir resultado a DTO para la UI
    return {
      success: result.success,
      orderId: result.data!.id,
      amount: order.getTotal(),
      message: result.message,
    };
  }

  /**
   * Obtiene los items de la orden y sus cálculos
   */
  getOrderSummary() {
    // Crear items de orden (en un caso real vendrían del estado de la aplicación)
    const items: OrderItem[] = [
      { id: 1, name: 'Product 1', price: 29.99, quantity: 1 },
      { id: 2, name: 'Product 2', price: 49.99, quantity: 2 },
    ];

    // Crear orden
    const order = this.createOrderUseCase.execute(items);

    // Devolver datos para la UI
    return {
      items: order.getItems(),
      subtotal: order.getSubtotal(),
      tax: order.getTax(),
      shipping: order.getShipping(),
      total: order.getTotal(),
    };
  }
}
