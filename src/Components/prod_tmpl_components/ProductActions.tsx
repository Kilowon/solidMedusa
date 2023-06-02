import { JSX, For, Show, createEffect, createMemo, createSignal } from 'solid-js'
import { Product } from '~/types/models'
import clsx from 'clsx'
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

	//TODO: The current server is out of sync with the develepment server and lacks the purchasable field
	// I am disabling the purchasable field for now
	function isProductPurchasable(): string {
		if (props.variant()) {
			const variant = props.productInfo.variants.find(v => v.id === props.variant().id)
			if (variant) {
				return 'valid'
				//return variant.purchasable ? 'valid' : 'out-of-stock'
			}
		}
		return 'invalid'
	}

	createEffect(() => {
		if (props.variant()?.id) {
			const variant = props.productInfo.variants.find(v => v.id === props.variant()?.id)
			setCurrentVariant(variant || props.productInfo.variants[0])
		} else {
			setCurrentVariant(props.productInfo.variants[0])
		}
	})

	return (
		<Show when={props.productInfo}>
			<div class="flex flex-col space-y-3 font-poppins mx-2">
				{/* <A
					href={`/collections/${props.productInfo.collection?.id}`}
					class="text-sm text-gray-700"
				>
					{props.productInfo.collection?.title}
				</A> */}
				<div class="flex justify-between w-full lg:flex-col items-start text-black bg-white">
					<h3 class=" md:text-2xl font-semibold">{props.productInfo?.title}</h3>
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
					<div class="gap-3 justify-self-start lg:my-8 lg:flex lg:flex-col lg:gap-y-6 space-y-2">
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
				<div>
					<button
						onClick={() => {
							addToCart()
						}}
						disabled={isProductPurchasable() === 'invalid' || isProductPurchasable() === 'out-of-stock'}
						class={clsx(
							'w-full uppercase flex items-center justify-center min-h-[50px] px-5 py-[10px] text-sm border transition-colors duration-200 disabled:opacity-50disabled:hover:bg-gray-900 disabled:hover:text-white',
							isProductPurchasable() === 'valid' && 'text-white bg-green-600 border-green-600 hover:bg-green-400',
							isProductPurchasable() === 'invalid' && 'text-white bg-gray-600 border-gray-600',
							isProductPurchasable() === 'out-of-stock' && 'text-white bg-gray-600 border-gray-600'
						)}
					>
						{isProductPurchasable() === 'valid' ? 'Add to cart' : ''}
						{isProductPurchasable() === 'invalid' ? 'Select Options' : ''}
						{isProductPurchasable() === 'out-of-stock' ? 'Out of Stock' : ''}
					</button>
				</div>
				<div>
					<ProductInformationTabs productInfo={props.productInfo} />
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
			<div class="flex flex-col gap-y-1">
				<span class="text-sm md:text-base font-semibold">Select {title}</span>
				<div class="flex space-x-1">
					<For each={filteredOptions}>
						{v => {
							const isSelected = createMemo(() => current()[option.id] === v, [current()[option.id], v])
							return (
								<button
									onClick={() => {
										updateOptions({ [option.id]: v })
									}}
									class={clsx('border-gray-200 border text-xs h-8 min-w-12 rounded-sm max-w-18 transition-all duration-200', {
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

//TODO: Needs to be more explicit with 'not-viable'
export function OptionSelectViable({ option, current, updateOptions, title, productInfo }: OptionSelectViableProps) {
	const filteredOptions = option.values.map((v: any) => v.value).filter(onlyUnique)

	const isOptionViable = (value: string, selectedOptions: string[]): string => {
		// If no options are selected yet, return 'viable'
		if (selectedOptions.length === 0) {
			return 'viable'
		}

		let couldBeViable = false

		// Iterate through the options array inside each variant array
		for (const variant of productInfo.variants) {
			const variantOptions = variant.options.map((o: any) => o.value)

			// Check if the current option value exists in the variant options
			if (variantOptions.includes(value)) {
				// Check if all selected options are available in the variant options
				if (selectedOptions.every((selectedOption: string) => variantOptions.includes(selectedOption))) {
					return 'viable'
				} else {
					couldBeViable = true
				}
			}
		}

		// Return 'could-viable' if the option is not viable but could be selected based on other selections
		return couldBeViable ? 'could-viable' : 'not-viable'
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
				<div class="flex space-x-1">
					<For each={filteredOptions}>
						{v => {
							const isSelected = createMemo(() => current()[option.id] === v, [current()[option.id], v])
							//@ts-ignore
							const selectedOptions = createMemo<string[]>(() => {
								const currentObj = current()
								if (Object.keys(currentObj).length === 0) {
									return []
								}
								return Object.values(currentObj).filter(value => value !== undefined)
							})
							const viable = createMemo(() => isOptionViable(v, selectedOptions()), [current()])

							return (
								<button
									onClick={() => {
										updateOption({ [option.id]: v })
									}}
									class={clsx('border-gray-200 border text-xs h-8 min-w-12 rounded-sm max-w-18 transition-all duration-200', {
										'border-gray-5 text-gray-8': isSelected(),
										'bg-gray-200 text-gray-400 line-through': viable() === 'not-viable',
										'bg-gray-200 text-gray-400 ': viable() === 'could-viable'
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

export function ProductInformationTabs(props: { productInfo: Product }) {
	const [activeTab, setActiveTab] = createSignal({
		description: 'active',
		info: 'inactive',
		shipping: 'inactive'
	})

	return (
		<div>
			<div class="mb-4 border-b border-gray-200 dark:border-gray-700">
				<ul
					class="flex -mb-px text-xs font-medium text-center space-x-0.5 "
					id="myTab"
					data-tabs-toggle="#myTabContent"
					role="tablist"
				>
					<li
						class=""
						role="presentation"
					>
						<button
							class={clsx(
								'inline-block p-1 border-b-2 rounded-t-lg h-full',
								activeTab().description === 'active' &&
									' border-gray-600 text-gray-600 dark:border-gray-300 dark:text-gray-300',
								activeTab().description === 'inactive' && 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
							)}
							id="profile-tab"
							data-tabs-target="#profile"
							type="button"
							role="tab"
							aria-controls="profile"
							aria-selected="false"
							onClick={() => setActiveTab({ description: 'active', info: 'inactive', shipping: 'inactive' })}
						>
							<div class="flex flex-col justify-center items-center ">
								<div class="i-material-symbols-description-outline text-lg" />
								Description
							</div>
						</button>
					</li>
					<li
						class=""
						role="presentation"
					>
						<button
							class={clsx(
								'inline-block p-1 border-b-2 rounded-t-lg h-full',
								activeTab().info === 'active' && ' border-gray-600 text-gray-600 dark:border-gray-300 dark:text-gray-300',
								activeTab().info === 'inactive' && 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
							)}
							id="dashboard-tab"
							data-tabs-target="#dashboard"
							type="button"
							role="tab"
							aria-controls="dashboard"
							aria-selected="false"
							onClick={() => setActiveTab({ description: 'inactive', info: 'active', shipping: 'inactive' })}
						>
							<div class="flex flex-col justify-center items-center ">
								<div class="i-carbon-product text-lg bg-gray-7" />
								Product Information
							</div>
						</button>
					</li>
					<li
						class=""
						role="presentation"
					>
						<button
							class={clsx(
								'inline-block p-1 border-b-2 rounded-t-lg h-full',
								activeTab().shipping === 'active' && ' border-gray-600 text-gray-600 dark:border-gray-300 dark:text-gray-300',
								activeTab().shipping === 'inactive' && 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
							)}
							id="settings-tab"
							data-tabs-target="#settings"
							type="button"
							role="tab"
							aria-controls="settings"
							aria-selected="false"
							onClick={() => setActiveTab({ description: 'inactive', info: 'inactive', shipping: 'active' })}
						>
							{' '}
							<div class="flex flex-col justify-center items-center ">
								<div class="i-ph-truck text-lg text-gray-7" />
								Shipping & Returns
							</div>
						</button>
					</li>
				</ul>
			</div>
			<div id="myTabContent">
				<div
					class={clsx(
						'p-4 rounded-lg bg-gray-50 dark:bg-gray-800',
						activeTab().description === 'active' && '',
						activeTab().description === 'inactive' && 'hidden'
					)}
					id="profile"
					role="tabpanel"
					aria-labelledby="profile-tab"
				>
					<p class=" mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase whitespace-break-spaces first-letter:text-xl first-letter:font-bold  dark:first-letter:text-gray-100">
						{props.productInfo.description}
					</p>
				</div>
				<div
					class={clsx(
						'p-4 rounded-lg bg-gray-50 dark:bg-gray-800',
						activeTab().info === 'active' && '',
						activeTab().info === 'inactive' && 'hidden'
					)}
					id="dashboard"
					role="tabpanel"
					aria-labelledby="dashboard-tab"
				>
					<p class="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-5xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
						Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data
						from other software development tools, so your IT support and operations teams have richer contextual information
						to rapidly respond to requests, incidents, and changes.
					</p>
					<p class="text-gray-500 dark:text-gray-400">
						Deliver great service experiences fast - without the complexity of traditional ITSM solutions.Accelerate critical
						development work, eliminate toil, and deploy changes with ease, with a complete audit trail for every change.
					</p>
				</div>
				<div
					class={clsx(
						'p-4 rounded-lg bg-gray-50 dark:bg-gray-800',
						activeTab().shipping === 'active' && '',
						activeTab().shipping === 'inactive' && 'hidden'
					)}
					id="settings"
					role="tabpanel"
					aria-labelledby="settings-tab"
				>
					<p class="text-sm text-gray-500 dark:text-gray-400">
						This is some placeholder content the{' '}
						<strong class="font-medium text-gray-800 dark:text-white">Settings tab's associated content</strong>. Clicking
						another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the
						content visibility and styling.
					</p>
				</div>
			</div>
		</div>
	)
}
