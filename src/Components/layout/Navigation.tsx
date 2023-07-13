import { onMount, createEffect, createSignal, lazy, Suspense, SuspenseList, Show } from 'solid-js'
import { A } from 'solid-start'
import clsx from 'clsx'
import { createQuery } from '@tanstack/solid-query'
import { useGlobalContext } from '~/Context/Providers'
import { Image } from '@unpic/solid'
import { getWindowSize } from '@solid-primitives/resize-observer'
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
	const { medusa } = useGlobalContext()

	const [stayOpen, setStayOpen] = createSignal(false)

	const [cartDrawer, setCartDrawer] = createSignal({
		checkout: 'active',
		cart: 'hidden'
	})
	const [menuDrawer, setMenuDrawer] = createSignal({
		menu: 'hidden' as const
	})
	const [accountStatus, setAccountStatus] = createSignal('inactive')

	const primaryData = createQuery(() => ({
		queryKey: ['primary_data'],
		queryFn: async function () {
			const response = await fetch(`https://direct.shauns.cool/items/Primary`, {
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
		enabled: false
	}))

	createEffect(() => {
		console.log(primaryData?.data?.data?.title_icon)
	})

	function hexToRgb(hex: any) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
		return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null
	}

	return (
		<div class="sticky top-0 inset-x-0 z-50 group sm:!fixed">
			<header class="relative h-16 mx-auto  border-b border-transparent  bg-normal_1 text-text_2">
				<nav class="flex items-center justify-between w-full h-full text-sm  relative">
					<div class="flex-1 basis-0 h-full flex items-center">
						<Suspense>
							<Show when={getWindowSize().width < 1279}>
								<HamburgerDrawerNav
									menuDrawer={menuDrawer}
									setMenuDrawer={setMenuDrawer}
								/>
							</Show>
						</Suspense>
						<Suspense>
							<Show when={getWindowSize().width > 1279}>
								<div class=" h-full ml-2">
									<DropdownMenu
										collection={props.collection}
										product={props.product}
									/>
								</div>
							</Show>
						</Suspense>
					</div>

					<div class="flex items-center">
						<A
							title="Home"
							href="/"
							class="text-regular md:text-2xl font-semibold font-poppins uppercase flex items-center justify-center space-x-3 h-full"
						>
							<Suspense>
								<Show when={primaryData.isSuccess && primaryData?.data?.data?.title_icon}>
									<Image
										src={primaryData?.data?.data?.title_icon}
										alt={primaryData?.data?.data?.title}
										height={50}
										width={100}
									/>
								</Show>
							</Suspense>
							<Suspense fallback={<div class=" font-poppins uppercase">Loading...</div>}>
								<Show when={primaryData.isSuccess || primaryData?.data?.data?.title}>
									<div
										title={primaryData?.data?.data?.title}
										class=" font-poppins uppercase"
									>
										{primaryData?.data?.data?.title}
									</div>
								</Show>
							</Suspense>
						</A>
					</div>

					<div class="flex items-center gap-x-10 h-full flex-1 basis-0 justify-end xl:gap-x-10 ">
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
						<Suspense>
							<Show when={getWindowSize().width > 1279}>
								<CartDropdown
									cart={props.cart}
									stayOpen={stayOpen}
									setStayOpen={setStayOpen}
								/>
							</Show>
						</Suspense>
						<Suspense>
							<Show when={getWindowSize().width < 1279}>
								<CartDrawerNav
									cartDrawer={cartDrawer}
									setCartDrawer={setCartDrawer}
								/>
							</Show>
						</Suspense>
					</div>
				</nav>
			</header>
		</div>
	)
}
