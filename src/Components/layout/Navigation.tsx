import { createEffect, createSignal, For, Switch, Match, Show, Suspense } from 'solid-js'
import { A } from 'solid-start'
import ProductPreview from '~/Components/nav_components/ProductPreview'
import { useGlobalContext } from '~/Context/Providers'
import { refetchRouteData } from 'solid-start'
import { Transition } from 'solid-transition-group'
import { useStore } from '~/Context/StoreContext'
import { isServer } from 'solid-js/web'
import CartCore from '../Core/CartCore'
import clsx from 'clsx'
import { root } from 'postcss'

export function Navigation(props: any) {
	const [stayOpen, setStayOpen] = createSignal(false)
	const [isScrolled, setIsScrolled] = createSignal(false)

	const [navState, setNavState] = createSignal({
		hero: 'active',
		product: 'hidden'
	})
	const [cartDrawer, setCartDrawer] = createSignal({
		checkout: 'active',
		cart: 'hidden'
	})
	const [menuDrawer, setMenuDrawer] = createSignal({
		checkout: 'active',
		cart: 'hidden'
	})
	window.addEventListener('scroll', () => {
		if (window.scrollY > 0) {
			setIsScrolled(true)
		} else {
			setIsScrolled(false)
		}
	})

	createEffect(() => {
		console.log(isScrolled())
	})

	return (
		<div class="sticky top-0 inset-x-0 z-50 group sm:!fixed text-gray-5">
			<header
				class={clsx(
					'relative h-16 mx-auto  border-b border-transparent transition-colors duration-400 hover:bg-white hover:text-gray-500',
					stayOpen() === true && 'bg-white',
					isScrolled() === true && 'bg-white'
				)}
			>
				<nav
					class={
						stayOpen() || isScrolled()
							? 'flex items-center justify-between w-full h-full text-sm transition-colors duration-500 text-gray-500 text-gray-900 relative'
							: 'flex items-center justify-between w-full h-full text-sm transition-colors duration-500 text-[#d8ddeb] hover:text-gray-500 relative'
					}
				>
					<div class="flex-1 basis-0 h-full flex items-center">
						<div class="block sm:hidden">
							<HamburgerDrawerNav
								menuDrawer={menuDrawer}
								setMenuDrawer={setMenuDrawer}
							/>
						</div>
						<div class="hidden sm:block h-full ml-10">
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

					<div class="flex items-center gap-x-10 h-full flex-1 basis-0 justify-end md:mr-10">
						<div class="hidden sm:flex items-center gap-x-2 h-full text-sm font-semibold font-poppins px-3">
							{process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
							<A
								class="hover:cursor-pointer"
								href="/account"
							>
								Account
							</A>
						</div>
						<div class="hidden md:block">
							<CartDropdown
								cart={props.cart}
								stayOpen={stayOpen}
								setStayOpen={setStayOpen}
							/>
						</div>
						<div class="block md:hidden ">
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

export function totalItemsInCart(items: any) {
	let total = 0
	items?.forEach((item: any) => {
		total += item.quantity
	})
	return total
}

export function CartDropdown(props: any) {
	const [open, setOpen] = createSignal(false)

	const { queryCart } = useGlobalContext()
	const { queryCartRefetch } = useGlobalContext()
	const { deleteItem } = useStore()

	const [cart, setCart] = createSignal(queryCart.data?.cart)
	const [items, setItems] = createSignal(queryCart.data?.cart?.items)
	createEffect(() => {
		console.log('cart', cart())
	}, [cart])
	createEffect(() => {
		if (!isServer || queryCart.data !== undefined) {
			setItems(queryCart?.data?.cart?.items)
		}
	}, [queryCart])

	//effect for opening the cart dropdown on add to cart
	createEffect(() => {
		items()
		setTimeout(() => {
			setOpen(true)
			props.setStayOpen(true)
		}, 100)
		setTimeout(() => {
			setOpen(false)
			props.setStayOpen(false)
		}, 1500)
	})

	function handleOnClick(e: Event) {
		const target = e.target as HTMLElement
		if (target.classList.contains('i-ion-cart-outline')) {
			props.setStayOpen(!props.stayOpen())
		}
	}

	function handleOnMouseOver() {
		if (props.stayOpen()) return
		setOpen(true)
	}

	function handleOnMouseLeave() {
		if (props.stayOpen()) return
		setOpen(false)
	}

	return (
		<div
			onMouseOver={() => handleOnMouseOver()}
			onMouseLeave={() => handleOnMouseLeave()}
			onClick={e => handleOnClick(e)}
		>
			<div
				class={props.stayOpen() ? 'flex text-2xl p-5 text-amber-5 h-full relative' : 'flex text-2xl p-5 h-full relative '}
			>
				<div class="i-ion-cart-outline hover:cursor-pointer"></div>
				<div
					class={
						'w-5 h-5 absolute top-3 right-0 bg-dark text-xs text-white font-semibold flex items-center justify-center rounded-full'
					}
				>
					{totalItemsInCart(items())}
				</div>
			</div>

			<Transition
				onEnter={(el, done) => {
					const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
						duration: 150
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
				<Show when={open() && items() !== undefined}>
					<div class="bg-white absolute top-[calc(100%+1px)] right-0 w-[440px] h-[100vh]  text-sm text-gray-7 z-30 mx-auto px-8">
						<CartCore variant="panel" />
					</div>
				</Show>
			</Transition>
		</div>
	)
}

export function CartDrawerNav(props: any) {
	return (
		<div>
			<div
				class="flex items-center rounded-full md:hidden z-1 relative"
				style="position: fixed; top: 0.85vh; right: -1rem; width: 3.75rem; height: 3rem;"
				onClick={() => props.setCartDrawer({ cart: 'active', checkout: 'active' })}
			>
				<div class="i-ion-cart-outline  text-2xl absolute top-3 left-1.75" />
			</div>
			<div
				class={`fixed inset-0 bg-white/30 z-200 transition-all duration-250 ease-in-out ${
					props.cartDrawer().cart === 'active' ? '' : 'opacity-0 pointer-events-none'
				}`}
				style="backdrop-filter: blur(5px)"
				onClick={event => {
					if (event.target === event.currentTarget) {
						props.setCartDrawer({ cart: 'hidden', checkout: 'active' })
					}
				}}
			>
				<div
					class="i-ph-x-circle-fill text-gray-7 w-7 h-7 absolute top-4 right-3"
					onClick={event => {
						if (event.target === event.currentTarget) {
							props.setCartDrawer({ cart: 'hidden', checkout: 'active' })
						}
					}}
				/>
				<div
					class={`fixed top-12 right-0 h-full w-[95vw] bg-white z-200 transform rounded-sm  transition-transform duration-500 ease-in-out p-2 ${
						props.cartDrawer().cart === 'active' ? '' : 'translate-x-full'
					}`}
				>
					<CartCore variant="mobile-panel" />
				</div>
			</div>
		</div>
	)
}

export function HamburgerDrawerNav(props: any) {
	const { rootCategories } = useGlobalContext()
	const { categories } = useGlobalContext()

	const [selectedRoot, setSelectedRoot] = createSignal(rootCategories())

	function getChildrenOfRoot(rootCategory: { name: string }[]) {
		console.log('ROOTyBooy', rootCategory)
		return categories()?.filter((category: any) => rootCategory.some(cat => cat.name === category.name))
	}

	createEffect(() => {
		console.log('Catts', categories())
		//console.log(selectedRoot())
		console.log('ROOT', selectedRoot())
	})

	return (
		<div>
			<div
				class="flex items-center rounded-full md:hidden z-1 relative"
				style="position: fixed; top: 0.85vh; left: 0.5rem; width: 3.75rem; height: 3rem;"
				onClick={() => {
					setSelectedRoot(rootCategories())
					props.setMenuDrawer({ cart: 'active', checkout: 'active' })
				}}
			>
				<div class="i-ic-round-menu w-6 h-6 ml-2" />
			</div>
			<div
				class={`fixed inset-0 bg-white/30 z-200 transition-all duration-250 ease-in-out ${
					props.menuDrawer().cart === 'active' ? '' : 'opacity-0 pointer-events-none'
				}`}
				style="backdrop-filter: blur(5px)"
				onClick={event => {
					if (event.target === event.currentTarget) {
						props.setMenuDrawer({ cart: 'hidden', checkout: 'active' })
					}
				}}
			>
				<div
					class="i-ph-x-circle-fill text-gray-7 w-7 h-7 absolute top-4 right-3"
					onClick={event => {
						if (event.target === event.currentTarget) {
							props.setMenuDrawer({ cart: 'hidden', checkout: 'active' })
						}
					}}
				/>
				<div
					class={`fixed top-12 right-0 h-full w-[95vw] sm:[40vw] bg-white z-200 transform rounded-sm  transition-transform duration-500 ease-in-out p-2 ${
						props.menuDrawer().cart === 'active' ? '' : 'translate-x-full'
					}`}
				>
					<Show when={selectedRoot()}>
						<ol class="px-4 text-xl space-y-2">
							<For each={selectedRoot()}>
								{collection => {
									console.log('BEEP', collection.category_children)
									if (collection.category_children?.length > 0) {
										return (
											<Suspense fallback={<div>Loading...</div>}>
												<button
													class="flex justify-between items-center w-full "
													onClick={() => {
														setSelectedRoot(getChildrenOfRoot(collection.category_children))
													}}
												>
													<li class="pb-3 ml-2">{collection.name}</li>
													<div class="i-octicon-chevron-right-12 text-2xl" />
												</button>
											</Suspense>
										)
									}
									if (collection.category_children?.length === 0) {
										return (
											<Suspense fallback={<div>Loading...</div>}>
												<li
													class="pb-3 ml-2 w-full "
													onClick={() => {
														props.setMenuDrawer({ cart: 'hidden', checkout: 'active' })
													}}
												>
													{' '}
													<A href={`/categories/${collection.handle}`}>{collection.name}</A>
												</li>
											</Suspense>
										)
									}
								}}
							</For>
						</ol>
					</Show>
				</div>
			</div>
		</div>
	)
}

export function DesktopSearchModal() {
	return (
		<div>
			<div>DESKTOP SEARCH MODAL</div>
		</div>
	)
}

export function DropdownMenu(props: any) {
	const { cart } = useGlobalContext()
	const { rootCategories } = useGlobalContext()

	const [open, setOpen] = createSignal(false)

	createEffect(() => {
		if (props.product?.map((p: any) => p.price.original_price) !== null) {
			refetchRouteData()
		}
	})

	return (
		<div
			class=" flex items-center justify-center h-full w-full  text-2xl  hover:transition-opacity hover:duration-400 px-3
			"
			onMouseOver={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			<div>
				<div class="mr-2 text-sm font-semibold font-poppins">
					<A
						class="hover:cursor-pointer"
						onClick={() => setOpen(false)}
						href="/store/Store"
					>
						Store
					</A>
				</div>
			</div>
			<Transition
				onEnter={(el, done) => {
					const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
						duration: 150
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
				<Show when={open()}>
					<div class="bg-white absolute top-full w-full inset-x-0 text-sm text-gray-7 z-30 mx-auto px-8">
						<div class="relative py-8 ">
							<div class="flex items-start  mx-auto px-8 w-[75vw]">
								<div class="flex flex-col flex-1 max-w-[15vw]">
									<div class="text-base text-gray-900 mb-4 font-semibold ">Shop by category</div>
									<div class="flex items-start">
										<Show when={rootCategories()}>
											<ul class="min-w-[152px] max-w-[200px] pr-4">
												<For each={rootCategories()}>
													{collection => (
														<Suspense fallback={<div>Loading...</div>}>
															<div class="pb-3">
																<A
																	href={`/categories/${collection.handle}`}
																	onClick={() => setOpen(false)}
																>
																	{collection.name}
																</A>
															</div>
														</Suspense>
													)}
												</For>
											</ul>
										</Show>
									</div>
								</div>
								<div class="flex-1 ">
									<div class="grid grid-cols-3 gap-2">
										<Switch>
											<Match when={props.product}>
												<For each={props.product}>
													{product => (
														<Suspense fallback={<div>Loading...</div>}>
															<ProductPreview
																{...product}
																handleClick={() => setOpen(false)}
															/>
														</Suspense>
													)}
												</For>
											</Match>
										</Switch>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Show>
			</Transition>
		</div>
	)
}
