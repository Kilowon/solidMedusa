import { useGlobalContext } from '~/Context/Providers'
import { createSignal, Show, For, createEffect, Suspense } from 'solid-js'
import 'solid-slider/slider.css'
import { Transition } from 'solid-transition-group'
import { createQuery } from '@tanstack/solid-query'
import ProductPreview from '~/Components/nav_components/ProductPreview'
import { Motion, Presence } from '@motionone/solid'
import { Rerun } from '@solid-primitives/keyed'
import { createVisibilityObserver } from '@solid-primitives/intersection-observer'
import { getWindowSize } from '@solid-primitives/resize-observer'

interface Collection {
	id: string
	title: string
	metadata: {
		description: string
		location: 'block_1' | 'block_2' | 'block_3' | 'block_4' | 'block_5' | 'block_6' | 'block_7' | 'block_8'
		limit: number
		sub_title_top: string
		sub_title_bottom: string
		mobile_limit: number
	}
	// add any other properties here
}

interface FeaturedProps {
	variant?: 'block_1' | 'block_2' | 'block_3' | 'block_4' | 'block_5' | 'block_6' | 'block_7' | 'block_8'
	item: {
		id: string
		status: string
		title: string
		sub_title_bottom: string
		top_line_tag: string[]
		menu_status: string
		menu_title: string
		location: string
		variant: string
		description: string
		type: string
	}
}

export default function FeaturedProducts(props: { variant: FeaturedProps['variant']; item: FeaturedProps['item'] }) {
	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()

	const [size, setSize] = createSignal({ width: 0, height: 0 })

	const [currentFeatured, setCurrentFeatured] = createSignal<Collection | null>(null)

	const [primaryDataFeatured, setPrimaryDataFeatured] = createSignal<any>(null)

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
		cacheTime: 15 * 60 * 1000,
		enabled: false
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
					Accept: 'application/json',
					priority: 'low'
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
		if (primaryData.isSuccess) {
			setPrimaryDataFeatured(matchCollections(currentFeatured()))
		}
	})

	function matchCollections(currentFeatured: any) {
		let match = primaryData?.data?.data?.main_page_component_block.filter(
			(block: any) => block.variant === currentFeatured?.metadata?.location
		)
		if (match?.length > 0) {
			return match[0]
		}
	}

	createEffect(() => {
		console.log('currentFeatured', primaryDataFeatured())
	})

	return (
		<section>
			<Transition
				onEnter={(el, done) => {
					const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
						duration: 250
					})
					a.finished.then(done)
				}}
			>
				<div class="mx-1 sm:mx-auto sm:content-container ">
					<Show
						when={
							currentFeatured()?.metadata.location === props.variant &&
							queryCollection?.data?.products &&
							primaryData.isSuccess
						}
					>
						<ol class="row-start-1 col-start-1 col-span-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12 my-18">
							<li class="col-span-1 sm:col-span-1 grid justify-self-center content-center space-y-4 text-balance max-w-60">
								<div class="space-y-1">
									<Show when={props.item.top_line_tag?.length > 0}>
										<ul class="flex space-x-2">
											<For each={props.item.top_line_tag}>
												{(item: any) => {
													return (
														<li class="flex items-center justify-center text-xs  xl:text-base font-500 px-1.5 text-normal_1 bg-accent_6 tracking-tighter text-balance rounded-0.5">
															{item}
														</li>
													)
												}}
											</For>
										</ul>
									</Show>
									<Show when={props.item?.title}>
										<h3 class=" text-sm  xl:text-[1.2svw] font-500 text-text_1 tracking-tighter text-balance">
											{props.item.title}
										</h3>
									</Show>
									<Show when={props.item.sub_title_bottom}>
										<h4 class=" text-xs   xl:text-sm font-500 text-text_2 tracking-tighter text-balance">
											{props.item.sub_title_bottom}
										</h4>
									</Show>
								</div>
								<Show when={props.item.description}>
									<p class="text-xs xl:text-sm text-text_3 ">{props.item.description}</p>
								</Show>
							</li>
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
									if (
										getWindowSize().width < 1280 &&
										getWindowSize().width > 639 &&
										index() >= 3 &&
										queryCollection?.data?.products?.length < 6
									) {
										console.log('SHORT', index())
										return
									}
									/* 
										if (getWindowSize().width < 639 && (index() - 1) % 2 === 0) {
											console.log('here', index())
											return
										} */
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
															transition={{ duration: 0.35, delay: index() * 0.05, easing: 'ease-in-out' }}
														>
															<ProductPreview
																{...product}
																wish={primaryData?.data?.data?.product_wish}
																tag={primaryData?.data?.data?.product_tag}
																component_type="standard"
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
		</section>
	)
}
