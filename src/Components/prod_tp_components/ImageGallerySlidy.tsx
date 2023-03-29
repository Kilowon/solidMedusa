import { createSignal, createEffect, Show } from 'solid-js'
import { Slidy } from '@slidy/solid'
import { blur } from '@slidy/animation'
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

	createEffect(() => {
		const images = props.images
		if (images && images.length > 0) {
			const newSlides = images.map((image, index) => ({
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
				src: `https://fakeimg.pl/405x480/?text=${props.productInfo.collection?.title}&font=poppins`
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
			when={location() === useLocation().pathname}
			fallback={<>Loading...</>}
		>
			<div class="flex items-start relative">
				<div
					id="gallery"
					class="flex flex-col flex-1 lg:mx-16 gap-y-4  h-[80vh] "
				>
					<Slidy
						slides={slides()}
						snap="deck"
						thumbnail={true}
						easing={linear}
						clamp={0}
						loop={true}
						animation={blur}
					/>
				</div>
			</div>
		</Show>
	)
}
