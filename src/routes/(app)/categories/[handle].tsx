import { useGlobalContext } from '~/Context/Providers'
import { useParams, Title, Meta, A } from 'solid-start'
import { createEffect, createSignal, For, Show } from 'solid-js'
import ProductPreview from '~/Components/nav_components/ProductPreview'
import 'solid-slider/slider.css'
import { Slider, createSlider, SliderProvider } from 'solid-slider'
import {
	Arrow,
	SliderDots,
	SliderArrowLeft,
	SliderArrowRight
} from '~/Components/common/SliderExtended'

export default function Categories() {
	const params = useParams()
	const { categories } = useGlobalContext()
	const { setCurrentCategoryId } = useGlobalContext()
	const { categoryProducts } = useGlobalContext()
	const [currentSlide, setCurrentSlide] = createSignal(0)
	const [loaded, setLoaded] = createSignal(false)
	const [dots, setDots] = createSignal()

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
			setDots(0)
		}
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
				<div class="py-12 ">
					<div class="content-container py-12 font-poppins antialiased ">
						<div class="flex flex-col  mb-16 ">
							<span class="text-base text-gray-600 mb-6">Shop By Category</span>
							<div class="text-2xl text-gray-900 ">
								<ol class="flex flex-row ">
									<Show when={currentCategory()[0]?.parent_category?.name}>
										<li class="pr-3">
											<A
												href={`/categories/${
													currentCategory()[0]?.parent_category?.handle
												}`}
											>
												{currentCategory()[0]?.parent_category?.name}
											</A>
										</li>
										<div class="pr-3 font-bold text-3xl flex flex-row items-center ">
											<div class={'i-ic-outline-chevron-right'} />
										</div>
									</Show>
									<Show when={currentCategory()[0]?.name}>
										<li class="pr-3">
											<A href={`/categories/${currentCategory()[0]?.handle}`}>
												<div class="text-amber-5">{currentCategory()[0]?.name}</div>
											</A>
										</li>
										<div class="pr-3 font-bold text-3xl flex flex-row items-center ">
											<div
												class={
													currentCategory()[0]?.category_children.length === 0
														? ''
														: 'i-ic-outline-chevron-right'
												}
											/>
										</div>
									</Show>
									<Show when={currentCategory()[0]?.category_children}>
										<For each={currentCategory()[0]?.category_children}>
											{(child: any, index) => (
												<div class="flex flex-row">
													<li class="pr-3">
														<A href={`/categories/${child?.handle}`}>{child?.name}</A>
													</li>
													<div class="flex flex-row items-center text-xl pr-3  ">
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
									</Show>
								</ol>
							</div>
						</div>
						<SliderProvider>
							<ul class="flex flex-row relative">
								<Show when={categoryProducts()?.length > 0}>
									<Slider
										options={{
											loop: true,
											slides: {
												perView: 3,
												spacing: 15
											},
											initial: 0,
											slideChanged(slider) {
												setCurrentSlide(slider.track.details.rel)
											},
											created(slider) {
												setLoaded(true)
												setDots(() => {
													console.log('SLIDER', slider.track.details.slides?.length)

													return [...Array(slider.track.details.slides?.length).keys()]
												})
											},
											optionsChanged(slider) {
												setDots(() => {
													console.log('SLIDER', slider.track.details.slides?.length)

													return [...Array(slider.track.details.slides?.length).keys()]
												})
											}
										}}
									>
										<For each={categoryProducts()}>
											{product => (
												<li>
													<ProductPreview {...product} />
												</li>
											)}
										</For>
									</Slider>
									<Show when={loaded()}>
										<SliderArrowLeft
											prev
											class={
												'w-10 h-10 absolute left-0 top-[50%] fill-coolGray-8 hover:fill-amber-500'
											}
										/>
										<SliderArrowRight
											next
											class={
												'w-10 h-10 absolute right-0 top-[50%] fill-coolGray-8 hover:fill-amber-500'
											}
										/>
									</Show>
								</Show>
							</ul>{' '}
							<SliderDots
								dots={dots()}
								currentSlide={currentSlide()}
								class={' w-[10px] h-[10px] rounded-full'}
							/>
						</SliderProvider>
					</div>
				</div>
			</main>
		</div>
	)
}
