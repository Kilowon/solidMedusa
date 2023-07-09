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

	const primaryData = createQuery(() => ({
		queryKey: ['primary_data'],
		queryFn: async function () {
			const response = await fetch(`https://direct.shauns.cool/items/Primary`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			})
			const data = await response.json()
			return data
		},
		cacheTime: 15 * 60 * 1000,
		retry: 0,
		enabled: false
	}))

	const queryAllProducts = createQuery(() => ({
		queryKey: ['all-products'],
		queryFn: async function () {
			if (!queryCart?.data?.cart?.id) return
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

	createEffect(() => {
		if (!queryAllProducts?.data?.products[0]?.handle) {
			queryAllProducts.refetch()
		}
	})

	return (
		<main class="min-h-[100vh]">
			<div class="mx-1 sm:mx-auto sm:content-container mt-5 sm:mt-25 font-poppins space-y-5">
				<Show when={queryAllProducts?.data?.products}>
					<ol class="row-start-1 col-start-1 col-span-5 grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-5 gap-4 my-20">
						<li class="col-span-2 sm:col-span-1 grid justify-self-center content-center space-y-4 text-balance">
							<div class="space-y-1">
								<h1 class=" text-sm  xl:text-[1.2svw] font-500  text-text_1 tracking-tighter text-balance">
									{primaryData?.data?.data?.everything_title}
								</h1>
							</div>
							<p class="text-xs xl:text-sm  text-text_3  tracking-normal text-balance">
								{primaryData?.data?.data?.everything_subtitle}
							</p>
						</li>
						<For each={queryAllProducts?.data?.products}>
							{(product, index) => {
								let el: HTMLLIElement | undefined
								const [isVisible, setIsVisible] = createSignal(false)
								const [delay, setDelay] = createSignal(0)
								const visible = createVisibilityObserver({ threshold: 0.1 })(() => el)

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
														<ProductPreview
															{...product}
															wish={primaryData?.data?.data?.store_wish}
															tag={primaryData?.data?.data?.store_tag}
														/>
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
					</ol>
				</Show>
			</div>
		</main>
	)
}
