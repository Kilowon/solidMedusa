import { Show, createSignal, onMount, createEffect } from 'solid-js'
import { loadScript } from '@paypal/paypal-js'
import ExpressShipping from '~/Components/checkout_components/ExpressShipping'
import { createQuery } from '@tanstack/solid-query'
import { useGlobalContext } from '~/Context/Providers'
import { loadStripe } from '@stripe/stripe-js'
import type { PaymentRequestPaymentMethodEvent } from '@stripe/stripe-js'
import { Elements, useStripe, LinkAuthenticationElement, PaymentElement, PaymentRequestButton } from 'solid-stripe'
import { useNavigate } from 'solid-start'

export default function Express() {
	let paypalButtons: any
	let paypalButtonRef: HTMLElement
	const [paypalLoaded, setPaypalLoaded] = createSignal(false)

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

	onMount(async () => {
		const paypal = await loadScript({
			clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
			buyerCountry: 'US',
			components: ['buttons'],
			commit: false,
			enableFunding: ['paypal']
		}).catch(err => {
			console.log('Failed to load Paypal script', err)
		})

		if (paypal && paypal.Buttons) {
			paypalButtons = paypal.Buttons({
				style: {
					layout: 'horizontal',
					color: 'gold',
					shape: 'rect',
					label: 'paypal',
					tagline: false,
					height: 42
				},
				createOrder: function (data: any, actions: any) {
					return actions.order.create({
						purchase_units: [
							{
								amount: {
									value: `${queryCart.data?.cart?.total}`,
									currency_code: 'USD'
								}
							}
						]
					})
				}
			})
			setPaypalLoaded(true)
		}
	})

	createEffect(() => {
		if (paypalLoaded() && paypalButtons && paypalButtonRef) {
			paypalButtons.render(paypalButtonRef)
		}
	})

	return (
		<div class="m-1 md:m-2 space-y-3 md:space-y-3 ">
			<ExpressShipping />
			<div class="  font-500 text-text_2 text-base tracking-tighter ">Express Checkout</div>

			<Show when={paypalLoaded()}>
				<div
					onClick={() => console.log('PAYPAL PAYMENT')}
					ref={el => (paypalButtonRef = el)}
				></div>
			</Show>
			<Show when={true}>
				<Elements
					stripe={stripe()}
					clientSecret={paymentSessionQuery?.data?.cart?.payment_session?.data?.client_secret}
				>
					<ExpressStripeButtons clientSecret={paymentSessionQuery?.data?.cart?.payment_session?.data?.client_secret} />
				</Elements>
			</Show>
		</div>
	)
}

export function ExpressStripeButtons(props: { clientSecret: string }) {
	const stripe = useStripe()
	const { queryCart } = useGlobalContext()
	console.log(import.meta.env.VITE_APP_URL, 'env')
	// Declare payment metadata (amounts must match payment intent)
	const paymentRequest = {
		country: 'US',
		currency: 'usd',
		total: { label: 'Demo total', amount: queryCart?.data?.cart?.total },
		requestPayerName: true,
		requestPayerEmail: true,
		requestPayerPhone: true,
		requestShipping: true,
		returnURL: `${import.meta.env.VITE_APP_URL}/checkout/success`,
		displayItems: [
			{
				label: 'Subtotal',
				amount: queryCart?.data?.cart?.subtotal || 0
			},
			{
				label: 'Shipping',
				amount: queryCart?.data?.cart?.shipping_total || 0
			},
			{
				label: 'Tax',
				amount: queryCart?.data?.cart?.tax_total || 0
			},
			{
				label: 'Total',
				amount: queryCart?.data?.cart?.total || 0
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
