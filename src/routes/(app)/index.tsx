import { CleanHero } from '~/Components/layout/CleanHero'
import { lazy, Suspense, createSignal, createEffect, Show, For } from 'solid-js'
import { createQuery } from '@tanstack/solid-query'
import { createVisibilityObserver } from '@solid-primitives/intersection-observer'

const FeaturedProducts = lazy(() => import('~/Components/layout/FeaturedProducts'))

export default function App() {
	let el: HTMLDivElement | undefined
	const [isVisible, setIsVisible] = createSignal(false)
	const [delay, setDelay] = createSignal(0.1)
	const visible = createVisibilityObserver({ threshold: 0.1 })(() => el)

	createEffect(() => {
		if (visible()) {
			setIsVisible(true)
		}
	})

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

	return (
		<main class="min-h-[100vh] ">
			<CleanHero />
			<div class="min-h-[100vh]">
				<div
					ref={el}
					class="w-100% h-5 bg-transparent"
				></div>
				<Suspense>
					<Show when={isVisible() && primaryData.isSuccess}>
						<For each={primaryData.data?.data?.main_page_component_block}>
							{item => {
								return (
									<div>
										<Show when={item.component_type === 'featured_products'}>
											<FeaturedProducts variant={item.variant} />
										</Show>
									</div>
								)
							}}
						</For>
					</Show>
				</Suspense>
			</div>
		</main>
	)
}
