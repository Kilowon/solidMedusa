import { lazy, For } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { A } from 'solid-start'

const FooterCTA = lazy(() => import('~/Components/layout/FooterCTA'))
const FooterNav = lazy(() => import('~/Components/layout/FooterNav'))
const MECTA = lazy(() => import('~/Components/layout/MECTA'))

export default function Footer() {
	return (
		<footer>
			<Transition
				onEnter={(el, done) => {
					const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
						duration: 300
					})
					a.finished.then(done)
				}}
				onExit={(el, done) => {
					const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
						duration: 200
					})
					a.finished.then(done)
				}}
			>
				<FooterCTA />
			</Transition>
			<CallToAction />
			<FooterNav />
			<MECTA />
		</footer>
	)
}

export function CallToAction() {
	return (
		<div class="bg-gray-1/50 py-16">
			<div class="content-container">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div class="flex flex-col justify-center">
						<h1 class="text-base md:text-lg lg:text-xl font-500 text-gray-6 tracking-tighter ">
							Unleash Your Inner Explorer! With over 200+ items.
						</h1>
						<div class="text-sm md:text-base lg:text-lg text-gray-5 tracking-tighter">
							{' '}
							Find the perfect piece that captures your imagination.
						</div>
						<div class="flex items-center hover:underline">
							<A
								href="/store/Store"
								class="text-base md:text-lg lg:text-xl text-gray-5 hover:text-gray-7 tracking-tighter"
							>
								Explore our entire selection
							</A>
							<div class="text-xl md:text-3xl text-gray-5 hover:text-gray-7">
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
