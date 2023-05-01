import { JSX, For, Show } from 'solid-js'
import { A } from 'solid-start'
import { Product } from '~/types/models'
import clsx from 'clsx'
import { useGlobalContext } from '~/Context/Providers'
import OptionSelect from '~/Components/prod_tmpl_components/OptionSelect'
import { useStore } from '~/Context/StoreContext'

export default function ProductActions(props: {
	productInfo: Product
	updateOptions: any
	options: any
	inStock: any
	variant: any
	useStore: any
}): JSX.Element {
	//const price = useProductPrice({ id: props.productInfo.id, variantId: variant()?.id })

	//const selectedPrice =
	/* useMemo(() => {
		const { variantPrice, cheapestPrice } = price

		return variantPrice || cheapestPrice || null
	}, [price]) */

	const { addToCart } = useStore()

	return (
		<Show when={props.productInfo}>
			<div class="flex flex-col gap-y-2">
				<A
					href={`/collections/${props.productInfo.collection?.id}`}
					class="text-sm text-gray-700"
				>
					{props.productInfo.collection?.title}
				</A>

				<h3 class="text-2xl font-semibold">{props.productInfo?.title}</h3>

				<p class="text-base">{props.productInfo?.description}</p>

				<div class="my-8 flex flex-col gap-y-6">
					<For each={props.productInfo?.options}>
						{option => {
							return (
								<div>
									<OptionSelect
										option={option}
										current={props.options[option.id]}
										updateOption={props.updateOptions}
										title={option.title}
									/>
								</div>
							)
						}}
					</For>
				</div>

				{/* <div class="mb-4">
				{selectedPrice ? (
					<div class="flex flex-col text-gray-700">
						<span
							class={clsx('text-xl-semi', {
								'text-rose-600': selectedPrice.price_type === 'sale'
							})}
						>
							{selectedPrice.calculated_price}
						</span>
						{selectedPrice.price_type === 'sale' && (
							<>
								<p>
									<span class="text-gray-500">Original: </span>
									<span class="line-through">{selectedPrice.original_price}</span>
								</p>
								<span class="text-rose-600">-{selectedPrice.percentage_diff}%</span>
							</>
						)}
					</div>
				) : (
					<div></div>
				)}
			</div> */}

				<button
					onClick={() => {
						console.log('ADD TO CART')
						addToCart()
					}}
					class="w-full uppercase flex items-center justify-center min-h-[50px] px-5 py-[10px] text-sm border transition-colors duration-200 disabled:opacity-50 text-white bg-gray-900 border-gray-900 hover:bg-white hover:text-gray-900 disabled:hover:bg-gray-900 disabled:hover:text-white"
				>
					Add to cart
				</button>
			</div>
		</Show>
	)
}
