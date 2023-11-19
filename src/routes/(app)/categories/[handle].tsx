import { useGlobalContext } from '~/Context/Providers'
import { useParams, Title, Meta, useNavigate, A } from 'solid-start'
import { createEffect, createSignal, Show, For, Suspense } from 'solid-js'
import { FlexCategories } from '~/Components/common/FlexCategories'
import 'solid-slider/slider.css'
import ProductPreview from '~/Components/nav_components/ProductPreview'
import { createQuery } from '@tanstack/solid-query'
import { Transition } from 'solid-transition-group'
import clsx from 'clsx'
import { Spinner } from '~/Components/checkout_components/Spinner'

export default function Categories() {
	const params = useParams()
	const navigate = useNavigate()

	const { queryCart } = useGlobalContext()
	const { medusa } = useGlobalContext()

	const [singleProduct, setSingleProduct] = createSignal({} as any)

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
		enabled: false,
		deferStream: true
	}))

	const queryCategories = createQuery(() => ({
		queryKey: ['categories_list'],
		queryFn: async function () {
			const product = await medusa?.productCategories?.list({ limit: 200 })
			return product
		},
		retry: 0,
		enabled: false,
		deferStream: true
	}))

	const [currentCategoryId, setCurrentCategoryId] = createSignal([''])

	const queryCategoryProducts = createQuery(() => ({
		queryKey: ['categories_products', currentCategoryId()],
		queryFn: async function () {
			const product = await medusa?.products?.list({
				category_id: currentCategoryId(),
				cart_id: queryCart?.data?.cart?.id
			})
			setCategory(filterCategories())
			return product
		},
		retry: 0,
		enabled: !!currentCategoryId() && !!queryCart?.data?.cart?.id,
		deferStream: true
	}))

	//Causes a loop when item is empty
	/* 	createEffect(() => {
		if (!queryCategoryProducts?.data?.products[0]?.handle || queryCategoryProducts.data?.products?.length === undefined) {
			queryCategoryProducts.refetch()
		}
	}) */

	function filterCategories() {
		if (!queryCategories?.data?.product_categories) return
		return queryCategories?.data?.product_categories?.filter((category: any) => category.handle === params.handle)
	}

	const [currentCategory, setCategory] = createSignal(filterCategories())

	createEffect(() => {
		setCategory(filterCategories())
	})

	createEffect(() => {
		if (currentCategory?.()) {
			updateCurrentCategoryId()
		}
	})

	function updateCurrentCategoryId() {
		setCurrentCategoryId?.(currentCategory()?.map((category: any) => category.id))
	}

	const [parentCategories, setParentCategories] = createSignal([])

	function getParentCategories(categories: any[], params: any) {
		if (!categories) return

		const parentCategories = [categories.find((category: any) => category.handle === params.handle)]

		while (parentCategories[parentCategories.length - 1]?.parent_category) {
			const parentCategory = categories.find(
				(category: any) => category.id === parentCategories?.[parentCategories.length - 1]?.parent_category?.id
			)
			parentCategories.push(parentCategory)
		}

		setParentCategories(parentCategories?.reverse() as never[])

		return parentCategories
	}

	createEffect(() => {
		if (currentCategory?.()) {
			if (queryCategories.isSuccess) {
				getParentCategories(queryCategories?.data?.product_categories, params)
			}
		}
	})
	createEffect(() => {
		if (queryCategoryProducts.isSuccess && queryCategoryProducts.data?.products?.length === 1) {
			setSingleProduct(queryCategoryProducts.data.products[0])
			navigate(`/products/${singleProduct()?.handle}`)
		}
	})

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
				<Show when={currentCategory()}>
					<Title>{currentCategory?.()[0]?.name}</Title>
					<Meta
						itemProp="description"
						content={currentCategory?.()[0]?.handle}
					/>
					<Meta
						itemProp="og:title"
						content={currentCategory?.()[0]?.name}
					/>

					<Show when={parentCategories() && currentCategory()}>
						<div class="pt-1 lg:py-12 ">
							<div class="mx-1 sm:mx-auto sm:content-container sm:py-12 antialiased  ">
								<FlexCategories
									parentCategories={parentCategories}
									currentCategory={currentCategory}
								/>

								<Show
									when={queryCategoryProducts.isSuccess && queryCategoryProducts.data?.products.length > 1}
									fallback={
										<div
											class={clsx(
												'',
												queryCategoryProducts.isFetching && 'w-full h-50 flex justify-center items-center animate-pulse',
												!queryCategoryProducts.isFetching && 'hidden'
											)}
										>
											<Spinner />
										</div>
									}
								>
									<ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-1  sm:gap-x-4 gap-y-2 sm:gap-y-16">
										<For each={queryCategoryProducts.data?.products}>
											{(product: any, index) => {
												return (
													<li>
														<Show when={product !== undefined && params.handle}>
															<ProductPreview
																{...product}
																wish={primaryData?.data?.data?.category_wish}
																tag={primaryData?.data?.data?.category_tag}
																component_type="type_1"
															/>
														</Show>
													</li>
												)
											}}
										</For>
									</ul>
								</Show>

								{/* <SingleLineSlider
							slideVisible={6}
							categoryProducts={categoryProducts}
							setCurrentSlide={setCurrentSlide}
							setLoaded={setLoaded}
							loaded={loaded}
							currentSlide={currentSlide}
						/> */}
							</div>
						</div>
					</Show>
				</Show>
			</Transition>
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
				<Show
					when={
						queryCategoryProducts.isSuccess &&
						queryCategoryProducts.data?.products.length === 0 &&
						!queryCategoryProducts.isFetching
					}
				>
					<div class="text-center">
						<h1 class="text-2xl text-text_2 font-bold">No Products Found</h1>
						<div class="py-5"></div>
						<A
							href="/"
							class="bg-accent_6 text-accenttext_1 p-2 rounded-2"
						>
							Go Back
						</A>
					</div>
				</Show>
			</Transition>
		</main>
	)
}
