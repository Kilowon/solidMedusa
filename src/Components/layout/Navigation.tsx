import { createEffect, createSignal, For, Switch, Match, Show } from 'solid-js'
import { A } from 'solid-start'
import ProductPreview from '~/Components/nav_components/ProductPreview'
import clsx from 'clsx'
import { useGlobalContext } from '~/Context/Providers'
import { refetchRouteData } from 'solid-start'
import { Transition } from 'solid-transition-group'
import Thumbnail from '../common/Thumbnail'
import { useStore } from '~/Context/StoreContext'

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
						<CartDropdown cart={props.cart} />
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
{
	/* <div class="text-2xl px-7">
			
		</div> */
}
export function CartDropdown(props: any) {
	console.log(props.cart)
	const [open, setOpen] = createSignal(false)
	return (
		<div
			class=""
			onMouseOver={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
			onClick={() => setOpen(!open())}
		>
			<div>
				<div class="text-2xl px-7">
					<div class="i-ion-cart-outline"></div>
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
					<div class="bg-[#cccccc] absolute top-[calc(100%+1px)] right-0 w-[382px]  text-sm text-gray-7 z-30 mx-auto px-8">
						<Switch fallback={<div>Empty</div>}>
							<Match when={props.cart.items?.length > 0}>
								<>
									<div class="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar">
										<For
											each={props.cart.items.sort((a: any, b: any) => {
												return a.created_at > b.created_at ? -1 : 1
											})}
										>
											{item => (
												<div class="grid grid-cols-[122px_1fr] gap-x-4">
													<div class="w-[122px]">
														<Thumbnail
															thumbnail={item.thumbnail}
															size="full"
														/>
													</div>
													<div class="flex flex-col justify-between flex-1">
														<div class="flex flex-col flex-1">
															<div class="flex items-start justify-between">
																<div>
																	<h3 class="text-base-regular overflow-ellipsis overflow-hidden whitespace-nowrap mr-4 w-[130px]">
																		<A href={`/products/${item.variant.product.handle}`}>
																			{item.title}
																		</A>
																	</h3>
																	<LineItemOptions variant={props.cart.item.variant} />
																	<span>Quantity: {props.cart.item.quantity}</span>
																</div>
																<div class="flex justify-end">
																	<LineItemPrice
																		region={props.cart.region}
																		item={item}
																		style="tight"
																	/>
																</div>
															</div>
														</div>
														<div class="flex items-end justify-between text-small-regular flex-1">
															<div>
																<button
																	class="flex items-center gap-x-1 text-gray-500"
																	onClick={() => useStore()?.deleteItem(item.id)}
																>
																	<div class="i-ph-trash-duotone text-sm" />
																	<span>Remove</span>
																</button>
															</div>
														</div>
													</div>
												</div>
											)}
										</For>
									</div>
									<div class="p-4 flex flex-col gap-y-4 text-small-regular">
										<div class="flex items-center justify-between">
											<span class="text-gray-700 font-semibold">
												Subtotal <span class="font-normal">(incl. taxes)</span>
											</span>
											<span class="text-large-semi">
												{currencyFormat(
													Number(props.cart.subtotal || 0),
													props.cart.region
												)}
											</span>
										</div>
										<A href="/cart">
											<button class="w-full uppercase flex items-center justify-center min-h-[50px] px-5 py-[10px] text-sm border transition-colors duration-200 disabled:opacity-50 text-white bg-gray-900 border-gray-900 hover:bg-white hover:text-gray-900 disabled:hover:bg-gray-900 disabled:hover:text-white">
												Go to bag
											</button>
										</A>
									</div>
								</>
							</Match>
							<Match when={props.cart.items?.length === 0}>
								<div>
									<div class="flex py-16 flex-col gap-y-4 items-center justify-center">
										<div class="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
											<span>0</span>
										</div>
										<span>Your shopping bag is empty.</span>
										<div>
											<A href="/store">
												<span class="sr-only">Go to all products page</span>
												<button
													onClick={close}
													class="w-full uppercase flex items-center justify-center min-h-[50px] px-5 py-[10px] text-sm border transition-colors duration-200 disabled:opacity-50 text-white bg-gray-900 border-gray-900 hover:bg-white hover:text-gray-900 disabled:hover:bg-gray-900 disabled:hover:text-white"
												>
													Explore products
												</button>
											</A>
										</div>
									</div>
								</div>
							</Match>
						</Switch>
					</div>
				</Show>
			</Transition>
		</div>
	)
}

import { ProductVariant } from '~/types/models'
type LineItemOptionsProps = { variant: ProductVariant }
export function LineItemOptions(props: LineItemOptionsProps) {
	return (
		<div class="text-small-regular text-gray-700">
			{props.variant.options.map(option => {
				const optionName =
					props.variant.product.options.find(opt => opt.id === option.option_id)
						?.title || 'Option'
				return (
					<div>
						<span>
							{optionName}: {option.value}
						</span>
					</div>
				)
			})}
		</div>
	)
}

import { LineItem, Region } from '~/types/models'
import { CalculatedVariant } from '~/types/medusa'
import { getPercentageDiff } from '~/lib/util'
import { currencyFormat } from '~/lib/helpers/currency'

type LineItemPriceProps = {
	item: Omit<LineItem, 'beforeInsert'>
	region: Region
	style?: 'default' | 'tight'
}
export function LineItemPrice(props: LineItemPriceProps) {
	const originalPrice =
		(props.item.variant as CalculatedVariant).original_price * props.item.quantity
	const hasReducedPrice = (props.item.total || 0) < originalPrice

	return (
		<div class="flex flex-col text-gray-700 text-right">
			<span
				class={clsx('text-base-regular', {
					'text-rose-600': hasReducedPrice
				})}
			>
				{currencyFormat(Number(props.item.total || 0), props.region.id)}
			</span>
			{hasReducedPrice && (
				<>
					<p>
						{props.style === 'default' && (
							<span class="text-gray-500">Original: </span>
						)}
						<span class="line-through">
							{currencyFormat(Number(originalPrice), props.region.id)}
						</span>
					</p>
					{props.style === 'default' && (
						<span class="text-rose-600">
							-{getPercentageDiff(originalPrice, props.item.total || 0)}%
						</span>
					)}
				</>
			)}
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
			onClick={() => setOpen(!open())}
		>
			<div>
				<div class="mr-2 text-sm">Store - {cart.result?.cart.id}</div>
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
