import { useGlobalContext } from '~/Context/Providers'
import { fetchProduct } from '~/Services/medusaAPI'
import { useParams, Title, Meta } from 'solid-start'
import { Suspense, createEffect, Show } from 'solid-js'
import ProductTemplate from '~/Components/ProductTemplate'
import { useStore } from '~/Context/StoreContext'
import { StoreProvider } from '~/Context/StoreContext'
import { createQuery } from '@tanstack/solid-query'

export default function Products() {
	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()

	const params = useParams()

	const queryProduct = createQuery(() => ({
		queryKey: ['Product-Page', params.handle],
		queryFn: async function () {
			const product = await fetchProduct(medusa, queryCart, params.handle)
			return product
		},

		cacheTime: 25 * 60 * 1000
	}))

	return (
		<div>
			<Title>{queryProduct?.data?.products[0]?.title}</Title>
			<Meta
				itemProp="description"
				content={queryProduct?.data?.products[0]?.description}
			/>
			<Meta
				itemProp="og:title"
				content={queryProduct?.data?.products[0]?.title}
			/>
			<Meta
				itemProp="image"
				content={queryProduct?.data?.products[0]?.thumbnail}
			/>
			<main>
				<Show when={queryProduct?.data?.products[0]?.handle === params.handle}>
					<StoreProvider product={queryProduct?.data?.products[0]}>
						<ProductTemplate
							images={queryProduct?.data?.products[0]?.images}
							productInfo={queryProduct?.data?.products[0]}
							params={params?.handle}
							updateOptions={useStore().updateOptions}
							options={useStore().options}
							inStock={useStore().inStock}
							variant={useStore().variant}
							useStore={useStore}
						/>
					</StoreProvider>
				</Show>
			</main>
		</div>
	)
}
