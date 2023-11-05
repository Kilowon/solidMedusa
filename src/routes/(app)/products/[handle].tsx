import { useGlobalContext } from '~/Context/Providers'
import { useParams, Title, Meta, useNavigate } from 'solid-start'
import { createEffect, Show, createSignal, onMount } from 'solid-js'
import ProductTemplate from '~/Components/ProductTemplate'
import { useStore } from '~/Context/StoreContext'
import { StoreProvider } from '~/Context/StoreContext'
import { createQuery } from '@tanstack/solid-query'

export default function Products() {
	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()
	const params = useParams()
	const navigate = useNavigate()
	const [currentParams, setCurrentParams] = createSignal(params.handle)

	const [twitterImage, setTwitterImage] = createSignal('')
	const [twitterTitle, setTwitterTitle] = createSignal('')
	const [twitterDescription, setTwitterDescription] = createSignal('')

	//TODO: Popping after redirect to another product page or from catagory page and randomly on refresh

	const queryProduct = createQuery(() => ({
		queryKey: ['Product-Page', params.handle],
		queryFn: async function () {
			const product = await medusa?.products.list({
				handle: params.handle,
				cart_id: queryCart.data?.cart.id
			})
			return product
		},
		cacheTime: 25 * 60 * 1000,
		enabled: false
	}))

	onMount(() => {
		console.log(queryProduct?.data?.products[0]?.handle, params.handle)
		if (queryProduct?.data?.products[0]?.handle !== params.handle) {
			queryProduct.refetch()
		}
	})

	/* 	//This prevents a race condition where the product is not loaded before the page is rendered
	createEffect(() => {
		if (queryProduct?.data?.products[0]?.handle === params.handle) {
			setTimeout(() => {
				setCurrentParams(params.handle)
			}, 50)
		}
	}) */

	createEffect(() => {
		if (queryProduct?.data?.products.length === 0) {
			navigate('/404')
		}
	})

	//TODO: need to SSR this data for cards to work

	/* 	const primaryData = createQuery(() => ({
		queryKey: ['primary_data'],
		queryFn: async function () {
			const response = await fetch(`${import.meta.env.VITE_DIRECTUS_URL}/items/Primary`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			})
			const data = await response.json()
			return data
		},
		cacheTime: 15 * 60 * 1000,
		retry: 0,
		enabled: false
	}))

	const socialData = createQuery(() => ({
		queryKey: ['social_card_data', params.handle],
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
			return data
		},
		retry: 0,
		enabled: false
	})) */

	createEffect(() => {
		if (queryProduct?.data?.products[0]?.handle !== params.handle) {
			queryProduct.refetch()
		}
	})

	/* createEffect(() => {
		if (queryProduct.isSuccess) {
			socialData.refetch()
		}
	})

	createEffect(() => {
		if (socialData.isSuccess) {
			setTwitterImage(socialData?.data?.data?.twitter_image)
			setTwitterTitle(socialData?.data?.data?.twitter_title)
			setTwitterDescription(socialData?.data?.data?.twitter_description)
		}
	}) */

	return (
		<div>
			<Title>{queryProduct?.data?.products[0]?.title || ''}</Title>
			<Meta
				name="description"
				content={queryProduct?.data?.products[0]?.description || ''}
			/>
			<Meta
				name="og:title"
				content={queryProduct?.data?.products[0]?.title || ''}
			/>
			<Meta
				name="image"
				content={queryProduct?.data?.products[0]?.thumbnail || ''}
			/>
			{/* <Meta
				name="twitter:title"
				content={socialData?.data?.data?.twitter_title || queryProduct?.data?.products[0]?.title || ''}
			/>
			<Meta
				name="twitter:description"
				content={socialData?.data?.data?.twitter_description || queryProduct?.data?.products[0]?.description || ''}
			/>
			<Meta
				name="twitter:site"
				content={primaryData?.data?.data?.twitter_card_site || ''}
			/>{' '}
			<Meta
				name="twitter:domain"
				content={primaryData?.data?.data?.twitter_card_domain || ''}
			/>
			<Meta
				name="twitter:image"
				content={
					socialData.isSuccess && socialData?.data?.data?.twitter_image
						? `${import.meta.env.VITE_DIRECTUS_URL}/assets/${twitterImage()}`
						: `${import.meta.env.VITE_DIRECTUS_URL}/assets/${primaryData?.data?.data?.twitter_fallback_image}`
				}
			/>
			<Meta
				name="twitter:summary"
				content={socialData?.data?.data?.twitter_description || queryProduct?.data?.products[0]?.description || ''}
			/>
			<Meta
				name="twitter:card"
				content={'summary_large_image'}
			/> */}
			<main class="min-h-[100vh]">
				<StoreProvider product={queryProduct?.data?.products[0]}>
					<ProductTemplate
						updateOptions={useStore().updateOptions}
						options={useStore().options}
						inStock={useStore().inStock}
						variant={useStore().variant}
						useStore={useStore}
					/>
				</StoreProvider>
			</main>
		</div>
	)
}
