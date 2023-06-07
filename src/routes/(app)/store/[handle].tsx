import { useGlobalContext } from '~/Context/Providers'
import { createSignal, Show, For } from 'solid-js'
import 'solid-slider/slider.css'
import { Transition } from 'solid-transition-group'

import { getWindowSize } from '@solid-primitives/resize-observer'
import { createQuery } from '@tanstack/solid-query'
import ProductPreview from '~/Components/nav_components/ProductPreview'

export default function Store() {
	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()

	const [size, setSize] = createSignal(getWindowSize())

	function sidesVisible() {
		if (size().width > 1500) {
			return 4
		}
		if (size().width > 900) {
			return 3
		}
		if (size().width <= 900) {
			return 2
		}
	}

	const queryAllProducts = createQuery(() => ({
		queryKey: ['all-products'],
		queryFn: async function () {
			const product = await medusa?.products?.list({
				is_giftcard: false,
				cart_id: queryCart?.data?.cart?.id,
				region_id: queryCart?.data?.cart?.region_id,
				limit: 100
			})
			return product
		},
		cacheTime: 15 * 60 * 1000,
		staleTime: 15 * 60 * 1000
	}))

	return (
		<main>
			<Transition
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
			>
				<div class="content-container">
					<Show when={queryAllProducts?.data?.products}>
						<ol class="grid grid-cols-12 gap-4">
							<For each={queryAllProducts?.data?.products}>
								{product => {
									return (
										<li class="col-span-6 md:col-span-4 lg:col-span-3 ">
											<ProductPreview {...product} />
										</li>
									)
								}}
							</For>
						</ol>
					</Show>
				</div>
			</Transition>
		</main>
	)
}
