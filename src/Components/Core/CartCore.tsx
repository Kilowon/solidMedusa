import { For, Switch, Match, Show, Suspense, createSignal, createEffect, ErrorBoundary } from 'solid-js'
import { A } from 'solid-start'
import clsx from 'clsx'
import { useGlobalContext } from '~/Context/Providers'
import Thumbnail from '~/Components/common/Thumbnail'
import { useStore } from '~/Context/StoreContext'
import { createQuery } from '@tanstack/solid-query'
import { getProductInfo } from '~/Services/medusaAPI'
import { isServer } from 'solid-js/web'
import { LineItem, Region } from '~/types/models'
import { CalculatedVariant } from '~/types/medusa'
import { getPercentageDiff } from '~/lib/util'
import { currencyFormat } from '~/lib/helpers/currency'
import { fetchProduct } from '~/Services/medusaAPI'
import { ProductVariant } from '~/types/models'

interface CartCoreProps {
	variant?: 'primary' | 'checkout' | 'panel' | 'mobile-checkout' | 'mobile-panel'
	cart?: any
	setCartDrawer?: any
}

type LineItemOptionsProps = { variant: ProductVariant }

type LineItemPriceProps = {
	item: Omit<LineItem, 'beforeInsert'>
	region: Region
	style?: 'default' | 'tight'
}
interface PromoCodeInputProps {
	onSubmit: (promoCode: string) => void
	cart: any
	variant: CartCoreProps['variant']
}

export function totalItemsInCart(items: any) {
	let total = 0
	items?.forEach((item: any) => {
		total += item.quantity
	})
	return total
}

