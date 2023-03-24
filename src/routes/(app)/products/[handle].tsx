import { useGlobalContext } from '~/Context/Providers'
import { IsClientCheck, fetchProduct } from '~/Services/medusaAPI'
import { Cart } from '~/types/types'
import {
	createRouteData,
	useRouteData,
	redirect,
	useParams,
	Title,
	Meta
} from 'solid-start'
import { Suspense } from 'solid-js'
import ProductTemplate from '~/Components/ProductTemplate'

interface ProductPage {
	products: {
		title: string
		description: string
		thumbnail: string
		images: {
			url: string
		}[]
	}[]
}

export function routeData() {
	const { medusa } = useGlobalContext()
	//const { cart }: Cart = useGlobalContext()

	return createRouteData(async () => {
		const productPage: ProductPage = await fetchProduct(
			medusa,
			useParams().handle
		)

		return { productPage }
	})
}

export default function Products() {
	const params = useParams()
	const data = useRouteData<typeof routeData>()
	data()
	console.log('PAGE PRODUCT DATA', data()?.productPage.products[0])

	return (
		<>
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
				<ProductTemplate images={data()?.productPage.products[0].images} />
			</main>
		</>
	)
}
