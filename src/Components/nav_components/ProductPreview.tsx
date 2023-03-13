import clsx from 'clsx'
import { A } from 'solid-start'
import { ProductPreviewType } from '~/types/global'
import Thumbnail from '~/Components/common/Thumbnail'

const ProductPreview = (props: ProductPreviewType) => {
	return (
		<A href={`/products/${props.handle}`}>
			<div class="overflow-hidden ">
				<Thumbnail
					thumbnail={props.thumbnail}
					title={props.title}
					size="full"
				/>
				<div class="text-base mt-6">
					<span>{props.title}</span>
					<div class="flex items-center gap-x-2 mt-1">
						{props.price ? (
							<>
								{props.price.price_type === 'sale' && (
									<span class="line-through text-gray-500">
										{props.price.original_price}
									</span>
								)}
								<span
									class={clsx('font-semibold', {
										'text-rose-500': props.price.price_type === 'sale'
									})}
								>
									{props.price.calculated_price}
								</span>
							</>
						) : (
							<div class="w-20 h-6 animate-pulse bg-gray-100"></div>
						)}
					</div>
				</div>
			</div>
		</A>
	)
}

export default ProductPreview
