import { Hero } from '~/Components/layout/Hero'
import { lazy, Suspense, Show, createSignal, createEffect, For } from 'solid-js'
import { A } from 'solid-start'
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
		<main class="min-h-[100vh] ">
			<Suspense>
				<Hero />
			</Suspense>
			<div class="">
				<Suspense>
					<FeaturedProducts variant="hero" />
					<FeaturedProducts variant="hero2" />
					<FeaturedProducts variant="hero3" />
				</Suspense>
			</div>
		</main>
	)
}
