import CartCore from '~/Components/Core/CartCore'
import { lazy } from 'solid-js'
import { A } from 'solid-start'

const FeaturedProducts = lazy(() => import('~/Components/layout/FeaturedProducts'))

export default function Cart(props: any) {
	return (
		<div>
			<Header />
			<div class="sm:content-container sm:mt-10">
				<CartCore variant="primary" />
			</div>
			<FeaturedProducts variant="footer" />
		</div>
	)
}

export function Header() {
	return (
		<div class="sticky top-0 inset-x-0 z-50 group ">
			<header class={'relative h-16 mx-auto transition-colors border-b border-transparent duration-200 bg-[#fefcfa]'}>
				<nav
					class={
						'flex items-center justify-between w-full h-full text-sm transition-colors duration-200 text-gray-5 relative'
					}
				>
					<div class="block m-2 ">
						<A
							href="/"
							class="text-xs font-semibold  "
						>
							<div class=" flex items-center font-poppins uppercase">
								<div class={'i-tabler-chevron-left text-3xl '} />
								<div class="hidden sm:block mx-0.5">Continue to</div>
								Store
							</div>
						</A>
					</div>

					<div class="flex items-center h-full">
						<A
							href="/"
							class="text-lg md:text-2xl font-semibold  "
						>
							<div class="flex items-center">
								<div class=" font-poppins uppercase text-sm ml-4 lg:text-2xl"> Modern Edge </div>
							</div>
						</A>
					</div>
					<div class="block m-2 ">
						<A
							href="/checkout"
							class="text-xs font-semibold  "
						>
							<div class=" flex items-center font-poppins uppercase">
								<div class="hidden sm:block mx-0.5">Continue to</div>
								Checkout
								<div class={'i-tabler-chevron-right text-3xl '} />
							</div>
						</A>
					</div>
				</nav>
			</header>
		</div>
	)
}
