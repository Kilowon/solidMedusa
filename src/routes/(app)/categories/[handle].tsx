import { useGlobalContext } from '~/Context/Providers'
import { useParams, Title, Meta, ErrorBoundary } from 'solid-start'
import { createEffect, createSignal, Show, For, Suspense } from 'solid-js'
import { FlexCategories } from '~/Components/common/FlexCategories'
import 'solid-slider/slider.css'
import { SingleLineSlider } from '~/Components/common/ProductSlider'
import ProductPreview from '~/Components/nav_components/ProductPreview'
import { createQuery } from '@tanstack/solid-query'
import { Motion, Presence } from '@motionone/solid'
import { onMount } from 'solid-js'

export default function Categories() {
	const params = useParams()

	const { cart } = useGlobalContext()
	const { medusa } = useGlobalContext()

	const [toggle, setToggle] = createSignal(true)

	/* 	let listRef: any
	const { play, getIsFinished, replay } = createAnimation(
		() => listRef,
		{ y: -20, opacity: 1 },
		{
			delay: stagger(1, { from: 'first' }),
			duration: 1.5,
			easing: [0.22, 0.03, 0.26, 1]
		}
	)

	// Play the animation on mount of the component
	onMount(() => {
		play()
	})
 */
	/////////////////////////////////////////////////////////////////////

	const queryCategories = createQuery(() => ({
		queryKey: ['categories_list'],
		queryFn: async function () {
			const product = await medusa?.productCategories?.list({})
			return product
		}
		//enabled: false
	}))

	const [currentCategoryId, setCurrentCategoryId] = createSignal([''])

	const queryCategoryProducts = createQuery(() => ({
		queryKey: ['categories_products', currentCategoryId()],
		queryFn: async function () {
			const product = await medusa?.products?.list({
				category_id: currentCategoryId(),
				cart_id: cart?.result?.cart?.id
			})
			return product
		},
		cacheTime: 15 * 60 * 1000
		//enabled: false
	}))

	/////////////////////////////////////////////////////////////////////

	function filterCategories() {
		return queryCategories?.data?.product_categories?.filter((category: any) => category.handle === params.handle)
	}

	const [currentCategory, setCategory] = createSignal(filterCategories())

	createEffect(() => {
		if (!filterCategories()) return
		setCategory(filterCategories())

		if (!currentCategory()) return
		setCurrentCategoryId?.(currentCategory().map((category: any) => category.id))
	}, [params.handle])
	/////////////////////////////////////////////////////////////////////
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
		if (!queryCategories?.data?.product_categories) return
		getParentCategories(queryCategories?.data?.product_categories, params)
	}, [currentCategory?.()])
	/////////////////////////////////////////////////////////////////////
	createEffect(() => {
		console.log('categoryProducts', queryCategoryProducts.data?.products?.length)
	})

	return (
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
						fallback={<div></div>}
					>
						<div class="mx-1 sm:mx-auto sm:content-container lg:py-12 font-poppins antialiased ">
							<FlexCategories
								parentCategories={parentCategories}
								currentCategory={currentCategory}
							/>

							<Suspense fallback={<div>Loading...</div>}>
								<Show
									when={queryCategoryProducts.isFetched && queryCategoryProducts.data?.products?.length > 0}
									fallback={<div></div>}
								>
									<ul class="grid grid-cols-4 gap-2">
										<For each={queryCategoryProducts.data?.products}>
											{(product: any) => (
												<Presence exitBeforeEnter>
													<Show when={queryCategoryProducts.isFetched}>
														<Motion
															animate={{ opacity: [0, 1] }}
															transition={{ duration: 0.5, easing: 'ease-in-out' }}
														>
															<li class="col-span-2 sm:col-span-2 lg:col-span-1">
																<ProductPreview {...product} />
															</li>
														</Motion>
													</Show>
												</Presence>
											)}
										</For>
									</ul>
								</Show>
							</Suspense>
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
	)
}
