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
			<div class="flex flex-col space-y-2 font-poppins">
				<A
					href={`/collections/${props.productInfo.collection?.id}`}
					class="text-sm text-gray-700"
				>
					{props.productInfo.collection?.title}
				</A>
				<div class="flex justify-between w-full lg:flex-col :items-start text-black bg-white">
					<h3 class="text-lg md:text-2xl font-semibold">{props.productInfo?.title}</h3>
					<div>
						<Show when={currentVariant()?.original_price}>
							{currentVariant()?.original_price === currentVariant()?.calculated_price ? (
								<div class="space-x-2">
									<span class="text-xl font-semibold ">{currencyFormat(Number(currentVariant()?.original_price), 'US')}</span>
								</div>
							) : (
								<div class="flex flex-col justify-center items-center">
									<span class="text-xl line-through font-semibold">
										{currencyFormat(Number(currentVariant()?.original_price), 'US')}
									</span>
									<span class="text-xl text-red-7 font-semibold ">
										{currencyFormat(Number(currentVariant()?.calculated_price), 'US')}
									</span>
									<span class="text-xs text-white font-semibold bg-red-700 rounded-lg flex justify-center uppercase w-15 ">
										on sale
									</span>
								</div>
							)}
						</Show>
					</div>
				</div>
				<Show when={props.productInfo?.options.length === 1}>
					<div class="grid grid-cols-2 gap-3 lg:my-8 lg:flex lg:flex-col lg:gap-y-6">
						<For each={props.productInfo?.options}>
							{option => {
								return (
									<div>
										<OptionSelect
											option={option}
											current={props.options}
											updateOptions={props.updateOptions}
											title={option.title}
										/>
									</div>
								)
							}}
						</For>
					</div>
				</Show>
				<Show when={props.productInfo?.options.length > 1}>
					<div class="grid grid-cols-2 flex-none gap-3 justify-self-start lg:my-8 lg:flex lg:flex-col lg:gap-y-6">
						<For each={props.productInfo?.options}>
							{option => {
								return (
									<div>
										<OptionSelectViable
											option={option}
											current={props.options}
											updateOptions={props.updateOptions}
											title={option.title}
											productInfo={props.productInfo}
										/>
									</div>
								)
							}}
						</For>
					</div>
				</Show>
				<div class="absolute sticky bottom-0">
					<button
						onClick={() => {
							console.log('ADD TO CART')
							addToCart()
						}}
						class="w-full uppercase flex items-center justify-center min-h-[50px] px-5 py-[10px] text-sm border transition-colors duration-200 disabled:opacity-50 text-white bg-gray-600 border-gray-600 hover:bg-white hover:text-gray-900 disabled:hover:bg-gray-900 disabled:hover:text-white"
					>
						Add to cart
					</button>
				</div>
				<div class="hidden">
					<span>description:</span>
					<p class="text-base">{props.productInfo?.description}</p>
				</div>
			</div>
		</Show>
	)
}

export const onlyUnique = (value: unknown, index: number, self: unknown[]) => self.indexOf(value) === index

type OptionSelectProps = {
	option: any
	current: any
	updateOptions: (option: Record<string, string>) => void
	title: string
}
//TODO: Need Hook to update the option selection
export function OptionSelect({ option, current, updateOptions, title }: OptionSelectProps) {
	const filteredOptions = option.values.map((v: any) => v.value).filter(onlyUnique)

	return (
		<Show when={option.values.length > 0}>
			<div class="flex flex-col gap-y-3">
				<span class="text-sm md:text-base font-semibold">Select {title}</span>
				<div class="grid grid-cols-3 justify-start lg:grid-cols-6 gap-1 md:gap-2">
					<For each={filteredOptions}>
						{v => {
							const isSelected = createMemo(() => current()[option.id] === v, [current()[option.id], v])
							return (
								<button
									onClick={() => {
										updateOptions({ [option.id]: v })
									}}
									class={clsx('border-gray-200 border text-xs h-[50px] w-16 transition-all duration-200', {
										'border-gray-5 text-gray-8': isSelected()
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

type OptionSelectViableProps = {
	option: any
	current: any
	updateOptions: (option: Record<string, string>) => void
	title: string
	productInfo: Product
}

export function OptionSelectViable({ option, current, updateOptions, title, productInfo }: OptionSelectViableProps) {
	const filteredOptions = option.values.map((v: any) => v.value).filter(onlyUnique)

	const isOptionViable = (value: string, selectedOptions: string[]) => {
		// If no options are selected yet, return true
		if (selectedOptions.length === 0) {
			console.log('selectedOptions', selectedOptions)
			return true
		}

		// Iterate through the options array inside each variant array
		for (const variant of productInfo.variants) {
			const variantOptions = variant.options.map((o: any) => o.value)

			// Check if the current option value exists in the variant options
			if (variantOptions.includes(value)) {
				console.log('variantOptions', variantOptions)
				// Check if all selected options are available in the variant options
				if (selectedOptions.every((selectedOption: string) => variantOptions.includes(selectedOption))) {
					return true
				}
			}
		}
		return false
	}

	function updateOption(newOption: Record<string, string>) {
		// Get the current options
		const currentOptions = current()

		// Check if the new option conflicts with any previously selected options
		const conflictingOptions = Object.entries(currentOptions).filter(([key, value]) => {
			if (key === Object.keys(newOption)[0]) return false // Ignore the new option itself

			// Check if the new option value exists in the same variant as the current option value
			for (const variant of productInfo.variants) {
				const variantOptions = variant.options.map((o: any) => o.value)
				if (variantOptions.includes(value) && variantOptions.includes(Object.values(newOption)[0])) {
					return false
				}
			}
			return true
		})

		// Reset the conflicting options
		const updatedOptions = { ...currentOptions, ...newOption }
		conflictingOptions.forEach(([key]) => {
			updatedOptions[key] = undefined
		})

		// Update the options
		updateOptions(updatedOptions)
	}

	return (
		<Show when={option.values.length > 0}>
			<div class="flex flex-col gap-y-1">
				<span class="text-sm md:text-base font-semibold">Select {title}</span>
				<div class=" grid grid-cols-3 gap-0.5 md:grid-cols-5 justify-start lg:grid-cols-6 md:gap-2">
					<For each={filteredOptions}>
						{v => {
							const isSelected = createMemo(() => current()[option.id] === v, [current()[option.id], v])
							const selectedOptions = createMemo<string[]>(() => {
								const currentObj = current()
								if (Object.keys(currentObj).length === 0) {
									return []
								}
								return Object.values(currentObj).filter(value => value !== undefined)
							})
							const viable = createMemo(() => isOptionViable(v, selectedOptions()), [current()])

							createEffect(() => {
								console.log(v, selectedOptions())
							})

							return (
								<button
									onClick={() => {
										updateOption({ [option.id]: v })
									}}
									class={clsx('border-gray-200 border text-xs h-8 transition-all duration-200', {
										'border-gray-5 text-gray-8': isSelected(),
										'bg-gray-200 text-gray-400 line-through ': !viable()
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
