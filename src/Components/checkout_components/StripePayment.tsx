import { Show, createSignal, createEffect } from 'solid-js'
import { useNavigate } from 'solid-start'
import { createQuery } from '@tanstack/solid-query'
import { useGlobalContext } from '~/Context/Providers'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, useElements, useStripe } from './stripe_components/Elements'
import { PaymentElement } from './stripe_components/PaymentElements'
import { currencyFormat } from '~/lib/helpers/currency'
import { Spinner } from './Spinner'

export default function StripePayment() {
	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()
	const [stripe, setStripe] = createSignal<any>(null)

	createEffect(async () => {
		if (stripe() == null) {
			const result = await loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_KEY)
			setStripe(result)
		}
	})

	const paymentSessionStripe = createQuery(() => ({
		queryKey: ['cart'],
		queryFn: () => medusa?.carts.setPaymentSession(queryCart.data?.cart?.id, { provider_id: 'stripe' }),
		enabled: true
	}))

	return (
		<Show
			when={
				stripe() != null &&
				paymentSessionStripe?.data?.cart?.payment_session?.provider_id === 'stripe' &&
				paymentSessionStripe.isSuccess &&
				paymentSessionStripe?.data?.cart?.shipping_methods[0] != null
			}
			fallback={
				<div class="flex flex-col w-full h-full items-center pt-20">
					<Spinner />
				</div>
			}
		>
			<Elements
				stripe={stripe()}
				clientSecret={paymentSessionStripe?.data?.cart?.payment_session?.data?.client_secret}
			>
				<CheckoutForm clientSecret={paymentSessionStripe?.data?.cart?.payment_session?.data?.client_secret} />
			</Elements>
		</Show>
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
					<PaymentElement
						options={{
							layout: {
								type: 'accordion',
								defaultCollapsed: true,
								radios: true,
								spacedAccordionItems: true
							}
						}}
					/>

					<button class="my-5 bg-accent_5 w-full min-h-42px rounded-0.5 text-accenttext_1 font-500">
						Pay - {currencyFormat(queryCart?.data?.cart?.total, 'USD')}
					</button>
				</form>
			</Show>

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
