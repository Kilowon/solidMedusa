import { HeroSection } from '~/Components/layout/HeroSection'
import { HeroFast } from '~/Components/layout/HeroFast'
import { lazy, Suspense, createSignal, createEffect, Show, For, onMount } from 'solid-js'
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

import { isVisible, setIsVisible, activeObserver, setActiveObserver } from '~/state'
import { time } from 'console'

export default function App() {
	let el: HTMLDivElement | undefined

	const [delay, setDelay] = createSignal(false)
	const visible = createVisibilityObserver({ threshold: 0.1 })(() => el)

	createEffect(() => {
		if (visible()) {
			setIsVisible(true)
			setActiveObserver(true)
		}
	})

	const heroData = createQuery(() => ({
		queryKey: ['hero_data'],
		queryFn: async function () {
			const bearerToken = import.meta.env.VITE_BEARER_TOKEN
			const response = await fetch(`${import.meta.env.VITE_DIRECTUS_URL}/items/main_hero?fields=*.item.*.*.*`, {
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
		enabled: false,
		deferStream: false,
		refetchOnWindowFocus: false
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
		enabled: activeObserver()
	}))

	onMount(() => {
		setTimeout(() => {
			setDelay(true)
		}, 1000)
	})

	return (
		<div class="min-h-300vh">
			<Suspense>
				{/* <Show when={heroData.isSuccess && heroData?.data?.data?.show_hero && heroData?.data?.data?.slides_active}> */}
				<HeroSection />
				{/* </Show>
				<Show when={heroData.isSuccess && heroData?.data?.data?.show_hero && !heroData?.data?.data?.slides_active}>
					<HeroFast />
				</Show> */}

				<div class="pb-10"></div>

				<div
					ref={el}
					class="w-90% h-10 bg-transparent"
				></div>
			</Suspense>
			<ErrorBoundary
				fallback={(e: Error) => (
					<>
						{console.error(e)}
						{/* <NotFound /> */}
					</>
				)}
			>
				{' '}
				<Suspense>
					<main>
						<div>
							{/* THIS IS A SAFE AREA TO ADD CUSTOM COMPONENTS ... IF you need to modify a component the best practice is to make a copy and modify that */}
						</div>

						<Show when={isVisible() && featuredData.isSuccess}>
							<For each={featuredData.data?.data?.builder_blocks}>
								{item => {
									if (item?.item === null) return
									if (import.meta.env.VITE_DRAFT_SITE === 'false') {
										if (item.item.status === 'draft') return
									}
									if (item.item.status === 'archived') return

									return (
										<div class="snap-start">
											<ErrorBoundary
												fallback={(e: Error) => (
													<>
														{console.error(e)}
														{/* <NotFound /> */}
													</>
												)}
											>
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
											</ErrorBoundary>
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
						<div>{/* THIS IS A SAFE AREA TO ADD CUSTOM COMPONENTS */}</div>
					</main>
				</Suspense>
			</ErrorBoundary>
		</div>
	)
}
