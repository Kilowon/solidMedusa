import { Show, createSignal, onMount, createEffect, Suspense } from 'solid-js'
import { loadScript, OnApproveActions, OnApproveData } from '@paypal/paypal-js'
import ExpressShipping from '~/Components/checkout_components/ExpressShipping'
import { createQuery } from '@tanstack/solid-query'
import { useGlobalContext } from '~/Context/Providers'
import { loadStripe } from '@stripe/stripe-js'
import type { PaymentRequestPaymentMethodEvent } from '@stripe/stripe-js'
import { Elements, useStripe, LinkAuthenticationElement, PaymentElement, PaymentRequestButton } from 'solid-stripe'
import { useNavigate } from 'solid-start'
import { create } from 'domain'

export default function Express() {
	let paypalButtons: any
	let paypalButtonRef: HTMLElement
	const [paypalLoaded, setPaypalLoaded] = createSignal(false)
	const navigate = useNavigate()
	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()
	const { queryNewCart } = useGlobalContext()
	const [stripe, setStripe] = createSignal<any>(null)
	const [errorMessage, setErrorMessage] = createSignal<any>(undefined)
	const [processing, setProcessing] = createSignal(false)
	const [authorization, setAuthorization] = createSignal<any>(undefined)

	onMount(async () => {
		const result = await loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_KEY)
		setStripe(result)
	})

	const paymentSessionQuery = createQuery(() => ({
		queryKey: ['cart'],
		queryFn: () => medusa?.carts.createPaymentSessions(queryCart.data?.cart?.id),
		enabled: true,
		cacheTime: 3 * 60 * 1000
	}))

	/* 	onMount(async () => {
		const paypal = await loadScript({
			clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
			intent: 'authorize',
			buyerCountry: 'US',
			components: ['buttons'],
			commit: false,
			enableFunding: ['paypal']
		}).catch(err => {
			console.log('Failed to load Paypal script', err)
		})

		if (paypal && paypal.Buttons && queryCart.data?.cart?.total) {
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
					console.log('createOrder')
					return actions.order.create({
						purchase_units: [
							{
								amount: {
									value: `${queryCart.data?.cart?.total / 100}`,
									currency_code: 'USD'
								}
							}
						],
						payment_source: {
							paypal: {
								return_url: `${import.meta.env.VITE_APP_URL}/checkout/success`,
								cancel_url: `${import.meta.env.VITE_APP_URL}/checkout/cancel`,
								user_action: 'PAY_NOW',
								payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
								brand_name: 'Modern Edge',
								locale: 'en-US',
								landing_page: 'LOGIN',
								shipping_preference: 'SET_PROVIDED_ADDRESS'
							}
						}
					})
				},
				onApprove: async (data: OnApproveData, actions: OnApproveActions) => {
					console.log('onApprove', data, actions)
					handlePayment(data, actions)
				},
				onCancel: (data: any) => {
					console.log('onCancel', data)
				}
			})
			setPaypalLoaded(true)
		}
	}) */

	const paymentSessionAuthorize = createQuery(() => ({
		queryKey: ['cart'],
		queryFn: () =>
			medusa?.carts.updatePaymentSession(queryCart?.data?.cart?.id, 'paypal', {
				data: {
					data: {
						...authorization()
					}
				}
			}),
		enabled: false
	}))

	const paymentSessionFinalize = createQuery(() => ({
		queryKey: ['cart'],
		queryFn: () => medusa?.carts?.complete(queryCart?.data?.cart?.id),
		enabled: false
	}))

	const handlePayment = (data: OnApproveData, actions: OnApproveActions) => {
		actions?.order?.authorize().then(async authorization => {
			console.log(authorization.status, 'authorization')
			if (authorization.status !== 'COMPLETED') {
				setErrorMessage(`An error occurred, status: ${authorization.status}`)
				setProcessing(false)
				return
			}

			if (authorization.status === 'COMPLETED') {
				setAuthorization(authorization)
				paymentSessionAuthorize.refetch()
			}
			setTimeout(() => {
				if (authorization.status === 'COMPLETED' && paymentSessionFinalize.isSuccess) {
					console.log('Finalize called')
					paymentSessionFinalize.refetch()
				}
			}, 2000)
			setTimeout(() => {
				if (paymentSessionFinalize.isSuccess && paymentSessionFinalize?.data?.type === 'order') {
					console.log('Finalize success')
					/* navigate(`/order/${paymentSessionFinalize?.data?.data?.id}`)
					console.log(paymentSessionFinalize.data?.data?.id, 'success cart')
					setTimeout(() => {
						queryNewCart?.refetch()
						console.log(paymentSessionFinalize.data, 'newCARTcalled')
					}, 1000) */
				}
				if (paymentSessionFinalize.isError) {
					console.log(paymentSessionFinalize.error, 'error')
				}
				if (paymentSessionFinalize.isSuccess && paymentSessionFinalize?.data?.type === 'cart') {
					console.log('Finalize called AGAIN')
					paymentSessionFinalize.refetch()
				}
			}, 5000)
		})
	}

	createEffect(() => {
		if (paypalLoaded() && paypalButtons && paypalButtonRef) {
			paypalButtons.render(paypalButtonRef)
		}
	})

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div class="m-1 md:m-2 space-y-3 md:space-y-3 ">
				<ExpressShipping />
				<div class="  font-500 text-text_2 text-base tracking-tighter ">Express Checkout</div>

				{/* <Show when={paypalLoaded()}>
					<div ref={el => (paypalButtonRef = el)}></div>
				</Show> */}
				<Show when={true}>
					<Elements
						stripe={stripe()}
						clientSecret={paymentSessionQuery?.data?.cart?.payment_session?.data?.client_secret}
					>
						<ExpressStripeButtons clientSecret={paymentSessionQuery?.data?.cart?.payment_session?.data?.client_secret} />
					</Elements>
				</Show>
			</div>
		</Suspense>
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
		<Show when={queryCart?.data?.cart?.total > 0}>
			<PaymentRequestButton
				paymentRequest={paymentRequest}
				onPaymentMethod={handlePaymentRequest}
				style={{ paymentRequestButton: { theme: 'light', height: '42px', type: 'default', buttonSpacing: 'vertical' } }}
			/>
		</Show>
	)
}
