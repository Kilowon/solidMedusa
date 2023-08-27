import Navigation from '~/Components/layout/Navigation'
import { createForm, email, required, minLength, setError } from '@modular-forms/solid'
import { createEffect, Show, createSignal, Accessor, Suspense, For } from 'solid-js'
import { FormFooter } from '~/Components/checkout_components/FormFooter'
import { FormHeader } from '~/Components/checkout_components/FormHeader'
import { TextInput } from '~/Components/checkout_components/TextInput'
import { useGlobalContext } from '~/Context/Providers'
import { createQuery } from '@tanstack/solid-query'
import clsx from 'clsx'
import { Image } from '@unpic/solid'
import { TransitionGroup } from 'solid-transition-group'
import { Customer } from '~/types/models'
import { currencyFormat } from '~/lib/helpers/currency'
import SignUp from '~/Components/account_components/SignUp'
import SignIn from '~/Components/account_components/SignIn'
import TabNav from '~/Components/account_components/TabNav'

type PaymentForm = {
	emailDelayFake: string
	email: string
	password: string
	first_name: string
	last_name: string
	company: string
	address_1: string
	address_2: string
	city: string
	country: string
	province: string
	postal_code: string
	phone: string
	type: 'card' | 'paypal'
	card: {
		number: string
		expiration: string
	}
	paypal: {
		email: string
	}
	checkbox: {
		array: string[]
		phone: boolean
		company: boolean
		signin: boolean
		signup: boolean
		billing: boolean
	}
}

interface SideProps {
	side?: Accessor<string>
	currentCustomer?: any
}

