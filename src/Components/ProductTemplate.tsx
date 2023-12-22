import ImageGallerySlidy from '~/Components/prod_tmpl_components/ImageGallerySlidy'
import ProductActions from '~/Components/prod_tmpl_components/ProductActions'
import { JSX, Show, createEffect, createSignal } from 'solid-js'
import { Product } from '~/types/models'
import { ReviewsDisplay } from './prod_tmpl_components/ProductActions'
import { createQuery } from '@tanstack/solid-query'
import DisplayContainer from './layout/DisplayContainer'
import PreFooter from './layout/PreFooter'
import { ErrorBoundary } from 'solid-start'
import { useParams } from 'solid-start'
import { useGlobalContext } from '~/Context/Providers'
import { Spinner } from './checkout_components/Spinner'
import { isServer } from 'solid-js/web'

export default function ProductTemplate(props: {
	updateOptions: any
	options: any
	inStock: any
	variant: any
	useStore: any
}): JSX.Element {
	const params = useParams()
	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()

	const [complete, setComplete] = createSignal(false)

	const queryProduct = createQuery(() => ({
		queryKey: ['Product-Page-Provider', params.handle],
		queryFn: async function () {
			const product = await medusa?.products.list({
				handle: params.handle,
				currency_code: 'USD'
			})
			if (!product) {
				throw new Error('Product is undefined')
			}
			return product
		},
		enabled: true,
		deferStream: true,
		refetchOnWindowFocus: false
	}))

	const reviewData = createQuery(() => ({
		queryKey: ['review_data', queryProduct?.data?.products[0].title],
		queryFn: async function () {
			const response = await fetch(`${import.meta.env.VITE_DIRECTUS_URL}/items/product/Product-01?fields=*,reviews.*`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			})
			const data = await response.json()
			return data
		},
		retry: 0,
		enabled: false,
		deferStream: true
	}))
	//TODO: make ReviewDisplay Show on width to prevent data from being fetched on mobile

	const draftReviewData = createQuery(() => ({
		queryKey: ['draft_review_data', queryProduct?.data?.products[0]?.title],
		queryFn: async function () {
			const response = await fetch(`${import.meta.env.VITE_DIRECTUS_URL}/items/product/Product-01?fields=*,reviews.*`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			})
			const data = await response.json()
			if (!data) {
				throw new Error('Data is undefined')
			}
			return data
		},
		retry: 0,
		enabled: !isServer && queryProduct.isSuccess,
		deferStream: true
	}))

	const displayContainerData = createQuery(() => ({
		queryKey: ['display_container_data', queryProduct?.data?.products[0]?.title],
		queryFn: async function () {
			const response = await fetch(
				`${import.meta.env.VITE_DIRECTUS_URL}/items/product/${queryProduct?.data?.products[0]?.id}?fields=*.item.*.*.*`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					}
				}
			)
			const data = await response.json()
			if (!data) {
				throw new Error('Data is undefined')
			}
			return data
		},
		retry: 0,
		enabled: !isServer && queryProduct.isSuccess,
		deferStream: true
	}))

	createEffect(() => {
		if (queryProduct.isSuccess && !isServer) {
			setTimeout(() => {
				setComplete(true)
			}, 10)
		}
	})

	return (
		<main>
			<Show
				when={
					(queryProduct.isSuccess &&
						queryCart.data?.cart.id !== undefined &&
						queryProduct?.data?.products[0]?.variants[0]?.prices[0]?.amount !== null) ||
					0
				}
				fallback={
					<div class="w-100vw h-50vh flex items-center justify-center">
						<Spinner />
					</div>
				}
			>
				<div class="sm:mt-12 lg:flex lg:content-container  ">
					<div>
						<ErrorBoundary>
							<ImageGallerySlidy
								images={queryProduct?.data?.products[0]?.images}
								productInfo={queryProduct?.data?.products[0]}
								params={params?.handle}
							/>
						</ErrorBoundary>
					</div>

					<div class="">
						<div class="  lg:max-w-[500px] ">
							<div>
								<ProductActions
									productInfo={queryProduct?.data?.products[0]}
									updateOptions={props.updateOptions}
									options={props.options}
									inStock={props.inStock}
									variant={props.variant}
									useStore={props.useStore}
								/>
							</div>
						</div>
					</div>
				</div>
			</Show>

			<Show when={displayContainerData.isSuccess && queryProduct.isSuccess && complete()}>
				<DisplayContainer data={displayContainerData} />
			</Show>
			<div class="hidden lg:flex lg:content-container justify-center">
				<Show
					when={
						reviewData.isSuccess &&
						reviewData?.data?.data?.reviews?.length > 0 &&
						import.meta.env.VITE_DRAFT_SITE === 'false' &&
						queryProduct.isSuccess &&
						complete()
					}
				>
					<ReviewsDisplay rating={reviewData.data?.data} />
				</Show>

				<Show
					when={
						!isServer &&
						draftReviewData.isSuccess &&
						(import.meta.env.VITE_DRAFT_SITE === 'true' || import.meta.env.VITE_DEMO_SITE === 'true') &&
						queryProduct.isSuccess &&
						complete()
					}
				>
					<div id="ratings"></div>
					<ReviewsDisplay rating={draftReviewData.data?.data} />
				</Show>
			</div>
			<Show when={displayContainerData.isSuccess && queryProduct.isSuccess && complete()}>
				<PreFooter data={displayContainerData} />
			</Show>
		</main>
	)
}
