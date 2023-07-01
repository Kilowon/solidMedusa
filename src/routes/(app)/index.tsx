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
		<main>
			<Hero />
			<div class="my-16">
				<Suspense>
					<FeaturedProducts variant="hero" />
					<FeaturedProducts variant="hero2" />
					<FeaturedProducts variant="hero3" />
					<CallToAction />
				</Suspense>
			</div>
		</main>
	)
}

export function CallToAction() {
	return (
		<div class="bg-gray-1 py-16">
			<div class="content-container">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div class="flex flex-col justify-center">
						<h1 class="text-xl md:text-3xl lg:text-4xl font-500 text-gray-6 tracking-tighter ">
							Unleash Your Inner Explorer! With over 200+ items.
						</h1>
						<div class="text-base md:text-xl lg:text-2xl text-gray-5 tracking-tighter">
							{' '}
							Find the perfect piece that captures your imagination.
						</div>
						<div class="flex items-center hover:underline">
							<A
								href="/store/Store"
								class="text-base md:text-xl lg:text-2xl text-gray-4 hover:text-gray-7 tracking-tighter"
							>
								Explore our entire selection
							</A>
							<div class="text-xl md:text-5xl text-gray-4 hover:text-gray-7">
								<div class="i-material-symbols-arrow-right-alt-rounded" />
							</div>
						</div>
					</div>
					<div class="hidden lg:block">
						<For each={[1]}>
							{item => (
								<div class="flex flex-col space-y-2">
									<div class="flex items-center space-x-4">
										<div class="w-4 h-4 bg-gray-5 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5 rounded-full"></div>
									</div>
									<div class="flex items-center space-x-4">
										<div class="w-4 h-4 bg-gray-5 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5 rounded-full"></div>
									</div>
									<div class="flex items-center space-x-4">
										<div class="w-4 h-4 bg-gray-5/75 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5/75 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5/75 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5/75 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5/75 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5/75 rounded-full"></div>
									</div>
									<div class="flex items-center space-x-4">
										<div class="w-4 h-4 bg-gray-5/75 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5/75 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5/75 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5/75 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5/75 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5/75 rounded-full"></div>
									</div>
									<div class="flex items-center space-x-4">
										<div class="w-4 h-4 bg-gray-5/50 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5/50 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5/50 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5/50 rounded-full"></div>
									</div>
									<div class="flex items-center space-x-4">
										<div class="w-4 h-4 bg-gray-5/50 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5/50 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5/50 rounded-full"></div>
										<div class="w-4 h-4 bg-gray-5/50 rounded-full"></div>
									</div>
								</div>
							)}
						</For>
					</div>
				</div>
			</div>
		</div>
	)
}
