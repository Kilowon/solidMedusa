import { useGlobalContext } from '~/Context/Providers'
import { createSignal, Show, For, createEffect } from 'solid-js'
import 'solid-slider/slider.css'
import { Transition } from 'solid-transition-group'
import { useParams } from 'solid-start'
import { getWindowSize } from '@solid-primitives/resize-observer'
import { createQuery } from '@tanstack/solid-query'
import ProductPreview from '~/Components/nav_components/ProductPreview'

interface Collection {
	id: string
	title: string
	metadata: {
		description: string
	}
	// add any other properties here
}

export default function Collection() {
	const params = useParams()
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
		<main>
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
				<div class="mx-1 sm:mx-auto sm:content-container sm:mt-16 font-poppins">
					<Show when={queryCollection?.data?.products}>
						<div class="mb-8">
							<h1 class="text-base md:text-xl lg:text-3xl font-bold   text-gray-6 ">{currentCollection()?.title}</h1>
							<div class="text-xs lg:text-base  text-gray-5">{currentCollection()?.metadata?.description}</div>
						</div>
						<ol class="grid grid-cols-12 gap-4">
							<For each={queryCollection?.data?.products}>
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
			</Transition>
		</main>
	)
}
