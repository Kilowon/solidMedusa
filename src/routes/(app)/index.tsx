import { Hero } from '~/Components/layout/Hero'
import { useRouteData, createRouteData } from 'solid-start'
import { FeaturedProducts } from '~/Components/layout/FeaturedProducts'
import { Navigation } from '~/Components/layout/Navigation'
import { useGlobalContext } from '~/Context/Providers'
import { IsClientCheck, getProductList } from '~/Services/medusaAPI'
import { Cart } from '~/types/types'

export function routeData() {
	const { medusa } = useGlobalContext()
	const { cart }: Cart = useGlobalContext()

	return createRouteData(async () => {
		const featuredProducts: any = IsClientCheck(
			await getProductList(
				medusa,
				cart.result?.cart.id,
				4,
				cart.result?.cart.region
			)
		)

		const responceProduct: any = IsClientCheck(
			await getProductList(
				medusa,
				cart.result?.cart.id,
				3,
				cart.result?.cart.region
			)
		)

		const responceCollection = await medusa!.collections
			.list({ limit: 8 })
			.then(({ collections: newCollections }: any) => {
				return newCollections.map((c: any) => ({
					id: c.id,
					title: c.title
				}))
			})

		return { responceProduct, responceCollection, featuredProducts }
	})
}

export default function App() {
	const data = useRouteData<typeof routeData>()
	data()
	return (
		<main class="bg-[#35393b]">
			<Hero />
			<FeaturedProducts featuredProducts={data()?.featuredProducts} />
		</main>
	)
}
