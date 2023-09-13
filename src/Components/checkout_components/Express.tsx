import { Show, createSignal, onMount, createEffect } from 'solid-js'
import { loadScript } from '@paypal/paypal-js'
import { getWindowSize } from '@solid-primitives/resize-observer'

export default function Express() {
	let paypalButtons: any
	let paypalButtonRef: HTMLElement
	const [windowSize, setWindowSize] = createSignal(getWindowSize())
	const [paypalLoaded, setPaypalLoaded] = createSignal(false)

	onMount(async () => {
		setWindowSize(getWindowSize())
		console.log('paypal Window', windowSize())

		const paypal = await loadScript({
			clientId: 'Ad28GEh45rpiSIzbgyTHn-ViCYfPa_A4prn6-d_Z09oxmsozpaHx21QDysng3P5_wd-sXdeQiMnM7hA3'
		})

		console.log(paypal)

		if (paypal && paypal.Buttons && windowSize().width >= 768) {
			paypalButtons = paypal.Buttons({
				style: {
					layout: 'horizontal',
					color: 'gold',
					shape: 'rect',
					label: 'paypal'
				}
			})
			setPaypalLoaded(true)
		}
		if (paypal && paypal.Buttons && windowSize().width < 768) {
			paypalButtons = paypal.Buttons({
				style: {
					layout: 'vertical',
					color: 'gold',
					shape: 'rect',
					label: 'paypal'
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
			<div class="  font-500 text-text_2 text-base tracking-tighter ">Express Checkout</div>
			<Show when={paypalLoaded()}>
				<div
					onClick={() => console.log('PAYPAL PAYMENT')}
					ref={el => (paypalButtonRef = el)}
				></div>
			</Show>
		</div>
	)
}
