import CartCore from '~/Components/Core/CartCore'
import { lazy } from 'solid-js'
import { A } from 'solid-start'
import { createQuery } from '@tanstack/solid-query'

const FeaturedProducts = lazy(() => import('~/Components/layout/FeaturedProducts'))
function hexToRgb(hex: any) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null
}
export default function Cart(props: any) {
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
	return (
		<div
			class="bg-normal_1 min-h-[100svh]"
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
			<Header />
			<div>
				<div class="lg:content-container mx-2 lg:mx-auto sm:mt-10 lg:min-w-80vw lg:mt-20 ">
					<CartCore variant="primary" />
				</div>
			</div>
			{/* <FeaturedProducts variant="footer" /> */}
		</div>
	)
}

export function Header() {
	return (
		<div class="sticky top-0 inset-x-0 z-50 group ">
			<header class={'relative h-16 mx-auto transition-colors border-b border-transparent duration-200 bg-normal_1'}>
				<nav
					class={
						'flex items-center justify-between w-full h-full text-sm transition-colors duration-200 text-text_2 relative'
					}
				>
					<div class="block m-2 ">
						<A
							href="/"
							class="text-xs font-700  "
						>
							<div class=" flex items-center uppercase">
								<div class={'i-tabler-chevron-left h-5 w-5 '} />
								<div class="hidden sm:block mx-0.5">Continue to</div>
								Store
							</div>
						</A>
					</div>

					<div class="flex items-center h-full">
						<A
							href="/"
							class="text-lg md:text-2xl font-700  "
						>
							<div class="flex items-center">
								<div class="  uppercase text-sm ml-4 lg:text-2xl"> Modern Edge </div>
							</div>
						</A>
					</div>
					<div class="block m-2 ">
						<A
							href="/checkout"
							class="text-xs font-700  "
						>
							<div class=" flex items-center  uppercase">
								<div class="hidden sm:block mx-0.5">Continue to</div>
								Checkout
								<div class={'i-tabler-chevron-right h-5 w-5 '} />
							</div>
						</A>
					</div>
				</nav>
			</header>
		</div>
	)
}
