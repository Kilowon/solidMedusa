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
	createEffect(() => {})
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
				<ProductTemplate
					images={data()?.productPage.products[0].images}
					productInfo={data()?.productInfo.product}
					params={params?.handle}
				/>
			</main>
		</div>
	)
}
