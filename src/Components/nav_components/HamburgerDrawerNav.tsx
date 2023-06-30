import { For } from 'solid-js/web'
import { createSignal, Show, Suspense, SuspenseList, Accessor, createEffect } from 'solid-js'
import { A } from 'solid-start'
import { useGlobalContext } from '~/Context/Providers'
import { createQuery } from '@tanstack/solid-query'
import { isServer } from 'solid-js/web'
import { Transition } from 'solid-transition-group'

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
			const product = await medusa?.productCategories.list({})
			return product
		},
		cacheTime: 15 * 60 * 1000,
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
		return categories()?.filter((category: any) => rootCategory.some(cat => cat.name === category.name))
	}

	return (
		<div>
			<div
				class="flex items-center rounded-full z-1 relative"
				style="position: fixed; top: 0.85vh; left: 0.5rem; width: 3.75rem; height: 3rem;"
				title="Menu"
				role="button"
				tabindex="0"
				onClick={() => {
					setSelectedRoot(rootCategories())
					props.setMenuDrawer({ menu: 'active' })
				}}
				onkeypress={() => {
					setSelectedRoot(rootCategories())
					props.setMenuDrawer({ menu: 'active' })
				}}
			>
				<div class="i-ic-round-menu w-7 h-7 ml-2" />
			</div>
			<div
				class={`fixed inset-0 bg-white/30 z-200 transition-all duration-250 ease-in-out ${
					props.menuDrawer().menu === 'active' ? '' : 'opacity-0 pointer-events-none'
				}`}
				onClick={event => {
					if (event.target === event.currentTarget) {
						props.setMenuDrawer({ menu: 'hidden' })
					}
				}}
			>
				<div
					class={`fixed top-12 left-0 h-full w-[95vw] sm:w-[40vw] bg-white z-200 transform rounded-sm transition-transform duration-500 ease-in-out p-2 ${
						props.menuDrawer().menu === 'active' ? '' : ''
					}`}
					style={{ overflow: 'auto' }}
				>
					<Show when={selectedRoot()?.length > 0}>
						<ol class=" text-xl space-y-2 h-[120vh] ">
							<Show when={backButton() === 'active'}>
								<button
									class="flex space-x-2 items-center w-full py-1"
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
								{(collection: any) => {
									if (collection?.category_children?.length > 0) {
										return (
											<div class="flex justify-between space-x-0.5 capitalize">
												<A
													class="w-2/3 bg-gray-1"
													href={`/categories/${collection?.handle}`}
													onClick={() => {
														setBackButton('inactive')
														props.setMenuDrawer({ menu: 'hidden' })
													}}
												>
													<li class=" ml-2">{collection.name}</li>
												</A>

												<button
													class="flex w-1/3 py-1 justify-end bg-gray-1 capitalize"
													onClick={() => {
														setSelectedRoot(getChildrenOfRoot(collection.category_children))
														setBackButton('active')
													}}
												>
													<div class="i-octicon-chevron-right-12 text-2xl " />
												</button>
											</div>
										)
									}
									if (collection?.category_children?.length === 0) {
										return (
											<li
												class=" ml-2 w-full  text-gray-6 capitalize"
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

							<div class="flex flex-col space-y-1 ">
								<div class="text-base text-gray-5 bg-gray-2 p-2 capitalize">
									<A
										href={`/store/Store`}
										onClick={() => props.setMenuDrawer({ menu: 'hidden' })}
									>
										Shop All Our Items{' '}
									</A>
								</div>
								<Show when={collections()?.collections}>
									<For each={collections()?.collections}>
										{collection => {
											if (collection?.metadata?.menu !== 'hidden')
												return (
													<div
														class="text-base text-gray-5 bg-gray-2   p-2 rounded-0.5 capitalize"
														onClick={() => {
															setBackButton('inactive')
															props.setMenuDrawer({ menu: 'hidden' })
														}}
													>
														<A
															href={`/collections/${collection?.handle}`}
															onClick={() => props.setMenuDrawer({ menu: 'hidden' })}
														>
															Shop {collection?.title}
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
