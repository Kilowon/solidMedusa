import { createSignal, lazy, Suspense, Show, createEffect } from 'solid-js'
import { A } from 'solid-start'
import clsx from 'clsx'
import { createQuery } from '@tanstack/solid-query'
import { useGlobalContext } from '~/Context/Providers'

import { getWindowSize } from '@solid-primitives/resize-observer'
import {
	openCart,
	setOpenCart,
	openMenu,
	setOpenMenu,
	accountStatus,
	setAccountStatus,
	cartDrawer,
	setCartDrawer,
	menuDrawer,
	setMenuDrawer
} from '~/state'

const CartDropdown = lazy(() => import('~/Components/nav_components/CartDropdown'))

const CartDrawerNav = lazy(() => import('~/Components/nav_components/CartDrawerNav'))

const DropdownMenu = lazy(() => import('~/Components/nav_components/DropdownMenu'))

const HamburgerDrawerNav = lazy(() => import('~/Components/nav_components/HamburgerDrawerNav'))

export default function Navigation(props: any) {
	const { queryCart } = useGlobalContext()

	const [preloader, setPreloader] = createSignal(false)

	const [cartPreloader, setCartPreloader] = createSignal(false)

	const primaryData = createQuery(() => ({
		queryKey: ['primary_data'],
		queryFn: async function () {
			const response = await fetch(`${import.meta.env.VITE_DIRECTUS_URL}/items/Primary`, {
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

	return (
		<div class="sticky top-0 z-50 ">
			<header class="relative h-16 mx-auto bg-normal_1 text-text_2 flex ">
				<Show when={import.meta.env.VITE_DRAFT_SITE === 'true'}>
					<div class="bg-sky-7 w-full justify-center items-center font-700 text-white text-xs fixed z-100 bottom-0 h-6">
						<div class="w-full h-full flex justify-center items-center">DRAFT SITE</div>
					</div>
				</Show>
				<nav class="flex items-center justify-center w-full">
					<div class="absolute left-0  p-4 z-10">
						<div>
							<div
								onMouseOver={() => {
									setPreloader(true)
								}}
								onFocus={() => {
									setPreloader(true)
								}}
								onclick={e => {
									e.stopPropagation()
									setOpenMenu(!openMenu())
									setOpenCart(false)
									setMenuDrawer({ menu: 'active' })
									setCartDrawer({ cart: 'hidden' })
								}}
								onKeyDown={e => {
									if (e.key === 'Enter') {
										setOpenMenu(true)
										setOpenCart(false)
										setMenuDrawer({ menu: 'active' })
										setCartDrawer({ cart: 'hidden' })
									}
									if (e.key === 'Escape') {
										setOpenMenu(false)
										setMenuDrawer({ menu: 'hidden' })
									}
								}}
								title="Main Menu"
								role="button"
								tabindex="0"
								onkeypress={e => {
									if (e.key === 'Enter') {
										setMenuDrawer({ menu: 'active' })
									}
									if (e.key === 'Escape') {
										setMenuDrawer({ menu: 'hidden' })
									}
								}}
							>
								<div class="i-ic-round-menu w-5.5 h-5.5  lg:w-7 lg:h-7  hover:cursor-pointer z-80" />
							</div>
							<Suspense>
								<Show when={getWindowSize().width > 1023 && preloader() === true}>
									<DropdownMenu
										collection={props.collection}
										product={props.product}
										openMenu={openMenu}
										setOpenMenu={setOpenMenu}
									/>
								</Show>
								<Show when={getWindowSize().width <= 1023 && preloader() === true}>
									<HamburgerDrawerNav
										menuDrawer={menuDrawer}
										setMenuDrawer={setMenuDrawer}
									/>
								</Show>
							</Suspense>
						</div>
					</div>

					<div class="">
						<A
							title="Home"
							href="/"
						>
							<Suspense>
								<Show when={primaryData.isSuccess && primaryData?.data?.data?.title_icon}>
									<img
										src={primaryData?.data?.data?.title_icon}
										alt={primaryData?.data?.data?.title}
									/>
								</Show>

								<Show when={primaryData.isSuccess || primaryData?.data?.data?.title}>
									<div
										title={primaryData?.data?.data?.title}
										class="text-sm md:text-2xl font-semibold uppercase"
									>
										{primaryData?.data?.data?.title}
									</div>
								</Show>
							</Suspense>
						</A>
					</div>

					<div class="absolute right-10 p-4">
						<div class="flex items-center mr-4 ">
							<Show when={true}>
								<A
									class="hover:cursor-pointer"
									href="/account"
									title="account info"
									role="button"
									tabindex="0"
								>
									<div
										class={clsx(
											'w-5.5 h-5.5 lg:w-7 lg:h-7',
											accountStatus() === 'inactive' && 'i-la-user-plus',
											accountStatus() === 'active' && 'i-la-user-check'
										)}
									/>
								</A>
							</Show>
						</div>
					</div>
					<div
						class="absolute right-0"
						onMouseOver={() => {
							setCartPreloader(true)
						}}
						onFocus={() => {
							setCartPreloader(true)
						}}
						onClick={e => {
							if (getWindowSize().width > 1023) {
								e.stopPropagation()
								setOpenCart(true)
								setOpenMenu(false)
							}
							if (getWindowSize().width <= 1023) {
								setCartDrawer({ cart: 'active' })
								setMenuDrawer({ menu: 'hidden' })
							}
						}}
						onKeyDown={e => {
							e.stopPropagation()
							if (e.target === document.activeElement) {
								if (e.key === 'Enter') {
									if (getWindowSize().width > 1023) {
										setOpenCart(true)
										setOpenMenu(false)
									}
									if (getWindowSize().width <= 1023) {
										setCartDrawer({ cart: 'active' })
										setMenuDrawer({ menu: 'hidden' })
									}
								}
								if (e.key === 'Escape') {
									setOpenCart(false)
									setCartDrawer({ cart: 'hidden' })
								}
							}
						}}
						title="Cart"
						role="button"
						tabindex="0"
					>
						<div class={openCart() ? 'flex text-2xl p-5  h-full relative' : 'flex text-2xl p-5 h-full relative '}>
							<div class="i-ion-cart-outline w-5.5 h-5.5 lg:w-7 lg:h-7 hover:cursor-pointer"></div>
							<div
								class={
									openCart()
										? 'w-3.5 h-3.5  lg:w-5 lg:h-5 absolute top-3 right-3 bg-text_2 text-[0.6rem]  lg:text-xs text-normal_1 font-500 flex items-center justify-center rounded-full'
										: 'w-3.5 h-3.5  lg:w-5 lg:h-5 absolute top-3 right-3 bg-text_2  text-[0.6rem]  lg:text-xs text-normal_1 font-500 flex items-center justify-center rounded-full'
								}
							>
								{totalItemsInCart(queryCart?.data?.cart?.items)}
							</div>
						</div>
						<Suspense>
							<Show when={getWindowSize().width > 1023 && cartPreloader() === true}>
								<CartDropdown
									openCart={openCart}
									setOpenCart={setOpenCart}
								/>
							</Show>

							<Show when={getWindowSize().width <= 1023 && cartPreloader() === true}>
								<CartDrawerNav
									cartDrawer={cartDrawer}
									setCartDrawer={setCartDrawer}
								/>
							</Show>
						</Suspense>
					</div>
					<div
						class={clsx(
							'absolute right-0 top-0 bg-transparent w-96vw h-100vh ',

							openCart() === true && '',
							openCart() === false && 'hidden'
						)}
						onClick={() => {
							setOpenCart(false)
						}}
					></div>
					<div
						class={clsx(
							'absolute left-0 top-0 bg-transparent w-96vw h-100vh ',

							openMenu() === true && '',
							openMenu() === false && 'hidden'
						)}
						onClick={() => {
							setOpenMenu(false)
						}}
					></div>
				</nav>
			</header>
		</div>
	)
}

export function totalItemsInCart(items: any) {
	let total = 0
	items?.forEach((item: any) => {
		total += item.quantity
	})
	return total
}
