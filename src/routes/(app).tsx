import { lazy, Suspense, createSignal, createEffect, Show } from 'solid-js'
import { Outlet, Link } from 'solid-start'
import { createQuery } from '@tanstack/solid-query'
import { createVisibilityObserver } from '@solid-primitives/intersection-observer'
import { getWindowSize } from '@solid-primitives/resize-observer'
import Navigation from '~/Components/layout/Navigation'

const Footer = lazy(() => import('~/Components/layout/Footer'))

export default function Home() {
	const primaryData = createQuery(() => ({
		queryKey: ['primary_data'],
		queryFn: async function () {
			const response = await fetch(`${import.meta.env.VITE_DIRECTUS_URL}/items/Primary`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			})
			const data = await response.json()
			return data
		},
		retry: 0,
		enabled: true,
		deferStream: false,
		refetchOnWindowFocus: false
	}))

	const heroData = createQuery(() => ({
		queryKey: ['hero_data'],
		queryFn: async function () {
			const bearerToken = import.meta.env.VITE_BEARER_TOKEN
			const response = await fetch(`${import.meta.env.VITE_DIRECTUS_URL}/items/main_hero`, {
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
		retry: 0,
		enabled: true,
		deferStream: false
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

	return (
		<div
			class="bg-normal_1"
			style={
				import.meta.env.VITE_DRAFT_SITE === 'false'
					? {
							'--normal_1': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.normal)}`,
							'--normal_2': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.normal_2)}`,
							'--normal_3': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.normal_3)}`,
							'--normal_4': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.normal_4)}`,
							'--surface': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.surface)}`,
							'--text_1': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.text_1)}`,
							'--text_2': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.text_2)}`,
							'--text_3': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.text_3)}`,
							'--text_4': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.text_4)}`,
							'--text_5': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.text_5)}`,
							'--accent_1': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent)}`,
							'--accent_3': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_3)}`,
							'--accent_2': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_2)}`,
							'--accent_4': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_4)}`,
							'--accent_5': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_5)}`,
							'--accent_6': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_6)}`,
							'--accent_7': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_7)}`,
							'--accent_8': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_8)}`,
							'--accent_9': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_9)}`,
							'--accent_10': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_10)}`,
							'--accent_text_1': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_text)}`,
							'--accent_text_2': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_text_2)}`
					  }
					: import.meta.env.VITE_DRAFT_SITE === 'true'
					? {
							'--normal_1': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.normal)}`,
							'--normal_2': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.normal_2)}`,
							'--normal_3': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.normal_3)}`,
							'--normal_4': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.normal_4)}`,
							'--surface': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.surface)}`,
							'--text_1': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.text_1)}`,
							'--text_2': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.text_2)}`,
							'--text_3': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.text_3)}`,
							'--text_4': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.text_4)}`,
							'--text_5': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.text_5)}`,
							'--accent_1': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent)}`,
							'--accent_3': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_3)}`,
							'--accent_2': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_2)}`,
							'--accent_4': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_4)}`,
							'--accent_5': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_5)}`,
							'--accent_6': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_6)}`,
							'--accent_7': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_7)}`,
							'--accent_8': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_8)}`,
							'--accent_9': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_9)}`,
							'--accent_10': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_10)}`,
							'--accent_text_1': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_text)}`,
							'--accent_text_2': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_text_2)}`
					  }
					: {}
			}
		>
			<Navigation />

			<Outlet />

			<Suspense>
				<Show when={primaryData.isSuccess && heroData.isSuccess}>
					<div class="min-h-50">
						<div
							ref={el}
							class="w-100% h-5 bg-transparent"
						></div>
						<Show when={isVisible()}>
							<Footer />
						</Show>
					</div>
					<Show when={heroData?.data?.data?.Hero_infor?.[0]?.item?.image?.id !== undefined}>
						<Link
							rel="preload"
							as="image"
							href={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${
								heroData?.data?.data?.Hero_infor?.[0]?.item?.image?.id
							}?key=hero-large`}
						/>
					</Show>
					<Show when={heroData?.data?.data?.Hero_infor?.[0]?.item?.mobile_image?.id !== undefined}>
						<Link
							rel="preload"
							as="image"
							href={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${
								heroData?.data?.data?.Hero_infor?.[0]?.item?.mobile_image?.id
							}?key=hero-small`}
						/>
					</Show>
				</Show>
			</Suspense>
		</div>
	)
}
