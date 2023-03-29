import { createEffect, createSignal, For, Switch, Match, Show } from 'solid-js'
import { A } from 'solid-start'
import ProductPreview from '~/Components/nav_components/ProductPreview'
import clsx from 'clsx'
import { useGlobalContext } from '~/Context/Providers'
import { refetchRouteData } from 'solid-start'
import { Transition } from 'solid-transition-group'

export function Navigation(props: any) {
	return (
		<div class="sticky top-0 inset-x-0 z-50 group sm:!fixed" /* : isHome */>
			<header class="relative h-16 mx-auto transition-colors border-b border-transparent duration-200 bg-transparent hover:bg-[#cccccc]">
				<nav class="text-gray-900 flex items-center justify-between w-full h-full text-sm transition-colors duration-200 text-white group-hover:text-gray-900 relative">
					<div class="flex-1 basis-0 h-full flex items-center">
						<div class="block sm:hidden">
							<Hamburger /* setOpen={toggle} */ />
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
							class="text-3xl font-semibold uppercase"
						>
							Acme
						</A>
					</div>

					<div class="flex items-center gap-x-10 h-full flex-1 basis-0 justify-end mr-10">
						<div class="hidden sm:flex items-center gap-x-2 h-full text-sm px-3">
							{process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
							<A href="/account">Account</A>
						</div>
						<CartDropdown />
					</div>
				</nav>
				<MobileMenu />
			</header>
		</div>
	)
}

export function Hamburger() {
	return (
		<div>
			<div>Hamburger</div>
		</div>
	)
}

export function CartDropdown() {
	return (
		<div class="text-2xl px-7">
			<div class="i-ion-cart-outline"></div>
		</div>
	)
}

export function MobileMenu() {
	return (
		<div>
			<div class="sm:invisible">MOBILE MENU</div>
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

	const [open, setOpen] = createSignal(false)

	createEffect(() => {
		if (props.product?.map((p: any) => p.price.original_price) !== null) {
			refetchRouteData()
		}
	})

	return (
		<div
			class=" flex items-center justify-center h-full w-full  text-2xl hover:text-gray-5 hover:transition-opacity hover:duration-400 hover:cursor-pointer px-3
			"
			onMouseOver={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			<div>
				<div class="mr-2 text-sm">Store - {cart.result?.cart.id}</div>
			</div>
			<Transition
				onEnter={(el, done) => {
					const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
						duration: 200
					})
					a.finished.then(done)
				}}
				onExit={(el, done) => {
					const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
						duration: 400
					})
					a.finished.then(done)
				}}
			>
				<Show when={open()}>
					<div class="bg-[#cccccc] absolute top-full w-full inset-x-0 text-sm text-gray-7 z-30 mx-auto px-8">
						<div class="relative py-8 ">
							<div class="flex items-start  mx-auto px-8 w-[75vw]">
								<div class="flex flex-col flex-1 max-w-[15vw]">
									<div class="text-base text-gray-900 mb-4 font-semibold ">
										Collections
									</div>
									<div class="flex items-start">
										<Show when={props.collection}>
											<ul class="min-w-[152px] max-w-[200px] pr-4">
												<For each={props.collection}>
													{collection => (
														<div class="pb-3">
															<A
																href={`/collections/${collection.id}`}
																onClick={() => setOpen(false)}
															>
																{collection.title}
															</A>
														</div>
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
													{product => <ProductPreview {...product} />}
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
