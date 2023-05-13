import { For, Switch, Match, Show, Suspense } from 'solid-js'
import { A } from 'solid-start'
import clsx from 'clsx'
import { useGlobalContext } from '~/Context/Providers'
import Thumbnail from '~/Components/common/Thumbnail'
import { useStore } from '~/Context/StoreContext'

export default function CartCore(props: any) {
	const { queryCart } = useGlobalContext()
	const { queryCartRefetch } = useGlobalContext()
	const { deleteItem } = useStore()

	return (
		<div class=" text-sm text-gray-7 z-50">
			<Switch fallback={<div>Empty</div>}>
				<Match when={queryCart?.data?.cart?.items?.length > 0}>
					<div>
						<ol class="overflow-y-scroll  scrollbar-hide mx-auto max-h-[80vh]">
							<For
								each={queryCart?.data?.cart?.items?.sort((a: any, b: any) => {
									return a.created_at > b.created_at ? -1 : 1
								})}
							>
								{item => (
									<li>
										<hr class="  border-gray-400/50 my-2 mx-6" />
										<div class="grid grid-cols-[100px_1fr] gap-x-3">
											<div class="flex flex-col items-center space-y-4 ">
												<Thumbnail
													thumbnail={item.thumbnail}
													size="full"
												/>
												<div class="grid grid-cols-3 gap-x-2">
													<button class="flex items-center justify-center text-lg text-gray-5 ">
														<div class="i-mdi-minus-circle" />
													</button>
													<span class="flex items-center justify-center text-lg font-semibold ">{item?.quantity}</span>
													<button class="flex items-center justify-center text-lg  text-gray-5 ">
														<div class="i-mdi-plus-circle" />
													</button>
												</div>
											</div>
											<div class="grid grid-cols-2">
												<div class="flex items-start justify-between">
													<div>
														<div class="text-xs font-semibold line-clamp-2 text-ellipsis">
															<A href={`/products/${item.variant.product?.handle}`}>{item?.title}</A>
														</div>
														<LineItemOptions variant={item?.variant} />
													</div>
												</div>

												<div class="flex flex-col items-end text-sm space-y-12">
													<div>
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
													<div>
														<button
															class="flex items-center gap-x-1 text-gray-5  rounded p-1"
															onClick={() => {
																deleteItem(item?.id), queryCartRefetch?.()
															}}
														>
															<div class="i-ph-trash-duotone text-sm " />
															<span>Remove</span>
														</button>
													</div>
												</div>
											</div>
										</div>
									</li>
								)}
							</For>
						</ol>
						<div class="p-4 flex flex-col gap-y-4 text-sm">
							<div class="flex items-center justify-between">
								<span class="text-gray-700 font-semibold">
									Subtotal <span class="font-normal">(incl. taxes)</span>
								</span>
								<span class="text-large-semi">
									{currencyFormat(Number(queryCart?.data?.cart?.subtotal || 0), queryCart?.data?.cart?.region)}
								</span>
							</div>
							<A href="/cart">
								<button class="w-full uppercase flex items-center justify-center min-h-[50px] px-5 py-[10px] text-sm border transition-colors duration-200 disabled:opacity-50 text-white bg-gray-900 border-gray-900 hover:bg-white hover:text-gray-900 disabled:hover:bg-gray-900 disabled:hover:text-white">
									Go to bag
								</button>
							</A>
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
