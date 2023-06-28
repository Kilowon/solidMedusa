import { Hero } from '~/Components/layout/Hero'
import { lazy, Suspense, Show, createSignal, createEffect } from 'solid-js'
import { Outlet } from 'solid-start'
import { createQuery } from '@tanstack/solid-query'
import { Motion, Presence } from '@motionone/solid'
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

	return (
		<main>
			<Hero />
			<div class="my-16">
				<Suspense>
					<div ref={el}>
						<Show when={isVisible()}>
							<Presence initial>
								<Motion
									animate={{ opacity: [0, 1] }}
									transition={{ duration: 0.2, delay: delay(), easing: 'ease-in-out' }}
								>
									<FeaturedProducts variant="hero" />
								</Motion>
							</Presence>
						</Show>
						<Show when={!isVisible()}>
							<div class="w-[100px] h-[10px]"></div>
						</Show>
					</div>
				</Suspense>
			</div>
		</main>
	)
}
