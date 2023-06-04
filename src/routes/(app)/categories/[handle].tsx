import { useGlobalContext } from '~/Context/Providers'
import { useParams, Title, Meta, useNavigate } from 'solid-start'
import { createEffect, createSignal, Show, onCleanup } from 'solid-js'
import 'solid-slider/slider.css'
import { Transition } from 'solid-transition-group'
import { FlexCategories } from '~/Components/common/FlexCategories'
import { SingleLineSlider, DoubleLineSlider, TripleLineSlider } from '~/Components/common/ProductSlider'

export default function Categories() {
	const params = useParams()
	const { categories } = useGlobalContext()
	const { setCurrentCategoryId } = useGlobalContext()
	const { categoryProducts } = useGlobalContext()
	const { setCategoryProducts } = useGlobalContext()
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
				(category: any) => category.name === parentCategories[parentCategories.length - 1]?.parent_category?.name
			)
			parentCategories.push(parentCategory)
		}

		setParentCategories(parentCategories.reverse() as never[])

		return parentCategories
	}

	createEffect(() => {
		getParentCategories(categories(), params)
	}, [currentCategory()])

	const navigate = useNavigate()

	createEffect(() => {
		if (categoryProducts()?.length === 1) {
			const productId = categoryProducts()[0].handle
			navigate(`/products/${productId}`, { replace: true })
		}
	})

	onCleanup(() => {
		setCategoryProducts?.([])
	})

	return (
		<div>
			<Title>{currentCategory()[0]?.name}</Title>
			<Meta
				itemProp="description"
				content={currentCategory()[0]?.handle}
			/>
			<Meta
				itemProp="og:title"
				content={currentCategory()[0]?.name}
			/>

			<main>
				<div class="pt-4 lg:py-12 ">
					<div class="content-container lg:py-12 font-poppins antialiased ">
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
									slideVisible={2}
									categoryProducts={categoryProducts}
									setCurrentSlide={setCurrentSlide}
									setLoaded={setLoaded}
									loaded={loaded}
									currentSlide={currentSlide}
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
							<Show when={categoryProducts()?.length > 6 && categoryProducts()?.length < 10}>
								<DoubleLineSlider
									slideVisible={3}
									categoryProducts={categoryProducts}
									setCurrentSlide={setCurrentSlide}
									setLoaded={setLoaded}
									loaded={loaded}
									currentSlide={currentSlide}
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
							<Show when={categoryProducts()?.length > 10}>
								<TripleLineSlider
									slideVisible={4}
									categoryProducts={categoryProducts}
									setCurrentSlide={setCurrentSlide}
									setLoaded={setLoaded}
									loaded={loaded}
									currentSlide={currentSlide}
								/>
							</Show>
						</Transition>
					</div>
				</div>
			</main>
		</div>
	)
}