export default function CartCore(props: CartCoreProps) {
	const { queryCart } = useGlobalContext()
	const { queryCartRefetch } = useGlobalContext()
	const { deleteItem } = useStore()

	const [sortedItems, setSortedItems] = createSignal(null)

	createEffect(() => {
		const sorted = queryCart?.data?.cart?.items?.sort((a: any, b: any) => {
			return a.created_at > b.created_at ? -1 : 1
		})
		setSortedItems(sorted)
	})

	return (
		<div class=" text-sm text-gray-5 z-50">
			<Show when={isServer === false && queryCart?.data?.cart?.items && sortedItems()}>
				<ErrorBoundary fallback={(err, reset) => <div onClick={reset}>Error: {err.toString()}</div>}>
					<Suspense fallback={<div>Loading...</div>}>
						<Show when={queryCart?.data?.cart?.items?.length > 0}>
							<div
								class={clsx(
									'',
									props.variant === 'primary' && 'lg:flex lg:space-x-10',
									props.variant === 'checkout' && '',
									props.variant === 'panel' && '',
									props.variant === 'mobile-checkout' && '',
									props.variant === 'mobile-panel' && ''
								)}
							>
								<ol
									class={clsx(
										'overflow-y-scroll  scrollbar-hide ',
										props.variant === 'primary' && 'lg:w-2/3 ',
										props.variant === 'checkout' && 'max-h-[425px] mx-auto',
										props.variant === 'panel' && 'max-h-[565px] mx-auto',
										props.variant === 'mobile-checkout' && 'max-h-[45dvh] mx-auto',
										props.variant === 'mobile-panel' && 'max-h-[45dvh] mx-auto'
									)}
								>
									<For each={sortedItems()}>
										{item => (
											<Suspense fallback={<div>Loading...</div>}>
												<Show when={item.variant.product}>
													<li>
														<div
															class={clsx(
																'grid gap-x-3',
																props.variant === 'primary' && 'grid-cols-[100px_1fr]',
																props.variant === 'checkout' && 'grid-cols-[30px_1fr]',
																props.variant === 'panel' && 'grid-cols-[70px_1fr]',
																props.variant === 'mobile-checkout' && 'grid-cols-[30px_1fr]',
																props.variant === 'mobile-panel' && 'grid-cols-[70px_1fr]'
															)}
														>
															<div class="flex flex-col items-center">
																<Thumbnail
																	thumbnail={item.thumbnail}
																	variant="default"
																/>
																<div
																	class={clsx(
																		'',
																		props.variant === 'primary' && '',
																		props.variant === 'checkout' && 'hidden',
																		props.variant === 'panel' && '',
																		props.variant === 'mobile-checkout' && 'hidden',
																		props.variant === 'mobile-panel' && ''
																	)}
																>
																	<Show when={isServer === false}>
																		<ItemQuantity
																			item={item}
																			cart={queryCart?.data?.cart}
																			variant={props.variant}
																		/>
																	</Show>
																</div>
															</div>
															<div
																class={clsx(
																	'grid grid-cols-2',
																	props.variant === 'primary' && 'lg:flex lg:justify-between',
																	props.variant === 'checkout' && '',
																	props.variant === 'panel' && '',
																	props.variant === 'mobile-checkout' && '',
																	props.variant === 'mobile-panel' && ''
																)}
															>
																<div class="flex items-start justify-between">
																	<div>
																		<div
																			class={clsx(
																				'font-semibold line-clamp-2 text-ellipsis',
																				props.variant === 'primary' && 'md:text-lg',
																				props.variant === 'checkout' && 'text-xs',
																				props.variant === 'panel' && 'text-xs',
																				props.variant === 'mobile-checkout' && 'text-xs',
																				props.variant === 'mobile-panel' && 'text-xs'
																			)}
																		>
																			<A href={`/products/${item.variant.product?.handle}`}>{item?.title}</A>
																		</div>

																		<ItemOptions
																			item={item}
																			cart={queryCart?.data?.cart}
																			variant={props.variant}
																		/>
																	</div>
																</div>

																<div
																	class={clsx(
																		'space-y-12',
																		props.variant === 'primary' && 'flex flex-col items-end text-lg space-y-12',
																		props.variant === 'checkout' && ' text-sm',
																		props.variant === 'panel' && 'flex flex-col items-end text-sm space-y-12',
																		props.variant === 'mobile-checkout' && ' text-sm',
																		props.variant === 'mobile-panel' && 'flex flex-col items-end text-sm space-y-12'
																	)}
																>
																	<div
																		class={clsx(
																			'',
																			props.variant === 'primary' && '',
																			props.variant === 'checkout' && 'grid grid-cols-2',
																			props.variant === 'panel' && '',
																			props.variant === 'mobile-checkout' && 'grid grid-cols-2',
																			props.variant === 'mobile-panel' && ''
																		)}
																	>
																		<div>
																			<span
																				class={clsx(
																					'',
																					props.variant === 'primary' && 'hidden',
																					props.variant === 'checkout' && 'flex items-center justify-center mt-2 text-sm font-semibold',
																					props.variant === 'panel' && 'hidden',
																					props.variant === 'mobile-checkout' &&
																						'flex items-center justify-center mt-2 text-sm font-semibold',
																					props.variant === 'mobile-panel' && 'hidden'
																				)}
																			>
																				Qty: {item?.quantity}
																			</span>
																		</div>
																		<div class="flex items-center justify-end ">
																			<ItemPrice
																				item={item}
																				cart={queryCart?.data?.cart}
																				variant={props.variant}
																			/>
																		</div>
																	</div>
																	<div
																		class={clsx(
																			props.variant === 'primary' && '',
																			props.variant === 'checkout' && 'hidden',
																			props.variant === 'panel' && '',
																			props.variant === 'mobile-checkout' && 'hidden',
																			props.variant === 'mobile-panel' && ''
																		)}
																	>
																		<button
																			class="flex items-center gap-x-1 rounded p-1 bg-white"
																			onClick={() => {
																				deleteItem(item?.id)
																			}}
																		>
																			<div class="i-ph-trash-duotone text-sm  text-gray-5  "></div>
																			<span class="text-xs ">Remove</span>
																		</button>
																	</div>
																</div>
															</div>
														</div>{' '}
														<hr class="border-gray-400/50 my-2 mx-6" />
													</li>
												</Show>
											</Suspense>
										)}
									</For>
								</ol>

								<div
									class={clsx(
										'flex flex-col gap-y-1 text-sm',
										props.variant === 'primary' && 'lg:w-1/3 lg:sticky lg:top-20 lg:self-start lg:mt-2',
										props.variant === 'checkout' && '',
										props.variant === 'panel' && '',
										props.variant === 'mobile-checkout' && '',
										props.variant === 'mobile-panel' && ''
									)}
								>
									<div class="flex flex-col justify-start">
										<div class="flex justify-center bg-gray-2">
											<div class={'i-tabler-chevron-down text-3xl  '} />
										</div>
										<div class="flex justify-between items-center">
											<span class=" font-500 text-xs">
												Item Subtotal {'('}
												{totalItemsInCart(queryCart?.data?.cart?.items)}
												{queryCart?.data?.cart?.items.length > 1 ? ' items' : ' item'}
												{')'}
											</span>
											<span class="text-large-semi">
												{currencyFormat(Number(queryCart?.data?.cart?.subtotal || 0), queryCart?.data?.cart?.region)}
											</span>
										</div>
									</div>
									<PromoCodeInput
										onSubmit={promoCode => console.log('Promo code submitted:', promoCode)}
										cart={queryCart?.data?.cart}
										variant={props.variant}
									/>
									<GiftCardInput
										onSubmit={promoCode => console.log('Promo code submitted:', promoCode)}
										cart={queryCart?.data?.cart}
										variant={props.variant}
									/>
									<Show when={queryCart?.data?.cart?.shipping_total > 0}>
										<div class="flex justify-between items-center">
											<span class=" font-500 text-xs">Shipping</span>
											<span class="text-sm">
												{currencyFormat(Number(queryCart?.data?.cart?.shipping_total || 0), queryCart?.data?.cart?.region)}
											</span>
										</div>
									</Show>
									<Show when={queryCart?.data?.cart?.tax_total > 0}>
										<div class="flex justify-between items-center">
											<span class=" font-semibold">Tax</span>
											<span class="text-large-semi">
												{currencyFormat(Number(queryCart?.data?.cart?.tax_total || 0), queryCart?.data?.cart?.region)}
											</span>
										</div>
									</Show>
									<div class="flex justify-between items-center text-gray-8 bg-[#E5E5E5] border border-gray-5 p-1.75">
										<span class=" text-sm font-400">Total</span>
										<span class=" text-sm font-500">
											{currencyFormat(Number(queryCart?.data?.cart?.total || 0), queryCart?.data?.cart?.region)}
										</span>
									</div>
									<Show when={props.variant === 'panel' || 'mobile-panel'}>
										<div>
											<Show when={props.variant === 'primary' || props.variant === 'panel' || props.variant === 'mobile-panel'}>
												<A href="/checkout">
													<button
														class={clsx(
															'w-full uppercase flex items-center justify-center min-h-[44px] rounded-sm px-5 my-1 py-[10px] text-sm border transition-colors duration-200 disabled:opacity-50 text-white bg-green-600 border-green-600 hover:bg-white hover:text-gray-900  disabled:hover:bg-gray-900 disabled:hover:text-white',
															props.variant === 'primary' && '',
															props.variant === 'checkout' && 'hidden',
															props.variant === 'panel' && '',
															props.variant === 'mobile-checkout' && 'hidden',
															props.variant === 'mobile-panel' && ''
														)}
													>
														SECURE CHECKOUT
													</button>
												</A>
											</Show>
											<Show when={props.variant !== 'primary'}>
												<A href="/cart">
													<button class="w-full uppercase flex items-center justify-center min-h-[44px] rounded-sm px-5 my-1 py-[10px] text-sm border transition-colors duration-200 disabled:opacity-50 text-white bg-gray-600 border-gray-600 hover:bg-white hover:text-gray-900 disabled:hover:bg-gray-900 disabled:hover:text-white">
														<Show when={props.variant === 'checkout' || props.variant === 'mobile-checkout'}>
															Make Changes to Your Order
														</Show>
														<Show when={props.variant === 'panel' || props.variant === 'mobile-panel'}>View Cart</Show>
													</button>
												</A>
											</Show>
										</div>
										<span class=" font-500 text-gray-8 underline flex items-center justify-center">save for later</span>
									</Show>
								</div>
							</div>
						</Show>
					</Suspense>

					<Suspense fallback={<div>Loading...</div>}>
						<Show when={queryCart?.data?.cart?.items?.length === 0}>
							<div>
								<div class="flex py-16 flex-col gap-y-4 items-center justify-center">
									<div class="bg-gray-6 text-sm font-poppins flex items-center justify-center w-6 h-6 rounded-full text-white">
										<span>0</span>
									</div>
									<span>Your shopping bag is empty.</span>
									<div>
										<A href="/store/Store">
											<span class="sr-only">Go to all products page</span>
											<Show when={props.variant === 'mobile-panel'}>
												<div
													onClick={() => {
														props.setCartDrawer({ cart: 'hidden', checkout: 'active' })
													}}
													class="w-full uppercase flex items-center justify-center min-h-[50px] px-5 py-[10px] text-sm border transition-colors duration-200 disabled:opacity-50 text-white bg-gray-600 border-gray-600 hover:bg-white hover:text-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-white"
												>
													Explore products
												</div>
											</Show>
											<Show when={props.variant === 'panel'}>
												<div class="w-full uppercase flex items-center justify-center min-h-[50px] px-5 py-[10px] text-sm border transition-colors duration-200 disabled:opacity-50 text-white bg-gray-600 border-gray-600 hover:bg-white hover:text-gray-600 disabled:hover:bg-gray-600 disabled:hover:text-white">
													Explore products
												</div>
											</Show>
										</A>
									</div>
								</div>
							</div>
						</Show>
					</Suspense>
				</ErrorBoundary>
			</Show>
		</div>
	)
}

