import { useGlobalContext } from '~/Context/Providers'
import { createSignal, Show, For, createEffect } from 'solid-js'
import 'solid-slider/slider.css'
import { Transition } from 'solid-transition-group'
import { createQuery } from '@tanstack/solid-query'
import ProductPreview from '~/Components/nav_components/ProductPreview'
import { Motion, Presence } from '@motionone/solid'
import { Rerun } from '@solid-primitives/keyed'
import { createVisibilityObserver } from '@solid-primitives/intersection-observer'

interface Collection {
	id: string
	title: string
	metadata: {
		description: string
		location: 'hero' | 'menu' | 'footer'
		limit: number
	}
	// add any other properties here
}

interface FeaturedProps {
	variant?: 'hero' | 'menu' | 'footer'
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
			const product = await medusa?.products?.list({
				cart_id: queryCart?.data?.cart?.id,
				region_id: queryCart?.data?.cart?.region_id,
				collection_id: [currentFeatured()?.id],
				limit: 4
			})
			return product
		},
		cacheTime: 15 * 60 * 1000,
		refetchInterval: 15 * 60 * 1000,
		enabled: false
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
			>
				<div class="mx-1 sm:mx-auto sm:content-container sm:my-16 font-poppins">
					<Show when={queryCollection?.data?.products && currentFeatured()?.title}>
						<div class="mb-8">
							<h1 class="text-base md:text-xl lg:text-2xl font-500 text-gray-6 ">{currentFeatured()?.title}</h1>
							<div class="text-xs lg:text-base  text-gray-5">{currentFeatured()?.metadata?.description}</div>
						</div>
						<ol class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
												<div class="w-[191px] h-[275px]"></div>
											</Show>
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
