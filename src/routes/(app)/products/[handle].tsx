import { useGlobalContext } from '~/Context/Providers'
import { IsClientCheck, fetchProduct } from '~/Services/medusaAPI'
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

	return createRouteData(
		async () => {
			try {
				const productPage: ProductPage = await fetchProduct(medusa, params.handle)

				return { productPage }
			} catch (e: any) {
				console.log('ERROR', e.stack)
				throw new ServerError(e.message)
			}
		},
		{ key: () => params.handle }
	)
}

export default function Products() {
	const { medusa } = useGlobalContext()

	const params = useParams()

	const data = useProduct(params)
	data()

	return (
		<Suspense>
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
					productId={data()?.productPage.products[0].id}
				/>
			</main>
		</Suspense>
	)
}
