import { lazy, Suspense, createSignal, createEffect, Show } from 'solid-js'
import { Outlet } from 'solid-start'
import { createQuery } from '@tanstack/solid-query'
import { createVisibilityObserver } from '@solid-primitives/intersection-observer'
import { getWindowSize } from '@solid-primitives/resize-observer'
import Navigation from '~/Components/layout/Navigation'

const Footer = lazy(() => import('~/Components/layout/Footer'))

export default function Home() {
	const primaryData = createQuery(() => ({
		queryKey: ['primary_data'],
		queryFn: async function () {
			const response = await fetch(`https://direct.shauns.cool/items/Primary`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			})
			const data = await response.json()
			return data
		},
		cacheTime: 15 * 60 * 1000,
		retry: 0,
		enabled: false
	}))

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

	function hexToRgb(hex: any) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
		return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null
	}

	let el: HTMLDivElement | undefined
	const [isVisible, setIsVisible] = createSignal(false)
	const [delay, setDelay] = createSignal(0.1)
	const visible = createVisibilityObserver({ threshold: 0.1 })(() => el)

	createEffect(() => {
		if (visible()) {
			setIsVisible(true)
		}
	})

	createEffect(() => {
		if (visible()) {
			setIsVisible(true)
		}
	})

	return (
		<div
			class=""
			style={{
				'--normal_1': `${hexToRgb(primaryData?.data?.data?.normal)}`,
				'--normal_2': `${hexToRgb(primaryData?.data?.data?.normal_2)}`,
				'--normal_3': `${hexToRgb(primaryData?.data?.data?.normal_3)}`,
				'--normal_4': `${hexToRgb(primaryData?.data?.data?.normal_4)}`,
				'--surface': `${hexToRgb(primaryData?.data?.data?.surface)}`,
				'--text_1': `${hexToRgb(primaryData?.data?.data?.Text_1)}`,
				'--text_2': `${hexToRgb(primaryData?.data?.data?.text_2)}`,
				'--text_3': `${hexToRgb(primaryData?.data?.data?.text_3)}`,
				'--text_4': `${hexToRgb(primaryData?.data?.data?.text_4)}`,
				'--text_5': `${hexToRgb(primaryData?.data?.data?.text_5)}`,
				'--accent_1': `${hexToRgb(primaryData?.data?.data?.accent)}`,
				'--accent_3': `${hexToRgb(primaryData?.data?.data?.accent_3)}`,
				'--accent_2': `${hexToRgb(primaryData?.data?.data?.accent_2)}`,
				'--accent_4': `${hexToRgb(primaryData?.data?.data?.accent_4)}`,
				'--accent_5': `${hexToRgb(primaryData?.data?.data?.accent_5)}`,
				'--accent_6': `${hexToRgb(primaryData?.data?.data?.accent_6)}`,
				'--accent_text_1': `${hexToRgb(primaryData?.data?.data?.accent_text)}`,
				'--accent_text_2': `${hexToRgb(primaryData?.data?.data?.accent_text_2)}`
			}}
		>
			<Navigation />

			<Show when={heroData.isSuccess}>
				<div>
					<Show when={getWindowSize().width > 1023 && heroData.isSuccess}>
						<img
							src={heroData?.data?.data?.hero_info[0].image}
							loading="eager"
							alt="image preloading"
							class="opacity-[1%] w-[1px] h-[1px] object-cover object-left"
						/>
					</Show>
					<Show when={getWindowSize().width <= 1023 && heroData.isSuccess}>
						<img
							src={heroData?.data?.data?.hero_info[0].mobile_image}
							loading="eager"
							alt="image preloading"
							class="opacity-[1%] w-[1px] h-[1px] object-cover object-left "
						/>
					</Show>
				</div>
			</Show>

			<Outlet />
			<div
				ref={el}
				class="w-100% h-5 bg-transparent"
			></div>
			<Suspense>
				<Show when={isVisible() && primaryData.isSuccess}>
					<div class="min-h-[50vh]">
						<Footer />
					</div>
				</Show>
			</Suspense>
		</div>
	)
}
