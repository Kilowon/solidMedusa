import { For, Switch, Match, Show, Suspense } from 'solid-js'
import { A } from 'solid-start'
import clsx from 'clsx'
import { useGlobalContext } from '~/Context/Providers'
import Thumbnail from '~/Components/common/Thumbnail'
import { useStore } from '~/Context/StoreContext'

interface CartCoreProps {
	variant?: 'primary' | 'checkout' | 'panel' | 'mobile-checkout'
	cart?: any
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

	return (
		<div class=" text-sm text-gray-5 z-50">
			<Switch fallback={<div>Empty</div>}>
				<Match when={queryCart?.data?.cart?.items?.length > 0}>
					<div>
						<ol
							class={clsx(
								'overflow-y-scroll  scrollbar-hide ',
								props.variant === 'primary' && 'max-h-[500px]',
								props.variant === 'checkout' && 'max-h-[425px] mx-auto',
								props.variant === 'panel' && 'max-h-[580px] mx-auto',
								props.variant === 'mobile-checkout' && 'max-h-[45vh] mx-auto'
							)}
						>
							<For
								each={queryCart?.data?.cart?.items?.sort((a: any, b: any) => {
									return a.created_at > b.created_at ? -1 : 1
								})}
							>
								{item => (
									<li>
										<div
											class={clsx(
												'grid gap-x-3',
												props.variant === 'primary' && 'grid-cols-[100px_1fr]',
												props.variant === 'checkout' && 'grid-cols-[30px_1fr]',
												props.variant === 'panel' && 'grid-cols-[70px_1fr]',
												props.variant === 'mobile-checkout' && 'grid-cols-[30px_1fr]'
											)}
										>
											<div class="flex flex-col items-center space-y-4">
												<Thumbnail
													thumbnail={item.thumbnail}
													size="full"
												/>
												<div
													class={clsx(
														'grid grid-cols-3 gap-x-2',
														props.variant === 'primary' && '',
														props.variant === 'checkout' && 'hidden',
														props.variant === 'panel' && '',
														props.variant === 'mobile-checkout' && 'hidden'
													)}
												>
													<button class="flex items-center justify-center text-lg bg-white">
														<div class="i-mdi-minus-circle text-gray-5" />
													</button>
													<span class="flex items-center justify-center text-lg font-semibold">{item?.quantity}</span>
													<button class="flex items-center justify-center text-lg bg-white">
														<div class="i-mdi-plus-circle text-gray-5" />
													</button>
												</div>
											</div>
											<div class="grid grid-cols-2">
												<div class="flex items-start justify-between">
													<div>
														<div
															class={clsx(
																'font-semibold line-clamp-2 text-ellipsis',
																props.variant === 'primary' && 'md:text-lg',
																props.variant === 'checkout' && 'text-xs',
																props.variant === 'panel' && 'text-xs',
																props.variant === 'mobile-checkout' && 'text-xs'
															)}
														>
															<A href={`/products/${item.variant.product?.handle}`}>{item?.title}</A>
														</div>
														<LineItemOptions variant={item?.variant} />
													</div>
												</div>

												<div
													class={clsx(
														'space-y-12',
														props.variant === 'primary' && 'lex flex-col items-end text-lg space-y-12',
														props.variant === 'checkout' && ' text-sm',
														props.variant === 'panel' && 'lex flex-col items-end text-sm space-y-12',
														props.variant === 'mobile-checkout' && ' text-sm'
													)}
												>
													<div
														class={clsx(
															'',
															props.variant === 'primary' && '',
															props.variant === 'checkout' && 'grid grid-cols-2',
															props.variant === 'panel' && '',
															props.variant === 'mobile-checkout' && 'grid grid-cols-2'
														)}
													>
														<div>
															<span
																class={clsx(
																	'',
																	props.variant === 'primary' && 'hidden',
																	props.variant === 'checkout' && 'flex items-center justify-center mt-2 text-sm font-semibold',
																	props.variant === 'panel' && 'hidden',
																	props.variant === 'mobile-checkout' && 'flex items-center justify-center mt-2 text-sm font-semibold'
																)}
															>
																Qty: {item?.quantity}
															</span>
														</div>
														<div class="">
															<LineItemPrice
																region={props.cart?.region}
																item={item}
																style="tight"
															/>

															<LineItemPrice
																region={props.cart?.region}
																item={item}
																style="tight"
															/>
														</div>
													</div>
													<div
														class={clsx(
															props.variant === 'primary' && '',
															props.variant === 'checkout' && 'hidden',
															props.variant === 'panel' && '',
															props.variant === 'mobile-checkout' && 'hidden'
														)}
													>
														<button
															class="flex items-center gap-x-1 rounded p-1 bg-white"
															onClick={() => {
																deleteItem(item?.id), queryCartRefetch?.()
															}}
														>
															<div class="i-ph-trash-duotone text-sm text-gray-5  "></div>
															<span>Remove</span>
														</button>
													</div>
												</div>
											</div>
										</div>{' '}
										<hr class="border-gray-400/50 my-2 mx-6" />
									</li>
								)}
							</For>
						</ol>
						<div class=" flex flex-col gap-y-4 text-sm">
							<div class="flex flex-col justify-start">
								<div class="flex justify-center bg-gray-2">
									<div class={'i-tabler-chevron-down text-3xl  '} />
								</div>
								<div class="flex justify-between items-center">
									<span class=" font-semibold">Subtotal</span>
									<span class="text-large-semi">
										{currencyFormat(Number(queryCart?.data?.cart?.subtotal || 0), queryCart?.data?.cart?.region)}
									</span>
								</div>
								<div class="flex justify-between items-center">
									<span class="text-red-700 font-semibold">Sale Savings</span>
									<span class="text-red-700 text-large-semi">
										{currencyFormat(Number(queryCart?.data?.cart?.subtotal || 0), queryCart?.data?.cart?.region)}
									</span>
								</div>
							</div>
							<span class="text-red-700 font-semibold">Apply promo code+</span>

							<div class="flex justify-between items-center">
								<span class=" text-lg font-semibold">Total</span>
								<span class=" text-lg font-semibold">
									{currencyFormat(Number(queryCart?.data?.cart?.subtotal || 0), queryCart?.data?.cart?.region)}
								</span>
							</div>
							<Show when={props.variant === 'panel'}>
								<A href="/cart">
									<button class="w-full uppercase flex items-center justify-center min-h-[65px] rounded-sm px-5 my-1 py-[10px] text-sm border transition-colors duration-200 disabled:opacity-50 text-white bg-gray-600 border-gray-600 hover:bg-white hover:text-gray-900 disabled:hover:bg-gray-900 disabled:hover:text-white">
										SECURE CHECKOUT
									</button>
								</A>
								<span class=" font-semibold underline flex items-center justify-center">save for later</span>
							</Show>
						</div>
					</div>
				</Match>
				<Match when={queryCart?.data?.cart?.items?.length === 0}>
					<div>
						<div class="flex py-16 flex-col gap-y-4 items-center justify-center">
							<div class="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
								<span>0</span>
							</div>
							<span>Your shopping bag is empty.</span>
							<div>
								<A href="/store/Store">
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
	)
}

import { ProductVariant } from '~/types/models'
type LineItemOptionsProps = { variant: ProductVariant }
export function LineItemOptions(props: LineItemOptionsProps) {
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
}
