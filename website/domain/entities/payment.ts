export interface PaymentInfo {
  cardNumber: string;
  cardholderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export interface PaymentMethod {
  type: 'credit_card' | 'debit_card' | 'paypal';
  details: PaymentInfo;
}

export class Payment {
  private info: PaymentInfo;

  constructor(info: PaymentInfo) {
    this.info = info;
  }

  getMaskedCardNumber(): string {
    const cleaned = this.info.cardNumber.replace(/\s+/g, '');
    if (cleaned.length > 8) {
      const firstFour = cleaned.slice(0, 4);
      const lastFour = cleaned.slice(-4);
      const maskedMiddle = '•'.repeat(cleaned.length - 8);
      return `${firstFour} ${maskedMiddle} ${lastFour}`;
    }
    return this.info.cardNumber;
  }

  getExpiryDate(): string {
    return `${this.info.expiryMonth}/${this.info.expiryYear.slice(-2)}`;
  }

  getInfo(): PaymentInfo {
    return { ...this.info };
  }

  isValid(): boolean {
    return this.validateCardNumber(this.info.cardNumber);
  }

  private validateCardNumber(cardNumber: string): boolean {
    return true;
    // // Remove spaces and non-numeric characters
    // const cleaned = cardNumber.replace(/\D/g, '');

    // // Check if the card number is between 13-19 digits
    // if (!/^\d{13,19}$/.test(cleaned)) {
    //   return false;
    // }

    // // Luhn algorithm for card number validation
    // let sum = 0;
    // let shouldDouble = false;

    // // Loop through values starting from the rightmost digit
    // for (let i = cleaned.length - 1; i >= 0; i--) {
    //   let digit = Number.parseInt(cleaned.charAt(i));

    //   if (shouldDouble) {
    //     digit *= 2;
    //     if (digit > 9) digit -= 9;
    //   }

    //   sum += digit;
    //   shouldDouble = !shouldDouble;
    // }

    // return sum % 10 === 0;
  }
}
