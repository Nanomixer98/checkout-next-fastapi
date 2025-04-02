import { Customer, type CustomerInfo } from "../../domain/entities/customer"

export class ValidateCustomerInfoUseCase {
  execute(customerInfo: CustomerInfo): Customer {
    // Validaciones de negocio
    if (!customerInfo.firstName || customerInfo.firstName.length < 2) {
      throw new Error("First name is required and must be at least 2 characters")
    }

    if (!customerInfo.lastName || customerInfo.lastName.length < 2) {
      throw new Error("Last name is required and must be at least 2 characters")
    }

    if (!customerInfo.email || !this.isValidEmail(customerInfo.email)) {
      throw new Error("Valid email is required")
    }

    if (!customerInfo.phone || customerInfo.phone.length < 10) {
      throw new Error("Phone number is required and must be at least 10 digits")
    }

    if (!customerInfo.address || customerInfo.address.length < 5) {
      throw new Error("Address is required and must be at least 5 characters")
    }

    if (!customerInfo.city || customerInfo.city.length < 2) {
      throw new Error("City is required and must be at least 2 characters")
    }

    if (!customerInfo.state || customerInfo.state.length < 2) {
      throw new Error("State is required and must be at least 2 characters")
    }

    if (!customerInfo.zipCode || customerInfo.zipCode.length < 5) {
      throw new Error("ZIP code is required and must be at least 5 characters")
    }

    if (!customerInfo.country || customerInfo.country.length < 2) {
      throw new Error("Country is required and must be at least 2 characters")
    }

    // Crear y retornar el objeto Customer
    return new Customer(customerInfo)
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}

