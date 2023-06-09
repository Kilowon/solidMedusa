import { A } from 'solid-start'
import { ProductPreviewType } from '~/types/global'
import Thumbnail from '~/Components/common/Thumbnail'
import { currencyFormat } from '~/lib/helpers/currency'
import { Show } from 'solid-js'

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
		<Show when={props.title}>
			<A href={`/products/${props.handle}`}>
				<div onClick={props.handleClick}>
					<Thumbnail
						thumbnail={props.thumbnail}
						title={props.title}
						variant="wide"
					/>
					<div class="text-xs ">
						<div>
							<Show when={props.variants?.[0]?.original_price === props.variants?.[0]?.calculated_price}>
								<div class="">
									{props.variants?.[0]?.original_price ? currencyFormat(Number(props.variants?.[0]?.original_price), 'USD') : ''}
								</div>
							</Show>
							<Show when={props.variants?.[0]?.original_price !== props.variants?.[0]?.calculated_price}>
								<div class="line-through ">
									{props.variants?.[0]?.original_price ? currencyFormat(Number(props.variants?.[0]?.original_price), 'USD') : ''}
								</div>
								<div>
									<div class=" text-red-7 ">
										{props.variants?.[0]?.calculated_price
											? currencyFormat(Number(props.variants?.[0]?.calculated_price), 'USD')
											: ''}
									</div>
									<span class="text-xs text-white font-semibold bg-red-700 rounded-lg flex justify-center uppercase max-w-10">
										sale
									</span>
								</div>
							</Show>
							<span>{props.title}</span>
						</div>
					</div>
				</div>
			</A>
		</Show>
	)
}

export default ProductPreview
