import { lazy, Suspense, createEffect } from 'solid-js'
import { Outlet } from 'solid-start'
import { createQuery } from '@tanstack/solid-query'

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
		retry: 0
	}))

	createEffect(() => {
		console.log(primaryData?.data?.data[0]?.title)
	})

	function hexToRgb(hex: any) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
		return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null
	}

	return (
		<div
			class="font-poppins"
			style={{
				'--normal': `${hexToRgb(primaryData?.data?.data[0]?.normal)}`,
				'--normal_2': `${hexToRgb(primaryData?.data?.data[0]?.normal_2)}`,
				'--normal_3': `${hexToRgb(primaryData?.data?.data[0]?.normal_3)}`,
				'--normal_4': `${hexToRgb(primaryData?.data?.data[0]?.normal_4)}`,
				'--surface': `${hexToRgb(primaryData?.data?.data[0]?.surface)}`,
				'--text': `${hexToRgb(primaryData?.data?.data[0]?.Text_1)}`,
				'--text_2': `${hexToRgb(primaryData?.data?.data[0]?.text_2)}`,
				'--text_3': `${hexToRgb(primaryData?.data?.data[0]?.text_3)}`,
				'--text_4': `${hexToRgb(primaryData?.data?.data[0]?.text_4)}`,
				'--text_5': `${hexToRgb(primaryData?.data?.data[0]?.text_5)}`,
				'--accent': `${hexToRgb(primaryData?.data?.data[0]?.accent)}`,
				'--accent_3': `${hexToRgb(primaryData?.data?.data[0]?.accent_3)}`,
				'--accent_2': `${hexToRgb(primaryData?.data?.data[0]?.accent_2)}`,
				'--accent_4': `${hexToRgb(primaryData?.data?.data[0]?.accent_4)}`,
				'--accent_text': `${hexToRgb(primaryData?.data?.data[0]?.accent_text)}`,
				'--accent_text_2': `${hexToRgb(primaryData?.data?.data[0]?.accent_text_2)}`
			}}
		>
			<Suspense>
				<Navigation />
			</Suspense>
			<Outlet />
			<Suspense>
				<Footer />
			</Suspense>
		</div>
	)
}
