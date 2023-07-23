import { createEffect, createSignal, For, Show, Accessor, onMount } from 'solid-js'
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

	const [categories, categoriesServerState] = createSignal([])

	const [rootCategories, setRootCategories] = createSignal([])
	createEffect(() => {
		categoriesServerState(queryCategories.data?.product_categories)
		setRootCategories(categories()?.filter((category: any) => category.parent_category_id === null))
	}, [queryCategories])

	return (
		<div
			class=" flex items-center justify-center h-full w-full hover:transition-opacity hover:duration-400 
			"
		>
			{/* <div>
				<div
					class="hover:cursor-pointer"
					title="Main Menu"
					role="button"
					tabindex="0"
					onKeyDown={e => {
						if (e.key === 'Enter') {
							return setOpen(true)
						}
						if (e.key === 'Escape') {
							return setOpen(false)
						}
					}}
				>
					<div
						class="i-ic-round-menu  w-7 h-7 ml-2"
						onclick={e => {
							e.stopPropagation()
							setOpen(!open())
							console.log(open())
						}}
					/>
				</div>
			</div> */}
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
				<Show when={props.openMenu()}>
					<div
						class=" bg-normal_2 absolute top-full w-full inset-x-0 z-30 mx-auto px-8"
						/* onMouseLeave={() => setOpen(false)} */
					>
						<div class="relative py-4">
							<div class="flex items-start  mx-auto px-8 ">
								<div class="flex flex-col space-y-8 ">
									<div class="flex space-x-12 ">
										<div class="text-base  bg-text_1 text-normal_2 rounded-0.5  p-2">
											<A
												href={`/store/Store`}
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
												Shop All Our Items
											</A>
										</div>
										<Show when={collections()?.collections}>
											<For each={collections()?.collections}>
												{collection => {
													if (collection?.metadata?.menu !== 'hidden')
														return (
															<div class="text-base bg-text_3 text-normal_2  p-2 rounded-0.5">
																<A
																	href={`/collections/${collection.handle}`}
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
																	Shop {collection.title}
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
											<ol class="flex flex-auto space-x-6 mt-2 ">
												<For each={rootCategories()}>
													{(parentCategory: any) => {
														if (parentCategory.category_children?.length > 0) {
															return (
																<li class="whitespace-nowrap space-y-4">
																	<div class="text-base text-text_2 text-lg font-500 capitalize">
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
																						<div class="text-text_3/85 capitalize">
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
													<div class="text-base text-text_2 font-500 space-y-3">
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
