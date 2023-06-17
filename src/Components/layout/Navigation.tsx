import { createSignal, lazy, Suspense } from 'solid-js'
import { A } from 'solid-start'
import clsx from 'clsx'

//import CartDropdown from '~/Components/nav_components/CartDropdown'

const CartDropdown = lazy(async () => {
	await new Promise(r => setTimeout(r, 0))
	return import('~/Components/nav_components/CartDropdown')
})

//const CartDrawerNav = lazy(() => import('~/Components/nav_components/CartDrawerNav'))

const CartDrawerNav = lazy(async () => {
	await new Promise(r => setTimeout(r, 0))
	return import('~/Components/nav_components/CartDrawerNav')
})

//const DropdownMenu = lazy(() => import('~/Components/nav_components/DropdownMenu'))

const DropdownMenu = lazy(async () => {
	await new Promise(r => setTimeout(r, 0))
	return import('~/Components/nav_components/DropdownMenu')
})

const HamburgerDrawerNav = lazy(async () => {
	await new Promise(r => setTimeout(r, 0))
	return import('~/Components/nav_components/HamburgerDrawerNav')
})

export default function Navigation(props: any) {
	const [stayOpen, setStayOpen] = createSignal(false)

	const [cartDrawer, setCartDrawer] = createSignal({
		checkout: 'active',
		cart: 'hidden'
	})
	const [menuDrawer, setMenuDrawer] = createSignal({
		menu: 'hidden' as const
	})
	const [accountStatus, setAccountStatus] = createSignal('inactive')

	return (
		<div class="sticky top-0 inset-x-0 z-50 group sm:!fixed text-gray-5">
			<header class="relative h-16 mx-auto  border-b border-transparent bg-white">
				<nav class="flex items-center justify-between w-full h-full text-sm text-gray-500 relative">
					<div class="flex-1 basis-0 h-full flex items-center">
						<div class="xl:hidden">
							<Suspense>
								<HamburgerDrawerNav
									menuDrawer={menuDrawer}
									setMenuDrawer={setMenuDrawer}
								/>
							</Suspense>
						</div>
						<div class="hidden xl:block h-full ml-2">
							<Suspense>
								<DropdownMenu
									collection={props.collection}
									product={props.product}
								/>
							</Suspense>
						</div>
					</div>
					<Suspense>
						<div class="flex items-center h-full">
							<A
								title="Home"
								href="/"
								class="text-regular md:text-2xl font-semibold font-poppins uppercase  "
							>
								<div
									title="Modern Edge"
									class=" font-poppins uppercase"
								>
									Modern Edge
								</div>
							</A>
						</div>
					</Suspense>
					<div class="flex items-center gap-x-10 h-full flex-1 basis-0 justify-end xl:gap-x-0 xl:mr-4 ">
						<div class="flex items-center mr-4 ">
							<A
								class="hover:cursor-pointer"
								href="/account"
								title="account info"
								role="button"
								tabindex="0"
							>
								<div
									class={clsx(
										'h-7 w-7',
										accountStatus() === 'inactive' && 'i-la-user-plus',
										accountStatus() === 'active' && 'i-la-user-check'
									)}
								/>
							</A>
						</div>
						<div class="hidden xl:block">
							<Suspense>
								<CartDropdown
									cart={props.cart}
									stayOpen={stayOpen}
									setStayOpen={setStayOpen}
								/>
							</Suspense>
						</div>
						<div class="block xl:hidden ">
							<Suspense>
								<CartDrawerNav
									cartDrawer={cartDrawer}
									setCartDrawer={setCartDrawer}
								/>
							</Suspense>
						</div>
					</div>
				</nav>
			</header>
		</div>
	)
}
