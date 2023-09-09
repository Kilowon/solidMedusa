import { Show, createSignal, onMount, createEffect } from 'solid-js'
import { createQuery } from '@tanstack/solid-query'
import { useGlobalContext } from '~/Context/Providers'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import type { Stripe } from '@stripe/stripe-js'
import { Elements, useElements, useStripe } from 'solid-stripe'
import { createRouteAction } from 'solid-start/data'
import { redirect, useSearchParams, useNavigate } from 'solid-start'

type PaymentProps = 'stripe' | 'klarna' | 'paypal'

export default function Payment() {
	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()
	const [paymentType, setPaymentType] = createSignal<PaymentProps>('stripe')
	const [stripe, setStripe] = createSignal<any>(null)
	const [elementOptions, setElementOptions] = createSignal<StripeElementsOptions>({
		clientSecret: import.meta.env.VITE_PUBLIC_STRIPE_KEY
	})

	onMount(async () => {
		console.log('Mounting Stripe', import.meta.env.VITE_PUBLIC_STRIPE_KEY)
		const result = await loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_KEY)
		setStripe(result)
	})

	// Trigger Medusa payment session and submit payment
	const paymentSessionQuery = createQuery(() => ({
		queryKey: ['paymentSession', queryCart.data?.cart?.id],
		queryFn: () => medusa?.carts.createPaymentSessions(queryCart.data?.cart?.id),
		enabled: true,
		cacheTime: 3 * 60 * 1000
	}))

	createEffect(() => {
		console.log('STRIPE CLIENT SECRET', paymentSessionQuery?.data?.cart?.payment_session?.data?.client_secret)
	})

	return (
		<Show
			when={stripe() && paymentSessionQuery?.data?.cart?.payment_session?.provider_id === 'stripe'}
			fallback={<div>Loading stripe</div>}
		>
			<div>Stripe</div>
			<Show when={paymentSessionQuery?.isSuccess}>
				<Elements
					stripe={stripe()}
					clientSecret={paymentSessionQuery?.data?.cart?.payment_session?.data?.client_secret}
				>
					<CheckoutForm />
				</Elements>
			</Show>
		</Show>
	)
}

import { PaymentElement } from 'solid-stripe'
import { create } from 'domain'

export function CheckoutForm() {
	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()
	const { queryNewCart } = useGlobalContext()
	const stripe = useStripe()
	const elements = useElements()
	const navigate = useNavigate()

	const paymentSessionAuthorize = createQuery(() => ({
		queryKey: ['cart_complete'],
		queryFn: () => medusa?.carts?.complete(queryCart?.data?.cart?.id),
		enabled: false,
		cacheTime: 1 * 60 * 1000
	}))

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault()
		const result = await stripe()?.confirmPayment({
			elements: elements()!,
			// specify redirect: 'if_required' or a `return_url`
			redirect: 'if_required'
		})

		if (result?.error) {
			console.log(result.error.message, 'card error')
		} else {
			console.log('Payment completed!')
			paymentSessionAuthorize.refetch()
			createEffect(() => {
				if (paymentSessionAuthorize.isSuccess) {
					queryNewCart?.refetch()
					navigate(`/order/${paymentSessionAuthorize?.data?.data?.id}`)
					console.log(paymentSessionAuthorize.data, 'success')
				}
				if (paymentSessionAuthorize.isError) {
					console.log(paymentSessionAuthorize.error, 'error')
				}
			})
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement />
			<button class="mt-5 bg-transparent">Pay</button>
		</form>
	)
}
