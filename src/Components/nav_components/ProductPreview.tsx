import { A } from 'solid-start'
import { ProductPreviewType } from '~/types/global'
import Thumbnail from '~/Components/common/Thumbnail'
import { currencyFormat } from '~/lib/helpers/currency'
import { Show, onMount, createSignal, For } from 'solid-js'
import clsx from 'clsx'
import { createQuery } from '@tanstack/solid-query'

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
	component_type: 'extended' | 'standard'
}

const ProductPreview = (props: ProductPreviewProps) => {
	const primaryData = createQuery(() => ({
		queryKey: ['primary_data'],
		queryFn: async function () {
			const response = await fetch(`https://direct.shauns.cool/items/Primary`, {
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
							'flex flex-col justify-between text-xs lg:text-base text-text_2 space-y-1 relative',
							bgVariant() === 'default' && '',
							bgVariant() === 'type_1' && 'rounded-md bg-surface overflow-hidden',
							bgVariant() === 'type_2' && 'rounded-b-md bg-surface overflow-hidden border border-normal_4 ',
							bgVariant() === 'type_3' && 'bg-normal_1 rounded-b-md border border-normal_4 ',

							bgVariant() === 'type_4' && 'bg-normal_1 rounded-b-md border border-normal_4 shadow-sm shadow-text_5/50',
							bgVariant() === 'type_5' &&
								'rounded-b-md bg-surface overflow-hidden border border-normal_4 shadow-sm shadow-text_5/50',

							bgVariant() === 'type_6' &&
								'rounded-b-md bg-surface overflow-hidden border border-normal_4 shadow-md shadow-text_5/50 '
						)}
					>
						<div class="flex justify-between pt-0.5 px-1 relative ">
							<div class="flex space-x-1 text-xs xl:text-base font-500 tracking-tight ">
								<Show when={props.variants?.[0]?.original_price === props.variants?.[0]?.calculated_price}>
									<div class="">
										{props.variants?.[0]?.original_price
											? currencyFormat(Number(props.variants?.[0]?.original_price), 'USD')
											: ''}
									</div>
								</Show>
								<Show when={props.variants?.[0]?.original_price !== props.variants?.[0]?.calculated_price}>
									<div class="line-through text-[10px] absolute top-1 left-16">
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
									<h5 class="text-xs xl:text-sm font-500 tracking-tight text-text_3  line-clamp-2 text-ellipsis text-clip">
										{props.title}
									</h5>
									<p class="hidden">{props.description}</p>
									<Show when={props.component_type === 'extended'}>
										<h6 class="text-xs text-text_4 line-clamp-2 text-ellipsis text-clip">{props.subtitle}</h6>
									</Show>
								</div>
							</div>
						</div>
						<Show when={props.component_type === 'extended' && mouseOver() === true}>
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
