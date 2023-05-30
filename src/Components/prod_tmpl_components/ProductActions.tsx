import { JSX, For, Show, createEffect, createMemo, createSignal } from 'solid-js'
import { A } from 'solid-start'
import { Product } from '~/types/models'
import clsx from 'clsx'
import { useGlobalContext } from '~/Context/Providers'
import { useStore } from '~/Context/StoreContext'
import { currencyFormat } from '~/lib/helpers/currency'
interface CurrentVariant {
	id: string
	original_price?: string
	calculated_price?: string
}

export default function ProductActions(props: {
	productInfo: Product
	updateOptions: any
	options: any
	inStock: any
	variant: any
	useStore: any
}): JSX.Element {
	//const price = useProductPrice({ id: props.productInfo.id, variantId: variant()?.id })

	//const selectedPrice =
	/* useMemo(() => {
		const { variantPrice, cheapestPrice } = price

		return variantPrice || cheapestPrice || null
	}, [price]) */

	const { addToCart } = useStore()

	const [currentVariant, setCurrentVariant] = createSignal<CurrentVariant>()

	createEffect(() => {
		if (props.variant()?.id) {
			const variant = props.productInfo.variants.find(v => v.id === props.variant()?.id)
			setCurrentVariant(variant || props.productInfo.variants[0])
		} else {
			setCurrentVariant(props.productInfo.variants[0])
		}
	})

	createEffect(() => {
		console.log('current variant', currentVariant())
	})

	return (
		<Show when={props.productInfo}>
			<div class="flex flex-col gap-y-2 font-poppins">
				<A
					href={`/collections/${props.productInfo.collection?.id}`}
					class="text-sm text-gray-700"
				>
					{props.productInfo.collection?.title}
				</A>
				<h3 class="text-2xl font-semibold">{props.productInfo?.title}</h3>
				<div>
					<Show when={currentVariant()?.original_price}>
						{currentVariant()?.original_price === currentVariant()?.calculated_price ? (
							<div class="space-x-2">
								<span class="text-xl ">{currencyFormat(Number(currentVariant()?.original_price), 'US')}</span>
							</div>
						) : (
							<div class="flex flex-col">
								<span class="text-xl line-through">{currencyFormat(Number(currentVariant()?.original_price), 'US')}</span>
								<span class="text-xl text-red-7 ">{currencyFormat(Number(currentVariant()?.calculated_price), 'US')}</span>
								<span class="text-xs text-white font-semibold bg-red-700 rounded-lg flex justify-center uppercase max-w-14 ">
									sale
								</span>
							</div>
						)}
					</Show>
				</div>
				<div class="my-8 flex flex-col gap-y-6">
					<For each={props.productInfo?.options}>
						{option => {
							return (
								<div>
									<OptionSelect
										option={option}
										current={props.options}
										updateOption={props.updateOptions}
										title={option.title}
									/>
								</div>
							)
						}}
					</For>
				</div>
				<button
					onClick={() => {
						console.log('ADD TO CART')
						addToCart()
					}}
					class="w-full uppercase flex items-center justify-center min-h-[50px] px-5 py-[10px] text-sm border transition-colors duration-200 disabled:opacity-50 text-white bg-gray-600 border-gray-600 hover:bg-white hover:text-gray-900 disabled:hover:bg-gray-900 disabled:hover:text-white"
				>
					Add to cart
				</button>
				<span>description:</span>
				<p class="text-base">{props.productInfo?.description}</p>
			</div>
		</Show>
	)
}

export const onlyUnique = (value: unknown, index: number, self: unknown[]) => self.indexOf(value) === index

type OptionSelectProps = {
	option: any
	current: any
	updateOption: (option: Record<string, string>) => void
	title: string
}
//TODO: Need Hook to update the option selection
export function OptionSelect({ option, current, updateOption, title }: OptionSelectProps) {
	const filteredOptions = option.values.map((v: any) => v.value).filter(onlyUnique)

	return (
		<Show when={option.values.length > 0}>
			<div class="flex flex-col gap-y-3">
				<span class="text-base font-semibold">Select {title}</span>
				<div class="grid grid-cols-3 lg:grid-cols-6 gap-2">
					<For each={filteredOptions}>
						{v => {
							const isSelected = createMemo(() => current()[option.id] === v, [current()[option.id], v])
							return (
								<button
									onClick={() => {
										updateOption({ [option.id]: v })
									}}
									class={clsx('border-gray-200 border text-xs h-[50px] transition-all duration-200', {
										'bg-gray-600 text-white': isSelected()
									})}
								>
									{v}
								</button>
							)
						}}
					</For>
				</div>
			</div>
		</Show>
	)
}
