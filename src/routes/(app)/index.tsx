import { CleanHero } from '~/Components/layout/CleanHero'
import { lazy, Suspense, createSignal, createEffect, Show, For } from 'solid-js'
import { createQuery } from '@tanstack/solid-query'
import { createVisibilityObserver } from '@solid-primitives/intersection-observer'
import { ErrorBoundary } from 'solid-start'

const FeaturedProducts = lazy(() => import('~/Components/layout/FeaturedProducts'))

const FeaturedProductsLg = lazy(() => import('~/Components/layout/FeaturedProducts_b'))

const FeaturedProductsLgExtended = lazy(() => import('~/Components/layout/FeaturedProducts_c'))

const FeaturedProductsD = lazy(() => import('~/Components/layout/FeaturedProductsD'))

const FocusProduct = lazy(() => import('~/Components/layout/FocusProduct'))

const FocusProductB = lazy(() => import('~/Components/layout/FocusProductB'))

const FocusProductC = lazy(() => import('~/Components/layout/FocusProductC'))

const FocusProductD = lazy(() => import('~/Components/layout/FocusProductD'))

const FocusProductE = lazy(() => import('~/Components/layout/FocusProductE'))

const FocusProductF = lazy(() => import('~/Components/layout/FocusProductF'))

const FocusProductG = lazy(() => import('~/Components/layout/FocusProductG'))

const FocusProductH = lazy(() => import('~/Components/layout/FocusProductH'))

const DividerA = lazy(() => import('~/Components/layout/DividerA'))

import { isVisible, setIsVisible } from '~/state'

export default function App() {
	let el: HTMLDivElement | undefined

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

	const featuredData = createQuery(() => ({
		queryKey: ['featured_data'],
		queryFn: async function () {
			const response = await fetch(`${import.meta.env.VITE_DIRECTUS_URL}/items/featured_constructor?fields=*.item.*.*.*`, {
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
		enabled: true
	}))

	return (
		<main class="min-h-[100vh]">
			<CleanHero />
			<div class="min-h-[100vh] snap-y snap-mandatory">
				<div
					ref={el}
					class="w-90% h-5 bg-transparent"
				></div>
				<div>
					{/* THIS IS A SAFE AREA TO ADD CUSTOM COMPONENTS ... IF you need to modify a component the best practice is to make a copy and modify that */}
				</div>
				<ErrorBoundary
					fallback={(e: Error) => (
						<>
							{console.error(e)}
							{/* <NotFound /> */}
						</>
					)}
				>
					<Suspense>
						<Show when={isVisible() && primaryData.isSuccess && featuredData.isSuccess}>
							<For each={featuredData.data?.data?.builder_blocks}>
								{item => {
									if (item?.item === null) return
									if (import.meta.env.VITE_DRAFT_SITE === 'false') {
										if (item.item.status === 'draft') return
									}
									if (item.item.status === 'archived') return

									return (
										<div class="snap-start">
											<Show when={item?.item?.type === 'featured_products_a'}>
												<FeaturedProducts
													variant={item?.item?.variant}
													item={item.item}
												/>
											</Show>
											<Show when={item?.item?.type === 'featured_products_b'}>
												<FeaturedProductsLg
													variant={item?.item?.variant}
													item={item.item}
												/>
											</Show>
											<Show when={item?.item?.type === 'featured_products_c'}>
												<FeaturedProductsLgExtended
													variant={item?.item?.variant}
													item={item.item}
												/>
											</Show>
											<Show when={item?.item?.type === 'featured_products_d'}>
												<FeaturedProductsD item={item.item} />
											</Show>
											<Show when={item?.item?.type === 'focus_product_a'}>
												<FocusProduct item={item.item} />
											</Show>
											<Show when={item?.item?.type === 'focus_product_b'}>
												<FocusProductB item={item.item} />
											</Show>
											<Show when={item?.item?.type === 'focus_product_c'}>
												<FocusProductC item={item.item} />
											</Show>
											<Show when={item?.item?.type === 'focus_product_d'}>
												<FocusProductD item={item.item} />
											</Show>
											<Show when={item?.item?.type === 'focus_product_e'}>
												<FocusProductE item={item.item} />
											</Show>
											<Show when={item?.item?.type === 'focus_product_f'}>
												<FocusProductF item={item.item} />
											</Show>
											<Show when={item?.item?.type === 'focus_product_g'}>
												<FocusProductG item={item.item} />
											</Show>
											<Show when={item?.item?.type === 'focus_product_h'}>
												<FocusProductH item={item.item} />
											</Show>
											<Show when={item?.item?.type === 'divider_a'}>
												<DividerA item={item.item} />
											</Show>
										</div>
									)
								}}
							</For>
						</Show>
					</Suspense>
				</ErrorBoundary>
				<div>{/* THIS IS A SAFE AREA TO ADD CUSTOM COMPONENTS */}</div>
			</div>
		</main>
	)
}
