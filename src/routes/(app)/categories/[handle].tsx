import { useGlobalContext } from '~/Context/Providers'
import { useParams, Title, Meta } from 'solid-start'
import { createEffect, createSignal, Show, For } from 'solid-js'
import { FlexCategories } from '~/Components/common/FlexCategories'
import 'solid-slider/slider.css'
import { SingleLineSlider } from '~/Components/common/ProductSlider'
import ProductPreview from '~/Components/nav_components/ProductPreview'
import { createQuery } from '@tanstack/solid-query'
import { Motion, Presence } from '@motionone/solid'
import { Rerun } from '@solid-primitives/keyed'
import { createVisibilityObserver } from '@solid-primitives/intersection-observer'

export default function Categories() {
	const params = useParams()

	const { queryCart } = useGlobalContext()
	const { medusa } = useGlobalContext()

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
			const product = await medusa?.products?.list({
				category_id: currentCategoryId(),
				cart_id: queryCart?.data?.cart?.id
			})
			setCategory(filterCategories())
			return product
		},
		enabled: !!currentCategoryId() && !!queryCart?.data?.cart?.id
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

	return (
		<main class="min-h-[100vh]">
			<Show
				when={currentCategory()}
				
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

				<div class="pt-1 lg:py-12 ">
					<Show when={parentCategories() && currentCategory()}>
						<div class="mx-1 sm:mx-auto sm:content-container sm:py-12 antialiased  ">
							<FlexCategories
								parentCategories={parentCategories}
								currentCategory={currentCategory}
							/>

							<Show when={queryCategoryProducts.isSuccess}>
								<ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-1  sm:gap-x-4 gap-y-2 sm:gap-y-16">
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
													<Show when={index() > 7 || isVisible()}>
														<Presence initial>
															<Rerun on={index}>
																<Motion
																	animate={{ opacity: [3, 1] }}
																	transition={{ duration: 0.5, delay: index() * 0.1, easing: 'ease-in-out' }}
																>
																	<ProductPreview
																		{...product}
																		wish={primaryData?.data?.data?.category_wish}
																		tag={primaryData?.data?.data?.category_tag}
																	/>
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
		</main>
	)
}
