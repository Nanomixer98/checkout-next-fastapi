import { type OrderItem, Order } from '../../domain/entities/order';

export class CreateOrderUseCase {
  execute(items: OrderItem[], taxRate = 0.08, shipping = 5.99): Order {
    // Validaciones de negocio
    if (!items || items.length === 0) {
      throw new Error('Order must contain at least one item');
    }

    // Validar que todos los items tengan precio y cantidad válidos
    for (const item of items) {
      if (item.price <= 0) {
        throw new Error(`Item ${item.name} has an invalid price`);
      }
      if (item.quantity <= 0) {
        throw new Error(`Item ${item.name} has an invalid quantity`);
      }
    }

    // Crear la orden
    return new Order(items, taxRate, shipping);
  }
}
