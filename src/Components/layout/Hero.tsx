import { Show, For, createEffect, createSignal, createMemo, onCleanup, onMount } from 'solid-js'
import { A } from 'solid-start'
import { Image } from '@unpic/solid'
import { getWindowSize } from '@solid-primitives/resize-observer'
import { useGlobalContext } from '~/Context/Providers'
import { Motion, Presence } from '@motionone/solid'
import { Rerun } from '@solid-primitives/keyed'
import clsx from 'clsx'
import { createQuery } from '@tanstack/solid-query'

export function Hero() {
	const { rootCategories } = useGlobalContext()

	const heroData = createQuery(() => ({
		queryKey: ['hero_data'],
		queryFn: async function () {
			const bearerToken = import.meta.env.VITE_BEARER_TOKEN
			const response = await fetch(`https://direct.shauns.cool/items/Hero`, {
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
		<div
			class="h-[100svh] w-full top-0 left-0 z--20 bg-cover bg-center bg-no-repeat flex items-center md:items-end 
		"
		>
			<div class="absolute bg-gray-8 w-[100%] h-[100%] top-0 left-0 z--40" />
			<Presence initial>
				<Show when={heroData.isSuccess}>
					<div class="text-white z-10 flex flex-col items-start mb-20  ">
						<div class="flex flex-col sm:flex-row space-x-[1vw] overflow-hidden sm:overflow-visible">
							<Show when={true}>
								<Show when={heroData?.data?.data?.static1 === true}>
									<h1 class="flex-grow tracking-tighter text-5xl sm:text-[6.5vw] drop-shadow-md shadow-black font-poppins font-400 z-2  break-words whitespace-break-spaces">
										{heroData?.data?.data?.static_callout}
									</h1>
								</Show>
							</Show>
							<Show when={getWindowSize().width > 768 && heroData?.data?.data?.dynamic1 === true}>
								<h1 class="flex-grow tracking-tighter text-5xl sm:text-[6.5vw]   mb-4 text-accenttext_2  z-2">{`${
									heroData?.data?.data?.hero_data[currentIndex()].title
								}`}</h1>
							</Show>
							<Show when={getWindowSize().width < 768 && heroData?.data?.data?.dynamic1 === true}>
								<h1 class="flex-grow tracking-tighter text-5xl sm:text-[6.5vw]   mb-4 text-blue-3  z-2">{`${
									heroData?.data?.data?.hero_data[currentIndex()].title
								}`}</h1>
							</Show>
						</div>

						<div class="flex items-center hover:underline">
							<A
								href="/store/Store"
								class="text-base sm:text-xl xl:text-4xl z-2 tracking-tight"
							>
								{heroData?.data?.data?.call_to_action}
							</A>
							<div class="text-xl md:text-5xl">
								<div class="i-material-symbols-arrow-right-alt-rounded" />
							</div>
						</div>

						<div class="absolute bottom-4 left-4 flex space-x-2">
							<For each={heroData?.data?.data?.hero_data}>
								{(item, index) => {
									return (
										<div>
											<Show when={index() === currentIndex()}>
												<div class="w-3 h-1.5 rounded-6 bg-blue-3" />
											</Show>
											<Show when={index() !== currentIndex()}>
												<div class="w-3 h-1.5 rounded-6 bg-gray-3/30" />
											</Show>
										</div>
									)
								}}
							</For>
						</div>
					</div>
				</Show>
			</Presence>
			<Show when={getWindowSize().width > 768 && heroData.isSuccess}>
				<Image
					src={heroData?.data?.data?.hero_data?.[currentIndex()]?.image}
					layout="fullWidth"
					priority={true}
					class="object-cover object-right md:object-center h-full w-full z--10 absolute inset-0  filter brightness-65"
					alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
				/>
			</Show>
			<Show when={getWindowSize().width < 768 && heroData.isSuccess}>
				<Image
					src={heroData?.data?.data?.hero_data?.[currentIndex()]?.image}
					layout="fullWidth"
					priority={true}
					class="object-cover object-right md:object-center h-full w-full z--10 absolute inset-0  filter brightness-65"
					alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
				/>
			</Show>
		</div>
	)
}
