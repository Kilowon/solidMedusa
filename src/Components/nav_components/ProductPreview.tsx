import clsx from 'clsx'
import { A } from 'solid-start'
import { ProductPreviewType } from '~/types/global'
import Thumbnail from '~/Components/common/Thumbnail'

const ProductPreview = (props: ProductPreviewType) => {
	return (
		<A href={`/products/${props.handle}`}>
			<div class="overflow-hidden w-[17vw]">
				<Thumbnail
					thumbnail={props.thumbnail}
					title={props.title}
					size="full"
				/>
				<div class="text-base mt-6">
					<span>{props.title}</span>
					<div class="flex items-center gap-x-2 mt-1">
						{props.price?.original_price
							? `$${(props.price?.original_price / 100).toFixed(2)}`
							: ''}
					</div>
				</div>
			</div>
		</A>
	)
}

export default ProductPreview
