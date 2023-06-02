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
	const [rating, setRating] = createSignal(4.5)

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
			<div class="flex flex-col space-y-4 font-poppins mx-2">
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
				<div class="flex items-center space-x-2">
					<StarIconRequest rating={rating()} />

					<div class="text-gray-500 dark:text-gray-400">|</div>

					<div class="text-gray-500 dark:text-gray-400">45 reviews</div>
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
				<div>
					<CustomerOverallReviews rating={rating} />
				</div>
				<div class="space-y-3">
					<CustomerIndividualReviews
						review={`Stained with ink. I received item opened package and reciept was folded on top of sweatshirt ink faced down. Item didn't come in a bag so freshly printed receipt was laid on top of sweatshirt. Please package these better. ow I have to make a trip to thr store to return.`}
						rating={5}
						name={'Shane'}
						date="July 20, 2021"
						title={'This is Cool'}
					/>
					<CustomerIndividualReviews
						review={
							'I needed a new hoodie and was excited to see dark green color option. Green is my favorite color and it is so hard to find a dark green top anywhere. This hoodie is soft and washed up well. 50 % cotton and 50% polyester. Nice hand size front pocket.'
						}
						rating={5}
						name={'CoffeeDiva62'}
						date="July 20, 2022"
						title={'Beautiful Forest Green Hoodie'}
					/>
					<CustomerIndividualReviews
						review={'Coach my twins basketball needed hoodie that match their uniform, this one was perfect.'}
						rating={2}
						name={'LADYV40'}
						date="2/2/2014"
						title={'Great Hoodie For The Weather'}
					/>
					<CustomerIndividualReviews
						review={'It’s really soft and cute highly recommend'}
						rating={5}
						name={'Abby'}
						date="July 20, 2021"
						title={'Great product!'}
					/>
					<CustomerIndividualReviews
						review={
							'Quaility is good but color is way off I got a highlighter orange color instead of what I ordered . Didn’t even take hoodie out of package because I’ll be returning asap'
						}
						rating={3}
						name={'Bob'}
						date="10/15/2022"
						title={'Color wayyy off'}
					/>
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
		description: 'inactive',
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
							id="description-tab"
							data-tabs-target="#description"
							type="button"
							role="tab"
							aria-controls="description"
							aria-selected="false"
							onClick={() => {
								if (activeTab().description === 'inactive') {
									setActiveTab({ description: 'active', info: 'inactive', shipping: 'inactive' })
									return
								}
								if (activeTab().description === 'active') {
									setActiveTab({ description: 'inactive', info: 'inactive', shipping: 'inactive' })
								}
							}}
						>
							<div class="flex flex-col justify-center items-center ">
								<div class="i-material-symbols-description-outline text-lg text-gray-6 " />
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
							id="info-tab"
							data-tabs-target="#info"
							type="button"
							role="tab"
							aria-controls="info"
							aria-selected="false"
							onClick={() => {
								if (activeTab().info === 'inactive') {
									setActiveTab({ description: 'inactive', info: 'active', shipping: 'inactive' })
									return
								}
								if (activeTab().info === 'active') {
									setActiveTab({ description: 'inactive', info: 'inactive', shipping: 'inactive' })
								}
							}}
						>
							<div class="flex flex-col justify-center items-center ">
								<div class="i-carbon-product text-lg bg-gray-6" />
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
							id="shipping-tab"
							data-tabs-target="#shipping"
							type="button"
							role="tab"
							aria-controls="shipping"
							aria-selected="false"
							onClick={() => {
								if (activeTab().shipping === 'inactive') {
									setActiveTab({ description: 'inactive', info: 'inactive', shipping: 'active' })
									return
								}
								if (activeTab().shipping === 'active') {
									setActiveTab({ description: 'inactive', info: 'inactive', shipping: 'inactive' })
								}
							}}
						>
							{' '}
							<div class="flex flex-col justify-center items-center ">
								<div class="i-ph-truck text-lg text-gray-6" />
								Shipping & Returns
							</div>
						</button>
					</li>
				</ul>
			</div>
			<div class="text-sm">
				<div
					class={clsx(
						'p-4 rounded-lg bg-gray-50 dark:bg-gray-800',
						activeTab().description === 'active' && '',
						activeTab().description === 'inactive' && 'hidden'
					)}
					id="description"
					role="tabpanel"
					aria-labelledby="description-tab"
				>
					<p class=" mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase whitespace-break-spaces first-letter:text-xl first-letter:font-bold  dark:first-letter:text-gray-100">
						{props.productInfo.description}
					</p>
				</div>
				<div
					class={clsx(
						'p-4 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-6',
						activeTab().info === 'active' && '',
						activeTab().info === 'inactive' && 'hidden'
					)}
					id="info"
					role="tabpanel"
					aria-labelledby="info-tab"
				>
					<div>
						{props.productInfo?.weight && (
							<div class="">
								<div class="text-gray-500 dark:text-gray-400 flex space-x-2">
									<div class="i-mdi-fabric text-2xl" />
									<div>Material</div>
								</div>

								<div class="text-gray-600 dark:text-gray-300">{props.productInfo?.material} </div>
							</div>
						)}
					</div>

					<div>
						{props.productInfo?.weight && (
							<div class="">
								<div class="text-gray-500 dark:text-gray-400 flex space-x-2">
									<div class="i-mdi-weight-pound text-2xl" />
									<div>Weight</div>
								</div>

								<div class="text-gray-600 dark:text-gray-300">{(props.productInfo?.weight / 453.592).toFixed(2)} lbs</div>
							</div>
						)}
					</div>
					<div class="space-y-1">
						<div class="text-gray-500 dark:text-gray-400 flex space-x-2">
							<div class="i-radix-icons-dimensions text-2xl" />
							<div>Dimensions</div>
						</div>
						<div class="flex justify-between">
							{props.productInfo?.length && (
								<div>
									<div class="text-gray-500 dark:text-gray-400">Length</div>
									<div class="text-gray-600 dark:text-gray-300">{(props.productInfo?.length / 25.4).toFixed(2)} in</div>
								</div>
							)}
							{props.productInfo?.width && (
								<div>
									<div class="text-gray-500 dark:text-gray-400">Width</div>
									<div class="text-gray-600 dark:text-gray-300">{(props.productInfo?.width / 25.4).toFixed(2)} in</div>
								</div>
							)}
							{props.productInfo?.height && (
								<div>
									<div class="text-gray-500 dark:text-gray-400">Height</div>
									<div class="text-gray-600 dark:text-gray-300">{(props.productInfo?.height / 25.4).toFixed(2)} in</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div
					class={clsx(
						'p-4 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-3 text-sm',
						activeTab().shipping === 'active' && '',
						activeTab().shipping === 'inactive' && 'hidden'
					)}
					id="shipping"
					role="tabpanel"
					aria-labelledby="shipping-tab"
				>
					<div>
						<div class="text-gray-500 dark:text-gray-400 flex space-x-2">
							<div class="i-mdi-truck-fast-outline text-2xl" />
							<div>Fast delivery:</div>
						</div>
						<div class="text-gray-600 dark:text-gray-300">
							Your package will arrive in 3-5 business days at your pick up location or in the comfort of your home.
						</div>
					</div>
					<div>
						<div class="text-gray-500 dark:text-gray-400 flex space-x-2">
							<div class="i-subway-round-arrow-2 text-xl" />
							<div>Simple exchanges:</div>
						</div>
						<div class="text-gray-600 dark:text-gray-300">
							Is your order not quite right? No worries - we'll make it right with simple exchanges.
						</div>
					</div>
					<div>
						<div class="text-gray-500 dark:text-gray-400 flex space-x-2">
							<div class="i-fluent-chat-arrow-back-16-regular text-2xl" />
							<div>Easy returns:</div>
						</div>
						<div class="text-gray-600 dark:text-gray-300">
							Just return your product and we'll refund your money. No questions asked – we'll do our best to make sure your
							return is hassle-free.
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export function CustomerOverallReviews(props: { rating: () => number }) {
	return (
		<div class="space-y-4">
			<div class="flex flex-col justify-center items-center  ">
				<div class="space-x-2  ">
					<span class="text-gray-500 dark:text-gray-400 text-5xl">4.5</span>
					<span class="text-gray-500 dark:text-gray-400 text-2xl font-light">out of</span>
					<span class="text-gray-500 dark:text-gray-400 text-5xl">5</span>
				</div>
				<div class="flex items-center space-x-2">
					<StarIconRequest rating={props.rating()} />

					<div class="text-gray-500 dark:text-gray-400">|</div>

					<div class="text-gray-500 dark:text-gray-400">45 reviews</div>
				</div>
			</div>

			<ReviewPercentSlider
				label="5"
				percent={87}
			/>
			<ReviewPercentSlider
				label="4"
				percent={9}
			/>
			<ReviewPercentSlider
				label="3"
				percent={1}
			/>

			<ReviewPercentSlider
				label="2"
				percent={2}
			/>

			<ReviewPercentSlider
				label="1"
				percent={1}
			/>
		</div>
	)
}

export function ReviewPercentSlider(props: { percent: number; label: string }) {
	return (
		<div class="flex  items-center justify-center space-x-2">
			<div class="text-gray-500 dark:text-gray-400 ">{props.label} </div>

			<div class="w-3/4 max-w-sm h-2 bg-gray-200 rounded-full ">
				<div
					class="h-full bg-yellow-400 rounded-full "
					style={{ width: `${props.percent}%` }}
				/>
			</div>

			<div class="text-gray-500 dark:text-gray-400">{props.percent}%</div>
		</div>
	)
}

export function StarIconRequest(props: { rating: number }) {
	//round rating to nearist half
	const roundRating = Math.round(props.rating * 2) / 2

	function getStarIcon(rating: number) {
		const stars = []
		for (let i = 0; i < Math.floor(rating); i++) {
			stars.push(<i class="i-ic-baseline-star-rate text-yellow-500" />)
		}
		if (rating % 1 !== 0) {
			stars.push(<i class="i-ic-baseline-star-half text-yellow-500" />)
		}
		if (rating < 5) {
			for (let i = 0; i < 5 - Math.ceil(rating); i++) {
				stars.push(<i class="i-ic-outline-star-rate text-gray-400" />)
			}
		}
		return stars
	}

	return <div class="text-2xl text-gray-500 dark:text-gray-400">{getStarIcon(roundRating)}</div>
}

export function CustomerIndividualReviews(props: {
	rating: number
	review: string
	name: string
	date: string
	title: string
}) {
	return (
		<div class="flex flex-col space-y-2 ">
			<div class="flex items-center space-x-2">
				<StarIconRequest rating={props.rating} />

				<div class="text-green-600 dark:text-gray-400 text-xs">Verified Purchaser</div>
				<div class="text-gray-500 dark:text-gray-400">|</div>

				<div class="text-gray-500 dark:text-gray-400 text-xs ">{props.date}</div>
			</div>

			<div class="text-gray-500 dark:text-gray-400 font-semibold text-sm">{props.title}</div>

			<div class="text-gray-500 dark:text-gray-400 text-sm">"{props.review}"</div>

			<div class="flex items-center space-x-2">
				<div class="text-gray-500 dark:text-gray-400">~</div>

				<div class="text-gray-500 dark:text-gray-400 text-sm">{props.name}</div>
			</div>
		</div>
	)
}
