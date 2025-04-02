import type { Customer } from "../../domain/entities/customer"
import type { Payment } from "../../domain/entities/payment"
import type { Order } from "../../domain/entities/order"
import type { PaymentRepository, PaymentResult } from "../../domain/repositories/payment-repository"

export class MockPaymentRepository implements PaymentRepository {
  async processPayment(customer: Customer, payment: Payment, order: Order): Promise<PaymentResult> {
    // Simulamos la llamada a la API con un retraso
    return new Promise((resolve) => {
      setTimeout(() => {
        const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
        resolve({
          success: true,
          orderId: orderId,
        })
      }, 500) // Simulamos un retraso menor para pruebas
    })
  }
}