export function ItemQuantity(props: { cart: any; item: any; variant: CartCoreProps['variant'] }) {
	const { medusa } = useGlobalContext()

	const [quantity, setQuantity] = createSignal()

	function handleQuanity(qty: number) {
		setQuantity(qty)
		if (props.item.quantity >= 1) {
			mutateLineItemQuanity.refetch()
		}
	}

	const queryLineItem = createQuery(() => ({
		queryKey: ['CartCore-LineItem-Options', props.item?.id],
		queryFn: async function () {
			const response = await getProductInfo(medusa, props.cart, props.item.variant.product.id)
			return response
		},
		cacheTime: 15 * 60 * 1000,
		retry: 0,
		enabled: false
	}))

	const mutateLineItemQuanity = createQuery(() => ({
		queryKey: ['cart'],
		queryFn: async function () {
			const response = await medusa?.carts.lineItems.update(props.cart.id, props.item.id, {
				quantity: quantity()
			})
			return response
		},
		enabled: false,
		cacheTime: 0,
		retry: 0
	}))
	createEffect(() => {
		console.log('VAR', queryLineItem?.data?.product?.variants)
	})
	return (
		<div class="grid grid-cols-3 gap-x-2">
			<button
				class="flex items-center justify-center w-5 h-5 bg-white"
				onKeyDown={e => {
					if (e.key === 'Enter') {
						handleQuanity(props.item.quantity - 1)
					}
				}}
			>
				<div
					class={clsx('i-mdi-minus-circle text-gray-5', props.item.quantity === props.item.variant && 'text-gray-2')}
					onclick={() => {
						handleQuanity(props.item.quantity - 1)
					}}
				/>
			</button>
			<span class="flex items-center justify-center text-sm font-500">{props.item?.quantity}</span>
			<button
				class="flex items-center justify-center w-5 bg-white"
				onKeyDown={e => {
					if (e.key === 'Enter') {
						handleQuanity(props.item.quantity + 1)
					}
				}}
			>
				<div
					class="i-mdi-plus-circle text-gray-5"
					onClick={e => {
						handleQuanity(props.item.quantity + 1)
					}}
				/>
			</button>
		</div>
	)
}

