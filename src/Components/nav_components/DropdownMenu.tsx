import { createEffect, createSignal, For, Show, Accessor } from 'solid-js'
import { A } from 'solid-start'
import { useGlobalContext } from '~/Context/Providers'
import { createQuery } from '@tanstack/solid-query'
import { Transition } from 'solid-transition-group'

export default function DropdownMenu(props: {
	openMenu: Accessor<boolean>
	setOpenMenu: (arg: boolean) => void
	product: any
	collection: any
}) {
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
			const response = await fetch(`${import.meta.env.VITE_DIRECTUS_URL}/items/Primary`, {
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

	const [categories, setCategories] = createSignal([])

	const [rootCategories, setRootCategories] = createSignal([])
	createEffect(() => {
		setCategories(queryCategories.data?.product_categories)

		// Find the parent category
		const parentCategory: any = categories()?.find(
			(category: any) => category.name === import.meta.env.VITE_MENU_CATEGORY_BASE
		)

		// Filter the categories where parent_category_id matches the parent category's id
		setRootCategories(categories()?.filter((category: any) => category.parent_category_id === parentCategory?.id))
	}, [queryCategories])

	function matchCollections(currentFeatured: any, primaryData: any) {
		let match = currentFeatured.filter((block: any) => block.metadata.location === primaryData)
		if (match.length === 0) return

		return match
	}

	return (
		<div
			class=" 
			"
		>
			<Transition
				onEnter={(el, done) => {
					const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
						duration: 150
					})
					a.finished.then(done)
				}}
				onExit={(el, done) => {
					const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
						duration: 200
					})
					a.finished.then(done)
				}}
			>
				<Show when={props.openMenu() && primaryData.isSuccess}>
					<div class=" bg-normal_1 fixed top-16 left-0 px-5 rounded-br-5 select-none">
						<div class="relative py-4">
							<div class="">
								<div class="flex flex-col space-y-8 ">
									<div class="flex flex-wrap">
										<div class="text-sm  text-accent_6 mr-6 font-500">
											<A
												href={`/store/Store`}
												onClick={e => {
													e.stopPropagation()

													props.setOpenMenu(false)
												}}
												onKeyDown={e => {
													if (e.key === 'Escape') {
														return props.setOpenMenu(false)
													}
												}}
											>
												{primaryData?.data?.data?.menu_shop_all}
											</A>
										</div>
										<Show when={primaryData.isSuccess && collections()?.collections.length > 0}>
											<For each={primaryData?.data?.data?.menu_collection}>
												{collection => {
													createEffect(() => {
														console.log('PLOOP', matchCollections(collections()?.collections, collection?.item?.variant))
													})

													if (collection?.item?.status === 'archived') return

													if (import.meta.env.VITE_DRAFT_SITE === 'false') {
														if (collection?.item?.status === 'draft') return
													}

													if (collection?.item?.menu_status !== 'menu')
														createEffect(() => {
															console.log(matchCollections(collections()?.collections, collection?.item?.variant))
														})

													if (collection?.item?.menu_status === 'menu')
														return (
															<div class="text-sm text-sm  text-accent_6 mr-6 font-500">
																<A
																	href={`/collections/${
																		matchCollections(collections()?.collections, collection?.item?.variant)[0]?.handle
																	}`}
																	onClick={e => {
																		e.stopPropagation()

																		props.setOpenMenu(false)
																	}}
																	onKeyDown={e => {
																		if (e.key === 'Escape') {
																			return props.setOpenMenu(false)
																			console.log(open())
																		}
																	}}
																>
																	{collection?.item?.menu_title}
																</A>
															</div>
														)
												}}
											</For>
										</Show>
									</div>
									<hr class="border-text_4/50 my-2 mx-6" />
									<div class="flex items-start">
										<Show when={rootCategories()}>
											<ol class="flex flex-wrap">
												<For each={rootCategories()}>
													{(parentCategory: any) => {
														if (parentCategory.category_children?.length > 0) {
															return (
																<li class="whitespace-nowrap space-y-4 mr-6 mb-6">
																	<div class="text-sm text-text_2 text-lg font-500 capitalize">
																		<A
																			href={`/categories/${parentCategory.handle}`}
																			onClick={e => {
																				e.stopPropagation()

																				props.setOpenMenu(false)
																			}}
																			onKeyDown={e => {
																				if (e.key === 'Escape') {
																					return props.setOpenMenu(false)
																					console.log(open())
																				}
																			}}
																		>
																			{parentCategory.name}
																		</A>
																	</div>
																	<div class="space-y-2">
																		<For each={categories()}>
																			{(category: any) => {
																				if (category.parent_category?.id === parentCategory.id) {
																					return (
																						<div class="text-text_3 text-sm capitalize">
																							<A
																								href={`/categories/${category.handle}`}
																								onClick={e => {
																									e.stopPropagation()

																									props.setOpenMenu(false)
																								}}
																								onKeyDown={e => {
																									if (e.key === 'Escape') {
																										return props.setOpenMenu(false)
																										console.log(open())
																									}
																								}}
																							>
																								{category.name}
																							</A>
																						</div>
																					)
																				}
																			}}
																		</For>
																	</div>
																</li>
															)
														}
													}}
												</For>

												<li class="flex flex-col whitespace-nowrap ">
													<div class="text-sm text-text_2 font-500 space-y-3">
														<For each={rootCategories()}>
															{(collection: any) => {
																if (collection.category_children?.length === 0) {
																	return (
																		<div class="capitalize">
																			<A
																				href={`/categories/${collection.handle}`}
																				//onClick={() => setOpen(false)}
																			>
																				{collection.name}
																			</A>
																		</div>
																	)
																}
															}}
														</For>
													</div>
												</li>
											</ol>
										</Show>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Show>
			</Transition>
		</div>
	)
}
