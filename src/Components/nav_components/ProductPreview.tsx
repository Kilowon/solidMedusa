import { A } from 'solid-start'
import { ProductPreviewType } from '~/types/global'
import Thumbnail from '~/Components/common/Thumbnail'
import { currencyFormat } from '~/lib/helpers/currency'
import { Show, onMount, createSignal, For, createEffect } from 'solid-js'
import clsx from 'clsx'
import { createQuery } from '@tanstack/solid-query'
import { create } from 'domain'

interface ProductPreviewProps extends ProductPreviewType {
	handleClick: () => void
	variants: [
		{
			original_price: string
			calculated_price: string
		}
	]
	wish: boolean
	tag: boolean
	tags: string[]
	subtitle: string
	description: string
	component_type: 'type_1' | 'type_2' | 'type_3' | 'type_4' | 'type_5' | 'type_6'
	extended_type: 'extended' | 'default'
}

const ProductPreview = (props: ProductPreviewProps) => {
	const primaryData = createQuery(() => ({
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

	const [favoritesIcon, setFavoritesIcon] = createSignal(false)

	const [bgVariant, setBgVariant] = createSignal<any>('default')
	const [bgVariantImage, setBgVariantImage] = createSignal<any>('default')
	const [mouseOver, setMouseOver] = createSignal(false)

	onMount(() => {
		if (primaryData.isSuccess) {
			if (import.meta.env.VITE_DRAFT_SITE === 'false') {
				setBgVariant(primaryData?.data?.data?.product_card_variants)
				setBgVariantImage(primaryData?.data?.data?.product_card_image_variant)
			}
			if (import.meta.env.VITE_DRAFT_SITE === 'true') {
				setBgVariant(primaryData?.data?.data?.draft_site_card_variant)
				setBgVariantImage(primaryData?.data?.data?.draft_site_card_image_variant)
			}
		}
	})

	createEffect(() => {
		console.log('type', props.component_type)
	})
	createEffect(() => {
		console.log('type', props.extended_type)
	})

	return (
		<Show when={props.title}>
			<A href={`/products/${props.handle}`}>
				<div
					onClick={props.handleClick}
					onMouseOver={() => setMouseOver(true)}
					onMouseOut={() => setMouseOver(false)}
					class="space-y-1 bg-transparent"
				>
					<Thumbnail
						thumbnail={props.thumbnail}
						title={props.title}
						variant={primaryData?.data?.data?.thumbnail_ratio}
						bgVariant={bgVariantImage()}
					/>
					<div
						class={clsx(
							'flex flex-col justify-between  text-text_2 space-y-1 relative',
							props.component_type === 'type_1' && 'text-xs lg:text-base',
							props.component_type === 'type_2' && 'text-base',
							props.component_type === 'type_3' && '',
							props.component_type === 'type_4' && '',
							props.component_type === 'type_5' && '',
							props.component_type === 'type_6' && ''
						)}
					>
						<div class="flex justify-between pt-0.5 px-1 relative ">
							<div
								class={clsx(
									'flex space-x-1  font-500 tracking-tight',
									props.component_type === 'type_1' && 'text-xs xl:text-base',
									props.component_type === 'type_2' && 'text-base',
									props.component_type === 'type_3' && '',
									props.component_type === 'type_4' && '',
									props.component_type === 'type_5' && '',
									props.component_type === 'type_6' && ''
								)}
							>
								<Show when={props.variants?.[0]?.original_price === props.variants?.[0]?.calculated_price}>
									<div class="">
										{props.variants?.[0]?.original_price
											? currencyFormat(Number(props.variants?.[0]?.original_price), 'USD')
											: ''}
									</div>
								</Show>
								<Show when={props.variants?.[0]?.original_price !== props.variants?.[0]?.calculated_price}>
									<div class="line-through text-[10px] ">
										{props.variants?.[0]?.original_price
											? currencyFormat(Number(props.variants?.[0]?.original_price), 'USD')
											: ''}
									</div>
									<div class="flex justify-between ">
										<div class=" text-accent_3  ">
											{props.variants?.[0]?.calculated_price
												? currencyFormat(Number(props.variants?.[0]?.calculated_price), 'USD')
												: ''}
										</div>
									</div>
								</Show>
							</div>
							<Show when={props.tag === true}>
								<ul class="flex space-x-0.5 ml-0.5 w-full justify-end">
									<Show when={props.variants?.[0]?.original_price !== props.variants?.[0]?.calculated_price}>
										<div class="text-xs text-accenttext_1 bg-accent_3 rounded-sm flex justify-center items-center  uppercase  text-accenttext_1  rounded-sm font-400 max-h-4 lg:max-h-5 p-0.5 lg:p-1 tracking-tight">
											sale
										</div>
									</Show>
									<Show when={props?.tags.length}>
										<For each={props?.tags}>
											{(tag: any, index) => {
												if (index() < 1)
													return (
														<div class="capitalize flex justify-center items-center bg-accent_1  text-accenttext_1  rounded-sm text-xs font-400 max-h-4 lg:max-h-5 p-0.5 lg:p-1 tracking-tight">
															{tag.value}
														</div>
													)
											}}
										</For>
									</Show>
								</ul>
							</Show>
						</div>
						<div class="min-h-2.5rem lg:min-h-3rem  pt-0.5 px-1 ">
							<div class="flex">
								<Show when={props?.wish === true}>
									<div
										class="bg-transparent rounded-full flex space-x-0.5 cursor-pointer  "
										onClick={e => {
											e.stopPropagation()
											e.preventDefault()
											setFavoritesIcon(!favoritesIcon())
										}}
									>
										<div
											class={clsx(
												' w-4 h-4 lg:w-5 lg:h-5 ',
												favoritesIcon() === true && 'bg-accent_1 i-material-symbols-bookmark',
												favoritesIcon() === false && 'bg-text_4 i-material-symbols-bookmark-outline'
											)}
										/>
									</div>
								</Show>
								<div class="space-y-1">
									<h5
										class={clsx(
											'font-500 tracking-tight text-text_3  line-clamp-2 text-ellipsis text-clip',
											props.component_type === 'type_1' && 'text-xs xl:text-sm',
											props.component_type === 'type_2' && 'text-sm',
											props.component_type === 'type_3' && '',
											props.component_type === 'type_4' && '',
											props.component_type === 'type_5' && '',
											props.component_type === 'type_6' && ''
										)}
									>
										{props.title}
									</h5>
									<p class="hidden">{props.description}</p>
									<Show when={props.extended_type === 'extended'}>
										<h6
											class={clsx(
												' text-text_4 line-clamp-2 text-ellipsis text-clip',
												props.component_type === 'type_1' && 'text-xs',
												props.component_type === 'type_2' && 'text-xs',
												props.component_type === 'type_3' && '',
												props.component_type === 'type_4' && '',
												props.component_type === 'type_5' && '',
												props.component_type === 'type_6' && ''
											)}
										>
											{props.subtitle}
										</h6>
									</Show>
								</div>
							</div>
						</div>
						<Show when={props.extended_type === 'extended' && mouseOver() === true}>
							<div class="w-full flex justify-start h-3.5 absolute bottom--4 z-30">
								<button class="text-xs h-1 bg-accent_4 text-accenttext_1 rounded-1 flex items-center w-full"></button>
							</div>
						</Show>
					</div>
				</div>
			</A>
		</Show>
	)
}

export default ProductPreview
