import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Security utility to sanitize user input
export function sanitizeInput(input: string): string {
  if (!input) return ""

  // Remove potentially dangerous characters
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .trim()
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// Mask credit card number for display
export function maskCardNumber(cardNumber: string): string {
  if (!cardNumber) return ""

  // Remove spaces
  const cleaned = cardNumber.replace(/\s+/g, "")

  // Keep first 4 and last 4 digits visible
  if (cleaned.length > 8) {
    const firstFour = cleaned.slice(0, 4)
    const lastFour = cleaned.slice(-4)
    const maskedMiddle = "•".repeat(cleaned.length - 8)
    return `${firstFour} ${maskedMiddle} ${lastFour}`
  }

  return cardNumber
}

