// This is a mock payment service
// In a real application, this would connect to a payment processor API

interface PaymentRequest {
  customerInfo: any
  paymentInfo: any
  amount: number
}

interface PaymentResponse {
  success: boolean
  orderId: string
  message?: string
}

export async function processPayment(request: PaymentRequest): Promise<PaymentResponse> {
  // Simulate API call with a delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful payment (95% of the time)
      if (Math.random() > 0.05) {
        resolve({
          success: true,
          orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        })
      } else {
        // Simulate payment failure (5% of the time)
        reject(new Error("Payment processing failed. Please try again."))
      }
    }, 1500) // Simulate network delay
  })
}

// In a real application, you would implement proper card validation
export function validateCardNumber(cardNumber: string): boolean {
  // Remove spaces and non-numeric characters
  const cleaned = cardNumber.replace(/\D/g, "")

  // Check if the card number is between 13-19 digits
  if (!/^\d{13,19}$/.test(cleaned)) {
    return false
  }

  // Luhn algorithm for card number validation
  let sum = 0
  let shouldDouble = false

  // Loop through values starting from the rightmost digit
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(cleaned.charAt(i))

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}

