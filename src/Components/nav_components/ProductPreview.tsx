import { A } from 'solid-start'
import { ProductPreviewType } from '~/types/global'
import Thumbnail from '~/Components/common/Thumbnail'
import { currencyFormat } from '~/lib/helpers/currency'
import { Show, Suspense } from 'solid-js'
import { Transition } from 'solid-transition-group'

interface ProductPreviewProps extends ProductPreviewType {
	handleClick: () => void
	variants: [
		{
			original_price: string
			calculated_price: string
		}
	]
}

const ProductPreview = (props: ProductPreviewProps) => {
	return (
		<Suspense>
			<Show when={props.title}>
				<A href={`/products/${props.handle}`}>
					<div onClick={props.handleClick}>
						<Thumbnail
							thumbnail={props.thumbnail}
							title={props.title}
							variant="clothing"
						/>
						<div class="text-base ">
							<div>
								<div class="flex sm:block space-x-1 sm:space-x-0">
									<Show when={props.variants?.[0]?.original_price === props.variants?.[0]?.calculated_price}>
										<div class="">
											{props.variants?.[0]?.original_price
												? currencyFormat(Number(props.variants?.[0]?.original_price), 'USD')
												: ''}
										</div>
									</Show>
									<Show when={props.variants?.[0]?.original_price !== props.variants?.[0]?.calculated_price}>
										<div class="line-through ">
											{props.variants?.[0]?.original_price
												? currencyFormat(Number(props.variants?.[0]?.original_price), 'USD')
												: ''}
										</div>
										<div class="flex sm:block space-x-1 sm:space-x-0">
											<div class=" text-red-7 ">
												{props.variants?.[0]?.calculated_price
													? currencyFormat(Number(props.variants?.[0]?.calculated_price), 'USD')
													: ''}
											</div>
											<span class="text-xs text-red-700 sm:text-white font-semibold sm:bg-red-700 rounded-lg flex justify-center items-center  uppercase max-w-10">
												sale
											</span>
										</div>
									</Show>
								</div>
								<span class="text-sm font-500">{props.title}</span>
							</div>
						</div>
					</div>
				</A>
			</Show>
		</Suspense>
	)
}

export default ProductPreview
