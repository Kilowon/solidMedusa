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
import clsx from 'clsx'

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
		component_type: 'type_1' | 'type_2' | 'type_3' | 'type_4' | 'type_5' | 'type_6'
		extended_type: 'extended' | 'default'
		text_size:
			| 'text-xs'
			| 'text-sm'
			| 'text-base'
			| 'text-lg'
			| 'text-xl'
			| 'text-2xl'
			| 'text-3xl'
			| 'text-4xl'
			| 'text-5xl'
			| 'text-6xl'
			| 'text-7xl'
			| 'text-8xl'

		background_colors:
			| 'normal_1'
			| 'normal_2'
			| 'normal_3'
			| 'normal_4'
			| 'surface'
			| 'text_4'
			| 'text_5'
			| 'accent_4'
			| 'accent_5'
			| 'accent_6'
			| 'accent_7'
			| 'accent_8'
			| 'accent_9'
			| 'accent_10'
	}
}

export default function FeaturedProductsLg(props: { variant: FeaturedProps['variant']; item: FeaturedProps['item'] }) {
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
			const response = await fetch(`${import.meta.env.VITE_DIRECTUS_URL}/items/Primary`, {
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
		let match = primaryData?.data?.data?.menu_collection?.filter(
			(block: any) => block.variant === currentFeatured?.metadata?.location
		)
		if (match?.length > 0) {
			return match[0]
		}
	}

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
						<ol class="row-start-1 col-start-1 col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-2 sm:gap-x-4 sm:gap-y-6 lg:gap-x-8 lg:gap-y-12 my-18">
							<Show when={props.item.title}>
								<li
									class={clsx(
										' col-span-1 sm:col-span-1 grid content-center space-y-4 text-balance   w-full py-10 px-2 lg:py-auto lg:px-auto rounded-1 lg:p-4 ',
										props.item.background_colors === 'normal_1' && 'bg-normal_1',
										props.item.background_colors === 'normal_2' && 'bg-normal_2',
										props.item.background_colors === 'normal_3' && 'bg-normal_3',
										props.item.background_colors === 'normal_4' && 'bg-normal_4',
										props.item.background_colors === 'surface' && 'bg-surface',
										props.item.background_colors === 'text_4' && 'bg-text_4',
										props.item.background_colors === 'text_5' && 'bg-text_5',
										props.item.background_colors === 'accent_4' && 'bg-accent_4',
										props.item.background_colors === 'accent_5' && 'bg-accent_5',
										props.item.background_colors === 'accent_6' && 'bg-accent_6',
										props.item.background_colors === 'accent_7' && 'bg-accent_7',
										props.item.background_colors === 'accent_8' && 'bg-accent_8',
										props.item.background_colors === 'accent_9' && 'bg-accent_9',
										props.item.background_colors === 'accent_10' && 'bg-accent_10'
									)}
								>
									<div class="space-y-1">
										<Show when={props.item.top_line_tag?.length > 0}>
											<ul class="flex space-x-2">
												<For each={props.item.top_line_tag}>
													{(item: any) => {
														return (
															<li class="flex items-center justify-center text-xs  xl:text-sm font-500 px-1.5 text-normal_1 bg-accent_6 tracking-tighter text-balance rounded-0.5">
																{item}
															</li>
														)
													}}
												</For>
											</ul>
										</Show>
										<Show when={props.item.title}>
											<h3
												class={clsx(
													' font-700 text-text_2 tracking-tighter text-balance',
													props.item.text_size === 'text-xs' && 'text-xs',
													props.item.text_size === 'text-sm' && 'text-sm',
													props.item.text_size === 'text-base' && 'text-base',
													props.item.text_size === 'text-lg' && 'text-lg',
													props.item.text_size === 'text-xl' && 'text-xl lg:text-xl',
													props.item.text_size === 'text-2xl' && 'text-2xl lg:text-2xl',
													props.item.text_size === 'text-3xl' && 'text-2xl lg:text-3xl',
													props.item.text_size === 'text-4xl' && 'text-2xl lg:text-4xl',
													props.item.text_size === 'text-5xl' && 'text-2xl lg:text-5xl',
													props.item.text_size === 'text-6xl' && 'text-2xl lg:text-6xl',
													props.item.text_size === 'text-7xl' && 'text-2xl lg:text-7xl',
													props.item.text_size === 'text-8xl' && 'text-2xl lg:text-8xl'
												)}
											>
												{props.item.title}
											</h3>
										</Show>
										<Show when={props.item.sub_title_bottom}>
											<h4 class=" text-md   xl:text-sm font-500 text-text_2 tracking-tighter text-balance">
												{props.item.sub_title_bottom}
											</h4>
										</Show>
										<Show when={props.item.description}>
											<p class="text-xs xl:text-sm text-text_3 tracking-normal text-balance">{props.item.description}</p>
										</Show>
									</div>
								</li>
							</Show>
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
																component_type={props.item.component_type}
																extended_type={props.item.extended_type}
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
