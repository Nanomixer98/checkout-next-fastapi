'use client';

import { CreateOrderUseCase } from '@/application/use-cases/create-order-use-case';
import { ProcessPaymentUseCase } from '@/application/use-cases/process-payment-use-case';
import { ValidateCustomerInfoUseCase } from '@/application/use-cases/validate-customer-info-use-case';
import type { CustomerInfo } from '@/domain/entities/customer';
import type { PaymentInfo } from '@/domain/entities/payment';
import { CustomerInfoFields } from '@/framework/next/components/customer-info-fields';
import { OrderSummaryComponent } from '@/framework/next/components/order-summary';
import { PaymentInfoFields } from '@/framework/next/components/payment-info-fields';
import { Alert, AlertDescription } from '@/framework/next/components/ui/alert';
import { Button } from '@/framework/next/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/framework/next/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/framework/next/components/ui/tabs';
import { CheckoutPresenter } from '@/framework/presenters/checkout-presenter';
import { InternalPaymentRepository } from '@/infrastructure/repositories/internal-payment-repository';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CreditCard, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

// Definimos el esquema de validación combinado
const checkoutFormSchema = z.object({
  // Customer Info
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  country: z.string().min(2, 'Country is required'),

  // Payment Info
  cardNumber: z
    .string()
    .min(19, 'Card number must be at least 16 digits')
    .max(19, 'Card number must be at most 19 digits')
    .regex(/^[0-9\s]+$/, 'Card number must contain only digits'),
  cardholderName: z.string().min(2, 'Cardholder name is required'),
  expiryMonth: z.string().min(1, 'Expiry month is required'),
  expiryYear: z.string().min(1, 'Expiry year is required'),
  cvv: z
    .string()
    .min(3, 'CVV must be at least 3 digits')
    .max(4, 'CVV must be at most 4 digits')
    .regex(/^[0-9]+$/, 'CVV must contain only digits'),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export default function CheckoutPanel() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('customer');

  // Inicializamos los use cases y el presenter
  const validateCustomerInfoUseCase = new ValidateCustomerInfoUseCase();
  const createOrderUseCase = new CreateOrderUseCase();
  const paymentRepository = new InternalPaymentRepository();
  const processPaymentUseCase = new ProcessPaymentUseCase(paymentRepository);
  const presenter = new CheckoutPresenter(
    validateCustomerInfoUseCase,
    createOrderUseCase,
    processPaymentUseCase
  );

  // Configuramos el formulario combinado
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US',
      cardNumber: '',
      cardholderName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
    },
    mode: 'onChange', // Validación en tiempo real
  });

  const handleSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Separamos los datos en información del cliente y de pago
      const customerInfo: CustomerInfo = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
      };

      const paymentInfo: PaymentInfo = {
        cardNumber: data.cardNumber,
        cardholderName: data.cardholderName,
        expiryMonth: data.expiryMonth,
        expiryYear: data.expiryYear,
        cvv: data.cvv,
      };

      // Procesamos el pago usando el presenter
      const result = await presenter.processPayment(customerInfo, paymentInfo);

      // Redirigimos a la página de confirmación
      router.push(
        `/confirmation?orderId=${result.orderId}&amount=${result.amount}&status=completed`
      );
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          'There was a problem processing your payment. Please try again.'
        );
      }
      setIsSubmitting(false);
    }
  };

  // Función para cambiar entre pestañas y validar
  const handleTabChange = async (value: string) => {
    if (value === 'payment' && activeTab === 'customer') {
      // Validar campos del cliente antes de cambiar a la pestaña de pago
      const customerFields = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'address',
        'city',
        'state',
        'zipCode',
        'country',
      ];
      const result = await form.trigger(customerFields as any);
      if (result) {
        setActiveTab(value);
      }
    } else {
      setActiveTab(value);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Complete Your Purchase</CardTitle>
          </CardHeader>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardContent>
                <Tabs
                  value={activeTab}
                  onValueChange={handleTabChange}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger
                      value="customer"
                      className="flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      <span>Customer Info</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="payment"
                      className="flex items-center gap-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>Payment</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="customer" className="mt-0">
                    <CustomerInfoFields />
                    <div className="flex justify-end mt-6">
                      <Button
                        type="button"
                        onClick={() => handleTabChange('payment')}
                        className="ml-auto"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="payment" className="mt-0">
                    <PaymentInfoFields />
                    <div className="flex justify-between mt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveTab('customer')}
                      >
                        Back
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Processing...' : 'Complete Purchase'}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </form>
          </FormProvider>
        </Card>

        {/* Versión móvil del resumen del pedido */}
        <div className="lg:hidden mt-8">
          <OrderSummaryComponent />
        </div>
      </div>

      {/* Versión desktop del resumen del pedido */}
      <div className="hidden lg:block lg:col-span-1">
        <OrderSummaryComponent />
      </div>
    </div>
  );
}
