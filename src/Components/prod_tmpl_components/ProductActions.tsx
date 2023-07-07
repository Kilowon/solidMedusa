import { JSX, For, Show, createEffect, createMemo, createSignal, onMount } from 'solid-js'
import { Product } from '~/types/models'
import clsx from 'clsx'
import { useStore } from '~/Context/StoreContext'
import { currencyFormat } from '~/lib/helpers/currency'
import { TransitionGroup } from 'solid-transition-group'
import toast, { Toaster } from 'solid-toast'
import { createQuery } from '@tanstack/solid-query'

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
}): JSX.Element {
	const { addToCart } = useStore()
	const { variant } = useStore()

	createEffect(() => {
		console.log('VARIENT PRO ACT', variant())
	})

	const [currentVariant, setCurrentVariant] = createSignal<CurrentVariant>()
	const [rating, setRating] = createSignal(4.5)

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
		console.log(isProductPurchasable(), 'variant ProductActions', props.variant())
	})

	createEffect(() => {
		if (props.variant()?.id) {
			const variant = props.productInfo.variants.find(v => v.id === props.variant()?.id)
			setCurrentVariant(variant || props.productInfo.variants[0])
		} else {
			setCurrentVariant(props.productInfo.variants[0])
		}
	})

	const reviewData = createQuery(() => ({
		queryKey: ['review_data'],
		queryFn: async function () {
			const response = await fetch(`https://direct.shauns.cool/items/Review`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			})
			const data = await response.json()
			return data
		},
		retry: 0
	}))

	const reviewMutate = createQuery(() => ({
		queryKey: ['primary_data'],
		queryFn: async function () {
			const bearerToken = import.meta.env.VITE_BEARER_TOKEN
			const reviewData = {
				product_id: 'id',
				user_title: 'Hello world!',
				user_body: 'This is our first article',
				user_rating: 5,
				user_name: 'Shaun'
			}

			const response = await fetch(`https://direct.shauns.cool/items/Review`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${bearerToken}`
				},
				body: JSON.stringify(reviewData)
			})

			const data = await response.json()
			return data
		},
		retry: 0,
		enabled: false
	}))

	return (
		<Show when={props.productInfo}>
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
			<div class="flex flex-col space-y-4 font-poppins mx-2">
				<div class="flex justify-between w-full lg:flex-col items-start text-black bg-white">
					<div class="lg:space-y-2">
						<div class="flex items-center space-x-2">
							<div
								class="text-xl"
								onclick={() => {
									reviewMutate.refetch()
								}}
							>
								<StarIconRequest rating={rating()} />
							</div>

							<div class="text-gray-500 dark:text-gray-400">|</div>

							<div class="text-gray-500 dark:text-gray-400 underline">45 reviews</div>
						</div>
						<h3 class=" md:text-2xl font-semibold text-balance">{props.productInfo?.title}</h3>
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
							notify()
						}}
						disabled={isProductPurchasable() === 'invalid' || isProductPurchasable() === 'out-of-stock'}
						class={clsx(
							'w-full uppercase flex items-center justify-center min-h-[50px] px-5 py-[10px] text-sm border transition-colors duration-200 disabled:opacity-50disabled:hover:bg-gray-900 disabled:hover:text-white',
							isProductPurchasable() === 'valid' && 'text-white bg-green-600 border-green-600 hover:bg-green-400',
							isProductPurchasable() === 'invalid' && 'text-white bg-gray-600 border-gray-600',
							isProductPurchasable() === 'out-of-stock' && 'text-white bg-gray-500 border-gray-600'
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
					isPurchase:{isProductPurchasable()} variant:{props.variant()?.id}
				</div>
				<div>
					<ProductInformationTabs
						productInfo={props.productInfo}
						rating={rating}
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
				<span class="text-sm md:text-base font-semibold">Select {title}</span>
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
										'border-gray-200 border text-xs min-h-8 px-0.5 rounded-sm min-w-12 max-w-fit transition-all duration-200',
										{
											'border-gray-5 text-gray-8': isSelected()
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
				<span class="text-sm md:text-base font-semibold">Select {title}</span>
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
										console.log('OPTION', v)
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

export function ProductInformationTabs(props: { productInfo: Product; rating: () => number }) {
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
			<div class="mb-4 border-b border-gray-200 dark:border-gray-700">
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
								'inline-block p-1 lg:p-3 border-b-2 rounded-t-lg h-full bg-white lg:bg-gray-100',
								activeTab().description === 'active' &&
									' border-gray-600 text-gray-600 dark:border-gray-300 dark:text-gray-300 ',
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
									setActiveTab({ description: 'active', info: 'inactive', shipping: 'inactive', reviews: 'inactive' })
									return
								}
								if (activeTab().description === 'active') {
									setActiveTab({ description: 'inactive', info: 'inactive', shipping: 'inactive', reviews: 'inactive' })
								}
							}}
						>
							<div class="flex flex-col justify-center items-center mb-2 sm:mb-0  ">
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
								'inline-block p-1 border-b-2 rounded-t-lg h-full lg:w-31 bg-white lg:bg-gray-100',
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
									setActiveTab({ description: 'inactive', info: 'active', shipping: 'inactive', reviews: 'inactive' })
									return
								}
								if (activeTab().info === 'active') {
									setActiveTab({ description: 'inactive', info: 'inactive', shipping: 'inactive', reviews: 'inactive' })
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
								'inline-block p-1 border-b-2 rounded-t-lg h-full lg:w-31 bg-white lg:bg-gray-100',
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
									setActiveTab({ description: 'inactive', info: 'inactive', shipping: 'active', reviews: 'inactive' })
									return
								}
								if (activeTab().shipping === 'active') {
									setActiveTab({ description: 'inactive', info: 'inactive', shipping: 'inactive', reviews: 'inactive' })
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
					<li
						class=""
						role="presentation"
					>
						<button
							class={clsx(
								'lg:hidden inline-block p-1 border-b-2 rounded-t-lg h-full bg-white lg:bg-gray-100',
								activeTab().reviews === 'active' && ' border-gray-600 text-gray-600 dark:border-gray-300 dark:text-gray-300',
								activeTab().reviews === 'inactive' && 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
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
								<div class="i-ic-baseline-star-rate text-lg text-gray-6" />
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
								'p-4 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-4',
								activeTab().description === 'active' && ''
								//activeTab().description === 'inactive' && 'hidden'
							)}
						>
							<div class="space-y-2">
								<h1 class="tracking-tight  sm:text-lg text-balance">{props.productInfo?.title}</h1>
								<h2 class="tracking-tight text-gray-6 text-balance">{props.productInfo?.subtitle}</h2>
							</div>
							<p class=" mb-3 text-gray-500 dark:text-gray-400 whitespace-break-spaces   dark:first-letter:text-gray-100">
								{props.productInfo.description}
							</p>
						</div>
					</Show>
					<Show when={activeTab().info === 'active'}>
						<div
							class={clsx(
								'p-4 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-6',
								activeTab().info === 'active' && ''
								//activeTab().info === 'inactive' && 'hidden'
							)}
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
							<Show when={productData?.data?.data?.product_info_toggle === true}>
								<div class="text-gray-500 dark:text-gray-400 flex space-x-2">
									<div>{productData?.data?.data?.product_info_tab}</div>
								</div>
							</Show>
						</div>
					</Show>
					<Show when={activeTab().shipping === 'active'}>
						<div
							class={clsx(
								'p-4 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-6 text-sm',
								activeTab().shipping === 'active' && ''
								//activeTab().shipping === 'inactive' && 'hidden'
							)}
						>
							<Show when={productData?.data?.data?.delivery_toggle === true}>
								<div>
									<div class="text-gray-500 dark:text-gray-400 flex space-x-2">
										<div class="i-mdi-truck-fast-outline text-2xl" />
										<div>{productData?.data?.data?.delivery_title}</div>
									</div>
									<div class="text-gray-600 dark:text-gray-300">{productData?.data?.data?.delivery_body}</div>
								</div>
							</Show>
							<Show when={productData?.data?.data?.exchanges_toggle === true}>
								<div>
									<div class="text-gray-500 dark:text-gray-400 flex space-x-2">
										<div class="i-subway-round-arrow-2 text-xl" />
										<div>{productData?.data?.data?.exchanges_title}</div>
									</div>
									<div class="text-gray-600 dark:text-gray-300">{productData?.data?.data?.exchanges_body}</div>
								</div>
							</Show>
							<Show when={productData?.data?.data?.returns_toggle === true}>
								<div>
									<div class="text-gray-500 dark:text-gray-400 flex space-x-2">
										<div class="i-fluent-chat-arrow-back-16-regular text-2xl" />
										<div>{productData?.data?.data?.returns_title}</div>
									</div>
									<div class="text-gray-600 dark:text-gray-300">{productData?.data?.data?.returns_body}</div>
								</div>
							</Show>
						</div>
					</Show>
					<Show when={activeTab().reviews === 'active'}>
						<div
							class={clsx(
								'p-4 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-3 text-sm',
								activeTab().reviews === 'active' && ''
								//activeTab().reviews === 'inactive' && 'hidden'
							)}
						>
							<div>
								<div>
									<CustomerOverallReviews rating={props.rating} />
								</div>
								<span class="flex mx-2 border border-gray-3 border-1"></span>
								<div class="space-y-3">
									<CustomerIndividualReviews
										review={{
											customer:
												'Stained with ink. I received item opened package and reciept was folded on top of sweatshirt ink faced down. Item didnt come in a bag so freshly printed receipt was laid on top of sweatshirt. Please package these better. now I have to make a trip to the store to return.',
											owner: 'Sorry about that Shane. We will make sure to package better next time. Thanks for the feedback!'
										}}
										rating={4}
										name={{ customer: 'Shane', owner: 'Modern Edge' }}
										date={{ customer: 'July 20, 2021', owner: 'July 22, 2021' }}
										title={'Ink on my order'}
									/>
									<CustomerIndividualReviews
										review={{
											customer:
												'I needed a new hoodie and was excited to see dark green color option. Green is my favorite color and it is so hard to find a dark green top anywhere. This hoodie is soft and washed up well. 50 % cotton and 50% polyester. Nice hand size front pocket.',
											owner: 'Glad you like the color!'
										}}
										rating={5}
										name={{ customer: 'CoffeeDiva62', owner: 'Modern Edge' }}
										date={{ customer: 'July 20, 2021', owner: 'July 22, 2021' }}
										title={'Beautiful Forest Green Hoodie'}
									/>
									<CustomerIndividualReviews
										review={{
											customer: 'Coach my twins basketball needed hoodie that match their uniform, this one was perfect.',
											owner: 'I hope they win!'
										}}
										rating={5}
										name={{ customer: 'LADYV40', owner: 'Modern Edge' }}
										date={{ customer: 'July 20, 2021', owner: 'July 22, 2021' }}
										title={'Great Hoodie For The Weather'}
									/>
									<CustomerIndividualReviews
										review={{
											customer: 'It’s really soft and cute highly recommend',
											owner: 'Soft is good!'
										}}
										rating={5}
										name={{ customer: 'Abby', owner: 'Modern Edge' }}
										date={{ customer: 'July 20, 2021', owner: 'July 22, 2021' }}
										title={'Great product!'}
									/>
									<CustomerIndividualReviews
										review={{
											customer:
												'Quaility is good but color is way off I got a highlighter orange color instead of what I ordered . Didn’t even take hoodie out of package because I’ll be returning asap',
											owner: 'Sorry about the mixup Bob, we will look into your order and get it fixed. Thanks for the feedback'
										}}
										rating={3}
										name={{ customer: 'Bob', owner: 'Modern Edge' }}
										date={{ customer: 'July 20, 2021', owner: 'July 22, 2021' }}
										title={'Color wayyy off'}
									/>
								</div>
							</div>
						</div>
					</Show>
				</TransitionGroup>
			</div>
		</div>
	)
}

export function CustomerOverallReviews(props: { rating: () => number }) {
	return (
		<div class="space-y-2">
			<div class="flex flex-col justify-center items-center   ">
				<div class="space-x-2  ">
					<span class="text-gray-500 dark:text-gray-400 text-5xl lg:font-700">{props.rating()}</span>
					<span class="text-gray-500 dark:text-gray-400 text-2xl font-light lg:font-500 ">out of</span>
					<span class="text-gray-500 dark:text-gray-400 text-5xl lg:font-700">5</span>
				</div>
				<div class="flex items-center space-x-2">
					<div class="text-xl">
						<StarIconRequest rating={props.rating()} />
					</div>

					<div class="text-gray-500 dark:text-gray-400">|</div>

					<div class="text-gray-500 dark:text-gray-400 underline">45 reviews</div>
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
			<div class=" w-[10%] text-gray-500 dark:text-gray-400 flex justify-end ">{props.label} </div>

			<div class="w-[80%] max-w-sm h-2 bg-gray-200 rounded-full ">
				<div
					class="h-full bg-yellow-400 rounded-full "
					style={{ width: `${props.percent}%` }}
				/>
			</div>

			<div class=" w-[10%] text-gray-500 dark:text-gray-400">{props.percent}%</div>
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
				stars.push(<i class="i-ic-outline-star-rate text-gray-400/50" />)
			}
		}
		return stars
	}

	return <div class=" text-gray-500 dark:text-gray-400">{getStarIcon(roundRating)}</div>
}

export function CustomerIndividualReviews(props: {
	rating: number
	review: { customer: string; owner: string }
	name: { customer: string; owner: string }
	date: { customer: string; owner: string }
	title: string
}) {
	return (
		<div class="flex flex-col justify-between space-y-2 ">
			<div class="space-y-1">
				<div class="flex items-center space-x-2 mb-1 mt-3">
					<div class="text-green-600 dark:text-gray-400 text-[10px] lg:text-xs ">
						<div class="i-ic-twotone-person-pin text-base" />
						Verified Purchaser
					</div>

					<div class="text-gray-500 dark:text-gray-400">|</div>

					<div class="text-gray-500 dark:text-gray-400 text-xs ">{props.date.customer}</div>
				</div>

				<div class="flex flex-col items-end lg:flex-row  space-x-2">
					<div class="text-gray-500 dark:text-gray-400 text-sm">{props.name.customer}</div>
					<StarIconRequest rating={props.rating} />
				</div>
				<div class="text-gray-500 dark:text-gray-400 font-semibold text-sm">
					<div class="text-ellipsis">{props.title}</div>
				</div>

				<div class="text-gray-500 dark:text-gray-400 text-sm line-clamp-7 text-ellipsis">"{props.review.customer}"</div>
			</div>
			<Show when={props.review.owner}>
				<OwnerResponce
					review={props.review.owner}
					name={props.name.owner}
					date={props.date.owner}
				/>
			</Show>
			<span class="flex mx-2 border border-gray-3/70 border-1 rounded-36"></span>
		</div>
	)
}

export function OwnerResponce(props: { name: string; review: string; date: string }) {
	return (
		<div class="flex flex-col">
			<div class="flex items-center space-x-2 mb-1 mt-3">
				<div class="text-blue-600 dark:text-gray-400 text-[10px] lg:text-xs font-bold ">
					<div class="i-ic-twotone-person-pin text-base" />
					{props.name}
				</div>

				<div class="text-gray-500 dark:text-gray-400">|</div>

				<div class="text-gray-500 dark:text-gray-400 text-xs ">{props.date}</div>
			</div>
			<div class="text-gray-500 dark:text-gray-400 text-sm">"{props.review}"</div>
		</div>
	)
}

export function ReviewsWide(props: { rating: () => number }) {
	return (
		<Show when={true}>
			<div class={clsx('p-4 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-3 text-sm')}>
				<div>
					<div class="lg:grid  lg:grid-cols-2 lg:gap-2 xl:grid-cols-3 xl:gap-4 ">
						<div class="flex flex-col justify-between">
							<CustomerOverallReviews rating={props.rating} />
							<span class="flex mx-2 border border-gray-3 border-1"></span>
						</div>
						<CustomerIndividualReviews
							review={{
								customer:
									'Stained with ink. I received item opened package and reciept was folded on top of sweatshirt ink faced down. Item didnt come in a bag so freshly printed receipt was laid on top of sweatshirt. Please package these better. now I have to make a trip to the store to return.',
								owner: 'Sorry about that Shane. We will make sure to package better next time. Thanks for the feedback!'
							}}
							rating={4}
							name={{ customer: 'Shane', owner: 'Modern Edge' }}
							date={{ customer: 'July 20, 2021', owner: 'July 22, 2021' }}
							title={'Ink on my order'}
						/>
						<CustomerIndividualReviews
							review={{
								customer:
									'I needed a new hoodie and was excited to see dark green color option. Green is my favorite color and it is so hard to find a dark green top anywhere. This hoodie is soft and washed up well. 50 % cotton and 50% polyester. Nice hand size front pocket.',
								owner: 'Glad you like the color!'
							}}
							rating={5}
							name={{ customer: 'CoffeeDiva62', owner: 'Modern Edge' }}
							date={{ customer: 'July 20, 2021', owner: 'July 22, 2021' }}
							title={'Beautiful Forest Green Hoodie'}
						/>
						<CustomerIndividualReviews
							review={{
								customer: 'Coach my twins basketball needed hoodie that match their uniform, this one was perfect.',
								owner: 'I hope they win!'
							}}
							rating={5}
							name={{ customer: 'LADYV40', owner: 'Modern Edge' }}
							date={{ customer: 'July 20, 2021', owner: 'July 22, 2021' }}
							title={'Great Hoodie For The Weather'}
						/>
						<CustomerIndividualReviews
							review={{
								customer: 'It’s really soft and cute highly recommend',
								owner: 'Soft is good!'
							}}
							rating={5}
							name={{ customer: 'Abby', owner: 'Modern Edge' }}
							date={{ customer: 'July 20, 2021', owner: 'July 22, 2021' }}
							title={'Great product!'}
						/>
						<CustomerIndividualReviews
							review={{
								customer:
									'Quaility is good but color is way off I got a highlighter orange color instead of what I ordered . Didn’t even take hoodie out of package because I’ll be returning asap',
								owner: 'Sorry about the mixup Bob, we will look into your order and get it fixed. Thanks for the feedback'
							}}
							rating={3}
							name={{ customer: 'Bob', owner: 'Modern Edge' }}
							date={{ customer: 'July 20, 2021', owner: 'July 22, 2021' }}
							title={'Color wayyy off'}
						/>
					</div>
				</div>
			</div>
		</Show>
	)
}