export default function Account() {
	const [side, setSide] = createSignal('right')

	const { medusa } = useGlobalContext()

	const currentCustomer = createQuery(() => ({
		queryKey: ['current_customer'],
		queryFn: async function () {
			const customer = await medusa?.auth?.getSession()
			return customer
		},
		retry: 1
	}))

	const currentCustomerSignOut = createQuery(() => ({
		queryKey: ['end_session'],
		queryFn: async function () {
			const customer = await medusa?.auth?.deleteSession()
			return customer
		},
		retry: 0,
		enabled: false
	}))

	const customerMutate = createQuery(() => ({
		queryKey: ['customer_mutate'],
		queryFn: async function () {
			const bearerToken = import.meta.env.VITE_BEARER_TOKEN
			const reviewData = {
				customer_id: currentCustomer?.data?.customer?.id
			}

			const response = await fetch(`https://direct.shauns.cool/items/customer`, {
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

	createEffect(() => {
		console.log(currentCustomer.isSuccess)
		if (currentCustomer.isSuccess) {
			customerMutate.refetch()
		}
	})

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

	function hexToRgb(hex: any) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
		return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null
	}

	return (
		<main
			class="bg-normal_1 min-h-[100svh]"
			style={
				import.meta.env.VITE_DRAFT_SITE === 'false'
					? {
							'--normal_1': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.normal)}`,
							'--normal_2': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.normal_2)}`,
							'--normal_3': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.normal_3)}`,
							'--normal_4': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.normal_4)}`,
							'--surface': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.surface)}`,
							'--text_1': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.text_1)}`,
							'--text_2': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.text_2)}`,
							'--text_3': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.text_3)}`,
							'--text_4': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.text_4)}`,
							'--text_5': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.text_5)}`,
							'--accent_1': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent)}`,
							'--accent_3': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_3)}`,
							'--accent_2': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_2)}`,
							'--accent_4': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_4)}`,
							'--accent_5': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_5)}`,
							'--accent_6': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_6)}`,
							'--accent_7': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_7)}`,
							'--accent_8': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_8)}`,
							'--accent_9': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_9)}`,
							'--accent_10': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_10)}`,
							'--accent_text_1': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_text)}`,
							'--accent_text_2': `${hexToRgb(primaryData?.data?.data?.layout_color[0]?.accent_text_2)}`
					  }
					: import.meta.env.VITE_DRAFT_SITE === 'true'
					? {
							'--normal_1': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.normal)}`,
							'--normal_2': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.normal_2)}`,
							'--normal_3': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.normal_3)}`,
							'--normal_4': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.normal_4)}`,
							'--surface': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.surface)}`,
							'--text_1': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.text_1)}`,
							'--text_2': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.text_2)}`,
							'--text_3': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.text_3)}`,
							'--text_4': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.text_4)}`,
							'--text_5': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.text_5)}`,
							'--accent_1': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent)}`,
							'--accent_3': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_3)}`,
							'--accent_2': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_2)}`,
							'--accent_4': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_4)}`,
							'--accent_5': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_5)}`,
							'--accent_6': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_6)}`,
							'--accent_7': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_7)}`,
							'--accent_8': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_8)}`,
							'--accent_9': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_9)}`,
							'--accent_10': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_10)}`,
							'--accent_text_1': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_text)}`,
							'--accent_text_2': `${hexToRgb(primaryData?.data?.data?.layout_color[1]?.accent_text_2)}`
					  }
					: {}
			}
		>
			<Navigation />
			<div class="bg-normal_1 min-h-[100svh]">
				<div class="flex flex-col lg:flex-row lg:w-full sm:mt-20 lg:mt-0">
					<Suspense>
						<Show when={!currentCustomer.isSuccess}>
							<div
								class={clsx(
									'flex lg:h-100svh justify-center items-center lg:w-1/2 pt-2 sm:pt-12 lg:pt-0',
									side() === 'left' && '',
									side() === 'right' && 'lg:bg-normal_2 transition-all duration-300'
								)}
								onMouseOver={() => {
									setSide('left')
								}}
							>
								<SignUp
									side={side}
									currentCustomer={currentCustomer}
									setSide={setSide}
								/>
							</div>

							<div
								class={clsx(
									'flex lg:h-100svh justify-center items-center lg:w-1/2 pt-12 lg:pt-0',
									side() === 'left' && 'lg:bg-normal_2 transition-all duration-600',
									side() === 'right' && ''
								)}
								onMouseOver={() => {
									setSide('right')
								}}
							>
								<SignIn
									side={side}
									currentCustomer={currentCustomer}
									setSide={setSide}
								/>
							</div>
						</Show>
						<Show when={currentCustomer.isSuccess}>
							<div class=" w-full min-h-90svh">
								<div class="flex flex-col  sm:content-container md:max-w-900px  justify-center lg:mt-20 space-y-2 sm:space-y-6 lg:space-y-10 mx-1 sm:mx-auto  ">
									<div class="sm:flex items-center justify-between">
										<div class="text-xs sm:text-base font-400 text-text_2 pl-1 sm:pl-0"></div>
										<div class="flex justify-between p-1">
											<div class="text-xs font-500  text-text_2">Signed in as: {currentCustomer?.data?.customer?.email}</div>
											<div
												class="text-xs font-500 text-text_2 sm:ml-4 underline cursor-pointer"
												onClick={() => {
													currentCustomerSignOut.refetch()

													setTimeout(() => {
														currentCustomer.refetch()
													}, 1000)
												}}
											>
												sign out
											</div>
										</div>
									</div>
									<div class="space-y-3 flex-grow ">
										<div class="text-sm sm:text-lg text-text_2">Account Information</div>
										<ProductInformationTabs currentCustomer={currentCustomer?.data?.customer} />
									</div>
									<div class="mt-auto flex-shrink">
										<div class="space-y-3">
											<div>
												<div class="flex items-center space-x-3 ">
													<div class="i-wpf-faq h-4 w-4 sm:w-6 sm:h-6 text-text_2" />
													<div class="text-sm lg:text-lg">Questions? </div>
												</div>
												<div class="text-xs lg:text-sm">Please visit out FAQ section for more information</div>
											</div>
											<div>
												<div class="flex items-center space-x-3">
													<div class="i-mdi-email-edit-outline h-4 w-4 sm:w-6 sm:h-6 text-text_2" />
													<div class="text-sm lg:text-lg">Something wrong? </div>
												</div>
												<div class="text-xs lg:text-sm">
													If you spotted something wrong with your order please contact us support@modernedge.com
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Show>
					</Suspense>
				</div>
			</div>
		</main>
	)
}

