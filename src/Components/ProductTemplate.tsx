import ImageGallery from '~/Components/prod_tp_components/ImageGallery'
import { JSX } from 'solid-js'

export default function ProductTemplate(props: any): JSX.Element {
	return (
		<main>
			<div class="content-container flex flex-col small:flex-row small:items-start py-6 relative">
				<div class="flex flex-col gap-y-8 w-full">
					<ImageGallery images={props.images} />
				</div>
				<div class="small:sticky small:top-20 w-full py-8 small:py-0 small:max-w-[344px] medium:max-w-[400px] flex flex-col gap-y-12">
					{/* <ProductInfo product={product} />
				<ProductTabs product={product} /> */}
				</div>
			</div>
			<div class="content-container my-16 px-6 small:px-8 small:my-32">
				{/* <RelatedProducts product={product} /> */}
			</div>
			{/* <MobileActions
			product={product}
			show={!inView}
		/> */}
		</main>
	)
}
