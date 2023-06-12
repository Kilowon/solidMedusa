import { Hero } from '~/Components/layout/Hero'
import { lazy, Suspense } from 'solid-js'
import { useRouteData, createRouteData } from 'solid-start'
import { useGlobalContext } from '~/Context/Providers'
import { IsClientCheck, getProductList } from '~/Services/medusaAPI'
import { Cart } from '~/types/types'

const FeaturedProducts = lazy(() => import('~/Components/layout/FeaturedProducts'))

export function routeData() {
	const { medusa } = useGlobalContext()
	const { cart }: Cart = useGlobalContext()

	return createRouteData(async () => {
		const featuredProducts: any = IsClientCheck(
			await getProductList(medusa, cart.result?.cart.id, 4, cart.result?.cart.region)
		)

		return { featuredProducts }
	})
}

export default function App() {
	const data = useRouteData<typeof routeData>()
	//data()
	return (
		<main>
			<Hero />
			<div class="my-16">
				<Suspense>
					<FeaturedProducts variant="hero" />
				</Suspense>
			</div>
		</main>
	)
}
