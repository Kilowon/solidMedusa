import ImageGallerySlidy from '~/Components/prod_tmpl_components/ImageGallerySlidy'
import ProductActions from '~/Components/prod_tmpl_components/ProductActions'
import { JSX, Show } from 'solid-js'
import { Product } from '~/types/models'
import { ReviewsDisplay } from './prod_tmpl_components/ProductActions'
import { createQuery } from '@tanstack/solid-query'
import DisplayContainer from './layout/DisplayContainer'
import PreFooter from './layout/PreFooter'
import { ErrorBoundary } from 'solid-start'

export default function ProductTemplate(props: {
	images: { url: string; id: string }[] | undefined
	productInfo: Product
	params: any
	updateOptions: any
	options: any
	inStock: any
	variant: any
	useStore: any
}): JSX.Element {
	const reviewData = createQuery(() => ({
		queryKey: ['review_data', props.productInfo?.title],
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
		enabled: false
	}))
	//TODO: make ReviewDisplay Show on width to prevent data from being fetched on mobile

	const draftReviewData = createQuery(() => ({
		queryKey: ['draft_review_data', props.productInfo?.title],
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
		enabled: true
	}))

	const displayContainerData = createQuery(() => ({
		queryKey: ['display_container_data', props.productInfo?.title],
		queryFn: async function () {
			const response = await fetch(
				`${import.meta.env.VITE_DIRECTUS_URL}/items/product/${props.productInfo?.id}?fields=*.item.*.*.*`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					}
				}
			)
			const data = await response.json()
			return data
		},
		retry: 0
	}))

	return (
		<Show
			when={
				props.productInfo &&
				props.images &&
				props.inStock &&
				props.options &&
				props.params &&
				props.updateOptions &&
				props.useStore &&
				props.variant
			}
		>
			<main>
				<div class="sm:mt-12 lg:flex lg:content-container lg:mt-20 ">
					<div class="md:flex md:flex-col md:gap-y-8 md:w-full">
						<ErrorBoundary>
							<ImageGallerySlidy
								images={props.images}
								productInfo={props.productInfo}
								params={props.params}
							/>
						</ErrorBoundary>
					</div>
					<div class="">
						<div class="flex flex-col gap-y-12 lg:max-w-[500px] mx-auto">
							<div>
								<ProductActions
									productInfo={props.productInfo}
									updateOptions={props.updateOptions}
									options={props.options}
									inStock={props.inStock}
									variant={props.variant}
									useStore={props.useStore}
									params={props.params}
								/>
							</div>
						</div>
					</div>
				</div>
				<Show when={displayContainerData.isSuccess}>
					<DisplayContainer data={displayContainerData} />
				</Show>
				<div class="hidden lg:flex lg:content-container justify-center">
					<Show
						when={
							reviewData.isSuccess &&
							reviewData?.data?.data?.reviews?.length > 0 &&
							import.meta.env.VITE_DRAFT_SITE === 'false'
						}
					>
						<ReviewsDisplay rating={reviewData.data?.data} />
					</Show>

					<Show
						when={
							draftReviewData.isSuccess &&
							(import.meta.env.VITE_DRAFT_SITE === 'true' || import.meta.env.VITE_DEMO_SITE === 'true')
						}
					>
						<ReviewsDisplay rating={draftReviewData.data?.data} />
					</Show>
				</div>
				<Show when={displayContainerData.isSuccess}>
					<PreFooter data={displayContainerData} />
				</Show>{' '}
			</main>
		</Show>
	)
}
