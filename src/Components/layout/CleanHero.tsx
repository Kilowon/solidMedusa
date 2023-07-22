import { Show, For, createSignal, onMount } from 'solid-js'
import { A } from 'solid-start'
import { Image } from '@unpic/solid'
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
		const data = await heroData.data

		if (data) {
			setTime(heroData?.data?.data?.pause_between)
			setEndWait(heroData?.data?.data?.init_hold)
			setTotalLength(heroData?.data?.data?.hero_data?.length)
			heroCarousel()
		}
	})

	return (
		<Show when={heroData.isSuccess && queryCategories.isSuccess && heroData.isSuccess}>
			<div
				class="h-[100svh] w-full items-center justify-between flex relative overflow-hidden
		"
			>
				<div class="flex flex-col justify-center">
					<div class="text-text_2 z-10 flex flex-col items-start max-w-[600px] ml-20 space-y-12 ">
						<div class="flex flex-col space-y-3 ">
							<h1 class="flex-grow tracking-tighter text-7xl drop-shadow-md   font-700 z-2 ">
								{heroData?.data?.data?.hero_info[0].header}
							</h1>
							<h3 class="flex-grow tracking-tighter sm:text-4xl drop-shadow-md  font-500 z-2  break-words whitespace-break-spaces">
								{heroData?.data?.data?.hero_info[0].subtitle}
							</h3>
						</div>

						<div class="flex items-center hover:underline bg-text_2 text-normal_1 p-2  rounded-1">
							<A
								href="/store/Store"
								class="text- z-2 tracking-tight"
							>
								{heroData?.data?.data?.hero_info[0].call_to_action}
							</A>
							{/* <div class="text-xl md:text-5xl">
                            Orange & Plush living on the edge never looked this good :)
								<div class="i-material-symbols-arrow-right-alt-rounded" />
							</div> */}
						</div>
					</div>

					<div class="absolute bottom-4 left-4 flex space-x-2">
						<For each={heroData?.data?.data?.hero_info}>
							{(item, index) => {
								return (
									<div>
										<Show when={index() === currentIndex()}>
											<div class="w-1.5 h-1.5 rounded-6 bg-acces" />
										</Show>
										<Show when={index() !== currentIndex()}>
											<div class="w-1.5 h-1.5 rounded-6 bg-gray-3/30" />
										</Show>
									</div>
								)
							}}
						</For>
					</div>
				</div>
				<div class=" w-[1193px] h-[841px]">
					<img
						src={heroData?.data?.data?.hero_info[0].image}
						class="w-full h-full object-cover"
					/>
				</div>
			</div>
		</Show>
	)
}
