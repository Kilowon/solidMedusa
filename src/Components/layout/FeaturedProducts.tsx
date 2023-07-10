import { useGlobalContext } from '~/Context/Providers'
import { createSignal, Show, For, createEffect, onMount } from 'solid-js'
import 'solid-slider/slider.css'
import { Transition } from 'solid-transition-group'
import { createQuery } from '@tanstack/solid-query'
import ProductPreview from '~/Components/nav_components/ProductPreview'
import { Motion, Presence } from '@motionone/solid'
import { Rerun } from '@solid-primitives/keyed'
import { createVisibilityObserver } from '@solid-primitives/intersection-observer'
import clsx from 'clsx'
import { getWindowSize } from '@solid-primitives/resize-observer'

interface Collection {
	id: string
	title: string
	metadata: {
		description: string
		location: 'hero' | 'menu' | 'footer'
		limit: number
		sub_title_top: string
		sub_title_bottom: string
		mobile_limit: number
	}
	// add any other properties here
}

interface FeaturedProps {
	variant?: 'hero' | 'hero2' | 'hero3' | 'menu' | 'footer' | 'footer2'
}

export default function FeaturedProducts(props: FeaturedProps) {
	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()

	const [size, setSize] = createSignal({ width: 0, height: 0 })

	const [currentFeatured, setCurrentFeatured] = createSignal<Collection | null>(null)

	createEffect(() => {
		if (queryCollectionsList?.data?.collections) {
			const featured = queryCollectionsList?.data?.collections?.find((collection: Collection) => {
				return collection.metadata.location === props.variant
			})
			if (!featured) {
				queryCollectionsList?.data?.collections?.find((collection: Collection) => {
					return collection.metadata.location === props.variant
				})
			}
			if (currentFeatured() === featured) return
			setCurrentFeatured(featured)
			queryCollection.refetch()
		}
	})

	const queryCollectionsList = createQuery(() => ({
		queryKey: ['collections-list'],
		queryFn: async function () {
			const collection = medusa?.collections?.list()
			return collection
		},
		cacheTime: 15 * 60 * 1000
	}))

	const queryCollection = createQuery(() => ({
		queryKey: ['featured', props.variant],
		queryFn: async function () {
			if (!currentFeatured()?.id) return null
			if (!queryCart?.data?.cart?.id) return null
			const product = await medusa?.products?.list({
				cart_id: queryCart?.data?.cart?.id,
				region_id: queryCart?.data?.cart?.region_id,
				collection_id: [currentFeatured()?.id],
				limit: 50
			})
			return product
		},
		cacheTime: 15 * 60 * 1000,
		refetchInterval: 15 * 60 * 1000,
		enabled: false
	}))

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

	createEffect(() => {
		if (currentFeatured()?.id && queryCart?.data?.cart?.id) {
			queryCollection.refetch()
		}
	})

	return (
		<section>
			<Show when={currentFeatured()?.metadata.location === props.variant}>
				<Transition
					onEnter={(el, done) => {
						const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
							duration: 250
						})
						a.finished.then(done)
					}}
				>
					<div class=" sm:content-container font-poppins ">
						<Show when={queryCollection?.data?.products}>
							<ol class="row-start-1 col-start-1 col-span-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-16 my-32">
								<li class="col-span-2 sm:col-span-1 grid justify-self-center content-center space-y-4 text-balance max-w-60">
									<div class="space-y-1">
										<h2 class=" text-xs  xl:text-base font-500  text-text_2 tracking-tighter text-balance">
											{currentFeatured()?.metadata?.sub_title_top}
										</h2>
										<h1 class=" text-sm  xl:text-[1.2svw] font-500 text-text_1 tracking-tighter text-balance">
											{currentFeatured()?.title}
										</h1>
										<h2 class=" text-xs   xl:text-sm font-500 text-text_2 tracking-tighter text-balance">
											{currentFeatured()?.metadata?.sub_title_bottom}
										</h2>
									</div>
									<p class="text-xs xl:text-sm text-text_3 tracking-normal text-balance">
										{currentFeatured()?.metadata?.description}
									</p>
								</li>
								<For each={queryCollection?.data?.products}>
									{(product, index) => {
										let el: HTMLLIElement | undefined
										const [isVisible, setIsVisible] = createSignal(false)
										const [delay, setDelay] = createSignal(0)
										const visible = createVisibilityObserver({ threshold: 0.3 })(() => el)
										console.log(
											(getWindowSize().width > 1023 && index() >= 4) ||
												(getWindowSize().width > 1023 && index() < 5 && index() % 5 === 0)
										)

										createEffect(() => {
											if (visible()) {
												setIsVisible(true)
												setDelay((index() % 4) * 0.3)
											}
										})
										if (
											getWindowSize().width < 1280 &&
											getWindowSize().width > 639 &&
											index() >= 3 &&
											queryCollection?.data?.products?.length < 6
										) {
											console.log('SHORT', index())
											return
										}

										if (getWindowSize().width < 639 && (index() - 1) % 2 === 0) {
											console.log('here', index())
											return
										}
										if (getWindowSize().width > 1280 && index() >= 4 && queryCollection?.data?.products?.length < 7) {
											console.log('here', index())
											return
										}

										return (
											<li ref={el}>
												<Show when={isVisible()}>
													<Presence initial>
														<Rerun on={index}>
															<Motion
																animate={{ opacity: [0, 1] }}
																transition={{ duration: 0.5, delay: index() * 0.1, easing: 'ease-in-out' }}
															>
																<ProductPreview
																	{...product}
																	wish={primaryData?.data?.data?.product_wish}
																	tag={primaryData?.data?.data?.product_tag}
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
				</Transition>
			</Show>
		</section>
	)
}
