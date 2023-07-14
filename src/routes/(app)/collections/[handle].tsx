import { useGlobalContext } from '~/Context/Providers'
import { createSignal, Show, For, createEffect } from 'solid-js'
import 'solid-slider/slider.css'
import { Transition } from 'solid-transition-group'
import { useParams } from 'solid-start'
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
		sub_title_top: string
		sub_title_bottom: string
	}
	// add any other properties here
}

export default function Collection() {
	const params = useParams()
	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()

	const [currentCollection, setCurrentCollection] = createSignal<Collection | null>(null)

	createEffect(() => {
		if (queryCollectionsList?.data?.collections) {
			const collection = queryCollectionsList?.data?.collections.find(
				(collection: any) => collection.handle === params.handle
			)
			setCurrentCollection(collection)
			queryCollection.refetch()
		}
	}, [params.handle])

	const queryCollectionsList = createQuery(() => ({
		queryKey: ['collections-list'],
		queryFn: async function () {
			const collection = medusa?.collections?.list()
			return collection
		},
		cacheTime: 15 * 60 * 1000
	}))

	const queryCollection = createQuery(() => ({
		queryKey: ['collection', params.handle],
		queryFn: async function () {
			const product = await medusa?.products?.list({
				cart_id: queryCart?.data?.cart?.id,
				region_id: queryCart?.data?.cart?.region_id,
				collection_id: [currentCollection()?.id],
				limit: 100
			})
			return product
		},
		cacheTime: 15 * 60 * 1000,
		refetchInterval: 15 * 60 * 1000,
		enabled: false
	}))

	return (
		<main class="min-h-[100vh]">
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
				<div class="mx-1 sm:mx-auto sm:content-container ">
					<Show when={queryCollection?.data?.products}>
						<ol class="row-start-1 col-start-1 col-span-5 grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-5 gap-4 my-20">
							<li class="col-span-2 sm:col-span-1 grid justify-self-center content-center space-y-4 text-balance">
								<div class="space-y-1">
									<h2 class=" text-xs   xl:text-base font-500   text-text_2 tracking-tighter text-balance">
										{currentCollection()?.metadata?.sub_title_top}
									</h2>
									<h1 class=" text-sm  xl:text-[1.2svw] font-500  text-text_1 tracking-tighter text-balance">
										{currentCollection()?.title}
									</h1>
									<h2 class=" text-xs   xl:text-sm font-500  text-text_2 tracking-tighter text-balance">
										{currentCollection()?.metadata?.sub_title_bottom}
									</h2>
								</div>
								<p class="text-xs xl:text-sm  text-text_3  tracking-normal text-balance">
									{currentCollection()?.metadata?.description}
								</p>
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
						</ol>
					</Show>
				</div>
			</Transition>
		</main>
	)
}
