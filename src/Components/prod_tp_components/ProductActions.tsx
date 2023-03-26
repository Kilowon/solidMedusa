import { JSX } from 'solid-js'
import { A } from 'solid-start'
import { Product } from '~/types/medusa'
import clsx from 'clsx'
import { useGlobalContext } from '~/Context/Providers'

export default function ProductActions(props: {
	productInfo: Product
}): JSX.Element {
	//const { updateOptions, addToCart, options, inStock, variant } =
	//useProductActions()

	//const price = useProductPrice({ id: product.id, variantId: variant?.id })

	//const selectedPrice =
	/* useMemo(() => {
		const { variantPrice, cheapestPrice } = price

		return variantPrice || cheapestPrice || null
	}, [price]) */
	console.log('ProductActions props', props.productInfo?.collection.id)
	return (
		<div class="flex flex-col gap-y-2">
			<A
				href={`/collections/${props.productInfo?.collection.id}`}
				class="text-sm text-gray-700"
			>
				{props.productInfo?.collection.title}
			</A>

			<h3 class="text-xl">{props.productInfo?.title}</h3>

			<p class="text-base">{props.productInfo?.description}</p>

			{props.productInfo?.variants.length > 1 && (
				<div class="my-8 flex flex-col gap-y-6">
					{props.productInfo?.options.map(option => {
						return (
							<div>
								{/* <OptionSelect
									option={option}
									current={options[option.id]}
									updateOption={updateOptions}
									title={option.title}
								/> */}
							</div>
						)
					})}
				</div>
			)}

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

			<button class="w-full uppercase flex items-center justify-center min-h-[50px] px-5 py-[10px] text-sm border transition-colors duration-200 disabled:opacity-50 text-white bg-gray-900 border-gray-900 hover:bg-white hover:text-gray-900 disabled:hover:bg-gray-900 disabled:hover:text-white">
				Add to cart
			</button>
		</div>
	)
}
