import { Show, For, createSignal, onMount, createEffect, Suspense } from 'solid-js'
import { A } from 'solid-start'
import { getWindowSize } from '@solid-primitives/resize-observer'
import { useGlobalContext } from '~/Context/Providers'
import { Rerun } from '@solid-primitives/keyed'
import { TransitionGroup } from 'solid-transition-group'
import { createQuery } from '@tanstack/solid-query'
import clsx from 'clsx'
import { isServer } from 'solid-js/web'

export function HeroSection() {
	const { medusa } = useGlobalContext()

	const heroData = createQuery(() => ({
		queryKey: ['hero_data'],
		queryFn: async function () {
			const bearerToken = import.meta.env.VITE_BEARER_TOKEN
			const response = await fetch(`${import.meta.env.VITE_DIRECTUS_URL}/items/main_hero?fields=*.item.*.*.*`, {
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
					heroData?.data?.data?.Hero_infor,
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
		const filtered = slides.filter((slide: any) => slide?.item?.status === status || slide?.item?.status === 'published')
		return filtered
	}

	createEffect(() => {
		console.log('FILTERED SLIDES', filteredSlides())
		console.log('HERO INFOR', heroData?.data?.data?.Hero_infor)
	})

	return (
		<Show when={filteredSlides().length > 0}>
			<Rerun on={count()}>
				<TransitionGroup
					onEnter={(el, done) => {
						const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
							duration: 8000
						})
						a.finished.then(done)
					}}
					onExit={(el, done) => {
						const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
							duration: 2000
						})
						a.finished.then(done)
					}}
				>
					<Show when={heroData.isSuccess}>
						<div
							class={clsx(
								' min-h-[85svh] lg:mb-auto lg:mt-auto w-full flex items-center lg:items-initial md:justify-center flex-col lg:flex-row ',
								filteredSlides()?.[currentIndex()]?.item?.bg_color === 'normal_1' && 'bg-normal_1',
								filteredSlides()?.[currentIndex()]?.item?.bg_color === 'normal_2' && 'bg-normal_2',
								filteredSlides()?.[currentIndex()]?.item?.bg_color === 'normal_3' && 'bg-normal_3',
								filteredSlides()?.[currentIndex()]?.item?.bg_color === 'normal_4' && 'bg-normal_4',
								filteredSlides()?.[currentIndex()]?.item?.bg_color === 'surface' && 'bg-surface',
								filteredSlides()?.[currentIndex()]?.item?.bg_color === 'text_4' && 'bg-text_4',
								filteredSlides()?.[currentIndex()]?.item?.bg_color === 'text_5' && 'bg-text_5',
								filteredSlides()?.[currentIndex()]?.item?.bg_color === 'accent_4' && 'bg-accent_4',
								filteredSlides()?.[currentIndex()]?.item?.bg_color === 'accent_5' && 'bg-accent_5',
								filteredSlides()?.[currentIndex()]?.item?.bg_color === 'accent_6' && 'bg-accent_6',
								filteredSlides()?.[currentIndex()]?.item?.bg_color === 'accent_7' && 'bg-accent_7',
								filteredSlides()?.[currentIndex()]?.item?.bg_color === 'accent_8' && 'bg-accent_8',
								filteredSlides()?.[currentIndex()]?.item?.bg_color === 'accent_9' && 'bg-accent_9',
								filteredSlides()?.[currentIndex()]?.item?.bg_color === 'accent_10' && 'bg-accent_10'
							)}
						>
							<div class="flex flex-col">
								<div class="flex flex-grow w-full  h-1/3"></div>
								<div class="flex flex-col justify-center h-35svh h-1/3 lg:h-auto ">
									<div
										class={clsx(
											' text-text_2 z-10 flex flex-col  md:max-w-[512px] lg:min-w-[470px] items-center space-y-3 lg:space-y-12 ',
											filteredSlides()?.[currentIndex()]?.item?.text_color === 'normal_1' && 'text-normal_1',
											filteredSlides()?.[currentIndex()]?.item?.text_color === 'normal_2' && 'text-normal_2',
											filteredSlides()?.[currentIndex()]?.item?.text_color === 'normal_3' && 'text-normal_3',
											filteredSlides()?.[currentIndex()]?.item?.text_color === 'normal_4' && 'text-normal_4',
											filteredSlides()?.[currentIndex()]?.item?.text_color === 'surface' && 'text-surface',
											filteredSlides()?.[currentIndex()]?.item?.text_color === 'text_1' && 'text-text_1',
											filteredSlides()?.[currentIndex()]?.item?.text_color === 'text_2' && 'text-text_2',
											filteredSlides()?.[currentIndex()]?.item?.text_color === 'text_3' && 'text-text_3',
											filteredSlides()?.[currentIndex()]?.item?.text_color === 'text_4' && 'text-text_4',
											filteredSlides()?.[currentIndex()]?.item?.text_color === 'text_5' && 'text-text_5',
											filteredSlides()?.[currentIndex()]?.item?.text_color === 'accenttext_1' && 'text-accenttext_1',
											filteredSlides()?.[currentIndex()]?.item?.text_color === 'accenttext_2' && 'text-accenttext_2',
											filteredSlides()?.[currentIndex()]?.item?.text_color === 'accent_4' && 'text-accent_4',
											filteredSlides()?.[currentIndex()]?.item?.text_color === 'accent_5' && 'text-accent_5',
											filteredSlides()?.[currentIndex()]?.item?.text_color === 'accent_6' && 'text-accent_6',
											filteredSlides()?.[currentIndex()]?.item?.text_color === 'accent_7' && 'text-accent_7',
											filteredSlides()?.[currentIndex()]?.item?.text_color === 'accent_8' && 'text-accent_8',
											filteredSlides()?.[currentIndex()]?.item?.text_color === 'accent_9' && 'text-accent_9',
											filteredSlides()?.[currentIndex()]?.item?.text_color === 'accent_10' && 'text-accent_10'
										)}
									>
										<div>
											<div class="flex flex-col items-center justify-center  sm:h-auto  mx-6 md:mx-auto space-y-1">
												<h1 class=" tracking-tighter text-4xl  sm:text-5xl  lg:max-w-auto  lg:text-6xl  font-700 z-2 lg:text-balance text-center text-balance">
													{filteredSlides()?.[currentIndex()]?.item?.header}
												</h1>
												<h2 class=" tracking-tighter text-xl  sm:text-3xl  lg:max-w-auto   lg:text-4xl  font-500 z-2 lg:text-balance  text-center text-balance ">
													{filteredSlides()?.[currentIndex()]?.item?.subtitle}
												</h2>
											</div>
										</div>
										<div class="flex flex-col items-center justify-center space-y-2 mb-2 lg:mb-auto">
											<div class="flex items-center hover:underline text-xs md:text-sm lg:text-base bg-accent_6 text-accenttext_1 p-2  rounded-1">
												<A
													href={filteredSlides()?.[currentIndex()]?.item?.call_to_action_href || '/store/Store'}
													class="text- z-2 tracking-tight"
												>
													{filteredSlides()?.[currentIndex()]?.item?.call_to_action}
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
								href={filteredSlides()?.[currentIndex()]?.item?.image_href || '/store/Store'}
							>
								<img
									src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${
										filteredSlides()?.[currentIndex()]?.item?.image?.id
									}?key=hero-large`}
									loading="eager"
									alt="main image"
									height={'765px'}
									width={'1210px'}
									class={clsx(
										'"w-[1210px] max-h-[765px] min-h-[36rem] aspect-[242/153] object-cover object-left',

										getWindowSize().width <= 1023 && 'hidden'
									)}
								/>

								<img
									src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${
										filteredSlides()?.[currentIndex()]?.item?.mobile_image?.id
									}?key=hero-small`}
									loading="eager"
									alt="main image"
									height={'292px'}
									width={'375px'}
									class={clsx(
										' min-h-292px object-cover object-left',

										getWindowSize().width > 1023 && 'hidden'
									)}
								/>

								<div class="text-xs lg:text-sm xl:text-base text-text_2 xl:mt-1">
									{filteredSlides()?.[currentIndex()]?.item?.image_tagline}
								</div>
							</A>
						</div>
					</Show>
					<div class="h-5vw w-99svw bg-transparent"></div>
				</TransitionGroup>
			</Rerun>
		</Show>
	)
}
