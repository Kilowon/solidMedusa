import { createSignal, createEffect, Show } from 'solid-js'
import { Slidy } from '@slidy/solid'
import '@slidy/solid/dist/slidy.css'
import { useLocation } from '@solidjs/router'
import { Transition } from 'solid-transition-group'

export default function ImageGallerySlidy(props: {
	images: { url: string; id: string }[] | undefined
	productInfo: any | undefined
	params: any
}) {
	const [slides, setSlides] = createSignal<any[]>([])
	const [currentSlide, setCurrentSlide] = createSignal<any[]>([])
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

	// And this effect prevents Images loading before the DOM is ready prevents error
	createEffect(() => {
		setTimeout(() => {
			setCurrentSlide(slides())
		}, 50)
	})

	return (
		<Transition
			onEnter={(el, done) => {
				const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
					duration: 50
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
			<Show when={location() === useLocation().pathname && currentSlide().length > 0}>
				<div class="md:flex md:items-start md:relative bg-transparent">
					<div
						id="gallery"
						class="h-[65svh]  lg:flex lg:h-[90svh] lg:mx-8"
						style={{
							'--slidy-slide-radius': '3px',
							'--slidy-slide-height': '93%',
							'--slidy-progress-thumb-color': '#263C59',
							'--slidy-progress-track-color': '#e3e3e3',
							'--slidy-height': '100%',
							'--slidy-slide-bg-color': 'transparent',
							'--slidy-slide-object-fit': 'contain',
							'--slidy-arrow-bg': '#ff',
							'--slidy-arrow-icon-color': '#263C59',

							'--slidy-arrow-size': '2.5rem'
						}}
					>
						<Slidy
							slides={currentSlide()}
							thumbnail={false}
							clamp={0}
							loop={true}
							axis="x"
							// @ts-ignore
							background={false}
							progress={false}
							counter={false}
							sensity={1.5}
							indent={1}
							gravity={1.2}
							snap="center"
						/>
					</div>
				</div>
			</Show>
		</Transition>
	)
}
