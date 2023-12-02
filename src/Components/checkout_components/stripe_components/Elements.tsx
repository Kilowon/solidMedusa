import type { Appearance, Stripe, StripeElements } from '@stripe/stripe-js'
import type { Accessor, Component, JSX } from 'solid-js'
import { createComputed, createContext, createSignal, mergeProps, useContext } from 'solid-js'

export const StripeContext = createContext<{
	stripe: Accessor<Stripe | null>
	elements: Accessor<StripeElements | null>
}>()

interface Props {
	stripe: Stripe | null
	clientSecret?: string
	theme?: Appearance['theme']
	variables?: Appearance['variables']
	rules?: Appearance['rules']
	options?: Record<string, any>
	labels?: Appearance['labels']
	children?: JSX.Element
}

export const Elements: Component<Props> = props => {
	const [elements, setElements] = createSignal<StripeElements | null>(null)

	const merged = mergeProps(
		{
			clientSecret: undefined,
			theme: 'stripe',
			variables: {},
			rules: {},
			labels: 'above'
		},
		props
	)

	createComputed(() => {
		if (props.stripe && !elements()) {
			const instance = props.stripe.elements({
				clientSecret: merged.clientSecret,
				appearance: {
					theme: merged.theme as Appearance['theme'],
					variables: merged.variables,
					rules: merged.rules,
					labels: merged.labels as Appearance['labels']
				}
			})

			setElements(instance)
		}
	})

	const stripe = () => props.stripe || null
	const value = {
		stripe,
		elements
	}

	return <StripeContext.Provider value={value}>{props.children}</StripeContext.Provider>
}

export function useStripe() {
	const ctx = useContext(StripeContext)

	if (!ctx) throw new Error('useStripe must be used within a <Elements> component')

	return ctx.stripe
}

/**
 * Deprecated. Use `useElements` instead.
 */
export const useStripeElements = useElements

export function useElements() {
	const ctx = useContext(StripeContext)

	if (!ctx) throw new Error('useElements must be used within a <Elements> component')

	return ctx.elements
}

export function useStripeProxy() {
	const ctx = useContext(StripeContext)

	if (!ctx) throw new Error('useStripeProxy must be used within a <Elements> component')

	return {
		get stripe() {
			return ctx?.stripe?.()
		},
		get elements() {
			return ctx?.elements?.()
		},
		set stripe(_value) {
			throw new Error('Cannot do this.')
		},
		set elements(_value) {
			throw new Error('Cannot do this.')
		}
	}
}
