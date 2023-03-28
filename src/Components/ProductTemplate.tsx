import ImageGallerySlidy from '~/Components/prod_tp_components/ImageGallerySlidy'
import ProductActions from '~/Components/prod_tp_components/ProductActions'
import { createRouteData, ServerError, refetchRouteData } from 'solid-start'
import { getProductInfo, IsClientCheck } from '~/Services/medusaAPI'
import { useGlobalContext } from '~/Context/Providers'
import { createEffect, onMount } from 'solid-js'
import { JSX, Show } from 'solid-js'
import { Product } from '~/types/models'
import { title } from 'process'

export default function ProductTemplate(props: {
	images: { url: string; id: string }[] | undefined
	productInfo: Product
	params: any
}): JSX.Element {
	return (
		<Show when={props.productInfo}>
			<main>
				<div class="content-container flex flex-col lg:flex-row lg:items-start py-6 relative">
					<div class="flex flex-col gap-y-8 w-full">
						<ImageGallerySlidy
							images={props.images}
							productInfo={props.productInfo}
							params={props.params}
						/>
					</div>
					<div class="lg:sticky lg:top-20 w-full py-8 sm:py-0 md:max-w-[344px] lg:max-w-[400px] flex flex-col gap-y-12">
						<div class="flex flex-col gap-y-12 lg:max-w-[500px] mx-auto">
							<div>
								<ProductActions productInfo={props.productInfo} />
							</div>
						</div>
						{/* <ProductTabs productId={product} /> */}
					</div>
				</div>
				<div class="content-container my-16 px-6 sm:px-8 sm:my-32">
					{/* <RelatedProducts product={product} /> */}
				</div>
				{/* <MobileActions
			product={product}
			show={!inView}
		/> */}
			</main>
		</Show>
	)
}