export function ItemPrice(props: { cart: any; item: any; variant: CartCoreProps['variant'] }) {
	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()

	const queryLineItem = createQuery(() => ({
		queryKey: ['CartCore-LineItem-Price', props.item.variant.product.handle],
		queryFn: async function () {
			const response = await fetchProduct(medusa, queryCart, props.item.variant.product.handle)
			return response
		},
		cacheTime: 15 * 60 * 1000
		//staleTime: 15 * 60 * 1000
	}))

	return (
		<div>
			<Show when={queryLineItem?.data?.products}>
				<For each={queryLineItem?.data?.products[0]?.variants}>
					{variant => {
						if (variant.id === props.item.variant_id) {
							if (variant.prices.length > 1) {
								return (
									<div class="flex flex-col">
										<span
											class={clsx(
												'line-through text-gray-700',
												props.variant === 'primary' && 'text-lg ',
												props.variant === 'checkout' && 'text-sm ',
												props.variant === 'panel' && 'text-sm',
												props.variant === 'mobile-checkout' && 'text-sm ',
												props.variant === 'mobile-panel' && 'text-sm '
											)}
										>
											{currencyFormat(Number(variant.original_price), props.cart?.region)}
										</span>

										<span
											class={clsx(
												'text-red-700',
												props.variant === 'primary' && 'text-lg',
												props.variant === 'checkout' && 'text-sm',
												props.variant === 'panel' && 'text-sm',
												props.variant === 'mobile-checkout' && 'text-sm',
												props.variant === 'mobile-panel' && 'text-sm'
											)}
										>
											{currencyFormat(Number(variant.calculated_price), props.cart?.region)}
										</span>
										<span class="text-xs text-white font-semibold bg-red-700 rounded-lg flex justify-center uppercase min-w-10 ">
											sale
										</span>
									</div>
								)
							} else {
								return (
									<span
										class={clsx(
											' text-gray-700',
											props.variant === 'primary' && 'text-lg ',
											props.variant === 'checkout' && 'text-sm ',
											props.variant === 'panel' && 'text-sm',
											props.variant === 'mobile-checkout' && 'text-sm ',
											props.variant === 'mobile-panel' && 'text-sm '
										)}
									>
										{currencyFormat(Number(variant.prices[0].amount), props.cart?.region)}
									</span>
								)
							}
						}
					}}
				</For>
			</Show>
		</div>
	)
}

