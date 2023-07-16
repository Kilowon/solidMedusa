import { lazy, Suspense, createSignal, createEffect } from 'solid-js'
import { Outlet } from 'solid-start'
import { createQuery } from '@tanstack/solid-query'
import { createVisibilityObserver } from '@solid-primitives/intersection-observer'

const Navigation = lazy(() => import('~/Components/layout/Navigation'))
const Footer = lazy(() => import('~/Components/layout/Footer'))

// App.tsx
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

	function hexToRgb(hex: any) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
		return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null
	}

	let elb: HTMLDivElement | undefined
	const [isVisible, setIsVisible] = createSignal(false)
	const [delay, setDelay] = createSignal(0.5)
	const visible = createVisibilityObserver({ threshold: 0.1 })(() => elb)

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
				'--accent_text_1': `${hexToRgb(primaryData?.data?.data?.accent_text)}`,
				'--accent_text_2': `${hexToRgb(primaryData?.data?.data?.accent_text_2)}`
			}}
		>
			{/* 	<Suspense>
				<Navigation />
			</Suspense> */}
			<Suspense>
				<Outlet />
			</Suspense>
			{/* <Suspense>
				<Footer />
			</Suspense> */}
		</div>
	)
}
