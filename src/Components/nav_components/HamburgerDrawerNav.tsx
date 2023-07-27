import { For } from 'solid-js/web'
import { createSignal, Show, Suspense, SuspenseList, Accessor, createEffect, onMount } from 'solid-js'
import { A } from 'solid-start'
import { useGlobalContext } from '~/Context/Providers'
import { createQuery } from '@tanstack/solid-query'
import { isServer } from 'solid-js/web'
import { Transition } from 'solid-transition-group'
import { on } from 'events'

type ShowForm = {
	menu: 'active' | 'hidden'
}
interface HamburgerNavProps {
	menuDrawer: Accessor<ShowForm>
	setMenuDrawer: (arg: { menu: 'active' | 'hidden' }) => void
}

export default function HamburgerDrawerNav(props: HamburgerNavProps) {
	const { medusa } = useGlobalContext()

	const { collections } = useGlobalContext()

	const queryCategories = createQuery(() => ({
		queryKey: ['categories_list'],
		queryFn: async function () {
			const product = await medusa?.productCategories.list({ limit: 200 })
			return product
		},
		cacheTime: 15 * 60 * 1000,
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

	const [categories, categoriesServerState] = createSignal([])

	const [rootCategories, setRootCategories] = createSignal([])

	createEffect(() => {
		categoriesServerState(queryCategories.data?.product_categories)
		setRootCategories(categories()?.filter((category: any) => category.parent_category_id === null))
	}, [queryCategories])

	const [selectedRoot, setSelectedRoot] = createSignal(rootCategories())
	const [backButton, setBackButton] = createSignal('inactive')

	function getChildrenOfRoot(rootCategory: { name: string }[]) {
		return categories()?.filter((category: any) => rootCategory.some((cat: any) => cat.id === category.id))
	}

	onMount(() => {
		setSelectedRoot(rootCategories())
	})

	createEffect(() => {
		if (props.menuDrawer().menu === 'active') {
			setSelectedRoot(rootCategories())
		}
	})

	function matchCollections(currentFeatured: any, primaryData: any) {
		let match = currentFeatured.filter((block: any) => block.metadata.location === primaryData)
		if (match.length === 0) return

		return match
	}

	return (
		<div>
			<div
				class={`fixed inset-0 bg-normal_2/30 backdrop-blur-6px z-200 transition-all duration-250 ease-in-out ${
					props.menuDrawer().menu === 'active' ? '' : 'opacity-0 pointer-events-none bg-normal_2/60'
				}`}
				onClick={event => {
					if (event.target === event.currentTarget) {
						props.setMenuDrawer({ menu: 'hidden' })
					}
				}}
			>
				<div
					class="i-ph-x-bold absolute right-3 top-4 w-5 h-5"
					onClick={event => {
						if (event.target === event.currentTarget) {
							props.setMenuDrawer({ menu: 'hidden' })
						}
					}}
				/>
				<div
					class={`fixed top-12 left-0 h-full w-[95vw] sm:w-[40vw] bg-normal_1 z-200 transform rounded-sm transition-transform duration-500 ease-in-out p-2 ${
						props.menuDrawer().menu === 'active' ? '' : ''
					}`}
					style={{ overflow: 'auto' }}
				>
					<Show when={selectedRoot()?.length > 0 && primaryData.isSuccess}>
						<ol class=" text-sm font-500 space-y-2 h-[120vh] ">
							<Show when={backButton() === 'active'}>
								<button
									class="flex space-x-2 items-center w-full py-1 bg-normal_1"
									onClick={() => {
										setSelectedRoot(rootCategories())
										setBackButton('inactive')
									}}
								>
									<div class="i-octicon-chevron-left-16 text-2xl" />
									<li class=" ml-2">Back</li>
								</button>
							</Show>
							<For each={selectedRoot()}>
								{(collection: any, index) => {
									if (collection?.parent_category_id !== null && index() === 0) {
										return (
											<div class="flex text-sm justify-between space-x-0.5 capitalize py-1">
												<A
													class="w-2/3 "
													href={`/categories/${collection?.parent_category?.handle}`}
													onClick={() => {
														setBackButton('inactive')
														props.setMenuDrawer({ menu: 'hidden' })
													}}
												>
													<li class=" ml-2">Shop All {collection?.parent_category?.name}</li>
												</A>
											</div>
										)
									}
								}}
							</For>
							<For each={selectedRoot()}>
								{(collection: any) => {
									if (collection?.category_children?.length > 0) {
										return (
											<div class="flex justify-between space-x-0.5 capitalize">
												<button
													class="flex w-2/3 py-1 justify-start capitalize bg-normal_1"
													onClick={() => {
														setSelectedRoot(getChildrenOfRoot(collection.category_children))
														setBackButton('active')
													}}
												>
													<li class=" ml-2 ">{collection.name}</li>
												</button>

												<button
													class="flex w-1/3 py-1 justify-end capitalize bg-normal_1"
													onClick={() => {
														setSelectedRoot(getChildrenOfRoot(collection.category_children))
														setBackButton('active')
													}}
												>
													<div class="i-octicon-chevron-right-12 w-4 h-4 " />
												</button>
											</div>
										)
									}
									if (collection?.category_children?.length === 0) {
										return (
											<li
												class=" ml-2 w-full py-1 text-text_3 capitalize"
												onClick={() => {
													setBackButton('inactive')
													props.setMenuDrawer({ menu: 'hidden' })
												}}
											>
												<A
													href={`/categories/${collection?.handle}`}
													onClick={() => {
														setBackButton('inactive')
														props.setMenuDrawer({ menu: 'hidden' })
													}}
												>
													{collection?.name}
												</A>
											</li>
										)
									}
								}}
							</For>

							<div class="flex flex-col space-y-0.5 ">
								<div class="text-sm font-500 text-accent_6  p-2 capitalize">
									<A
										href={`/store/Store`}
										onClick={() => props.setMenuDrawer({ menu: 'hidden' })}
									>
										{primaryData?.data?.data?.menu_shop_all}
									</A>
								</div>
								<Show when={primaryData.isSuccess && collections()?.collections.length > 0}>
									<For each={primaryData?.data?.data?.main_page_component_block}>
										{collection => {
											if (collection.status === 'archived') return

											if (import.meta.env.VITE_DRAFT_SITE === 'false') {
												if (collection.status === 'draft') return
											}

											if (collection?.menu_status !== 'menu')
												createEffect(() => {
													console.log(matchCollections(collections()?.collections, collection.variant))
												})
											if (collection?.menu_status === 'menu')
												return (
													<div
														class="text-sm font-500 text-accent_6    p-2 rounded-0.5 capitalize"
														onClick={() => {
															setBackButton('inactive')
															props.setMenuDrawer({ menu: 'hidden' })
														}}
													>
														<A
															href={`/collections/${matchCollections(collections()?.collections, collection.variant)[0]?.handle}`}
															onClick={() => props.setMenuDrawer({ menu: 'hidden' })}
														>
															{collection?.menu_title}
														</A>
													</div>
												)
										}}
									</For>
								</Show>
							</div>
						</ol>
					</Show>
				</div>
			</div>
		</div>
	)
}
