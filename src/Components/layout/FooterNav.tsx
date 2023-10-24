import { createEffect, createSignal, For, Show, Accessor } from 'solid-js'
import { A } from 'solid-start'
import { useGlobalContext } from '~/Context/Providers'
import { createQuery } from '@tanstack/solid-query'
import { Transition } from 'solid-transition-group'

export default function FooterNav() {
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
		<div class="max-w-[1440px] w-full mx-auto  flex flex-col gap-y-8 pt-16 pb-8 z-1">
			<div class="flex items-center space-x-4">
				<A
					href="/"
					class="text-sm  md:text-xl xl:text-3xl text-gray-5 font-bold uppercase no-underline hover:underline"
				>
					Modern Edge
				</A>
				<A
					href="/"
					class="text-sm md:text-base text-gray-5 font-bold uppercase no-underline hover:underline"
				>
					Returns & Shipping
				</A>
				<A
					href="/"
					class="text-sm md:text-base text-gray-5 font-bold uppercase no-underline hover:underline"
				>
					Contact Us
				</A>
			</div>
			<div class="flex flex-col gap-y-6 sm:flex-row items-start justify-between">
				<div>
					<Show when={primaryData.isSuccess}>
						<div class=" bg-normal_1  top-16 left-0 px-5 rounded-br-5 select-none">
							<div class=" py-4">
								<div class="">
									<div class="flex flex-col space-y-8 ">
										<div class="flex items-start">
											<Show when={rootCategories()}>
												<ol class="flex flex-wrap">
													<For each={rootCategories()}>
														{(parentCategory: any) => {
															if (parentCategory.category_children?.length > 0) {
																return (
																	<li class="whitespace-nowrap space-y-4 mr-6 mb-6">
																		<div class="text-sm text-text_2 text-lg font-500 capitalize">
																			<A href={`/categories/${parentCategory.handle}`}>{parentCategory.name}</A>
																		</div>
																		<div class="space-y-2">
																			<For each={categories()}>
																				{(category: any) => {
																					if (category.parent_category?.id === parentCategory.id) {
																						return (
																							<div class="text-text_3 text-sm capitalize">
																								<A href={`/categories/${category.handle}`}>{category.name}</A>
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
				</div>
			</div>
			<div class="flex flex-col-reverse gap-y-4 justify-center sm:items-center sm:flex-row sm:items-end sm:justify-between">
				<span class="text-xs text-gray-500">© Copyright 2023 Modern Edge</span>
				<div class="min-w-[316px] flex sm:justify-end">{/* TODO: <CountrySelect /> */}</div>
			</div>
		</div>
	)
}
