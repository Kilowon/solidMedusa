import { useGlobalContext } from '~/Context/Providers'
import { useParams, Title, Meta, ErrorBoundary } from 'solid-start'
import { createEffect, createSignal, Show, For, Suspense, onMount, untrack } from 'solid-js'
import { FlexCategories } from '~/Components/common/FlexCategories'
import 'solid-slider/slider.css'
import { SingleLineSlider } from '~/Components/common/ProductSlider'
import ProductPreview from '~/Components/nav_components/ProductPreview'
import { createQuery } from '@tanstack/solid-query'
import { Motion, Presence } from '@motionone/solid'
import { Rerun } from '@solid-primitives/keyed'
import { createVisibilityObserver } from '@solid-primitives/intersection-observer'
import { on } from 'events'

export default function Categories() {
	const params = useParams()

	const { queryCart } = useGlobalContext()
	const { medusa } = useGlobalContext()

	const queryCategories = createQuery(() => ({
		queryKey: ['categories_list'],
		queryFn: async function () {
			const product = await medusa?.productCategories?.list({ limit: 200 })
			return product
		},
		enabled: false
	}))

	const [currentCategoryId, setCurrentCategoryId] = createSignal([''])

	const queryCategoryProducts = createQuery(() => ({
		queryKey: ['categories_products', currentCategoryId()],
		queryFn: async function () {
			if (!queryCart?.data?.cart?.id) return
			if (!currentCategoryId()) return
			const product = await medusa?.products?.list({
				category_id: currentCategoryId(),
				cart_id: queryCart?.data?.cart?.id
			})
			setCategory(filterCategories())
			return product
		}
	}))

	createEffect(() => {
		if (!queryCategoryProducts?.data?.products[0]?.handle || queryCategoryProducts.data?.products?.length === undefined) {
			queryCategoryProducts.refetch()
		}
	})

	function filterCategories() {
		if (!queryCategories?.data?.product_categories) return
		return queryCategories?.data?.product_categories?.filter((category: any) => category.handle === params.handle)
	}

	const [currentCategory, setCategory] = createSignal(filterCategories())

	createEffect(() => {
		setCategory(filterCategories())
		console.log('run SET CATEGORY')
	})

	createEffect(() => {
		if (currentCategory?.()) {
			updateCurrentCategoryId()
			console.log('run UPDATE CURRENT CATEGORY ID')
		}
	})

	function updateCurrentCategoryId() {
		setCurrentCategoryId?.(currentCategory().map((category: any) => category.id))
	}

	const [parentCategories, setParentCategories] = createSignal([])

	function getParentCategories(categories: any[], params: any) {
		if (!categories) return

		const parentCategories = [categories.find((category: any) => category.handle === params.handle)]

		while (parentCategories[parentCategories.length - 1]?.parent_category) {
			const parentCategory = categories.find(
				(category: any) => category.name === parentCategories?.[parentCategories.length - 1]?.parent_category?.name
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
				console.log('run  GET PARENT CATEGORIES')
			}
		}
	})

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<main class="min-h-[100vh]">
				<ErrorBoundary>
					<Show
						when={currentCategory()}
						fallback={<div></div>}
					>
						<Title>{currentCategory?.()[0]?.name}</Title>
						<Meta
							itemProp="description"
							content={currentCategory?.()[0]?.handle}
						/>
						<Meta
							itemProp="og:title"
							content={currentCategory?.()[0]?.name}
						/>

						<div class="pt-4 lg:py-12 ">
							<Show
								when={parentCategories() && currentCategory()}
								fallback={<div class="w-[100px] h-[275px] bg-gray-8"></div>}
							>
								<div class="mx-1 sm:mx-auto sm:content-container sm:py-12 font-poppins antialiased  ">
									<FlexCategories
										parentCategories={parentCategories}
										currentCategory={currentCategory}
									/>

									<Show
										when={queryCategoryProducts.isSuccess}
										fallback={<div class="w-[100px] h-[275px] bg-purple-8"></div>}
									>
										<ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
											<For each={queryCategoryProducts.data?.products}>
												{(product: any, index) => {
													let el: HTMLLIElement | undefined
													const [isVisible, setIsVisible] = createSignal(false)
													const [delay, setDelay] = createSignal(0)
													const visible = createVisibilityObserver({ threshold: 0.2 })(() => el)

													createEffect(() => {
														if (visible()) {
															setIsVisible(true)
															setDelay((index() % 4) * 0.3)
														}
													})

													return (
														<li ref={el}>
															<Show
																when={isVisible()}
																fallback={<div class="w-[100px] h-[275px] bg-red"></div>}
															>
																<Presence initial>
																	<Rerun on={index}>
																		<Motion
																			animate={{ opacity: [0, 1] }}
																			transition={{ duration: 0.5, delay: index() * 0.1, easing: 'ease-in-out' }}
																		>
																			<ProductPreview {...product} />
																		</Motion>
																	</Rerun>
																</Presence>
															</Show>
															<Show when={!isVisible()}>
																<div class="w-[100px] h-[275px] bg-blue"></div>
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
							</Show>
						</div>
					</Show>
				</ErrorBoundary>
			</main>
		</Suspense>
	)
}
