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

	function heroCarousel() {
		if (!heroData?.data?.data?.slides_active) return
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
			setTime(heroData?.data?.data?.pause_between * 1000)
			setEndWait(heroData?.data?.data?.init_hold * 1000)
			setTotalLength(heroData?.data?.data?.slides_active ? heroData?.data?.data?.hero_info?.length : 0)
			heroCarousel()
		}
	})

	createEffect(() => {
		console.log('currentIndex', currentIndex())
	})

	return (
		<Show when={heroData.isSuccess && queryCategories.isSuccess && heroData.isSuccess}>
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
							class="sm:h-[100svh] lg:mb-auto lg:mt-auto w-full  flex items-center sm:justify-center  lg:justify-between flex-col lg:flex-row  
		"
						>
							<div class="flex flex-col justify-center  ">
								<div class="text-text_2 z-10 flex flex-col  lg:max-w-[600px] lg:min-w-[470px] items-center lg:ml-20 lg:space-y-12 ">
									<div class="flex flex-col space-y-3 items-center justify-center  sm:h-auto  mx-6 md:mx-auto">
										<h1 class=" tracking-tighter text-3xl  sm:text-5xl md:text-[5vw] md:max-w-lg lg:max-w-auto  lg:text-6xl drop-shadow-md font-700 z-2 lg:text-balance text-center text-balance">
											{heroData?.data?.data?.hero_info[currentIndex()].header}
										</h1>
										<h3 class=" tracking-tighter text-xl  sm:text-3xl md:text-[3vw] md:max-w-lg lg:max-w-auto   lg:text-4xl drop-shadow-md font-500 z-2 lg:text-balance  text-center text-balance ">
											{heroData?.data?.data?.hero_info[currentIndex()].subtitle}
										</h3>
									</div>

									<div class="hidden lg:flex items-center hover:underline text-xs md:text-sm lg:text-base bg-accent_6 text-normal_1 p-2  rounded-1">
										<A
											href="/store/Store"
											class="text- z-2 tracking-tight"
										>
											{heroData?.data?.data?.hero_info[currentIndex()].call_to_action}
										</A>
									</div>
									<div class="flex space-x-2">
										<Show when={getWindowSize().width > 1023 && heroData.isSuccess}>
											<For each={heroData?.data?.data?.hero_info}>
												{(item, index) => {
													return (
														<div>
															<Show when={index() === currentIndex()}>
																<div class="w-1.5 h-1.5 rounded-6 bg-accent_6" />
															</Show>
															<Show when={index() !== currentIndex()}>
																<div class="w-1.5 h-1.5 rounded-6 bg-gray-4" />
															</Show>
														</div>
													)
												}}
											</For>
										</Show>
									</div>
								</div>
							</div>
							<div class=" flex lg:hidden items-center justify-center hover:underline text-xs md:text-sm lg:text-base bg-accent_6 text-normal_1 p-2  rounded-1 m-3">
								<A
									href={heroData?.data?.data?.hero_info[currentIndex()].call_to_action_href}
									class="text- z-2 tracking-tight"
								>
									{heroData?.data?.data?.hero_info[currentIndex()].call_to_action}
								</A>
							</div>
							<div class="flex space-x-2">
								<Show when={getWindowSize().width < 1023 && heroData.isSuccess}>
									<For each={heroData?.data?.data?.hero_info}>
										{(item, index) => {
											return (
												<div>
													<Show when={index() === currentIndex()}>
														<div class="w-1.5 h-1.5 rounded-6 bg-accent_6" />
													</Show>
													<Show when={index() !== currentIndex()}>
														<div class="w-1.5 h-1.5 rounded-6 bg-gray-4" />
													</Show>
												</div>
											)
										}}
									</For>
								</Show>
							</div>
							<A
								class="  flex flex-col items-center"
								href={heroData?.data?.data?.hero_info[currentIndex()].image_href}
							>
								<Show when={getWindowSize().width > 1023 && heroData.isSuccess}>
									<img
										src={heroData?.data?.data?.hero_info[currentIndex()].image}
										fetchpriority="high"
										class="w-[1210px] h-[765px] aspect-[242/153] object-cover object-left"
									/>
								</Show>
								<Show when={getWindowSize().width <= 1023 && heroData.isSuccess}>
									<img
										src={heroData?.data?.data?.hero_info[currentIndex()].mobile_image}
										fetchpriority="high"
										class=" aspect-[377/198]  min-h-396px object-cover object-left "
									/>
								</Show>

								<div class="text-xs lg:text-sm xl:text-base text-text_2 xl:mt-1">
									{heroData?.data?.data?.hero_info[currentIndex()].image_tagline}
								</div>
							</A>
						</div>
					</Motion.div>
				</Rerun>
			</Presence>
		</Show>
	)
}
