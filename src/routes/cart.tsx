import CartCore from '~/Components/layout/CartCore'
import { A } from 'solid-start'
import { FeaturedProducts } from '~/Components/layout/FeaturedProducts'

export default function Cart(props: any) {
	return (
		<div>
			<Header />
			<div class="content-container">
				<CartCore variant="primary" />
			</div>
			<FeaturedProducts featuredProducts={props.featuredProducts} />
		</div>
	)
}

export function Header() {
	return (
		<div class="sticky top-0 inset-x-0 z-50 group ">
			<header class={'relative h-16 mx-auto transition-colors border-b border-transparent duration-200 bg-[#fefcfa]'}>
				<nav
					class={
						'flex items-center justify-between w-full h-full text-sm transition-colors duration-200 text-dark group-hover:text-gray-900 relative'
					}
				>
					<div class="block m-2 ">
						<A
							href="/cart"
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
								<div class=" font-poppins uppercase mx-8"> Modern Edge </div>
							</div>
						</A>
					</div>
					<div class="block m-2 ">
						<A
							href="/cart"
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
