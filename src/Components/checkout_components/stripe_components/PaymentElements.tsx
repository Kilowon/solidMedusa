import type { Component } from 'solid-js'
import type { StripePaymentElementChangeEvent } from '@stripe/stripe-js'
import type { ElementProps } from '~/types/ElementsProps'
import { createWrapper } from './primitives/createWrapper'
import { createStripeElement } from './primitives/createStripeElement'

export type PaymentElementProps = ElementProps<'payment', StripePaymentElementChangeEvent & { error: undefined }>

export const PaymentElement: Component<PaymentElementProps & { options?: object }> = props => {
	const [wrapper, setWrapper] = createWrapper()

	createStripeElement(wrapper, 'payment', props.options || {}, (type, event) => props[type]?.(event))
	;(PaymentElement as any).__elementType = 'payment'

	return <div ref={setWrapper} />
}
