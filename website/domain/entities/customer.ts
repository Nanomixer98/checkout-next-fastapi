export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export class Customer {
  private info: CustomerInfo

  constructor(info: CustomerInfo) {
    this.info = info
  }

  getFullName(): string {
    return `${this.info.firstName} ${this.info.lastName}`
  }

  getEmail(): string {
    return this.info.email
  }

  getShippingAddress(): string {
    return `${this.info.address}, ${this.info.city}, ${this.info.state} ${this.info.zipCode}, ${this.info.country}`
  }

  getInfo(): CustomerInfo {
    return { ...this.info }
  }
}

