import { useRouteData, createRouteData } from 'solid-start'
import { Navigation } from '~/Components/layout/Navigation'
import { useGlobalContext } from '~/Context/Providers'
import { IsClientCheck, getProductList } from '~/Services/medusaAPI'
import { Cart } from '~/types/types'

export function routeData() {
	const { medusa } = useGlobalContext()
	const { cart }: Cart = useGlobalContext()

	return createRouteData(async () => {
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

		return { responceProduct, responceCollection }
	})
}

import { Routes, Route } from 'solid-start'
import { Outlet } from 'solid-start'

// App.tsx
export default function Home() {
	const data = useRouteData<typeof routeData>()
	data()
	return (
		<div>
			<Navigation
				collection={data()?.responceCollection}
				product={data()?.responceProduct}
			/>
			<Outlet />
		</div>
	)
}
