import { useGlobalContext } from '~/Context/Providers'
import {
	IsClientCheck,
	fetchProduct,
	getProductInfo
} from '~/Services/medusaAPI'
import { Cart } from '~/types/types'
import {
	createRouteData,
	useRouteData,
	useParams,
	Title,
	Meta,
	RouteDataArgs,
	ServerError
} from 'solid-start'
import { createEffect, Suspense, createSignal } from 'solid-js'
import ProductTemplate from '~/Components/ProductTemplate'
import { useStore } from '~/Context/StoreContext'
import { StoreProvider } from '~/Context/StoreContext'

interface ProductPage {
	products: {
		title: string
		description: string
		thumbnail: string
		images: {
			url: string
			id: string
		}[]
		id: string
	}[]
}

export function useProduct(params: any) {
	const { medusa } = useGlobalContext()
	const { cart } = useGlobalContext()
	return createRouteData(
		async () => {
			try {
				const productPage: ProductPage = await fetchProduct(medusa, params.handle)
				const productInfo = await getProductInfo(
					medusa,
					cart,
					productPage.products[0].id
				)
				return { productPage, productInfo }
			} catch (e: any) {
				console.log('ERROR', e.stack)
				throw new ServerError(e.message)
			}
		},
		{ key: () => params.handle }
	)
}

export default function Products() {
	const params = useParams()
	const data = useProduct(params)
	data()

	createEffect(() => {
		console.log('data', data()?.productInfo.product.variants)
	})
	return (
		<div>
			<Title>{data()?.productPage.products[0].title}</Title>
			<Meta
				itemProp="description"
				content={data()?.productPage.products[0].description}
			/>
			<Meta
				itemProp="og:title"
				content={data()?.productPage.products[0].title}
			/>
			<Meta
				itemProp="image"
				content={data()?.productPage.products[0].thumbnail}
			/>
			<main>
				<StoreProvider product={data()?.productInfo?.product}>
					<ProductTemplate
						images={data()?.productPage.products[0].images}
						productInfo={data()?.productInfo?.product}
						params={params?.handle}
						updateOptions={useStore().updateOptions}
						options={useStore().options}
						inStock={useStore().inStock}
						variant={useStore().variant}
						useStore={useStore}
					/>
				</StoreProvider>
			</main>
		</div>
	)
}
