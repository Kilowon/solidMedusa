import { useGlobalContext } from '~/Context/Providers'
import { createSignal, Show, For } from 'solid-js'
import 'solid-slider/slider.css'
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
			<div class="mx-1 sm:mx-auto sm:content-container mt-5 sm:mt-25 font-poppins space-y-5">
				<div class="text-gray-6 font-500 text-base lg:text-2xl">Shop everything in the store</div>

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
		</main>
	)
}
