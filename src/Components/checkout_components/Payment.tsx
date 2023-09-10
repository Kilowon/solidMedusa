import { Show, createSignal, onMount } from 'solid-js'
import { createQuery } from '@tanstack/solid-query'
import { useGlobalContext } from '~/Context/Providers'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, useElements, useStripe } from 'solid-stripe'
import { useNavigate } from 'solid-start'

export default function Payment() {
	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()
	const [stripe, setStripe] = createSignal<any>(null)

	onMount(async () => {
		const result = await loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_KEY)
		setStripe(result)
	})

	// Trigger Medusa payment session and submit payment
	const paymentSessionQuery = createQuery(() => ({
		queryKey: ['cart'],
		queryFn: () => medusa?.carts.createPaymentSessions(queryCart.data?.cart?.id),
		enabled: true,
		cacheTime: 3 * 60 * 1000
	}))

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

export function CheckoutForm() {
	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()
	const { queryNewCart } = useGlobalContext()
	const stripe = useStripe()
	const elements = useElements()
	const navigate = useNavigate()

	const paymentSessionAuthorize = createQuery(() => ({
		queryKey: ['cart'],
		queryFn: () => medusa?.carts?.complete(queryCart?.data?.cart?.id),
		enabled: false
	}))

	async function handleSuccess() {
		setTimeout(() => {
			if (paymentSessionAuthorize.isSuccess && paymentSessionAuthorize?.data?.type === 'order') {
				navigate(`/order/${paymentSessionAuthorize?.data?.data?.id}`)
				console.log(paymentSessionAuthorize.data?.data?.id, 'success cart')
				setTimeout(() => {
					queryNewCart?.refetch()
					console.log(paymentSessionAuthorize.data, 'newCARTcalled')
				}, 1000)
			}
		}, 1000)
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault()
		const result = await stripe()?.confirmPayment({
			elements: elements()!,
			redirect: 'if_required'
		})

		if (result?.error) {
			console.log(result.error.message, 'card error')
		} else {
			console.log('Payment completed!')
			await paymentSessionAuthorize.refetch()
			await handleSuccess()

			if (paymentSessionAuthorize.isError) {
				console.log(paymentSessionAuthorize.error, 'error')
			}
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement />
			<button class="mt-5 bg-transparent">Pay</button>
		</form>
	)
}
