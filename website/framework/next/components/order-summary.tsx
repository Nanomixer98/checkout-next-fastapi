'use client';

import { CreateOrderUseCase } from '@/application/use-cases/create-order-use-case';
import { ProcessPaymentUseCase } from '@/application/use-cases/process-payment-use-case';
import { ValidateCustomerInfoUseCase } from '@/application/use-cases/validate-customer-info-use-case';
import { formatCurrency } from '@/domain/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/framework/next/components/ui/card';
import { Separator } from '@/framework/next/components/ui/separator';
import { CheckoutPresenter } from '@/framework/presenters/checkout-presenter';
import { StripePaymentRepository } from '@/infrastructure/repositories/stripe-payment-repository';

export function OrderSummaryComponent() {
  // Inicializamos los use cases y el presenter
  const validateCustomerInfoUseCase = new ValidateCustomerInfoUseCase();
  const createOrderUseCase = new CreateOrderUseCase();
  const paymentRepository = new StripePaymentRepository();
  const processPaymentUseCase = new ProcessPaymentUseCase(paymentRepository);
  const presenter = new CheckoutPresenter(
    validateCustomerInfoUseCase,
    createOrderUseCase,
    processPaymentUseCase
  );

  // Obtenemos los datos del resumen de la orden
  const orderSummary = presenter.getOrderSummary();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {orderSummary.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span className="text-sm">
                {item.name} × {item.quantity}
              </span>
              <span className="text-sm font-medium">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatCurrency(orderSummary.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{formatCurrency(orderSummary.shipping)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{formatCurrency(orderSummary.tax)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>{formatCurrency(orderSummary.total)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
