import type * as stripeJs from '@stripe/stripe-js'
import type { Component } from 'solid-js'
import type { CardElementProps } from '~/components/checkout_components/stripe_components/Card'
import type { CardCvcElementProps } from '~/components/checkout_components/stripe_components/CardCvc'
import type { CardExpiryElementProps } from '~/components/checkout_components/stripe_components/CardExpiry'
import type { CardNumberElementProps } from '~/components/checkout_components/stripe_components/CardNumber'
import type { PaymentRequestButtonProps } from '~/components/checkout_components/stripe_components/PaymentRequestButton'
import type { LinkAuthenticationElementProps } from '~/components/checkout_components/stripe_components/LinkAuthenticationElement'
import type { PaymentElementProps } from '~/components/checkout_components/stripe_components/PaymentElements'

export interface ElementProps<
	T extends stripeJs.StripeElementType,
	E extends stripeJs.StripeElementChangeEvent = stripeJs.StripeElementChangeEvent & Record<string, (e: any) => any>
> {
	onChange?: (e: E) => void
	onReady?: (e: { elementType: T }) => void
	onFocus?: (e: { elementType: T }) => void
	onBlur?: (e: { elementType: T }) => void
	onEscape?: (e: { elementType: T }) => void
}

declare module '@stripe/stripe-js' {
	interface StripeElements {
		getElement(elementType: Component<PaymentElementProps>): stripeJs.StripePaymentElement | null
		getElement(elementType: Component<CardElementProps>): stripeJs.StripeCardElement | null
		getElement(elementType: Component<CardNumberElementProps>): stripeJs.StripeCardNumberElement | null
		getElement(elementType: Component<CardExpiryElementProps>): stripeJs.StripeCardExpiryElement | null
		getElement(elementType: Component<CardCvcElementProps>): stripeJs.StripeCardCvcElement | null
		getElement(elementType: Component<PaymentRequestButtonProps>): stripeJs.StripePaymentRequestButtonElement | null
		getElement(elementType: Component<LinkAuthenticationElementProps>): stripeJs.StripeLinkAuthenticationElement | null
	}
}
