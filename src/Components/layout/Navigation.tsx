import { onMount, createEffect, createSignal, lazy, Suspense, Show } from 'solid-js'
import { A } from 'solid-start'
import clsx from 'clsx'
import { createQuery } from '@tanstack/solid-query'
import { useGlobalContext } from '~/Context/Providers'

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
		console.log(primaryData?.data?.data[0]?.title)
	})

	function hexToRgb(hex: any) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
		return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null
	}

	return (
		<div
			class="sticky top-0 inset-x-0 z-50 group sm:!fixed"
			style={{
				'--normal': `${hexToRgb(primaryData?.data?.data[0]?.normal)}`,
				'--normal_2': `${hexToRgb(primaryData?.data?.data[0]?.normal_2)}`,
				'--normal_3': `${hexToRgb(primaryData?.data?.data[0]?.normal_3)}`,
				'--normal_4': `${hexToRgb(primaryData?.data?.data[0]?.normal_4)}`,
				'--surface': `${hexToRgb(primaryData?.data?.data[0]?.surface)}`,
				'--text': `${hexToRgb(primaryData?.data?.data[0]?.Text_1)}`,
				'--text_2': `${hexToRgb(primaryData?.data?.data[0]?.text_2)}`,
				'--text_3': `${hexToRgb(primaryData?.data?.data[0]?.text_3)}`,
				'--text_4': `${hexToRgb(primaryData?.data?.data[0]?.text_4)}`,
				'--text_5': `${hexToRgb(primaryData?.data?.data[0]?.text_5)}`,
				'--accent': `${hexToRgb(primaryData?.data?.data[0]?.accent)}`,
				'--accent_3': `${hexToRgb(primaryData?.data?.data[0]?.accent_3)}`,
				'--accent_2': `${hexToRgb(primaryData?.data?.data[0]?.accent_2)}`,
				'--accent_4': `${hexToRgb(primaryData?.data?.data[0]?.accent_4)}`,
				'--accent_text': `${hexToRgb(primaryData?.data?.data[0]?.accent_text)}`,
				'--accent_text_2': `${hexToRgb(primaryData?.data?.data[0]?.accent_text_2)}`
			}}
		>
			<header class="relative h-16 mx-auto  border-b border-transparent bg-normal text-text_2">
				<nav class="flex items-center justify-between w-full h-full text-sm  relative">
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
						<Show when={primaryData?.data?.data[0]?.title}>
							<div class="flex items-center h-full">
								<A
									title="Home"
									href="/"
									class="text-regular md:text-2xl font-semibold font-poppins uppercase"
								>
									<div
										title={primaryData?.data?.data[0]?.title}
										class=" font-poppins uppercase"
									>
										{primaryData?.data?.data[0]?.title}
									</div>
								</A>
							</div>
						</Show>
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
