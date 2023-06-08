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
		product: 'hidden',
		scroll: 'hidden',
		cart: 'hidden',
		checkout: 'hidden'
	})
	const [cartDrawer, setCartDrawer] = createSignal({
		checkout: 'active',
		cart: 'hidden'
	})
	const [menuDrawer, setMenuDrawer] = createSignal({
		menu: 'hidden'
	})
	window.addEventListener('scroll', () => {
		if (window.scrollY > 0) {
			setIsScrolled(true)
		} else {
			setIsScrolled(false)
		}
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
							{process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
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
			//props.setStayOpen(!props.stayOpen())
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
				<div class="i-ion-cart-outline w-7 h-7 hover:cursor-pointer"></div>
				<div
					class={
						'w-5 h-5 absolute top-3 right-3 bg-gray-5 text-xs text-white font-semibold flex items-center justify-center rounded-full'
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
					<div class="bg-white absolute top-[calc(100%+1px)] right-0 w-[440px] h-[100vh]  text-sm text-gray-7 z-10 mx-auto px-8">
						<CartCore variant="panel" />
					</div>
				</Show>
			</Transition>
		</div>
	)
}

export function CartDrawerNav(props: any) {
	const { queryCart } = useGlobalContext()
	const [items, setItems] = createSignal(queryCart.data?.cart?.items)

	createEffect(() => {
		if (!isServer || queryCart.data !== undefined) {
			setItems(queryCart?.data?.cart?.items)
		}
	})

	return (
		<div>
			<div
				class="flex items-center rounded-full xl:hidden z-1 relative"
				style="position: fixed; top: 0.85vh; right: -0.5rem; width: 3.75rem; height: 3rem;"
				onClick={() => props.setCartDrawer({ cart: 'active', checkout: 'active' })}
			>
				<div class="i-ion-cart-outline h-7 w-7 absolute top-3 left-1.75" />
				<div class="absolute top-1.5 left-5.8 w-4 h-4 text-white text-xs flex items-center justify-center bg-gray-5 rounded-full">
					{totalItemsInCart(items())}
				</div>
			</div>
			<div
				class={`fixed inset-0 bg-white/30 z-200 transition-all duration-250 ease-in-out ${
					props.cartDrawer().cart === 'active' ? '' : 'opacity-0 pointer-events-none'
				}`}
				onClick={event => {
					if (event.target === event.currentTarget) {
						props.setCartDrawer({ cart: 'hidden', checkout: 'active' })
					}
				}}
			>
				<div
					class={`fixed top-12 right-0 h-full w-[95vw] sm:w-[85vw] md:w-[45vw] bg-white z-200 transform rounded-sm  transition-transform duration-500 ease-in-out p-2 ${
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
	const { collections } = useGlobalContext()

	const [selectedRoot, setSelectedRoot] = createSignal(rootCategories())
	const [backButton, setBackButton] = createSignal('inactive')

	function getChildrenOfRoot(rootCategory: { name: string }[]) {
		return categories()?.filter((category: any) => rootCategory.some(cat => cat.name === category.name))
	}

	return (
		<div>
			<div
				class="flex items-center rounded-full z-1 relative"
				style="position: fixed; top: 0.85vh; left: 0.5rem; width: 3.75rem; height: 3rem;"
				onClick={() => {
					setSelectedRoot(rootCategories())
					props.setMenuDrawer({ cart: 'active', checkout: 'active' })
				}}
			>
				<div class="i-ic-round-menu w-7 h-7 ml-2" />
			</div>
			<div
				class={`fixed inset-0 bg-white/30 z-200 transition-all duration-250 ease-in-out ${
					props.menuDrawer().cart === 'active' ? '' : 'opacity-0 pointer-events-none'
				}`}
				onClick={event => {
					if (event.target === event.currentTarget) {
						props.setMenuDrawer({ cart: 'hidden', checkout: 'active' })
					}
				}}
			>
				<div
					class={`fixed top-12 left-0 h-full w-[95vw] sm:w-[40vw] bg-white z-200 transform rounded-sm transition-transform duration-500 ease-in-out p-2 ${
						props.menuDrawer().cart === 'active' ? '' : '-translate-x-full'
					}`}
					style={{ overflow: 'auto' }}
				>
					<Show when={selectedRoot()}>
						<ol class="px-4 text-xl space-y-2 h-[120vh] overflow-y-auto">
							<Show when={backButton() === 'active'}>
								<Suspense fallback={<div>Loading...</div>}>
									<button
										class="flex space-x-2 items-center w-full py-1"
										onClick={() => {
											setSelectedRoot(rootCategories())
											setBackButton('inactive')
										}}
									>
										<div class="i-octicon-chevron-left-16 text-2xl" />
										<li class=" ml-2">Back</li>
									</button>
								</Suspense>
							</Show>
							<For each={selectedRoot()}>
								{collection => {
									if (collection?.category_children?.length > 0) {
										return (
											<Suspense fallback={<div>Loading...</div>}>
												<button
													class="flex justify-between justify-center items-center w-full py-1 "
													onClick={() => {
														setSelectedRoot(getChildrenOfRoot(collection.category_children))
														setBackButton('active')
													}}
												>
													<li class=" ml-2">{collection.name}</li>
													<div class="i-octicon-chevron-right-12 text-2xl" />
												</button>
											</Suspense>
										)
									}
									if (collection?.category_children?.length === 0) {
										return (
											<Suspense fallback={<div>Loading...</div>}>
												<li
													class=" ml-2 w-full  text-gray-6"
													onClick={() => {
														setBackButton('inactive')
														props.setMenuDrawer({ menu: 'hidden' })
													}}
												>
													<A
														href={`/categories/${collection?.handle}`}
														onClick={() => {
															setBackButton('inactive')
															props.setMenuDrawer({ menu: 'hidden' })
														}}
													>
														{collection?.name}
													</A>
												</li>
											</Suspense>
										)
									}
								}}
							</For>
							<div class="flex flex-col space-y-1 ">
								<div class="text-base text-gray-5 bg-gray-2 p-2">
									<A
										href={`/store/Store`}
										onClick={() => props.setMenuDrawer({ menu: 'hidden' })}
									>
										Shop All Our Items{' '}
									</A>
								</div>
								<Show when={collections()?.collections}>
									<For each={collections()?.collections}>
										{collection => {
											if (collection?.metadata?.menu !== 'hidden')
												return (
													<div
														class="text-base text-gray-5 bg-gray-2   p-2 rounded-0.5"
														onClick={() => {
															setBackButton('inactive')
															props.setMenuDrawer({ menu: 'hidden' })
														}}
													>
														<A
															href={`/collections/${collection?.handle}`}
															onClick={() => props.setMenuDrawer({ menu: 'hidden' })}
														>
															Shop {collection?.title}
														</A>
													</div>
												)
										}}
									</For>
								</Show>
							</div>
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
	const { rootCategories } = useGlobalContext()
	const { collections } = useGlobalContext()
	const { categories } = useGlobalContext()
	const [open, setOpen] = createSignal(false)

	createEffect(() => {
		if (props.product?.map((p: any) => p.price.original_price) !== null) {
			refetchRouteData()
		}
	})

	return (
		<div
			class=" flex items-center justify-center h-full w-full hover:transition-opacity hover:duration-400  font-poppins
			"
			onMouseOver={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			<div>
				<div
					class="hover:cursor-pointer"
					onClick={() => setOpen(true)}
				>
					<div class="i-ic-round-menu  w-7 h-7 ml-2" />
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
					<div class="bg-white absolute top-full w-full inset-x-0 z-30 mx-auto px-8">
						<div class="relative py-4">
							<div class="flex items-start  mx-auto px-8 ">
								<div class="flex flex-col ">
									<div class="flex space-x-12 ">
										<div class="text-base bg-gray-5 text-white  p-2">
											<A
												href={`/store/Store`}
												onClick={() => setOpen(false)}
											>
												Shop All Our Items
											</A>
										</div>
										<Show when={collections()?.collections}>
											<For each={collections()?.collections}>
												{collection => {
													if (collection?.metadata?.menu !== 'hidden')
														return (
															<div class="text-base bg-gray-5/70 text-white  p-2 rounded-0.5">
																<A
																	href={`/collections/${collection.handle}`}
																	onClick={() => setOpen(false)}
																>
																	Shop {collection.title}
																</A>
															</div>
														)
												}}
											</For>
										</Show>
									</div>
									<div class="flex items-start">
										<Show when={rootCategories()}>
											<ol class="flex flex-auto space-x-4 mt-2 ">
												<For each={rootCategories()}>
													{collection => {
														if (collection.category_children?.length > 0) {
															return (
																<Suspense fallback={<div>Loading...</div>}>
																	<li class="whitespace-nowrap space-y-4">
																		<span class="flex border border-gray-3"></span>
																		<div class="text-base text-gray-6 text-lg font-500">
																			<A
																				href={`/categories/${collection.handle}`}
																				onClick={() => setOpen(false)}
																			>
																				{collection.name}
																			</A>
																		</div>
																		<div class="space-y-2">
																			<For each={categories()}>
																				{category => {
																					if (category.parent_category?.id === collection.id) {
																						return (
																							<Suspense fallback={<div>Loading...</div>}>
																								<div class="text-gray-5">
																									<A
																										href={`/categories/${category.handle}`}
																										onClick={() => setOpen(false)}
																									>
																										{category.name}
																									</A>
																								</div>
																							</Suspense>
																						)
																					}
																				}}
																			</For>
																		</div>
																	</li>
																</Suspense>
															)
														}
													}}
												</For>

												<li class="flex flex-col whitespace-nowrap space-y-5">
													<span class="flex border border-gray-3"></span>
													<div class="text-base text-gray-6 font-500 space-y-2">
														<For each={rootCategories()}>
															{collection => {
																if (collection.category_children?.length === 0) {
																	return (
																		<Suspense fallback={<div>Loading...</div>}>
																			<div>
																				<A
																					href={`/categories/${collection.handle}`}
																					onClick={() => setOpen(false)}
																				>
																					{collection.name}
																				</A>
																			</div>
																		</Suspense>
																	)
																}
															}}
														</For>
													</div>
												</li>
											</ol>
										</Show>
									</div>
								</div>
								{/* <div class="flex-1 ">
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
								</div> */}
							</div>
						</div>
					</div>
				</Show>
			</Transition>
		</div>
	)
}
