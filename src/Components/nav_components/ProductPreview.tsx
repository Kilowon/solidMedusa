import clsx from 'clsx'
import { A } from 'solid-start'
import { ProductPreviewType } from '~/types/global'
import Thumbnail from '~/Components/common/Thumbnail'
import { currencyFormat } from '~/lib/helpers/currency'

const ProductPreview = (props: ProductPreviewType) => {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'EUR'
	})

	return (
		<A href={`/products/${props.handle}`}>
			<div>
				<Thumbnail
					thumbnail={props.thumbnail}
					title={props.title}
					size="full"
				/>
				<div class="text-base mt-6">
					<span>{props.title}</span>
					<div class="flex items-center gap-x-2 mt-1">
						{props.price?.original_price
							? currencyFormat(Number(props.price?.original_price), 'USD')
							: ''}
					</div>
				</div>
			</div>
		</A>
	)
}

export default ProductPreview
