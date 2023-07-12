import { A } from 'solid-start'
import { ProductPreviewType } from '~/types/global'
import Thumbnail from '~/Components/common/Thumbnail'
import { currencyFormat } from '~/lib/helpers/currency'
import { Show, Suspense, createSignal, For } from 'solid-js'
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
	return (
		<Suspense>
			<Show when={props.title}>
				<A href={`/products/${props.handle}`}>
					<div
						onClick={props.handleClick}
						class="space-y-1 bg-transparent"
					>
						<Thumbnail
							thumbnail={props.thumbnail}
							title={props.title}
							variant={primaryData?.data?.data?.thumbnail_ratio}
						/>
						<div class=" flex flex-col justify-between text-xs lg:text-base text-text_2 space-y-1 ">
							<div class="flex justify-between">
								<div class="flex space-x-1 text-xs xl:text-base font-500 tracking-tight relative">
									<Show when={props.variants?.[0]?.original_price === props.variants?.[0]?.calculated_price}>
										<div class="">
											{props.variants?.[0]?.original_price
												? currencyFormat(Number(props.variants?.[0]?.original_price), 'USD')
												: ''}
										</div>
									</Show>
									<Show when={props.variants?.[0]?.original_price !== props.variants?.[0]?.calculated_price}>
										<div class="line-through text-[10px] absolute top--4 left-1">
											{props.variants?.[0]?.original_price
												? currencyFormat(Number(props.variants?.[0]?.original_price), 'USD')
												: ''}
										</div>
										<div class="flex justify-between ">
											<div class=" text-accent_3 ">
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
							<div class="flex space-x-2">
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
												favoritesIcon() === false && 'bg-text_2 i-material-symbols-bookmark-outline'
											)}
										/>
									</div>
								</Show>
								<p class="text-xs xl:text-sm font-500 tracking-tight text-text_3 text-balance">{props.title}</p>
							</div>
						</div>
					</div>
				</A>
			</Show>
		</Suspense>
	)
}

export default ProductPreview
