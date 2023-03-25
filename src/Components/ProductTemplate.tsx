import ImageGallery from '~/Components/prod_tp_components/ImageGallery'
import ProductInfo from '~/Components/prod_tp_components/ProductInfo'
import { JSX } from 'solid-js'
//TODO: the new slug is showing up in the URL, but the page is not updating. Maybe it needs a reactive signal

export default function ProductTemplate(props: {
	images: { url: string; id: string }[] | undefined
	productId: string | undefined
}): JSX.Element {
	console.log('props', props.productId)
	return (
		<main>
			<div class="content-container flex flex-col sm:flex-row sm:items-start py-6 relative">
				<div class="flex flex-col gap-y-8 w-full">
					<ImageGallery images={props.images} />
				</div>
				<div class="sm:sticky sm:top-20 w-full py-8 sm:py-0 sm:max-w-[344px] md:max-w-[400px] flex flex-col gap-y-12">
					<ProductInfo productId={props.productId} />
					{/*<ProductTabs productId={product} /> */}
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
	)
}