export function ItemOptions(props: { cart: any; item: any; variant: CartCoreProps['variant'] }) {
	const { medusa } = useGlobalContext()

	const queryLineItem = createQuery(() => ({
		queryKey: ['CartCore-LineItem-Options', props.item?.id],
		queryFn: async function () {
			const response = await getProductInfo(medusa, props.cart, props.item.variant.product.id)
			return response
		},
		cacheTime: 15 * 60 * 1000
		//staleTime: 15 * 60 * 1000
	}))
	return (
		<div>
			<Show when={queryLineItem?.data?.product}>
				<For each={queryLineItem?.data?.product?.variants}>
					{variant => {
						if (variant.id === props.item.variant_id) {
							return (
								<For each={variant.options}>
									{option => {
										return (
											<div class="flex text-xs">
												<For each={queryLineItem?.data?.product?.options}>
													{opt => {
														if (opt.id === option.option_id) {
															return <div class="mr-1 capitalize">{opt.title}:</div>
														}
													}}
												</For>
												<span class="text-ellipsis line-clamp-1 ">{option.value}</span>
											</div>
										)
									}}
								</For>
							)
						}
					}}
				</For>
			</Show>
		</div>
	)
}

/* export function LineItemOptions(props: LineItemOptionsProps) {
	return (
		<div class="text-sm text-gray-700">
			<For each={props.variant?.options}>
				{option => {
					const optionName = props.variant.product?.options?.find(opt => opt.id === option.option_id)?.title || 'Option'
					return (
						<div>
							<span>
								{optionName}: {option.value}
							</span>
						</div>
					)
				}}
			</For>
		</div>
	)
}

export function LineItemPrice(props: LineItemPriceProps) {
	const originalPrice = (props.item.variant as CalculatedVariant).original_price * props.item?.quantity
	const hasReducedPrice = (props.item.total || 0) < originalPrice

	return (
		<div class="flex flex-col text-gray-700 text-right">
			<span
				class={clsx('text-base-regular', {
					'text-rose-600': hasReducedPrice
				})}
			>
				{currencyFormat(Number(props.item.total || 0), props.region?.id)}
			</span>
			{hasReducedPrice && (
				<>
					<p>
						{props.style === 'default' && <span class="text-gray-500">Original: </span>}
						<span class="line-through">{currencyFormat(Number(originalPrice), props.region?.id)}</span>
					</p>
					{props.style === 'default' && (
						<span class="text-rose-600">-{getPercentageDiff(originalPrice, props.item?.total || 0)}%</span>
					)}
				</>
			)}
		</div>
	)
} */

