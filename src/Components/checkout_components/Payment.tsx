import { Show, createSignal, onMount, Suspense } from 'solid-js'
import { createQuery } from '@tanstack/solid-query'
import { useGlobalContext } from '~/Context/Providers'
import { loadStripe } from '@stripe/stripe-js'
import type { PaymentRequestPaymentMethodEvent } from '@stripe/stripe-js'
import { Transition } from 'solid-transition-group'
import {
	Elements,
	useElements,
	useStripe,
	LinkAuthenticationElement,
	PaymentElement,
	PaymentRequestButton
} from 'solid-stripe'
import { useNavigate } from 'solid-start'
import { currencyFormat } from '~/lib/helpers/currency'
import { loadScript } from '@paypal/paypal-js'
import { createEffect } from 'solid-js'

export default function Payment() {
	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()
	const [stripe, setStripe] = createSignal<any>(null)

	onMount(async () => {
		if (stripe() === null) {
			const result = await loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_KEY)
			setStripe(result)
		}
	})

	const paymentSessionStripe = createQuery(() => ({
		queryKey: ['cart'],
		queryFn: () => medusa?.carts.setPaymentSession(queryCart.data?.cart?.id, { provider_id: 'stripe' }),
		enabled: true
	}))

	/* 	createEffect(() => {
		if (paymentSessionStripe.isSuccess) {
			console.log(paymentSessionStripe?.data?.cart?.payment_session?.provider_id, 'paymentSessionStripe')
		}
	})

	createEffect(() => {
		console.log(stripe(), 'stripe')
		console.log(paymentSessionStripe.isSuccess, 'isSuccess')
		console.log(paymentSessionStripe?.data?.cart?.payment_session?.data?.client_secret, 'client_secret')
		console.log(paymentSessionStripe?.data?.cart?.payment_session?.provider_id, 'provider_id')
		console.log(paymentSessionStripe?.data?.cart, 'CART')
		console.log('SHOW', stripe() && paymentSessionStripe?.data?.cart?.payment_session?.provider_id === 'stripe')
	}) */

	return (
		<Suspense fallback={<div>Loading...</div>}>
			{/* <Transition
				onEnter={(el, done) => {
					const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
						duration: 250
					})
					a.finished.then(done)
				}}
				onExit={(el, done) => {
					const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
						duration: 0
					})
					a.finished.then(done)
				}}
			> */}
			<Show
				when={
					stripe() &&
					paymentSessionStripe?.data?.cart?.payment_session?.provider_id === 'stripe' &&
					paymentSessionStripe.isSuccess
				}
				fallback={<div>Loading stripe</div>}
			>
				<Elements
					stripe={stripe()}
					clientSecret={paymentSessionStripe?.data?.cart?.payment_session?.data?.client_secret}
					options={{
						layout: {
							type: 'accordion',
							defaultCollapsed: true,
							radios: true,
							spacedAccordionItems: true
						}
					}}
				>
					<CheckoutForm clientSecret={paymentSessionStripe?.data?.cart?.payment_session?.data?.client_secret} />
				</Elements>
			</Show>
			{/* </Transition> */}
		</Suspense>
	)
}
export function NumberIcons() {
	return <div class="w-5 h-5 mr-1 md:mr-2 md:ml-1 i-ph-number-circle-five-fill" />
}

export function CheckoutForm(props: { clientSecret: string }) {
	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()
	const { queryNewCart } = useGlobalContext()
	const stripe = useStripe()
	const elements = useElements()
	const navigate = useNavigate()
	let paypalButtons: any
	let paypalButtonRef: HTMLElement
	const [paypalLoaded, setPaypalLoaded] = createSignal(false)

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

	//Paypal on hold for now
	/* onMount(async () => {
		const paypal = await loadScript({
			clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
			buyerCountry: 'US',
			components: ['buttons'],
			commit: false
		}).catch(err => {
			console.log('Failed to load Paypal script', err)
		})

		if (paypal && paypal.Buttons) {
			paypalButtons = paypal.Buttons({
				style: {
					layout: 'vertical',
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
	}) */

	/* createEffect(() => {
		if (paypalLoaded() && paypalButtons && paypalButtonRef) {
			paypalButtons.render(paypalButtonRef)
		}
	}) */

	return (
		<div class="">
			<header class="flex items-center justify-between my-3">
				<div class=" flex items-center md:py-1.8">
					<NumberIcons />
					<h1 class="text-base font-500 text-text_2 tracking-tighter ">Payment</h1>
				</div>
				<div class="hidden md:flex md:space-x-8"></div>
			</header>
			<Show when={true}>
				<form onSubmit={handleSubmit}>
					<PaymentElement />

					<button class="my-5 bg-accent_5 w-full min-h-42px rounded-0.5 text-accenttext_1 font-500">
						Pay - {currencyFormat(queryCart?.data?.cart?.total, 'USD')}
					</button>
				</form>
			</Show>
			{/* <Show when={paypalLoaded()}>
				<div
					onClick={() => console.log('PAYPAL PAYMENT')}
					ref={el => (paypalButtonRef = el)}
				></div>
			</Show> */}
			<div class="space-y-4 sm:space-y-auto sm:flex sm:space-x-30 justify-center items-center text-text_2 text-sm min-h-15vh">
				<div>
					<div class="font-500">Shipping:</div>
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
					<div class="font-500">Billing:</div>
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

/* export function CheckoutButtons(props: { clientSecret: string }) {
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
 */
