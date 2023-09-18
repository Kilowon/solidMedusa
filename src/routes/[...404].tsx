import { A } from 'solid-start'
import { createQuery } from '@tanstack/solid-query'
import Navigation from '~/Components/layout/Navigation'

export default function NotFound() {
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
		cacheTime: 15 * 60 * 1000,
		retry: 0,
		enabled: false
	}))

	function hexToRgb(hex: any) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
		return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null
	}

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
			<section class="flex items-center h-full p-16 text-text_2">
				<div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
					<div class="max-w-md text-center">
						<h2 class="mb-8 font-extrabold text-9xl dark:text-gray-600">
							<span class="sr-only">Error</span>OOPS!
						</h2>
						<p class="text-2xl font-semibold md:text-3xl">Page not found</p>
						<p class="mt-4 mb-8 dark:text-gray-400">
							Sorry, we couldn't find the page you were looking for and suggest you return to our home page
						</p>
						<A
							rel="noopener noreferrer"
							href="/"
							class="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
						>
							Back to homepage
						</A>
					</div>
				</div>
			</section>
		</div>
	)
}