export function ProductInformationTabs(props: { currentCustomer: Customer }) {
	const [activeTab, setActiveTab] = createSignal({
		overview: 'active',
		profile: 'inactive',
		orders: 'inactive',
		reviews: 'inactive',
		wishlist: 'inactive'
	})

	return (
		<div>
			<TabNav
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			<div class="text-sm h-full">
				<Suspense>
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
						<Show when={activeTab().overview === 'active'}>
							<OverviewActiveTab currentCustomer={props.currentCustomer} />
						</Show>
						<Show when={activeTab().profile === 'active'}>
							<ProfileActiveTab currentCustomer={props.currentCustomer} />
						</Show>
						<Show when={activeTab().orders === 'active'}>
							<OrdersActiveTab currentCustomer={props.currentCustomer} />
						</Show>
						<Show when={activeTab().reviews === 'active'}>
							<ReviewsActiveTab currentCustomer={props.currentCustomer} />
						</Show>
						<Show when={activeTab().wishlist === 'active'}>
							<WishListActiveTab currentCustomer={props.currentCustomer} />
						</Show>
					</TransitionGroup>
				</Suspense>
			</div>
		</div>
	)
}

export function OverviewActiveTab(props: { currentCustomer: Customer }) {
	const [sortedOrders, setSortedOrders] = createSignal<any[]>([])

	createEffect(() => {
		let sorted = [...props.currentCustomer?.orders].sort((a, b) => b.display_id - a.display_id)
		setSortedOrders(sorted)
	})

	return (
		<div class="p-1 rounded-sm bg-normal_1 ">
			<div class=" mb-3 text-text_2">
				<Show when={props.currentCustomer?.orders}>
					<div class="my-2 font-500 text-xs sm:text-sm">Recent orders</div>
					<ul class="space-y-4 ">
						<For each={sortedOrders()}>
							{(order: any) => {
								const [open, setOpen] = createSignal(false)

								const { medusa } = useGlobalContext()
								const currentOrder = createQuery(() => ({
									queryKey: ['current_order', order.id],
									queryFn: async function () {
										const customerOrder = await medusa?.orders?.retrieve(order.id)
										return customerOrder
									},
									retry: 0,
									enabled: false
								}))

								const createdAtDate = new Date(order.created_at)
								const formattedDate = `${createdAtDate.getFullYear()}${(createdAtDate.getMonth() + 1)
									.toString()
									.padStart(2, '0')}${createdAtDate.getDate().toString().padStart(2, '0')}`
								const formattedOrderId = `${formattedDate}-${order.display_id}`

								return (
									<li>
										<div
											class="flex sm:flex-row justify-between cursor-pointer p-1.5 rounded-sm hover:bg-text_2/5"
											onClick={() => {
												currentOrder.refetch()
												setOpen(open => !open)
											}}
										>
											<div>
												<div class="text-xs sm:text-sm">Order date:</div>
												<div class="text-xs sm:text-sm font-500 capitalize">
													{new Date(order.created_at).toLocaleDateString('en-US', {
														month: 'long',
														day: 'numeric',
														year: 'numeric'
													})}
												</div>
											</div>
											<div class="hidden sm:block">
												<div class="text-sm">Order number:</div>
												<div class="text-sm">#{formattedOrderId}</div>
											</div>
											<div>
												<div class="text-xs sm:text-sm">Payment status:</div>
												<div class="flex ">
													<div
														class={clsx(
															'flex items-center ',
															order.payment_status === 'not_paid' && 'text-accent_3',
															order.payment_status === 'awaiting' && 'text-text_4/80',
															order.payment_status === 'captured' && 'text-accent_2',
															order.payment_status === 'partially_refunded' && 'text-yellow-500',
															order.payment_status === 'refunded' && 'text-accent_3',
															order.payment_status === 'canceled' && 'text-accent_3',
															order.payment_status === 'requires_action' && 'text-yellow-500'
														)}
													>
														<div class="i-material-symbols-circle mr-0.5 w-2.5" />
													</div>
													<div class="text-xs sm:text-sm font-500 capitalize ">
														{order.payment_status === 'awaiting'
															? 'Pending'
															: order.payment_status === 'captured'
															? 'Complete'
															: order.payment_status}
													</div>
												</div>
											</div>
											<div>
												<div>
													<div class="text-xs sm:text-sm">Shipping status:</div>
													<div class="flex">
														<div
															class={clsx(
																'text-sm flex items-center',
																order.fulfillment_status === 'not_fulfilled' && 'text-text_4/80',
																order.fulfillment_status === 'partially_fulfilled' && 'text-yellow-500',
																order.fulfillment_status === 'fulfilled' && 'text-blue-500',
																order.fulfillment_status === 'partially_shipped' && 'text-yellow-500',
																order.fulfillment_status === 'shipped' && 'text-accent_2',
																order.fulfillment_status === 'partially_returned' && 'text-yellow-500',
																order.fulfillment_status === 'returned' && 'text-accent_3',
																order.fulfillment_status === 'canceled' && 'text-accent_3',
																order.fulfillment_status === 'requires_action' && 'text-yellow-500'
															)}
														>
															<div class="i-material-symbols-circle mr-0.5 w-2.5" />
														</div>
														<div class="font-500 capitalize text-xs sm:text-sm">
															{order.fulfillment_status === 'not_fulfilled'
																? 'Pending'
																: order.fulfillment_status === 'fulfilled'
																? 'In Progress'
																: order.fulfillment_status}
														</div>
													</div>
												</div>
											</div>
											<div class="hidden sm:block">
												<div class="text-sm ">Order Items:</div>
												<div class="text-sm">{order.items.length}</div>
											</div>
										</div>
										<Show when={currentOrder.isSuccess}>
											<dialog
												data-modal
												open={open()}
												id="dialog"
												aria-hidden="true"
												class="fixed top-0 left-0 right-0 z-50  overflow-x-hidden overflow-y-auto md:inset-0 bg-transparent min-w-100svw sm:min-w-800px "
											>
												<div class="relative sm:w-full md:max-w-2xl md:max-h-full bg-transparent">
													{/*  <!-- Modal content --> */}
													<div class="relative bg-normal_2 rounded-lg shadow border-1 border-surface ">
														{/*  <!-- Modal header --> */}

														<div class="flex items-start justify-between p-4 border-b rounded-t  ">
															<div class="flex flex-col space-y-5">
																<h3 class="text-base md:text-xl font-semibold text-text_2 tracking-tighter text-balance ">
																	Order: <div class="text-sm">#{formattedOrderId}</div>
																</h3>
																<div>
																	<h4 class="text-xs text-text_3">
																		purchased on{' '}
																		{new Date(currentOrder?.data?.order?.created_at).toLocaleDateString('en-US', {
																			month: 'long',
																			day: 'numeric',
																			year: 'numeric'
																		})}
																	</h4>
																	<h4 class="text-xs text-text_3">order id: {currentOrder?.data?.order?.id.replace('order_', '')}</h4>
																</div>
															</div>
															<button
																type="button"
																class="text-text_3 bg-transparent hover:bg-normal_2 hover:text-text_1 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  "
																data-modal-hide="defaultModal"
																onClick={() => {
																	setOpen(open => !open)
																}}
															>
																<svg
																	aria-hidden="true"
																	class="w-5 h-5"
																	fill="currentColor"
																	viewBox="0 0 20 20"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		fill-rule="evenodd"
																		d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
																		clip-rule="evenodd"
																	></path>
																</svg>
																<span class="sr-only">Close modal</span>
															</button>
														</div>
														{/*  <!-- Modal body --> */}
														<div class="p-6 space-y-6 flex flex-col bg-normal_2">
															<div class="sm:flex sm:justify-between space-y-5 sm:space-y-auto">
																<div class="text-text_2 text-sm">
																	<div class="text-xs text-text_4">Shipping Address:</div>
																	<div>
																		{currentOrder?.data?.order?.shipping_address?.first_name}{' '}
																		{currentOrder?.data?.order?.shipping_address?.last_name}
																	</div>
																	<div>{currentOrder?.data?.order?.shipping_address?.address_1}</div>
																	<div>{currentOrder?.data?.order?.shipping_address?.address_2}</div>
																	<div>
																		{currentOrder?.data?.order?.shipping_address?.city},{' '}
																		{currentOrder?.data?.order?.shipping_address?.province}{' '}
																		{currentOrder?.data?.order?.shipping_address?.postal_code}
																	</div>
																	<div>{currentOrder?.data?.order?.shipping_address?.country}</div>
																	<div>{currentOrder?.data?.order?.shipping_address?.phone}</div>
																</div>
																<div class="flex flex-col space-y-2 text-text_2">
																	<div class="flex space-x-2">
																		<div class="text-xs text-text_4">Delivery method:</div>
																		<div class="text-text_2 text-xs">
																			{currentOrder?.data?.order?.shipping_methods[0]?.shipping_option?.name}
																		</div>
																	</div>
																	<div class="text-xs text-text_4">Tracking Numbers:</div>
																	<div class="text-text_2 text-sm">
																		<For each={currentOrder?.data?.order?.fulfillments[0]?.tracking_links}>
																			{(link: any) => {
																				return (
																					<div class="text-text_2 text-sm">
																						<a
																							href={link.url}
																							target="_blank"
																							rel="noreferrer"
																						>
																							{link.tracking_number}
																						</a>
																					</div>
																				)
																			}}
																		</For>
																	</div>
																</div>
															</div>
															<div class="text-xs text-text_4 mb-2">
																<div>Order Summary:</div>
																<div class="flex justify-between max-w-200px">
																	Subtotal
																	<div>
																		{currencyFormat(currentOrder?.data?.order?.subtotal, currentOrder?.data?.order?.currency_code)}
																	</div>
																</div>
																<div class="flex justify-between max-w-200px">
																	Discounts
																	<div>
																		{currencyFormat(currentOrder?.data?.order?.discount_total, currentOrder?.data?.order?.currency_code)}
																	</div>
																</div>
																<div class="flex justify-between max-w-200px">
																	Gift Cards
																	<div>
																		{currencyFormat(currentOrder?.data?.order?.gift_card_total, currentOrder?.data?.order?.currency_code)}
																	</div>
																</div>
																<div class="flex justify-between max-w-200px">
																	Shipping
																	<div>
																		{currencyFormat(currentOrder?.data?.order?.shipping_total, currentOrder?.data?.order?.currency_code)}
																	</div>
																</div>
																<div class="flex justify-between max-w-200px">
																	Taxes
																	<div>
																		{currencyFormat(currentOrder?.data?.order?.tax_total, currentOrder?.data?.order?.currency_code)}
																	</div>
																</div>

																<div class="flex justify-between max-w-200px text-sm font-500 text-text_2 mb-2">
																	Total{' '}
																	<div>{currencyFormat(currentOrder?.data?.order?.total, currentOrder?.data?.order?.currency_code)}</div>
																</div>
															</div>
															<div class=" text-text_2 text-sm">
																<div class="text-xs text-text_4 mb-2">Items:</div>

																<ol>
																	<For each={currentOrder?.data?.order?.items}>
																		{(item: any) => {
																			return (
																				<li>
																					<div class="text-xs text-text_4">Quantity: {item.quantity}</div>
																					<div class="sm:flex sm:justify-between sm:items-center sm:space-x-10 mb-1 sm:min-w-500px">
																						<h6>{item.title}</h6>
																						<div class="text-xs text-text_4">{item.description}</div>
																						<div>{currencyFormat(item.unit_price, item.currency_code)}</div>
																					</div>
																					<div class="flex justify-between items-center space-x-10 mb-1"></div>
																				</li>
																			)
																		}}
																	</For>
																</ol>
															</div>
														</div>
														{/*  <!-- Modal footer --> */}
														<div class="flex items-center p-6 space-x-2 border-t border-normal_2 rounded-b ">
															<button
																data-modal-hide="defaultModal"
																type="button"
																class="text-text_2 bg-normal_1 hover:bg-normal_2 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-normal_2 text-sm font-medium px-5 py-2.5 hover:text-text_1 focus:z-10"
																onClick={() => {
																	setOpen(open => !open)
																}}
															>
																Close
															</button>
														</div>
													</div>
												</div>
											</dialog>
										</Show>
										<hr class="border-text_3/40 my-2 mx-6" />
									</li>
								)
							}}
						</For>
					</ul>
				</Show>
				<Show when={props.currentCustomer?.orders.length === 0}>
					<div>No Orders Available</div>
				</Show>
			</div>
		</div>
	)
}

