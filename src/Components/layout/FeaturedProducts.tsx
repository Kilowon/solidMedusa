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

interface Collection {
	id: string
	title: string
	metadata: {
		description: string
		location: 'hero' | 'menu' | 'footer'
		limit: number
		sub_title_top: string
		sub_title_bottom: string
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
				limit: 20
			})
			return product
		},
		cacheTime: 15 * 60 * 1000,
		refetchInterval: 15 * 60 * 1000,
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
					<aside class="mx-1 sm:mx-auto sm:content-container-wide sm:my-16 font-poppins grid md:grid-cols-3 lg:grid-cols-5">
						<Show when={queryCollection?.data?.products}>
							<ol class="row-start-1 col-start-1 col-span-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
								<header class=" col-start-1 col-span-2 lg:col-span-1 grid justify-self-center content-center space-y-4">
									<div class="space-y-1">
										<h2 class=" text-sm md:text-base  lg:text-base font-500 text-gray-6/80 tracking-tighter">
											{currentFeatured()?.metadata?.sub_title_top}
										</h2>
										<h1 class=" text-base md:text-base lg:text-[1.2svw] font-500 text-gray-6 tracking-tighter">
											{currentFeatured()?.title}
										</h1>
										<h2 class=" text-sm md:text-base  lg:text-base font-500 text-gray-6/80 tracking-tighter">
											{currentFeatured()?.metadata?.sub_title_bottom}
										</h2>
									</div>
									<p class="text-sm md:text-base  lg:text-base text-gray-5 tracking-normal">
										{currentFeatured()?.metadata?.description}
									</p>
								</header>
								<For each={queryCollection?.data?.products}>
									{(product, index) => {
										let el: HTMLLIElement | undefined
										const [isVisible, setIsVisible] = createSignal(false)
										const [delay, setDelay] = createSignal(0)
										const visible = createVisibilityObserver({ threshold: 0.3 })(() => el)

										createEffect(() => {
											if (visible()) {
												setIsVisible(true)
												setDelay((index() % 4) * 0.3)
											}
										})

										if (currentFeatured()?.metadata?.limit && index() > currentFeatured()?.metadata?.limit! - 1) return

										return (
											<li ref={el}>
												<Show when={isVisible()}>
													<Presence initial>
														<Rerun on={index}>
															<Motion
																animate={{ opacity: [0, 1] }}
																transition={{ duration: 0.5, delay: index() * 0.1, easing: 'ease-in-out' }}
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
							</ol>
						</Show>
					</aside>
				</Transition>
			</Show>
		</section>
	)
}