export function PromoCodeInput(props: PromoCodeInputProps) {
	const [promoCode, setPromoCode] = createSignal('')

	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()

	const handleSubmit = (e: Event) => {
		e.preventDefault()
		props.onSubmit(promoCode())
		//setPromoCode('')
		mutatePromo.refetch()
	}

	const mutatePromo = createQuery(() => ({
		queryKey: ['cart'],
		queryFn: async function () {
			const response = await medusa?.carts.update(queryCart?.data?.cart?.id, {
				discounts: [{ code: promoCode() }]
			})
			return response
		},
		enabled: false
	}))

	return (
		<div>
			<Show when={props.cart.discounts.length === 0}>
				<form
					onSubmit={handleSubmit}
					class="flex items-center space-x-2"
				>
					<input
						type="text"
						value={promoCode()}
						onInput={(e: any) => setPromoCode(e.target.value)}
						placeholder="Enter promo code"
						class="border border-gray-300 rounded px-2 py-1 text-xs"
					/>
					<button
						type="submit"
						class={clsx(
							'"bg-[#E5E5E5] border  hover:border-sky-500 text-gray-8 px-3 py-1 rounded text-xs',
							props.variant === 'primary' && 'text-sm',
							props.variant === 'checkout' && '',
							props.variant === 'panel' && '',
							props.variant === 'mobile-checkout' && '',
							props.variant === 'mobile-panel' && ''
						)}
					>
						Apply
					</button>
				</form>
			</Show>
			<Show when={props.cart.discounts.length > 0}>
				<div class="flex justify-between text-red-7">
					<div class="flex space-x-2">
						<div>Promo code: {props?.cart?.discounts[0]?.code}</div>
						<div>
							{'('}
							{props?.cart?.discounts[0]?.rule?.value}% Discount
							{')'}
						</div>
					</div>
					<div>-{currencyFormat(Number(props?.cart?.discount_total || 0), props?.cart?.region?.id)}</div>
				</div>
			</Show>
		</div>
	)
}

export function GiftCardInput(props: PromoCodeInputProps) {
	const [giftCard, setGiftCard] = createSignal('')

	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()

	const handleSubmit = (e: Event) => {
		e.preventDefault()
		props.onSubmit(giftCard())
		//setPromoCode('')
		mutateGiftCard.refetch()
	}

	const mutateGiftCard = createQuery(() => ({
		queryKey: ['cart'],
		queryFn: async function () {
			const response = await medusa?.carts.update(queryCart?.data?.cart?.id, {
				gift_cards: [{ code: giftCard() }]
			})
			return response
		},
		enabled: false
	}))

	return (
		<div>
			<Show when={props?.cart?.gift_card_total === 0}>
				<form
					onSubmit={handleSubmit}
					class="flex items-center space-x-2"
				>
					<input
						type="text"
						value={giftCard()}
						onInput={(e: any) => setGiftCard(e.target.value)}
						placeholder="Enter gift card code"
						class="border border-gray-300 rounded px-2 py-1 text-xs"
					/>
					<button
						type="submit"
						class={clsx(
							'"bg-[#E5E5E5] border  hover:border-sky-500 text-gray-8 px-3 py-1 rounded text-xs',
							props.variant === 'primary' && 'text-sm',
							props.variant === 'checkout' && '',
							props.variant === 'panel' && '',
							props.variant === 'mobile-checkout' && '',
							props.variant === 'mobile-panel' && ''
						)}
					>
						Apply
					</button>
				</form>
			</Show>
			<Show when={props?.cart?.gift_card_total > 0}>
				<div class="flex justify-between text-gray-6">
					<div class="flex space-x-2">
						<div class="text-xs">{props?.cart?.gift_cards[0]?.code}</div>
						<div class="text-xs">
							{'('}
							{currencyFormat(Number(props?.cart?.gift_cards[0]?.value || 0), props?.cart?.region?.id)} currently available
							{')'}
						</div>
					</div>
					<div>-{currencyFormat(Number(props?.cart?.gift_card_total || 0), props?.cart?.region?.id)}</div>
				</div>
			</Show>
		</div>
	)
}
