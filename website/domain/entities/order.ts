export interface OrderItem {
  id: string | number
  name: string
  price: number
  quantity: number
}

export class Order {
  private items: OrderItem[]
  private _subtotal: number
  private _tax: number
  private _shipping: number
  private _orderId: string | null

  constructor(items: OrderItem[], tax = 0.08, shipping = 5.99) {
    this.items = [...items]
    this._subtotal = this.calculateSubtotal()
    this._tax = this.calculateTax(tax)
    this._shipping = shipping
    this._orderId = null
  }

  private calculateSubtotal(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  private calculateTax(taxRate: number): number {
    return this._subtotal * taxRate
  }

  getItems(): OrderItem[] {
    return [...this.items]
  }

  getSubtotal(): number {
    return this._subtotal
  }

  getTax(): number {
    return this._tax
  }

  getShipping(): number {
    return this._shipping
  }

  getTotal(): number {
    return this._subtotal + this._tax + this._shipping
  }

  setOrderId(orderId: string): void {
    this._orderId = orderId
  }

  getOrderId(): string | null {
    return this._orderId
  }
}

