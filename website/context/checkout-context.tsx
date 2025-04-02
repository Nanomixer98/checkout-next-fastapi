"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

// Types
type CustomerInfo = {
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

type PaymentInfo = {
  cardNumber: string
  cardholderName: string
  expiryMonth: string
  expiryYear: string
  cvv: string
}

type CheckoutState = {
  customerInfo: CustomerInfo | null
  paymentInfo: PaymentInfo | null
  orderTotal: number
}

type CheckoutAction =
  | { type: "SET_CUSTOMER_INFO"; payload: CustomerInfo }
  | { type: "SET_PAYMENT_INFO"; payload: PaymentInfo }
  | { type: "SET_ORDER_TOTAL"; payload: number }

// Initial state
const initialState: CheckoutState = {
  customerInfo: null,
  paymentInfo: null,
  orderTotal: 129.97, // Default total for demo
}

// Reducer
function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case "SET_CUSTOMER_INFO":
      return { ...state, customerInfo: action.payload }
    case "SET_PAYMENT_INFO":
      return { ...state, paymentInfo: action.payload }
    case "SET_ORDER_TOTAL":
      return { ...state, orderTotal: action.payload }
    default:
      return state
  }
}

// Context
const CheckoutContext = createContext<
  | {
      state: CheckoutState
      dispatch: React.Dispatch<CheckoutAction>
    }
  | undefined
>(undefined)

// Provider
export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState)

  return <CheckoutContext.Provider value={{ state, dispatch }}>{children}</CheckoutContext.Provider>
}

// Hook
export function useCheckout() {
  const context = useContext(CheckoutContext)

  if (context === undefined) {
    throw new Error("useCheckout must be used within a CheckoutProvider")
  }

  return context
}

