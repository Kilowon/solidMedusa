import { For, Show } from 'solid-js'
import ProductPreview from '~/Components/nav_components/ProductPreview'
import 'solid-slider/slider.css'
import { Slider, SliderProvider } from 'solid-slider'
import {
	SliderDots,
	SliderArrowLeft,
	SliderArrowRight
} from '~/Components/common/SliderExtended'
import { Range } from '@solid-primitives/range'

//This Slider component is not SolidJS native, and it is a third party library with a wrapper for SolidJS
//its properties are not reactive even with reactive values
//so it has Slide count update issues that I can only work around
//this is why it is duplicated in the code this way below.

export function SingleLineSlider(props: any) {
	return (
		<SliderProvider>
			<ul class="flex flex-row relative">
				<Show when={props.categoryProducts()?.length > 0}>
					<Slider
						options={{
							loop: true,
							slides: {
								perView: props.slideVisible,
								spacing: 15
							},
							initial: 0,
							slideChanged(slider) {
								props.setCurrentSlide(slider.track.details.rel)
							},
							created(slider) {
								props.setLoaded(true)
								props.setDots(() => {
									return [...Array(slider.track.details.slides?.length).keys()]
								})
							},
							optionsChanged(slider) {
								props.setDots(() => {
									return [...Array(slider.track.details.slides?.length).keys()]
								})
							}
						}}
					>
						<For each={props.categoryProducts()}>
							{product => (
								<li>
									<ProductPreview {...product} />
								</li>
							)}
						</For>
					</Slider>
					<Show when={props.loaded()}>
						<SliderArrowLeft
							next={false}
							disabled={false}
							class={
								'w-10 h-10 absolute left-0 top-[50%] fill-coolGray-8 hover:fill-amber-500'
							}
						/>
						<SliderArrowRight
							next={true}
							disabled={false}
							class={
								'w-10 h-10 absolute right-0 top-[50%] fill-coolGray-8 hover:fill-amber-500'
							}
						/>
					</Show>
				</Show>
			</ul>{' '}
			<SliderDots
				dots={props.dots()}
				currentSlide={props.currentSlide()}
				class={' w-[10px] h-[10px] rounded-full'}
			/>
		</SliderProvider>
	)
}

export function DoubleLineSlider(props: any) {
	return (
		<SliderProvider>
			<ul class="flex flex-row relative">
				<Show when={props.categoryProducts()?.length > 0}>
					<Slider
						options={{
							loop: true,
							slides: {
								perView: props.slideVisible,
								spacing: 15
							},
							initial: 0,
							slideChanged(slider) {
								props.setCurrentSlide(slider.track.details.rel)
							},
							created(slider) {
								props.setLoaded(true)
								props.setDots(() => {
									return [...Array(slider.track.details.slides?.length).keys()]
								})
							},
							optionsChanged(slider) {
								props.setDots(() => {
									return [...Array(slider.track.details.slides?.length).keys()]
								})
							}
						}}
					>
						<Range
							start={0}
							to={props.categoryProducts().length}
							step={2}
							fallback={<div>...</div>}
						>
							{index => {
								const product = props.categoryProducts()[index]
								const nextProduct = props.categoryProducts()[index + 1]
								const randomProduct =
									props.categoryProducts()[
										Math.floor(Math.random() * props.categoryProducts().length)
									]
								props.categoryProducts()[
									Math.floor(Math.random() * props.categoryProducts().length)
								]
								if (nextProduct) {
									return (
										<div>
											<li class="my-10">
												<ProductPreview {...product} />
											</li>
											<li class="my-10">
												<ProductPreview {...nextProduct} />
											</li>
										</div>
									)
								} else {
									return (
										<div>
											<li class="my-10">
												<ProductPreview {...product} />
											</li>
											<li class="my-10">
												<ProductPreview {...randomProduct} />
											</li>
										</div>
									)
								}
							}}
						</Range>
					</Slider>
					<Show when={props.loaded()}>
						<SliderArrowLeft
							next={false}
							disabled={false}
							class={
								'w-10 h-10 absolute left-0 top-[50%] fill-coolGray-8 hover:fill-amber-500'
							}
						/>
						<SliderArrowRight
							next={true}
							disabled={false}
							class={
								'w-10 h-10 absolute right-0 top-[50%] fill-coolGray-8 hover:fill-amber-500'
							}
						/>
					</Show>
				</Show>
			</ul>{' '}
			<SliderDots
				dots={props.dots()}
				currentSlide={props.currentSlide()}
				class={' w-[10px] h-[10px] rounded-full'}
			/>
		</SliderProvider>
	)
}

export function TripleLineSlider(props: any) {
	return (
		<SliderProvider>
			<ul class="flex flex-row relative">
				<Show when={props.categoryProducts()?.length > 0}>
					<Slider
						options={{
							loop: true,
							slides: {
								perView: props.slideVisible,
								spacing: 15
							},
							initial: 0,
							slideChanged(slider) {
								props.setCurrentSlide(slider.track.details.rel)
							},
							created(slider) {
								props.setLoaded(true)
								props.setDots(() => {
									return [...Array(slider.track.details.slides?.length).keys()]
								})
							},
							optionsChanged(slider) {
								props.setDots(() => {
									return [...Array(slider.track.details.slides?.length).keys()]
								})
							}
						}}
					>
						<Range
							start={0}
							to={props.categoryProducts().length}
							step={3}
							fallback={<div>...</div>}
						>
							{index => {
								const product = props.categoryProducts()[index]
								const secondProduct = props.categoryProducts()[index + 1]
								const thirdProduct = props.categoryProducts()[index + 2]
								const randomProduct =
									props.categoryProducts()[
										Math.floor(Math.random() * props.categoryProducts().length)
									]
								props.categoryProducts()[
									Math.floor(Math.random() * props.categoryProducts().length)
								]
								if (secondProduct && thirdProduct) {
									return (
										<div>
											<li class="my-10">
												<ProductPreview {...product} />
											</li>
											<li class="my-10">
												<ProductPreview {...secondProduct} />
											</li>
											<li class="my-10">
												<ProductPreview {...thirdProduct} />
											</li>
										</div>
									)
								} else if (secondProduct) {
									return (
										<div>
											<li class="my-10">
												<ProductPreview {...product} />
											</li>
											<li class="my-10">
												<ProductPreview {...secondProduct} />
											</li>
											<li class="my-10">
												<ProductPreview {...randomProduct} />
											</li>
										</div>
									)
								} else {
									return (
										<div>
											<li class="my-10">
												<ProductPreview {...product} />
											</li>
											<li class="my-10">
												<ProductPreview {...randomProduct} />
											</li>
											<li class="my-10">
												<ProductPreview {...randomProduct} />
											</li>
										</div>
									)
								}
							}}
						</Range>
					</Slider>
					<Show when={props.loaded()}>
						<SliderArrowLeft
							next={false}
							disabled={false}
							class={
								'w-10 h-10 absolute left-0 top-[50%] fill-coolGray-8 hover:fill-amber-500'
							}
						/>
						<SliderArrowRight
							next={true}
							disabled={false}
							class={
								'w-10 h-10 absolute right-0 top-[50%] fill-coolGray-8 hover:fill-amber-500'
							}
						/>
					</Show>
				</Show>
			</ul>{' '}
			<SliderDots
				dots={props.dots()}
				currentSlide={props.currentSlide()}
				class={' w-[10px] h-[10px] rounded-full'}
			/>
		</SliderProvider>
	)
}
