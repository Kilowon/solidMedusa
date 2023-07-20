import { JSX, For, Show, createEffect, createMemo, createSignal } from 'solid-js'
import { Product } from '~/types/models'
import clsx from 'clsx'
import { useStore } from '~/Context/StoreContext'
import { currencyFormat } from '~/lib/helpers/currency'
import { TransitionGroup } from 'solid-transition-group'
import toast, { Toaster } from 'solid-toast'
import { createQuery } from '@tanstack/solid-query'
import { useGlobalContext } from '~/Context/Providers'

interface CurrentVariant {
	id: string
	original_price?: string
	calculated_price?: string
}
type OptionSelectProps = {
	option: any
	current: any
	updateOptions: (option: Record<string, string>) => void
	title: string
}
type OptionSelectViableProps = {
	option: any
	current: any
	updateOptions: (option: Record<string, string>) => void
	title: string
	productInfo: Product
}

export default function ProductActions(props: {
	productInfo: Product
	updateOptions: any
	options: any
	inStock: any
	variant: any
	useStore: any
	params: any
}): JSX.Element {
	const { addToCart } = useStore()
	const { variant } = useStore()
	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()

	const [currentVariant, setCurrentVariant] = createSignal<CurrentVariant>()
	const [rating, setRating] = createSignal(3)

	const notify = () => toast.success('Added to cart!')

	//TODO: The current server is out of sync with the develepment server and lacks the purchasable field
	// I am disabling the purchasable field for now
	const isProductPurchasable = createMemo(() => {
		const [selectedVariant] = createSignal(props.variant())
		if (selectedVariant()) {
			const variant = props.productInfo.variants.find(v => v.id === selectedVariant().id)
			if (variant) {
				return variant.purchasable ? 'valid' : 'out-of-stock'
				//return 'valid'
			}
		}

		return 'invalid'
	})

	createEffect(() => {
		if (props.variant()?.id) {
			const variant = props.productInfo.variants.find(v => v.id === props.variant()?.id)
			setCurrentVariant(variant || props.productInfo.variants[0])
		} else {
			setCurrentVariant(props.productInfo.variants[0])
		}
	})

	const queryProduct = createQuery(() => ({
		queryKey: ['Product-Page', props.params.handle],
		queryFn: async function () {
			const product = await medusa?.products.list({ handle: props.params, cart_id: queryCart.data?.cart.id })
			return product
		},
		cacheTime: 25 * 60 * 1000,
		enabled: !!props.params && !!queryCart?.data?.cart?.id
	}))

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

	createEffect(() => {
		if (queryProduct.isSuccess) {
			reviewData.refetch()
		}
	})

	createEffect(() => {
		console.log(queryProduct.data)
	})

	return (
		<Show when={props.productInfo && reviewData.isSuccess}>
			<Toaster
				position="top-right"
				gutter={8}
				containerClassName=""
				containerStyle={{
					'z-index': 200
				}}
				toastOptions={{
					className: '',
					duration: 1500,
					style: {
						background: '#363636',
						color: '#fff'
					}
				}}
			/>
			<div class="flex flex-col space-y-4  mx-2">
				<div class="flex justify-between w-full lg:flex-col items-start text-text_2 bg-transparent">
					<div class="lg:space-y-2">
						<div class="flex items-center space-x-2">
							<div class="text-xl">
								<StarIconRequest rating={reviewData.data?.data?.overall_rating} />
							</div>

							<div class="text-text_2 ">|</div>

							<div class="text-text_2 underline ">{reviewData.data?.data?.total_reviews} reviews</div>
						</div>
						<h1 class=" md:text-2xl font-semibold tracking-tight text-balance">{props.productInfo?.title}</h1>
					</div>
					<div>
						<Show when={currentVariant()?.original_price}>
							{currentVariant()?.original_price === currentVariant()?.calculated_price ? (
								<div class="space-x-2">
									<span class="text-xl font-semibold ">{currencyFormat(Number(currentVariant()?.original_price), 'US')}</span>
								</div>
							) : (
								<div class="flex flex-col justify-center items-center lg:flex-row lg:space-x-2">
									<span class="text-xl line-through font-semibold">
										{currencyFormat(Number(currentVariant()?.original_price), 'US')}
									</span>
									<span class="text-xl text-accent_3 font-semibold ">
										{currencyFormat(Number(currentVariant()?.calculated_price), 'US')}
									</span>
									<span class="text-xs text-accenttext_1 font-semibold bg-accent_3 rounded-lg flex justify-center uppercase w-15 ">
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
							notify()
						}}
						disabled={isProductPurchasable() === 'invalid' || isProductPurchasable() === 'out-of-stock'}
						class={clsx(
							'w-full uppercase flex items-center justify-center min-h-[50px] px-5 py-[10px] text-sm border transition-colors duration-200 disabled:opacity-75 disabled:hover:bg-text_2 disabled:hover:text-accenttext_1',
							isProductPurchasable() === 'valid' && 'text-accenttext_1 bg-accent_2 border-accent_2 hover:bg-accent_2/80',
							isProductPurchasable() === 'invalid' && 'text-accenttext_1 bg-text_2/70 border-text_1',
							isProductPurchasable() === 'out-of-stock' && 'text-accenttext_1 bg-text_4 border-text_3'
						)}
					>
						{isProductPurchasable() === 'valid'
							? `Add to cart - ${currencyFormat(Number(currentVariant()?.calculated_price), 'US')}`
							: ''}
						{isProductPurchasable() === 'invalid' ? 'Select Options' : ''}
						{isProductPurchasable() === 'out-of-stock' ? 'Out of Stock' : ''}
					</button>
				</div>

				<div>
					<ProductInformationTabs
						productInfo={props.productInfo}
						rating={reviewData.data?.data}
					/>
				</div>
			</div>
		</Show>
	)
}

