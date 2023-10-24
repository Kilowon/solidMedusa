import { CleanHero } from '~/Components/layout/CleanHero'
import { lazy, Suspense, createSignal, createEffect, Show, For } from 'solid-js'
import { createQuery } from '@tanstack/solid-query'
import { createVisibilityObserver } from '@solid-primitives/intersection-observer'
import { create } from 'domain'

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

const DividerA = lazy(() => import('~/Components/layout/DividerA'))

export default function DisplayContainer(props: { data: any }) {
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
		<main>
			<div>
				<div
					ref={el}
					class="w-90% h-5 bg-transparent"
				></div>

				<Suspense>
					<Show when={isVisible()}>
						<For each={props.data?.data?.data?.product_info}>
							{item => {
								if (item.item.location !== 'hero') return
								if (import.meta.env.VITE_DRAFT_SITE === 'false') {
									if (item.item.status === 'draft') return
								}
								if (item.item.status === 'archived') return

								return (
									<div>
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
										<Show when={item?.item?.type === 'divider_a'}>
											<DividerA item={item.item} />
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
