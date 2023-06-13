import ImageGallerySlidy from '~/Components/prod_tmpl_components/ImageGallerySlidy'
import ProductActions from '~/Components/prod_tmpl_components/ProductActions'
import { JSX, Show } from 'solid-js'
import { Product } from '~/types/models'
import { ReviewsWide } from './prod_tmpl_components/ProductActions'

export default function ProductTemplate(props: {
	images: { url: string; id: string }[] | undefined
	productInfo: Product
	params: any
	updateOptions: any
	options: any
	inStock: any
	variant: any
	useStore: any
}): JSX.Element {
	return (
		<Show when={props.productInfo}>
			<main>
				<div class=" lg:flex lg:content-container lg:mt-20 ">
					<div class="md:flex md:flex-col md:gap-y-8 md:w-full">
						<ImageGallerySlidy
							images={props.images}
							productInfo={props.productInfo}
							params={props.params}
						/>
					</div>
					<div class="">
						<div class="flex flex-col gap-y-12 lg:max-w-[500px] mx-auto">
							<div>
								<ProductActions
									productInfo={props.productInfo}
									updateOptions={props.updateOptions}
									options={props.options}
									inStock={props.inStock}
									variant={props.variant}
									useStore={props.useStore}
								/>
							</div>
						</div>
					</div>
				</div>
				<div class="hidden lg:flex lg:content-container">
					<ReviewsWide rating={() => 4.5} />
				</div>
			</main>
		</Show>
	)
}