export const onlyUnique = (value: unknown, index: number, self: unknown[]) => self.indexOf(value) === index

export function OptionSelect({ option, current, updateOptions, title }: OptionSelectProps) {
	const filteredOptions = option.values.map((v: any) => v.value).filter(onlyUnique)

	return (
		<Show when={option.values.length > 0}>
			<div class="flex flex-col gap-y-1">
				<h4 class="text-sm md:text-base font-500 text-text_2">Select {title}</h4>
				<div class="flex space-x-1">
					<For each={filteredOptions}>
						{value => {
							const isSelected = createMemo(() => current()[option.id] === value, [current()[option.id], value])
							return (
								<button
									onClick={() => {
										updateOptions({ [option.id]: value })
									}}
									class={clsx(
										' border text-xs min-h-8 px-1 rounded-sm min-w-12 max-w-fit transition-all duration-200 capitalize',
										{
											'border border-2 border-text_3 text-text_1 bg-normal_1 font-700 ': isSelected()
										},
										{
											'bg-normal_1 text-text_2 font-500': !isSelected()
										}
									)}
								>
									{value}
								</button>
							)
						}}
					</For>
				</div>
			</div>
		</Show>
	)
}

export function OptionSelectViable({ option, current, updateOptions, title, productInfo }: OptionSelectViableProps) {
	const filteredOptions = option.values.map((v: any) => v.value).filter(onlyUnique)

	const isOptionViable = (value: string, selectedOptions: string[]): string => {
		// If no options are selected yet, return 'viable'
		if (selectedOptions.length === 0) {
			return 'viable'
		}

		const [couldBe, setCouldBe] = createSignal(false)
		//let couldBeViable = false

		// Iterate through the options array inside each variant array
		for (const variant of productInfo.variants) {
			const variantOptions = variant.options.map((o: any) => o.value)

			// Check if the current option value exists in the variant options
			if (variantOptions.includes(value)) {
				// Check if all selected options are available in the variant options
				if (selectedOptions.every((selectedOption: string) => variantOptions.includes(selectedOption))) {
					return 'viable'
				} else {
					//couldBeViable = true
					setCouldBe(true)
				}
			}
		}

		// Return 'could-viable' if the option is not viable but could be selected based on other selections
		return couldBe() ? 'could-viable' : 'not-viable'
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
				<h4 class="text-xs md:text-sm font-500 text-text_2 tracking-tight">Select {title}:</h4>
				<div class="flex space-x-1">
					<For each={filteredOptions}>
						{v => {
							let isSelected = createMemo(() => current()[option.id] === v, [current()[option.id], v])
							//@ts-ignore
							let selectedOptions = createMemo<string[]>(() => {
								let currentObj = current()
								if (Object.keys(currentObj).length === 0) {
									return []
								}
								return Object.values(currentObj).filter(value => value !== undefined)
							})
							let viable = createMemo(() => isOptionViable(v, selectedOptions()), [current()])

							return (
								<button
									onClick={() => {
										updateOption({ [option.id]: v })
									}}
									class={clsx(
										'border text-xs min-h-8 px-1 rounded-sm min-w-12 max-w-fit transition-all duration-200 tracking-tight capitalize',
										{
											'border border-2 border-text_2 text-text_2 bg-normal_1 font-700 ': isSelected(),
											'bg-normal_1 text-text_2 font-700': viable() === 'viable' && !isSelected(),
											'bg-surface text-text_4 font-400 line-through ': viable() === 'could-viable'
										}
									)}
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

export function ProductInformationTabs(props: { productInfo: Product; rating: any }) {
	const [activeTab, setActiveTab] = createSignal({
		description: 'active',
		info: 'inactive',
		shipping: 'inactive',
		reviews: 'inactive'
	})

	const productData = createQuery(() => ({
		queryKey: ['product_tab_data'],
		queryFn: async function () {
			const bearerToken = import.meta.env.VITE_BEARER_TOKEN
			const response = await fetch(`https://direct.shauns.cool/items/Product_Page`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${bearerToken}`
				}
			})
			const data = await response.json()
			return data
		},
		cacheTime: 15 * 60 * 1000,
		retry: 0
	}))

	return (
		<div>
			<div class="mb-4 border-b border-surface_3">
				<ul
					class="flex -mb-px text-xs font-medium text-center space-x-0.5 lg:space-x-6 "
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
								'inline-block p-1 lg:p-3 border-b-2 rounded-t-lg h-full bg-normal_1 lg:bg-normal_2',
								activeTab().description === 'active' && ' border-text_2 text-text_2 ',
								activeTab().description === 'inactive' && 'hover:text-text_3 hover:border-text_5 text-text_3'
							)}
							id="description-tab"
							data-tabs-target="#description"
							type="button"
							role="tab"
							aria-controls="description"
							aria-selected="false"
							onClick={() => {
								if (activeTab().description === 'inactive') {
									setActiveTab({ description: 'active', info: 'inactive', shipping: 'inactive', reviews: 'inactive' })
									return
								}
								if (activeTab().description === 'active') {
									setActiveTab({ description: 'inactive', info: 'inactive', shipping: 'inactive', reviews: 'inactive' })
								}
							}}
						>
							<div class="flex flex-col justify-center items-center mb-2 sm:mb-0  ">
								<div class="i-material-symbols-description-outline text-lg  " />
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
								'inline-block p-1 border-b-2 rounded-t-lg h-full lg:w-31 bg-normal_1 lg:bg-normal_2',
								activeTab().info === 'active' && ' border-text_2 text-text_2 bg-text_2',
								activeTab().info === 'inactive' && 'hover:text-text_2 hover:border-text_5 text-text_3'
							)}
							id="info-tab"
							data-tabs-target="#info"
							type="button"
							role="tab"
							aria-controls="info"
							aria-selected="false"
							onClick={() => {
								if (activeTab().info === 'inactive') {
									setActiveTab({ description: 'inactive', info: 'active', shipping: 'inactive', reviews: 'inactive' })
									return
								}
								if (activeTab().info === 'active') {
									setActiveTab({ description: 'inactive', info: 'inactive', shipping: 'inactive', reviews: 'inactive' })
								}
							}}
						>
							<div class="flex flex-col justify-center items-center  ">
								<div class="i-carbon-product text-lg" />
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
								'inline-block p-1 border-b-2 rounded-t-lg h-full lg:w-31 bg-normal_1 lg:bg-normal_2',
								activeTab().shipping === 'active' && ' border-text_2 text-text_2 ',
								activeTab().shipping === 'inactive' && 'hover:text-text_2 hover:border-text_5 text-text_3'
							)}
							id="shipping-tab"
							data-tabs-target="#shipping"
							type="button"
							role="tab"
							aria-controls="shipping"
							aria-selected="false"
							onClick={() => {
								if (activeTab().shipping === 'inactive') {
									setActiveTab({ description: 'inactive', info: 'inactive', shipping: 'active', reviews: 'inactive' })
									return
								}
								if (activeTab().shipping === 'active') {
									setActiveTab({ description: 'inactive', info: 'inactive', shipping: 'inactive', reviews: 'inactive' })
								}
							}}
						>
							<div class="flex flex-col justify-center items-center">
								<div class="i-ph-truck text-lg" />
								Shipping & Returns
							</div>
						</button>
					</li>
					<li
						class=""
						role="presentation"
					>
						<button
							class={clsx(
								'lg:hidden inline-block p-1 border-b-2 rounded-t-lg h-full bg-normal_1 lg:bg-normal_2',
								activeTab().reviews === 'active' && ' border-text_2 text-text_2',
								activeTab().reviews === 'inactive' && 'hover:text-text_2 hover:border-text_5 text-text_4'
							)}
							id="reviews-tab"
							data-tabs-target="#reviews"
							type="button"
							role="tab"
							aria-controls="reviews"
							aria-selected="false"
							onClick={() => {
								if (activeTab().reviews === 'inactive') {
									setActiveTab({ description: 'inactive', info: 'inactive', shipping: 'inactive', reviews: 'active' })
									return
								}
								if (activeTab().reviews === 'active') {
									setActiveTab({ description: 'inactive', info: 'inactive', shipping: 'inactive', reviews: 'inactive' })
								}
							}}
						>
							{' '}
							<div class="flex flex-col justify-center items-center ">
								<div class="i-ic-baseline-star-rate text-lg " />
								Customer Reviews
							</div>
						</button>
					</li>
				</ul>
			</div>
			<div class="text-sm h-full">
				<TransitionGroup
					onEnter={(el, done) => {
						const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
							duration: 250
						})
						a.finished.then(done)
					}}
					onExit={(el, done) => {
						const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
							duration: 0
						})
						a.finished.then(done)
					}}
				>
					<Show when={activeTab().description === 'active'}>
						<div
							class={clsx(
								'p-4 rounded-lg bg-normal_2 space-y-4',
								activeTab().description === 'active' && ''
								//activeTab().description === 'inactive' && 'hidden'
							)}
						>
							<div class="space-y-2">
								<h1 class="tracking-tight  sm:text-lg text-text_2 font-500 text-balance">{props.productInfo?.title}</h1>
								<h2 class="tracking-tight text-text_3 text-balance font-500">{props.productInfo?.subtitle}</h2>
							</div>
							<p class=" mb-3 text-text_3  whitespace-break-spaces ">{props.productInfo.description}</p>
						</div>
					</Show>
					<Show when={activeTab().info === 'active'}>
						<div
							class={clsx(
								'p-4 rounded-lg bg-normal_2  space-y-6',
								activeTab().info === 'active' && ''
								//activeTab().info === 'inactive' && 'hidden'
							)}
						>
							<div>
								{props.productInfo?.weight && (
									<div class="">
										<div class="text-text_2 flex space-x-2">
											<div class="i-mdi-fabric text-2xl" />
											<div>Material</div>
										</div>

										<div class="text-text_2 ">{props.productInfo?.material} </div>
									</div>
								)}
							</div>

							<div>
								{props.productInfo?.weight && (
									<div class="">
										<div class="text-text_2  flex space-x-2">
											<div class="i-mdi-weight-pound text-2xl" />
											<div>Weight</div>
										</div>

										<div class="text-text_2 ">{(props.productInfo?.weight / 453.592).toFixed(2)} lbs</div>
									</div>
								)}
							</div>
							<div class="space-y-1">
								<div class="text-text_2  flex space-x-2">
									<div class="i-radix-icons-dimensions text-2xl" />
									<div>Dimensions</div>
								</div>
								<div class="flex justify-between">
									{props.productInfo?.length && (
										<div>
											<div class="text-text_2 ">Length</div>
											<div class="text-text_2 ">{(props.productInfo?.length / 25.4).toFixed(2)} in</div>
										</div>
									)}
									{props.productInfo?.width && (
										<div>
											<div class="text-text_2 ">Width</div>
											<div class="text-text_2 ">{(props.productInfo?.width / 25.4).toFixed(2)} in</div>
										</div>
									)}
									{props.productInfo?.height && (
										<div>
											<div class="text-text_2 ">Height</div>
											<div class="text-text_2 ">{(props.productInfo?.height / 25.4).toFixed(2)} in</div>
										</div>
									)}
								</div>
							</div>
							<Show when={productData?.data?.data?.product_info_toggle === true}>
								<div class="text-text_2  flex space-x-2">
									<div>{productData?.data?.data?.product_info_tab}</div>
								</div>
							</Show>
						</div>
					</Show>
					<Show when={activeTab().shipping === 'active'}>
						<div
							class={clsx(
								'p-4 rounded-lg bg-normal_2 space-y-6 text-sm',
								activeTab().shipping === 'active' && ''
								//activeTab().shipping === 'inactive' && 'hidden'
							)}
						>
							<Show when={productData?.data?.data?.delivery_toggle === true}>
								<div>
									<div class="text-text_2  flex space-x-2">
										<div class="i-mdi-truck-fast-outline text-2xl" />
										<div>{productData?.data?.data?.delivery_title}</div>
									</div>
									<div class="text-text_2 ">{productData?.data?.data?.delivery_body}</div>
								</div>
							</Show>
							<Show when={productData?.data?.data?.exchanges_toggle === true}>
								<div>
									<div class="text-text_2 flex space-x-2">
										<div class="i-subway-round-arrow-2 text-xl" />
										<div>{productData?.data?.data?.exchanges_title}</div>
									</div>
									<div class="text-text_2 ">{productData?.data?.data?.exchanges_body}</div>
								</div>
							</Show>
							<Show when={productData?.data?.data?.returns_toggle === true}>
								<div>
									<div class="text-text_2 flex space-x-2">
										<div class="i-fluent-chat-arrow-back-16-regular text-2xl" />
										<div>{productData?.data?.data?.returns_title}</div>
									</div>
									<div class="text-text_2 ">{productData?.data?.data?.returns_body}</div>
								</div>
							</Show>
						</div>
					</Show>
					<Show when={activeTab().reviews === 'active'}>
						<div
							class={clsx(
								'p-4 rounded-lg bg-normal_2 space-y-3 text-sm',
								activeTab().reviews === 'active' && ''
								//activeTab().reviews === 'inactive' && 'hidden'
							)}
						>
							<div>
								<ReviewsDisplay rating={props.rating} />
							</div>
						</div>
					</Show>
				</TransitionGroup>
			</div>
		</div>
	)
}

export function CustomerOverallReviews(props: { rating: any }) {
	return (
		<div class="space-y-2">
			<div class="flex flex-col justify-center items-center   ">
				<div class="space-x-2  ">
					<span class="text-text_3 text-5xl lg:font-700">{props.rating?.overall_rating}</span>
					<span class="text-text_3 text-xl font-light lg:font-500 ">out of</span>
					<span class="text-text_3 text-5xl lg:font-700">5</span>
				</div>
				<div class="flex items-center space-x-2">
					<div class="text-xl">
						<StarIconRequest rating={props.rating?.overall_rating} />
					</div>

					<div class="text-text_4">|</div>

					<div class="text-text_4 underline">{props.rating?.total_reviews} reviews</div>
				</div>
			</div>

			<ReviewPercentSlider
				label="5"
				percent={props.rating?.five_stars_percentage}
				total={props.rating?.five_stars}
			/>
			<ReviewPercentSlider
				label="4"
				percent={props.rating?.four_stars_percentage}
				total={props.rating?.four_stars}
			/>
			<ReviewPercentSlider
				label="3"
				percent={props.rating?.three_stars_percentage}
				total={props.rating?.three_stars}
			/>

			<ReviewPercentSlider
				label="2"
				percent={props.rating?.two_stars_percentage}
				total={props.rating?.two_stars}
			/>

			<ReviewPercentSlider
				label="1"
				percent={props.rating?.one_stars_percentage}
				total={props.rating?.one_stars}
			/>
		</div>
	)
}

export function ReviewPercentSlider(props: { percent: number; label: string; total?: number }) {
	return (
		<div class="flex  items-center justify-center space-x-2">
			<div class=" w-[10%] text-text_4 flex justify-end ">{props.label} </div>

			<div class="w-[80%] max-w-sm h-2 bg-normal_4 rounded-full ">
				<div
					class="h-full bg-yellow-400 rounded-full "
					style={{ width: `${props.percent}%` }}
				/>
			</div>

			<div class=" w-[10%] text-text_4">{` ${props.total}`}</div>
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
				stars.push(<i class="i-ic-outline-star-rate text-text_3/50" />)
			}
		}
		return stars
	}

	return <div class=" text-text_2">{getStarIcon(roundRating)}</div>
}

export function CustomerIndividualReviews(props: {
	rating: number
	review: { customer: string; owner: string }
	name: { customer: string; owner: string }
	date: { customer: string; owner: string }
	title: string
}) {
	function formatDate(date: any) {
		const now = new Date()
		const then = new Date(date)
		const diffInYears = now.getFullYear() - then.getFullYear()
		const diffInMonths = now.getMonth() - then.getMonth() + 12 * diffInYears
		//@ts-ignore
		const diffInDays = Math.floor((now - then) / (1000 * 60 * 60 * 24))

		if (diffInYears > 1) {
			return `${diffInYears} years ago`
		} else if (diffInMonths > 1) {
			return `${diffInMonths} months ago`
		} else if (diffInDays > 1) {
			return `${diffInDays} days ago`
		} else {
			return 'today'
		}
	}

	return (
		<div class="flex flex-col justify-between space-y-2 min-h-216px h-100% ">
			<div class="space-y-1">
				<div class="flex items-center space-x-2 mb-1 ">
					<div class="text-green-600 text-[10px] lg:text-xs ">
						<div class="i-ic-twotone-person-pin text-base" />
						Verified Purchaser
					</div>

					<div class="text-text_4">|</div>

					<div class="text-text_4  text-xs ">{formatDate(props.date.customer)}</div>
				</div>

				<div class="flex flex-col items-end lg:flex-row  space-x-2">
					<div class="text-text_4  text-xs">{props.name.customer}</div>
					<StarIconRequest rating={props.rating} />
				</div>
				<div class="text-text_3  font-500 text-sm">
					<h4 class="text-ellipsis tracking-tighter text-balance">{props.title}</h4>
				</div>

				<p class="text-text_4  text-sm line-clamp-7 text-ellipsis">"{props.review.customer}"</p>
				<Show when={props.review.owner}>
					<OwnerResponce
						review={props.review.owner}
						name={props.name.owner}
						date={formatDate(props.date.owner)}
					/>
				</Show>
			</div>
			<span class="flex mx-2 border border-text_5/40 border-1 rounded-36"></span>
		</div>
	)
}

export function OwnerResponce(props: { name: string; review: string; date: string }) {
	return (
		<div class="flex flex-col">
			<div class="flex items-center space-x-2 mb-1 mt-3">
				<div class="text-blue-600 text-[10px] lg:text-xs font-bold ">
					<div class="i-ic-twotone-person-pin text-base" />
					{props.name}
				</div>

				<div class="text-text_4">|</div>

				<div class="text-text_4 text-xs ">{props.date}</div>
			</div>
			<p class="text-text_4 text-sm">"{props.review}"</p>
		</div>
	)
}

export function ReviewsDisplay(props: { rating: any }) {
	const [currentPage, setCurrentPage] = createSignal(1)
	const reviewsPerPage = 5

	const totalReviews = props.rating?.reviews.length
	const totalPages = Math.ceil(totalReviews / reviewsPerPage)

	const handleNextPage = () => {
		if (currentPage() >= totalPages) {
			setCurrentPage(1)
		} else {
			setCurrentPage(currentPage() + 1)
		}
	}

	const handlePrevPage = () => {
		if (currentPage() <= 1) {
			setCurrentPage(totalPages)
		} else {
			setCurrentPage(currentPage() - 1)
		}
	}

	return (
		<Show when={true}>
			<div class={clsx('p-4 rounded-lg bg-normal_1 space-y-3 text-sm lg:min-w-80% lg:max-w-80%')}>
				<div class="flex justify-end items-center space-x-6 font-500 text-text_2">
					<button
						onClick={handlePrevPage}
						class="bg-normal_2 p-1 rounded-sm text-text_2 hover:bg-normal_3 hover:text-text_1 transition-all duration-200"
					>
						Previous
					</button>
					<button
						onClick={handleNextPage}
						class="bg-normal_2 p-1 rounded-sm text-text_2 hover:bg-normal_3 hover:text-text_1 transition-all duration-200"
					>
						Next
					</button>
				</div>
				<div>
					<div class="lg:grid  lg:grid-cols-2 lg:gap-2 xl:grid-cols-2 xl:gap-4 ">
						<div class="flex flex-col justify-between">
							<CustomerOverallReviews rating={props.rating} />
							<span class="flex mx-2 border border-normal_3 border-1"></span>
						</div>

						<For each={props.rating?.reviews.slice((currentPage() - 1) * reviewsPerPage, currentPage() * reviewsPerPage)}>
							{(review, index) => {
								return (
									<div>
										<CustomerIndividualReviews
											review={{ customer: review.user_body, owner: review.owner_body }}
											rating={review.user_rating}
											name={{ customer: review.user_name, owner: review.owner_name }}
											date={{ customer: review.user_date, owner: review.owner_date }}
											title={review.user_title}
										/>
									</div>
								)
							}}
						</For>
					</div>
				</div>
				<div class="flex justify-end items-center space-x-6 font-500 text-text_2">
					<button
						onClick={handlePrevPage}
						class="bg-normal_2 p-1 rounded-sm text-text_2 hover:bg-normal_3 hover:text-text_1 transition-all duration-200"
					>
						Previous
					</button>
					<button
						onClick={handleNextPage}
						class="bg-normal_2 p-1 rounded-sm text-text_2 hover:bg-normal_3 hover:text-text_1 transition-all duration-200"
					>
						Next
					</button>
				</div>
			</div>
		</Show>
	)
}