export function ProfileActiveTab(props: { currentCustomer: Customer }) {
	return (
		<div class="p-4 rounded-lg bg-normal_1  space-y-6">
			<div>Profile Active Tab</div>
		</div>
	)
}

export function OrdersActiveTab(props: { currentCustomer: Customer }) {
	return (
		<div class="p-4 rounded-lg bg-normal_1  space-y-6 text-sm">
			<div>
				<div class="text-text_2 flex space-x-2">
					<div>Orders</div>
				</div>
				<div class="text-text_200 ">Order 1</div>
			</div>
		</div>
	)
}

export function ReviewsActiveTab(props: { currentCustomer: Customer }) {
	let variantIds = new Set()

	const [variantId, setVariantId] = createSignal(Array.from(variantIds).join(','))
	const [reviewVariant, setReviewVariant] = createSignal('')

	function handleVariantIdChange(e: any) {
		const newVariantId = e.target.value
		variantIds.add(newVariantId)
		setVariantId(Array.from(variantIds).join(','))
	}

	const currentProductId = createQuery(() => ({
		queryKey: ['product_review_id', reviewVariant()],
		queryFn: async function () {
			const medusaURL = import.meta.env.VITE_PUBLIC_MEDUSA_BACKEND_URL
			const variant = await fetch(`${medusaURL}/store/variants/${reviewVariant()}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				if (res.ok) {
					return res.json()
				} else {
					throw new Error('Something went wrong')
				}
			})
			return variant
		},
		retry: 0,
		enabled: false
	}))

	const currentUserReviews = createQuery(() => ({
		queryKey: ['currentUserReviews'],
		queryFn: async function () {
			const bearerToken = import.meta.env.VITE_BEARER_TOKEN

			const response = await fetch(
				`https://direct.shauns.cool/items/main_review?filter[customer_id][_eq]=${props.currentCustomer?.id}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
						Authorization: `Bearer ${bearerToken}`
					}
				}
			)

			const data = await response.json()
			return data
		},
		retry: 0,
		enabled: props.currentCustomer?.id !== undefined
	}))

	createEffect(() => {
		console.log(currentUserReviews.isSuccess)
	})

	function userProductReviewedList(currentId: string) {
		let userProductReviews = new Set()
		if (currentUserReviews.isSuccess) {
			currentUserReviews?.data?.data?.forEach((review: any) => {
				userProductReviews.add(review.variant_id)
			})
		}
		return userProductReviews.has(currentId)
	}

	function reviewByVariantId(currentId: string) {
		let userRating
		if (currentUserReviews.isSuccess) {
			currentUserReviews?.data?.data?.forEach((review: any) => {
				if (review.variant_id === currentId) {
					userRating = review.user_rating
				}
			})
		}
		return userRating
	}

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

	let variantIdsAndImages = new Set()
	const [sortedOrders, setSortedOrders] = createSignal<any[]>([])

	createEffect(() => {
		let sorted = [...props.currentCustomer?.orders].sort((a, b) => b.display_id - a.display_id)
		setSortedOrders(sorted)
	})

	return (
		<div class="sm:p-4 rounded-lg bg-normal_1  space-y-3 text-sm">
			<Show when={props.currentCustomer?.orders && currentUserReviews.isSuccess}>
				<div class="text-sm sm:text-lg text-text_2">Items that need a review:</div>
				<ul class="space-y-2">
					<For each={sortedOrders()}>
						{(order: any) => {
							if (order?.fulfillment_status !== 'shipped') return

							return (
								<li>
									<For each={order.items}>
										{(item: any) => {
											let idAndImage = item.variant_id + item.image
											if (variantIdsAndImages.has(idAndImage)) return
											variantIdsAndImages.add(idAndImage)

											variantIds.add(item.variant_id)
											handleVariantIdChange({ target: { value: item.variant_id } })

											const [open, setOpen] = createSignal(false)
											const [userName, setUserName] = createSignal('')
											const [title, setTitle] = createSignal('')
											const [body, setBody] = createSignal('')
											const [rating, setRating] = createSignal(0)
											const [errorMessage, setErrorMessage] = createSignal('')
											const [productId, setProductId] = createSignal({ id: '', name: '' })

											const handleRating = (value: any) => {
												setRating(value)
											}

											const handleSubmit = (e: any) => {
												e.preventDefault()
												if (!userName() || !title() || !body() || rating() === 0) {
													setErrorMessage('Please complete the form before submitting.')
												} else {
													setErrorMessage('')
													// Handle form submission here
													reviewMutate.refetch()

													setTimeout(() => {
														currentUserReviews.refetch()
													}, 250)
													setOpen(false)
												}
											}

											createEffect(() => {
												console.log('CUR', currentProductId?.data?.variant.product_id)
											})
											createEffect(() => {
												console.log('PROD', productId().id, productId().name)
											})

											const reviewMutate = createQuery(() => ({
												queryKey: ['review_mutate'],
												queryFn: async function () {
													const bearerToken = import.meta.env.VITE_BEARER_TOKEN
													const reviewData = {
														product_id: productId().id,
														variant_id: item.variant_id,
														customer_id: props.currentCustomer?.id,
														user_title: title(),
														user_body: body(),
														user_rating: rating(),
														user_name: userName()
													}

													const response = await fetch(`https://direct.shauns.cool/items/main_review`, {
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

											const productMutate = createQuery(() => ({
												queryKey: ['product_mutate'],
												queryFn: async function () {
													const bearerToken = import.meta.env.VITE_BEARER_TOKEN
													const reviewData = {
														product_id: productId().id,
														product_name: productId().name
													}

													const response = await fetch(`https://direct.shauns.cool/items/product`, {
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
												<div class="flex items-center justify-center">
													<div
														class="grid grid-cols-6 sm:grid-cols-9 space-x-1 text-sm font-500 text-text_2 cursor-pointer w-[90svw] sm:w-[80svw] min-h-[68px]"
														tabindex="0" // add tabindex attribute to make the div focusable
													>
														<Show when={item.thumbnail}>
															<Image
																width={50}
																height={50}
																src={item.thumbnail}
																alt={item.title}
																class="-mb-px mr-2 rounded-md col-span-1 sm:col-span-1"
															></Image>
														</Show>
														<Show when={!item.thumbnail}>
															<Image
																width={50}
																height={50}
																src={`https://fakeimg.pl/100x100?text=X&font=poppins`}
															></Image>
														</Show>
														<div class="max-w-[300px] col-span-5 sm:col-span-6 flex items-center">
															<div class="line-clamp-2   ellipsis text-xs ">{item.title}</div>
														</div>
														<div class="hidden col-span-2 sm:flex items-center">{currencyFormat(Number(item.unit_price), 'US')}</div>
													</div>
													<div class=" sm:w-[20svw]">
														<button
															class="flex bg-transparent"
															onClick={() => {
																setOpen(open => !open)
																setReviewVariant(item.variant_id)
																setTimeout(() => {
																	currentProductId.refetch()
																}, 250)
															}}
															tabindex="0"
														>
															<div
																class={clsx(
																	' text-[#2563EB]',
																	userProductReviewedList(item.variant_id) && 'hidden',
																	!userProductReviewedList(item.variant_id) && 'flex items-center space-x-1'
																)}
															>
																<div class="i-ic-outline-rate-review w-5 h-5" />
																<div>Review</div>
															</div>
														</button>
														<div
															class={clsx(
																'',
																!userProductReviewedList(item.variant_id) && 'hidden',
																userProductReviewedList(item.variant_id) && 'flex items-center space-x-1'
															)}
														>
															<div class="flex flex-col items-center">
																<StarIconRequest rating={Number(reviewByVariantId(item.variant_id))} />
																<div class="text-xs text-text_4">Reviewed</div>
															</div>
														</div>

														{/* <!--Verically centered scrollable modal--> */}

														<dialog
															data-modal
															open={open()}
															id="dialog"
															aria-hidden="true"
															class="fixed top-0 left-0 right-0 z-50  overflow-x-hidden overflow-y-auto md:inset-0 bg-transparent"
														>
															<div class="relative sm:w-full md:max-w-2xl md:max-h-full bg-transparent">
																{/*  <!-- Modal content --> */}
																<div class="relative bg-normal_2 rounded-lg shadow border-1 border-surface ">
																	{/*  <!-- Modal header --> */}

																	<div class="flex items-start justify-between p-4 border-b rounded-t ">
																		<div class="flex flex-col">
																			<h3 class="text-base md:text-xl font-semibold text-text_2 tracking-tighter text-balance ">
																				{item.title}
																			</h3>
																			<h4 class="text-xs text-text_2">purchased {formatDate(item.created_at)}</h4>
																		</div>
																		<button
																			type="button"
																			class="text-text_3 bg-transparent hover:bg-normal_2 hover:text-text_1 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  "
																			data-modal-hide="defaultModal"
																			onClick={() => {
																				setOpen(open => !open)
																			}}
																		>
																			<svg
																				aria-hidden="true"
																				class="w-5 h-5"
																				fill="currentColor"
																				viewBox="0 0 20 20"
																				xmlns="http://www.w3.org/2000/svg"
																			>
																				<path
																					fill-rule="evenodd"
																					d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
																					clip-rule="evenodd"
																				></path>
																			</svg>
																			<span class="sr-only">Close modal</span>
																		</button>
																	</div>
																	{/*  <!-- Modal body --> */}
																	<div class="p-6 space-y-6 flex flex-col bg-normal_2">
																		<form
																			onSubmit={handleSubmit}
																			class="min-w-80vw sm:min-w-50vw lg:min-w-40vw xl:min-w-30vw"
																		>
																			<div class="p-6 space-y-6 flex flex-col">
																				<p class="text-base leading-relaxed text-text_2 font-500">Review</p>
																				<Show when={errorMessage()}>
																					<div class="text-accent_3 text-xs">{errorMessage()}</div>
																				</Show>
																				<div>
																					{[1, 2, 3, 4, 5].map(star => (
																						<button
																							class="w-5 h-5 bg-transparent text-text_4"
																							type="button"
																							onClick={() => {
																								handleRating(star)
																								setProductId({
																									...productId(),
																									id: currentProductId?.data?.variant.product_id,
																									name: currentProductId?.data?.variant?.product?.title
																								})
																								productMutate.refetch()
																							}}
																						>
																							{star <= rating() ? (
																								<div class="i-material-symbols-star w-5 h-5 text-amber-6" />
																							) : (
																								<div class="i-material-symbols-star-outline w-5 h-5" />
																							)}
																						</button>
																					))}
																				</div>
																				<input
																					type="text"
																					value={userName()}
																					onInput={e => setUserName(e.target.value)}
																					placeholder="User Name"
																					class="w-full min-h-2rem border border-1 border-surface p-1 text-text_2 focus:outline-none focus:border-accent_6 focus:ring-1 focus:ring-accent_5"
																				/>
																				<input
																					type="text"
																					value={title()}
																					onInput={e => setTitle(e.target.value)}
																					placeholder="Title"
																					class="w-full min-h-2rem border border-1 border-surface p-1 text-text_2 focus:outline-none focus:border-accent_6 focus:ring-1 focus:ring-accent_5"
																				/>
																				<textarea
																					value={body()}
																					onInput={e => setBody(e.target.value)}
																					placeholder="Review Text"
																					class="w-full h-full min-h-10rem resize-y border border-1 border-surface p-1 text-text_2 focus:outline-none focus:border-accent_6 focus:ring-1 focus:ring-accent_5"
																				/>
																			</div>
																		</form>
																	</div>
																	{/*  <!-- Modal footer --> */}
																	<div class="flex items-center p-6 space-x-2 border-t border-normal_2 rounded-b ">
																		<button
																			data-modal-hide="defaultModal"
																			type="button"
																			class="text-normal_1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
																			onClick={e => {
																				handleSubmit(e)
																			}}
																		>
																			Accept
																		</button>
																		<button
																			data-modal-hide="defaultModal"
																			type="button"
																			class="text-text_2 bg-normal_1 hover:bg-normal_2 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-normal_2 text-sm font-medium px-5 py-2.5 hover:text-text_1 focus:z-10"
																			onClick={() => {
																				setOpen(open => !open)
																				setBody('')
																				setTitle('')
																				setUserName('')
																				setRating(0)
																			}}
																		>
																			Cancel
																		</button>
																	</div>
																</div>
															</div>
														</dialog>
													</div>
												</div>
											)
										}}
									</For>
								</li>
							)
						}}
					</For>
				</ul>
			</Show>
		</div>
	)
}

export function WishListActiveTab(props: { currentCustomer: Customer }) {
	return (
		<div class="p-4 rounded-lg bg-normal_2  space-y-6 text-sm">
			<div>
				<div class="text-text_2 flex space-x-2">
					<div>Orders</div>
				</div>
				<div class="text-text_200 ">Order 1</div>
			</div>
		</div>
	)
}

export function StarIconRequest(props: { rating: number }) {
	//round rating to nearist half

	const [rating, setRating] = createSignal(props.rating)

	createEffect(() => {
		const roundRating = Math.round(props.rating * 2) / 2

		setRating(roundRating)
	})

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

	return <div class=" text-text_2 flex">{getStarIcon(rating())}</div>
}
