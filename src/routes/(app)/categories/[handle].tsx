import { useGlobalContext } from '~/Context/Providers'
import { useParams, Title, Meta } from 'solid-start'
import { createEffect, createSignal, Show, For, Suspense } from 'solid-js'
import 'solid-slider/slider.css'
import { FlexCategories } from '~/Components/common/FlexCategories'
import { SingleLineSlider } from '~/Components/common/ProductSlider'
import ProductPreview from '~/Components/nav_components/ProductPreview'

export default function Categories() {
	const params = useParams()
	const { categories } = useGlobalContext()
	const { setCurrentCategoryId } = useGlobalContext()
	const { categoryProducts } = useGlobalContext()
	const [currentSlide, setCurrentSlide] = createSignal(0)
	const [loaded, setLoaded] = createSignal(false)

	const [parentCategories, setParentCategories] = createSignal([])

	function filterCategories() {
		return categories()?.filter((category: any) => category.handle === params.handle)
	}

	const [currentCategory, setCategory] = createSignal(filterCategories())

	createEffect(() => {
		setCategory(filterCategories())
		setCurrentCategoryId?.(currentCategory().map((category: any) => category.id))
	}, [params.handle])

	function getParentCategories(categories: any[], params: any) {
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
		getParentCategories(categories?.(), params)
	}, [currentCategory?.()])

	return (
		<div>
			<Title>{currentCategory?.()[0]?.name}</Title>
			<Meta
				itemProp="description"
				content={currentCategory?.()[0]?.handle}
			/>
			<Meta
				itemProp="og:title"
				content={currentCategory?.()[0]?.name}
			/>

			<main>
				<div class="pt-4 lg:py-12 ">
					<div class="mx-1 sm:mx-auto sm:content-container lg:py-12 font-poppins antialiased ">
						<FlexCategories
							parentCategories={parentCategories}
							currentCategory={currentCategory}
						/>

						<Suspense fallback={<div>Loading...</div>}>
							<Show when={true}>
								<ol class="grid grid-cols-4 gap-2">
									<For each={categoryProducts?.()}>
										{(product: any) => (
											<li class="col-span-4 sm:col-span-2 lg:col-span-1">
												<ProductPreview {...product} />
											</li>
										)}
									</For>
								</ol>
							</Show>
						</Suspense>
						<SingleLineSlider
							slideVisible={6}
							categoryProducts={categoryProducts}
							setCurrentSlide={setCurrentSlide}
							setLoaded={setLoaded}
							loaded={loaded}
							currentSlide={currentSlide}
						/>
					</div>
				</div>
			</main>
		</div>
	)
}
