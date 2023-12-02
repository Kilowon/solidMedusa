import type * as stripeJs from '@stripe/stripe-js'
import type { Component } from 'solid-js'
import { mergeProps, splitProps } from 'solid-js'
import { createWrapper } from '~/Components/checkout_components/stripe_components/primitives/createWrapper'
import { createStripeElement } from '~/Components/checkout_components/stripe_components/primitives/createStripeElement'
import type { ElementProps } from '~/types/ElementsProps'

export type CardNumberElementProps = ElementProps<'cardNumber', stripeJs.StripeCardNumberElementChangeEvent> &
	stripeJs.StripeCardNumberElementOptions

export const CardNumber: Component<CardNumberElementProps> = props => {
	const [wrapper, setWrapper] = createWrapper()

	const defaultValues = {
		classes: {},
		style: {},
		placeholder: 'Card number',
		disabled: false,
		showIcon: true,
		iconStyle: 'default'
	}
	const merged = mergeProps(defaultValues, props)
	const [options] = splitProps(merged, Object.keys(defaultValues) as Array<keyof typeof defaultValues>)

	createStripeElement(wrapper, 'cardNumber', options, (type, event) => props[type]?.(event))
	;(CardNumber as any).__elementType = 'cardNumber'

	return <div ref={setWrapper} />
}
