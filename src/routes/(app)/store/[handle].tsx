import { useGlobalContext } from '~/Context/Providers'
import { useParams, Title, Meta } from 'solid-start'
import { createEffect, createSignal, Show, For } from 'solid-js'
import 'solid-slider/slider.css'
import { Transition } from 'solid-transition-group'
import { FlexCategories } from '~/Components/common/FlexCategories'
import {
	SingleLineSlider,
	DoubleLineSlider,
	TripleLineSlider
} from '~/Components/common/ProductSlider'
import { Route, Routes } from 'solid-Start'
import Categories from '~/routes/(app)/categories/[handle]'

export default function Store() {
	const params = useParams()
	const { categories } = useGlobalContext()
	const { categoryProducts } = useGlobalContext()
	const [currentSlide, setCurrentSlide] = createSignal(0)
	const [loaded, setLoaded] = createSignal(false)
	const [dots, setDots] = createSignal()
	const [parentCategories, setParentCategories] = createSignal([])
	const { setCurrentCategoryId } = useGlobalContext()
	function filterCategories() {
		return categories()?.filter(
			(category: any) => category.handle === params.handle
		)
	}

	const [currentCategory, setCategory] = createSignal(filterCategories())

	createEffect(() => {
		if (categoryProducts()?.length === 0) {
			setDots(Number(0))
		}
	})

	function getParentCategories(categories: any[], params: any) {
		const parentCategories = [
			categories.find((category: any) => category.handle === params.handle)
		]

		while (parentCategories[parentCategories.length - 1]?.parent_category) {
			const parentCategory = categories.find(
				(category: any) =>
					category.name ===
					parentCategories[parentCategories.length - 1]?.parent_category?.name
			)
			parentCategories.push(parentCategory)
		}

		setParentCategories(parentCategories.reverse() as never[])

		return parentCategories
	}

	createEffect(() => {
		getParentCategories(categories(), params)
	}, [currentCategory()])

	function filterCategoriesRoot() {
		return categories()?.filter(
			(category: any) => category.parent_category === null
		)
	}

	const [currentCategoryRoot, setCategoryRoot] = createSignal(
		filterCategoriesRoot()
	)

	createEffect(() => {
		console.log('currentCategoryRoot', currentCategoryRoot()[0].name)
		console.log('currentCategoryRoot PRODUCTS', categoryProducts())
	}, [currentCategoryRoot()])

	return (
		<main>
			<Title>{currentCategory()[0]?.name}</Title>
			<Meta
				itemProp="description"
				content={currentCategory()[0]?.handle}
			/>
			<Meta
				itemProp="og:title"
				content={currentCategory()[0]?.name}
			/>
			<For each={currentCategoryRoot().reverse()}>
				{category => {
					console.log('category', category.id)
					setCurrentCategoryId?.([category?.id])

					return (
						<div>
							<div>{category.name}</div>
							<div class="py-12 ">
								<div class="content-container py-12 font-poppins antialiased ">
									<FlexCategories
										parentCategories={parentCategories}
										currentCategory={currentCategory}
									/>

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
										<Show when={categoryProducts()?.length <= 6}>
											<SingleLineSlider
												slideVisible={3}
												categoryProducts={categoryProducts}
												setCurrentSlide={setCurrentSlide}
												setLoaded={setLoaded}
												setDots={setDots}
												loaded={loaded}
												currentSlide={currentSlide}
												dots={dots}
											/>
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
										<Show when={categoryProducts()?.length > 6}>
											<DoubleLineSlider
												slideVisible={5}
												categoryProducts={categoryProducts}
												setCurrentSlide={setCurrentSlide}
												setLoaded={setLoaded}
												setDots={setDots}
												loaded={loaded}
												currentSlide={currentSlide}
												dots={dots}
											/>
										</Show>
									</Transition>
								</div>
							</div>
						</div>
					)
				}}
			</For>
		</main>
	)
}
