import ProductActions from '~/Components/prod_tp_components/ProductActions'

export default function ProductInfo(props: { productId: string | undefined }) {
	return (
		<div id="product-info">
			<div class="flex flex-col gap-y-12 lg:max-w-[500px] mx-auto">
				<div>
					<ProductActions productId={props.productId} />
				</div>
			</div>
		</div>
	)
}
