import { createSignal, createEffect, Show } from 'solid-js'
import { Slidy } from '@slidy/solid'
import { blur, fade, matrix, translate } from '@slidy/animation'
import { linear } from '@slidy/easing'
import '@slidy/solid/dist/slidy.css'
import { useLocation } from '@solidjs/router'

export default function ImageGallerySlidy(props: {
	images: { url: string; id: string }[] | undefined
	productInfo: any | undefined
	params: any
}) {
	const [slides, setSlides] = createSignal<never[]>([])
	const [location, setLocation] = createSignal(useLocation().pathname)
	// Slidy has a bug where it shutters the image when you have less than 3 slides so this is a workaround that just adds the first slide to the end of the array until there are 3 slides if there are less than 3 slides provided or if no images are provided we throw in a placeholder image
	createEffect(() => {
		if (props.images && props.images?.length > 0) {
			const newSlides = props.images?.map((image, index) => ({
				id: `${index}`,
				width: 1280,
				height: 853,
				alt: `Product image ${index + 1}`,
				src: image.url
			}))
			const numSlidesToAdd = Math.max(0, 3 - newSlides.length)
			const firstSlide = newSlides[0]
			for (let i = 0; i < numSlidesToAdd; i++) {
				newSlides.push(firstSlide)
			}
			setSlides(newSlides as never[])
		} else {
			const placeholderSlide = {
				id: 'placeholder',
				width: 1280,
				height: 853,
				alt: 'Product thumbnail',
				src: `https://fakeimg.pl/405x480/?text=${props.productInfo?.title}&font=poppins`
			}
			const newSlides = [placeholderSlide, placeholderSlide, placeholderSlide]
			setSlides(newSlides as never[])
		}
	})
	// These two createEffects are to prevent the Slidy component from being rendered on every page change (which causes a bug when looping through the slides)
	createEffect(() => {
		if (location() !== useLocation().pathname) {
			setLocation(useLocation().pathname)
		}
	})

	createEffect(() => {
		const gallery = document.querySelector('#gallery')
		if (location() !== useLocation().pathname) {
			gallery?.remove()
		}
	})

	return (
		<Show
			when={location() === useLocation().pathname && slides().length > 0}
			fallback={
				<section class="flex items-center justify-center h-full p-16 bg-gray-900 text-gray-100 text-4xl">
					<div class="i-svg-spinners:bars-scale-fade" />
				</section>
			}
		>
			<div class="md:flex md:items-start md:relative">
				<div
					id="gallery"
					class="h-[75svh]  lg:flex lg:h-[90svh] lg:mx-8"
					style={{
						'--slidy-slide-radius': '3px',
						'--slidy-slide-height': '93%',
						'--slidy-progress-thumb-color': '#363636',
						'--slidy-height': '100%',
						'--slidy-slide-bg-color': '#ffffff',
						'--slidy-slide-object-fit': 'contain',
						'--slidy-arrow-bg': '#ff',
						'--slidy-arrow-icon-color': '#16293b',
						'--slidy-arrow-size': '2.5rem'
					}}
				>
					<Slidy
						slides={slides()}
						snap="end"
						thumbnail={false}
						clamp={0}
						loop={true}
						// @ts-ignore
						animation={fade}
						background={false}
						progress={true}
						counter={false}
						sensity={5}
						gravity={0.5}
					/>
				</div>
			</div>
		</Show>
	)
}
