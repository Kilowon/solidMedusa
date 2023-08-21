import ImageGallerySlidy from '~/Components/prod_tmpl_components/ImageGallerySlidy'
import ProductActions from '~/Components/prod_tmpl_components/ProductActions'
import { JSX, Show } from 'solid-js'
import { Product } from '~/types/models'
import { ReviewsDisplay } from './prod_tmpl_components/ProductActions'
import { createQuery } from '@tanstack/solid-query'

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
			const response = await fetch(`https://direct.shauns.cool/items/product/Product-01?fields=*,reviews.*`, {
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
			const response = await fetch(`https://direct.shauns.cool/items/product/Product-01?fields=*,reviews.*`, {
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
						<ImageGallerySlidy
							images={props.images}
							productInfo={props.productInfo}
							params={props.params}
						/>
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
					<Show when={draftReviewData.isSuccess && import.meta.env.VITE_DRAFT_SITE === 'true'}>
						<ReviewsDisplay rating={draftReviewData.data?.data} />
					</Show>
				</div>
			</main>
		</Show>
	)
}
