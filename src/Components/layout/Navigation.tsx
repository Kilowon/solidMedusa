import { createSignal, lazy } from 'solid-js'
import { A } from 'solid-start'

const CartDrawerNav = lazy(() => import('~/Components/nav_components/CartDrawerNav'))
const CartDropdown = lazy(() => import('~/Components/nav_components/CartDropdown'))
const HamburgerDrawerNav = lazy(() => import('~/Components/nav_components/HamburgerDrawerNav'))
const DropdownMenu = lazy(() => import('~/Components/nav_components/DropdownMenu'))

export function Navigation(props: any) {
	const [stayOpen, setStayOpen] = createSignal(false)

	const [cartDrawer, setCartDrawer] = createSignal({
		checkout: 'active',
		cart: 'hidden'
	})
	const [menuDrawer, setMenuDrawer] = createSignal({
		menu: 'hidden' as const
	})

	return (
		<div class="sticky top-0 inset-x-0 z-50 group sm:!fixed text-gray-5">
			<header class="relative h-16 mx-auto  border-b border-transparent bg-white">
				<nav class="flex items-center justify-between w-full h-full text-sm text-gray-500 relative">
					<div class="flex-1 basis-0 h-full flex items-center">
						<div class="xl:hidden">
							<HamburgerDrawerNav
								menuDrawer={menuDrawer}
								setMenuDrawer={setMenuDrawer}
							/>
						</div>
						<div class="hidden xl:block h-full ml-2">
							<DropdownMenu
								collection={props.collection}
								product={props.product}
							/>
						</div>
					</div>

					<div class="flex items-center h-full">
						<A
							href="/"
							class="text-regular md:text-2xl font-semibold  "
						>
							<div class=" font-poppins uppercase"> Modern Edge </div>
						</A>
					</div>

					<div class="flex items-center gap-x-10 h-full flex-1 basis-0 justify-end xl:gap-x-0 xl:mr-4 ">
						<div class="flex items-center mr-4 ">
							<A
								class="hover:cursor-pointer"
								href="/account"
							>
								<div class="i-la-user-plus h-7 w-7 " />
							</A>
						</div>
						<div class="hidden xl:block">
							<CartDropdown
								cart={props.cart}
								stayOpen={stayOpen}
								setStayOpen={setStayOpen}
							/>
						</div>
						<div class="block xl:hidden ">
							<CartDrawerNav
								cartDrawer={cartDrawer}
								setCartDrawer={setCartDrawer}
							/>
						</div>
					</div>
				</nav>
			</header>
		</div>
	)
}
