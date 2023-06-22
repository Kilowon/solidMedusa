import { useGlobalContext } from '~/Context/Providers'
import { Show, For, createSignal, createEffect } from 'solid-js'
import 'solid-slider/slider.css'
import { createQuery } from '@tanstack/solid-query'
import ProductPreview from '~/Components/nav_components/ProductPreview'
import { Motion, Presence } from '@motionone/solid'
import { Rerun } from '@solid-primitives/keyed'
import { createVisibilityObserver } from '@solid-primitives/intersection-observer'

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
		cacheTime: 15 * 60 * 1000
		//staleTime: 15 * 60 * 1000
	}))

	return (
		<main>
			<div class="mx-1 sm:mx-auto sm:content-container mt-5 sm:mt-25 font-poppins space-y-5">
				<div class="text-gray-6 font-500 text-base lg:text-2xl">Shop everything in the store</div>

				<Show when={queryAllProducts?.data?.products}>
					<ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-4">
						<For each={queryAllProducts?.data?.products}>
							{(product, index) => {
								let el: HTMLLIElement | undefined
								const [isVisible, setIsVisible] = createSignal(false)
								const [delay, setDelay] = createSignal(0)
								const visible = createVisibilityObserver({ threshold: 0.7 })(() => el)

								createEffect(() => {
									if (visible()) {
										setIsVisible(true)
										setDelay((index() % 4) * 0.3)
									}
								})

								return (
									<li ref={el}>
										<Show when={isVisible()}>
											<Presence initial>
												<Rerun on={index}>
													<Motion
														animate={{ opacity: [0, 1] }}
														transition={{ duration: 0.5, delay: delay(), easing: 'ease-in-out' }}
													>
														<ProductPreview {...product} />
													</Motion>
												</Rerun>
											</Presence>
										</Show>

										<Show when={!isVisible()}>
											<div class="w-[100px] h-[275px]"></div>
										</Show>
									</li>
								)
							}}
						</For>
					</ul>
				</Show>
			</div>
		</main>
	)
}
