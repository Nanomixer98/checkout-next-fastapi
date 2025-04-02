"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCheckout } from "@/context/checkout-context"
import { CustomerInfoForm } from "@/components/checkout/customer-info-form"
import { PaymentInfoForm } from "@/components/checkout/payment-info-form"
import { OrderSummary } from "@/components/checkout/order-summary"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// Importamos los use cases y entidades
import { Customer } from "@/domain/entities/customer"
import { Payment } from "@/domain/entities/payment"
import type { OrderItem } from "@/domain/entities/order"
import { ProcessPaymentUseCase } from "@/application/use-cases/process-payment-use-case"
import { ValidateCustomerInfoUseCase } from "@/application/use-cases/validate-customer-info-use-case"
import { CreateOrderUseCase } from "@/application/use-cases/create-order-use-case"
import { StripePaymentRepository } from "@/infrastructure/repositories/stripe-payment-repository"

export default function CheckoutForm() {
  const router = useRouter()
  const { state } = useCheckout()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Inicializamos los use cases
  const validateCustomerInfoUseCase = new ValidateCustomerInfoUseCase()
  const createOrderUseCase = new CreateOrderUseCase()
  const paymentRepository = new StripePaymentRepository()
  const processPaymentUseCase = new ProcessPaymentUseCase(paymentRepository)

  const handleCustomerInfoComplete = () => {
    try {
      // Validamos la información del cliente usando el use case
      if (state.customerInfo) {
        validateCustomerInfoUseCase.execute(state.customerInfo)
      }
      setCurrentStep(2)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Invalid customer information")
      }
    }
  }

  const handlePaymentSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      if (!state.customerInfo || !state.paymentInfo) {
        throw new Error("Missing customer or payment information")
      }

      // Creamos las entidades de dominio
      const customer = new Customer(state.customerInfo)
      const payment = new Payment(state.paymentInfo)

      // Creamos los items de la orden (en un caso real vendrían del carrito)
      const items: OrderItem[] = [
        { id: 1, name: "Product 1", price: 29.99, quantity: 1 },
        { id: 2, name: "Product 2", price: 49.99, quantity: 2 },
      ]

      // Creamos la orden usando el use case
      const order = createOrderUseCase.execute(items)

      // Procesamos el pago usando el use case
      const result = await processPaymentUseCase.execute(customer, payment, order)

      // Redirigimos a la página de confirmación
      router.push(`/confirmation?orderId=${result.orderId}&amount=${order.getTotal()}&status=completed`)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("There was a problem processing your payment. Please try again.")
      }
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {currentStep === 1 ? (
          <CustomerInfoForm onComplete={handleCustomerInfoComplete} />
        ) : (
          <PaymentInfoForm
            onSubmit={handlePaymentSubmit}
            isSubmitting={isSubmitting}
            onBack={() => setCurrentStep(1)}
          />
        )}
      </div>

      <div className="lg:col-span-1">
        <OrderSummary />
      </div>
    </div>
  )
}

