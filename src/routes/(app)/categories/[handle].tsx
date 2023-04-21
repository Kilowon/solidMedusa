import { useGlobalContext } from '~/Context/Providers'
import { useParams, Title, Meta, A } from 'solid-start'
import { createEffect, createSignal, For, Show, Switch, Match } from 'solid-js'
import 'solid-slider/slider.css'
import { TransitionGroup, Transition } from 'solid-transition-group'
import {
	SingleLineSlider,
	DoubleLineSlider,
	TripleLineSlider
} from '~/Components/common/ProductSlider'

export default function Categories() {
	const params = useParams()
	const { categories } = useGlobalContext()
	const { setCurrentCategoryId } = useGlobalContext()
	const { categoryProducts } = useGlobalContext()
	const [currentSlide, setCurrentSlide] = createSignal(0)
	const [loaded, setLoaded] = createSignal(false)
	const [dots, setDots] = createSignal()
	const [parentCategories, setParentCategories] = createSignal([])

	function filterCategories() {
		return categories()?.filter(
			(category: any) => category.handle === params.handle
		)
	}

	const [currentCategory, setCategory] = createSignal(filterCategories())

	createEffect(() => {
		setCategory(filterCategories())
		setCurrentCategoryId?.(currentCategory().map((category: any) => category.id))
	}, [params.handle])

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
				<div class="py-12 ">
					<div class="content-container py-12 font-poppins antialiased ">
						<div class="flex flex-col  mb-16 ">
							<span class="text-base text-gray-600 mb-6">Shop By Category</span>
							<div class="text-2xl text-gray-900 ">
								<ol class="flex flex-row flex-wrap">
									<Show when={parentCategories()}>
										<TransitionGroup
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
											<For each={parentCategories()}>
												{(category: any) => (
													<li class="flex flex-row pr-1 whitespace-nowrap">
														<A href={`/categories/${category.handle}`}>
															<div
																class={
																	category.name === currentCategory()[0]?.name
																		? 'text-amber-5'
																		: ''
																}
															>
																{category.name}
															</div>
														</A>
														<div
															class={'pr-1 font-bold text-3xl flex flex-row items-center '}
														>
															<div
																class={
																	category.category_children.length === 0
																		? ''
																		: 'i-ic-outline-chevron-right'
																}
															/>
														</div>
													</li>
												)}
											</For>
										</TransitionGroup>
									</Show>

									<Show when={currentCategory()[0]?.category_children}>
										<TransitionGroup
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
											<For each={currentCategory()[0]?.category_children}>
												{(child: any, index) => (
													<div class="flex flex-row whitespace-nowrap">
														<li class="pr-1">
															<A href={`/categories/${child?.handle}`}>{child?.name}</A>
														</li>
														<div class="flex flex-row items-center text-xl pr-1   ">
															<div
																class={
																	currentCategory()[0]?.category_children.length === index() + 1
																		? ' '
																		: 'i-ph-dot-outline-light'
																}
															/>
														</div>
													</div>
												)}
											</For>
										</TransitionGroup>
									</Show>
								</ol>
							</div>
						</div>

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
							<Show
								when={categoryProducts()?.length > 6 && categoryProducts()?.length < 10}
							>
								<DoubleLineSlider
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
							<Show when={categoryProducts()?.length > 10}>
								<TripleLineSlider
									slideVisible={4}
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
			</main>
		</div>
	)
}
