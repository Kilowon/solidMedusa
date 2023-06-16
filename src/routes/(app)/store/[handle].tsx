import { useGlobalContext } from '~/Context/Providers'
import { Show, For } from 'solid-js'
import 'solid-slider/slider.css'
import { createQuery } from '@tanstack/solid-query'
import ProductPreview from '~/Components/nav_components/ProductPreview'
import { Motion, Presence } from '@motionone/solid'
import { Rerun } from '@solid-primitives/keyed'

export default function Store() {
	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()

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
					<ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-4">
						<For each={queryAllProducts?.data?.products}>
							{(product, index) => {
								return (
									<Presence initial>
										<Rerun on={index}>
											<Motion
												animate={{ opacity: [0, 1] }}
												transition={{ duration: 0.75, delay: index() * 0.25, easing: 'ease-in-out' }}
											>
												<li>
													<ProductPreview {...product} />
												</li>
											</Motion>
										</Rerun>
									</Presence>
								)
							}}
						</For>
					</ul>
				</Show>
			</div>
		</main>
	)
}
