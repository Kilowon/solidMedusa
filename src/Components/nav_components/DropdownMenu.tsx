import { createEffect, createSignal, For, Show, Suspense } from 'solid-js'
import { A } from 'solid-start'
import { useGlobalContext } from '~/Context/Providers'
import { createQuery } from '@tanstack/solid-query'
import { Transition } from 'solid-transition-group'

export default function DropdownMenu(props: any) {
	const { medusa } = useGlobalContext()
	const { collections } = useGlobalContext()

	const [open, setOpen] = createSignal(false)

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

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div
				class=" flex items-center justify-center h-full w-full hover:transition-opacity hover:duration-400  font-poppins
			"
				onMouseOver={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
			>
				<div>
					<div
						class="hover:cursor-pointer"
						title="Main Menu"
						role="button"
						tabindex="0"
						onClick={() => setOpen(true)}
						onkeypress={() => setOpen(true)}
					>
						<div class="i-ic-round-menu  w-7 h-7 ml-2" />
					</div>
				</div>
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
					<Show when={open()}>
						<Suspense fallback={<div>Loading...</div>}>
							<div class="bg-white absolute top-full w-full inset-x-0 z-30 mx-auto px-8">
								<div class="relative py-4">
									<div class="flex items-start  mx-auto px-8 ">
										<div class="flex flex-col ">
											<div class="flex space-x-12 ">
												<div class="text-base bg-gray-5 text-white  p-2">
													<A
														href={`/store/Store`}
														onClick={() => setOpen(false)}
													>
														Shop All Our Items
													</A>
												</div>
												<Show when={collections()?.collections}>
													<For each={collections()?.collections}>
														{collection => {
															if (collection?.metadata?.menu !== 'hidden')
																return (
																	<Suspense fallback={<div>Loading...</div>}>
																		<div class="text-base bg-gray-5/70 text-white  p-2 rounded-0.5">
																			<A
																				href={`/collections/${collection.handle}`}
																				onClick={() => setOpen(false)}
																			>
																				Shop {collection.title}
																			</A>
																		</div>
																	</Suspense>
																)
														}}
													</For>
												</Show>
											</div>
											<div class="flex items-start">
												<Show when={rootCategories()}>
													<ol class="flex flex-auto space-x-4 mt-2 ">
														<For each={rootCategories()}>
															{(collection: any) => {
																if (collection.category_children?.length > 0) {
																	return (
																		<Suspense fallback={<div>Loading...</div>}>
																			<li class="whitespace-nowrap space-y-4">
																				<span class="flex border border-gray-3"></span>
																				<div class="text-base text-gray-6 text-lg font-500">
																					<A
																						href={`/categories/${collection.handle}`}
																						onClick={() => setOpen(false)}
																					>
																						{collection.name}
																					</A>
																				</div>
																				<div class="space-y-2">
																					<For each={categories()}>
																						{(category: any) => {
																							if (category.parent_category?.id === collection.id) {
																								return (
																									<Suspense fallback={<div>Loading...</div>}>
																										<div class="text-gray-5">
																											<A
																												href={`/categories/${category.handle}`}
																												onClick={() => setOpen(false)}
																											>
																												{category.name}
																											</A>
																										</div>
																									</Suspense>
																								)
																							}
																						}}
																					</For>
																				</div>
																			</li>
																		</Suspense>
																	)
																}
															}}
														</For>

														<li class="flex flex-col whitespace-nowrap space-y-5">
															<span class="flex border border-gray-3"></span>
															<div class="text-base text-gray-6 font-500 space-y-2">
																<For each={rootCategories()}>
																	{(collection: any) => {
																		if (collection.category_children?.length === 0) {
																			return (
																				<Suspense fallback={<div>Loading...</div>}>
																					<div>
																						<A
																							href={`/categories/${collection.handle}`}
																							onClick={() => setOpen(false)}
																						>
																							{collection.name}
																						</A>
																					</div>
																				</Suspense>
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
						</Suspense>
					</Show>
				</Transition>
			</div>
		</Suspense>
	)
}
