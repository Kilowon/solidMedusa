import { Show, For, createSignal, onMount, createEffect } from 'solid-js'
import { A } from 'solid-start'
import { getWindowSize } from '@solid-primitives/resize-observer'
import { useGlobalContext } from '~/Context/Providers'
import { Motion, Presence } from '@motionone/solid'
import { Rerun } from '@solid-primitives/keyed'

import { createQuery } from '@tanstack/solid-query'

export function CleanHero() {
	const { medusa } = useGlobalContext()

	const heroData = createQuery(() => ({
		queryKey: ['hero_data'],
		queryFn: async function () {
			const bearerToken = import.meta.env.VITE_BEARER_TOKEN
			const response = await fetch(`https://direct.shauns.cool/items/main_hero`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${bearerToken}`
				}
			})
			const data = await response.json()
			return data
		},
		cacheTime: 15 * 60 * 1000,
		retry: 0,
		enabled: false
	}))

	/* 	const featuredData = createQuery(() => ({
		queryKey: ['featured_data'],
		queryFn: async function () {
			const bearerToken = import.meta.env.VITE_BEARER_TOKEN
			const response = await fetch(`https://direct.shauns.cool/items/featured_components?fields=*.*.*`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${bearerToken}`
				}
			})
			const data = await response.json()
			return data
		},
		cacheTime: 15 * 60 * 1000,
		retry: 0,
		enabled: true
	}))
 */
	const queryCategories = createQuery(() => ({
		queryKey: ['categories_list'],
		queryFn: async function () {
			const product = await medusa?.productCategories.list({ limit: '200' })
			return product
		},
		cacheTime: 15 * 60 * 1000,
		retry: 0,
		enabled: false
	}))

	const [currentIndex, setCurrentIndex] = createSignal(0)
	const [count, setCount] = createSignal(0)
	const [time, setTime] = createSignal(5000)
	const [endWait, setEndWait] = createSignal(15000)
	const [totalLength, setTotalLength] = createSignal(0)
	const [filteredSlides, setFilteredSlides] = createSignal<any>([''])

	function heroCarousel() {
		if (!heroSlidesActive()) return
		let interval: any
		const startInterval = () => {
			interval = setInterval(() => {
				setCount(p => ++p)
				setCurrentIndex(currentIndex() < totalLength() - 1 ? currentIndex() + 1 : 0)
				if (currentIndex() === 0) {
					clearInterval(interval)
					setTimeout(startInterval, endWait())
				}
			}, time())
		}
		startInterval()
	}

	onMount(async () => {
		if (heroData.isSuccess) {
			setFilteredSlides(
				slideStatusCheck(
					heroData?.data?.data?.hero_info,
					(import.meta.env.VITE_DRAFT_SITE === 'false' ? 'published' : 'draft') as any
				)
			)
		}
		if (heroData.isSuccess) {
			setTime(heroData?.data?.data?.pause_between * 1000)
			setEndWait(heroData?.data?.data?.init_hold * 1000)
			setTotalLength(heroSlidesActive() ? filteredSlides().length : 0)
			heroCarousel()
		}
	})

	function heroSlidesActive() {
		if (import.meta.env.VITE_DRAFT_SITE === 'true') {
			return heroData?.data?.data?.draft_slides_active
		}
		if (import.meta.env.VITE_DRAFT_SITE === 'false') {
			return heroData?.data?.data?.slides_active
		}
	}

	function slideStatusCheck(slides: [any], status: 'published' | 'draft' | 'archived') {
		const filtered = slides.filter((slide: any) => slide.status === status || slide.status === 'published')
		return filtered
	}

	return (
		<Show when={heroData.isSuccess && queryCategories.isSuccess && heroData.isSuccess && filteredSlides().length > 0}>
			<Presence
				exitBeforeEnter={true}
				initial={false}
			>
				<Rerun on={count()}>
					<Motion.div
						onPressStart={() => false}
						animate={{ opacity: [1, 0, 1], transition: { duration: 1.0 } }}
						exit={{ opacity: 0, transition: { duration: 0.5 } }}
					>
						<div
							class="min-h-[100svh] lg:mb-auto lg:mt-auto w-full flex items-center lg:items-initial md:justify-center flex-col lg:flex-row 
		"
						>
							<div class="flex flex-col">
								<div class="flex flex-grow w-full  h-1/3"></div>
								<div class="flex flex-col justify-center h-35svh h-1/3 lg:h-auto ">
									<div class="text-text_2 z-10 flex flex-col  md:max-w-[512px] lg:min-w-[470px] items-center space-y-3 lg:space-y-12 ">
										<div>
											<div class="flex flex-col items-center justify-center  sm:h-auto  mx-6 md:mx-auto space-y-1">
												<h1 class=" tracking-tighter text-4xl  sm:text-5xl  lg:max-w-auto  lg:text-6xl drop-shadow-md font-700 z-2 lg:text-balance text-center text-balance">
													{filteredSlides()?.[currentIndex()]?.header}
												</h1>
												<h2 class=" tracking-tighter text-xl  sm:text-3xl  lg:max-w-auto   lg:text-4xl drop-shadow-md font-500 z-2 lg:text-balance  text-center text-balance ">
													{filteredSlides()?.[currentIndex()]?.subtitle}
												</h2>
											</div>
										</div>
										<div class="flex flex-col items-center justify-center space-y-2 mb-2 lg:mb-auto">
											<div class="flex items-center hover:underline text-xs md:text-sm lg:text-base bg-accent_6 text-accenttext_1 p-2  rounded-1">
												<A
													href="/store/Store"
													class="text- z-2 tracking-tight"
												>
													{filteredSlides()?.[currentIndex()]?.call_to_action}
												</A>
											</div>
											<div class="flex space-x-2">
												<For each={filteredSlides()}>
													{(item, index) => {
														return (
															<div>
																<Show when={index() === currentIndex()}>
																	<div class="w-1.5 h-1.5 rounded-6 bg-accent_6" />
																</Show>
																<Show when={index() !== currentIndex()}>
																	<div class="w-1.5 h-1.5 rounded-6 bg-accent_6/50" />
																</Show>
															</div>
														)
													}}
												</For>
											</div>
										</div>
									</div>
								</div>
								<div class="flex flex-grow h-1/3"></div>
							</div>
							<A
								class="  flex flex-col items-center justify-center lg:justify-start  lg:h-auto"
								href={filteredSlides()?.[currentIndex()]?.call_to_action_href || '/store/Store'}
							>
								<Show when={getWindowSize().width > 1023 && heroData.isSuccess}>
									<img
										src={filteredSlides()?.[currentIndex()]?.image}
										loading="eager"
										alt="main image"
										class="w-[1210px] max-h-[765px] min-h-[36rem] aspect-[242/153] object-cover object-left"
									/>
								</Show>
								<Show when={getWindowSize().width <= 1023 && heroData.isSuccess}>
									<img
										src={filteredSlides()?.[currentIndex()]?.mobile_image}
										loading="eager"
										alt="main image"
										class="   min-h-292px object-cover object-left "
									/>
								</Show>

								<div class="text-xs lg:text-sm xl:text-base text-text_2 xl:mt-1">
									{filteredSlides()?.[currentIndex()]?.image_tagline}
								</div>
							</A>
						</div>
					</Motion.div>
				</Rerun>
			</Presence>
		</Show>
	)
}
