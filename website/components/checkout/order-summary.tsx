"use client"

import { useCheckout } from "@/context/checkout-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CreateOrderUseCase } from "@/application/use-cases/create-order-use-case"
import type { OrderItem } from "@/domain/entities/order"

export function OrderSummary() {
  const { state } = useCheckout()

  // Sample order items - in a real app, these would come from your cart/state
  const items: OrderItem[] = [
    { id: 1, name: "Product 1", price: 29.99, quantity: 1 },
    { id: 2, name: "Product 2", price: 49.99, quantity: 2 },
  ]

  // Usamos el use case para crear la orden
  const createOrderUseCase = new CreateOrderUseCase()
  const order = createOrderUseCase.execute(items)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {order.getItems().map((item) => (
            <div key={item.id} className="flex justify-between">
              <span className="text-sm">
                {item.name} × {item.quantity}
              </span>
              <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${order.getSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>${order.getShipping().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${order.getTax().toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>${order.getTotal().toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  )
}

