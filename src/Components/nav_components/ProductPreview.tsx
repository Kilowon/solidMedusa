import { A } from 'solid-start'
import { ProductPreviewType } from '~/types/global'
import Thumbnail from '~/Components/common/Thumbnail'
import { currencyFormat } from '~/lib/helpers/currency'
import { Show, Suspense, createSignal } from 'solid-js'
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
						class="space-y-1 bg-transparent relative"
					>
						<Show when={props?.wish === true}>
							<div
								class="bg-transparent rounded-full p-1 absolute z-10 right-0"
								onClick={e => {
									e.stopPropagation()
									e.preventDefault()
									setFavoritesIcon(!favoritesIcon())
								}}
							>
								<div
									class={clsx(
										' w-4 h-4 lg:w-5 lg:h-5 ',
										favoritesIcon() === true && 'bg-blue-6 i-material-symbols-bookmark',
										favoritesIcon() === false && 'bg-gray-6 i-material-symbols-bookmark-outline'
									)}
								/>
							</div>
						</Show>
						<Thumbnail
							thumbnail={props.thumbnail}
							title={props.title}
							variant={primaryData?.data?.data?.thumbnail_ratio}
						/>
						<div class=" flex flex-col justify-end text-xs lg:text-base text-gray-600 font-500 space-y-1 min-h-[52px] lg:min-h-[68px]">
							<p class="text-xs lg:text-sm font-500 tracking-tight text-gray-6/80 text-balance">{props.title}</p>

							<div class="items-end flex sm:block space-x-1 sm:space-x-0">
								<Show when={props.variants?.[0]?.original_price === props.variants?.[0]?.calculated_price}>
									<div class="">
										{props.variants?.[0]?.original_price
											? currencyFormat(Number(props.variants?.[0]?.original_price), 'USD')
											: ''}
									</div>
								</Show>
								<Show when={props.variants?.[0]?.original_price !== props.variants?.[0]?.calculated_price}>
									<div class="line-through ">
										{props.variants?.[0]?.original_price
											? currencyFormat(Number(props.variants?.[0]?.original_price), 'USD')
											: ''}
									</div>
									<div class="flex sm:block space-x-1 sm:space-x-0">
										<div class=" text-red-7 ">
											{props.variants?.[0]?.calculated_price
												? currencyFormat(Number(props.variants?.[0]?.calculated_price), 'USD')
												: ''}
										</div>
										<span class="text-xs text-red-700 sm:text-white font-semibold sm:bg-red-700 rounded-lg flex justify-center items-center  uppercase max-w-10">
											sale
										</span>
									</div>
								</Show>
							</div>
						</div>
					</div>
				</A>
			</Show>
		</Suspense>
	)
}

export default ProductPreview
