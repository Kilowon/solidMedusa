import { Show, createSignal, onMount } from 'solid-js'
import { createQuery } from '@tanstack/solid-query'
import { useGlobalContext } from '~/Context/Providers'
import { loadStripe } from '@stripe/stripe-js'
import type { PaymentRequestPaymentMethodEvent } from '@stripe/stripe-js'
import {
	Elements,
	useElements,
	useStripe,
	LinkAuthenticationElement,
	PaymentElement,
	PaymentRequestButton
} from 'solid-stripe'
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
					<CheckoutForm clientSecret={paymentSessionQuery?.data?.cart?.payment_session?.data?.client_secret} />
				</Elements>
			</Show>
		</Show>
	)
}

export function CheckoutForm(props: { clientSecret: string }) {
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
		<div class="space-y-4">
			<form onSubmit={handleSubmit}>
				<PaymentElement />
				<div class="py-2"></div>
				<CheckoutButtons clientSecret={props.clientSecret} />
				<div class="py-2"></div>

				<button class="mt-5 bg-transparent">Pay</button>
			</form>
			<div class="space-y-4 sm:space-y-auto sm:flex sm:space-x-16 text-text_2 text-sm">
				<div>
					<div>Shipping:</div>
					<div>{queryCart?.data?.cart?.shipping_address?.company}</div>
					<div class="flex space-x-2">
						<div>{queryCart?.data?.cart?.shipping_address?.first_name}</div>
						<div>{queryCart?.data?.cart?.shipping_address?.last_name}</div>
					</div>
					<div>{queryCart?.data?.cart?.shipping_address?.address_1}</div>
					<div>{queryCart?.data?.cart?.shipping_address?.address_2}</div>
					<div class="flex space-x-2">
						<div>{queryCart?.data?.cart?.shipping_address?.city}</div>
						<div>{queryCart?.data?.cart?.shipping_address?.province}</div>
						<div>{queryCart?.data?.cart?.shipping_address?.postal_code}</div>
					</div>

					<div>{queryCart?.data?.cart?.shipping_address?.phone}</div>
				</div>

				<div>
					<div>Billing:</div>
					<div>{queryCart?.data?.cart?.shipping_address?.company}</div>
					<div class="flex space-x-2">
						<div>{queryCart?.data?.cart?.billing_address?.first_name}</div>
						<div>{queryCart?.data?.cart?.billing_address?.last_name}</div>
					</div>
					<div>{queryCart?.data?.cart?.billing_address?.address_1}</div>
					<div>{queryCart?.data?.cart?.billing_address?.address_2}</div>
					<div class="flex space-x-2">
						<div>{queryCart?.data?.cart?.billing_address?.city}</div>
						<div>{queryCart?.data?.cart?.billing_address?.province}</div>
						<div>{queryCart?.data?.cart?.billing_address?.postal_code}</div>
					</div>

					<div>{queryCart?.data?.cart?.billing_address?.phone}</div>
				</div>
			</div>
		</div>
	)
}

export function CheckoutButtons(props: { clientSecret: string }) {
	const stripe = useStripe()
	const { queryCart } = useGlobalContext()

	// Declare payment metadata (amounts must match payment intent)
	const paymentRequest = {
		country: 'US',
		currency: 'usd',
		total: { label: 'Demo total', amount: queryCart?.data?.cart?.total },
		requestPayerName: true,
		requestPayerEmail: true,
		requestPayerPhone: true,
		requestShipping: true,
		displayItems: [
			{
				label: 'Subtotal',
				amount: queryCart?.data?.cart?.subtotal
			},
			{
				label: 'Shipping',
				amount: queryCart?.data?.cart?.shipping_total
			},
			{
				label: 'Tax',
				amount: queryCart?.data?.cart?.tax_total
			},
			{
				label: 'Total',
				amount: queryCart?.data?.cart?.total
			}
		],
		shippingOptions: [
			{
				id: 'free-shipping',
				label: 'Free shipping',
				detail: 'Arrives in 5 to 7 days',
				amount: 0

				// selected: true
			},
			{
				id: 'express-shipping',
				label: 'Express shipping',
				detail: 'Arrives in 1 to 3 days',
				amount: 599

				// selected: false
			}
		]
	}

	async function handlePaymentRequest(ev: PaymentRequestPaymentMethodEvent) {
		// Create payment intent server side

		const result = await stripe()?.confirmCardPayment(props.clientSecret, {
			payment_method: ev.paymentMethod.id
		})

		if (result?.error) {
			// Report to the browser that the payment failed,
			// prompting it to re-show the payment interface,
			// or show an error message and close the payment.
			ev.complete('fail')
		} else {
			// Report to the browser that the confirmation was
			// successful, prompting it to close the browser
			// payment method collection interface.
			ev.complete('success')
		}
	}

	return (
		<PaymentRequestButton
			paymentRequest={paymentRequest}
			onPaymentMethod={handlePaymentRequest}
			style={{ paymentRequestButton: { theme: 'light', height: '42px', type: 'check-out', buttonSpacing: 'horizontal' } }}
		/>
	)
}
