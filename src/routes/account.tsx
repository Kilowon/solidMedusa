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

	createEffect(() => {
		console.log(currentCustomer.isSuccess)
	})

	return (
		<main>
			<Navigation />
			<div>
				<div class="flex flex-col lg:flex-row lg:w-full sm:mt-20 lg:mt-0">
					<Suspense
						fallback={
							<section class="flex justify-center h-[100vh] w-[100vw] p-16 text-orange-600 bg-gray-100 text-xl">
								<div class="flex flex-col items-center">
									<Image
										src="https://res.cloudinary.com/contentdelivery/image/upload/v1684413389/couch_npht3q.webp"
										alt="logo"
										layout="constrained"
										width={600}
										height={600}
										priority={true}
										class="w-20 h-20 mt-35 md:mt-70"
									/>
									<div class="i-svg-spinners:bars-scale-fade" />
								</div>
							</section>
						}
					>
						<Show when={!currentCustomer.isSuccess}>
							<div
								class={clsx(
									'flex lg:h-100svh justify-center items-center lg:w-1/2 pt-2 sm:pt-12 lg:pt-0',
									side() === 'left' && '',
									side() === 'right' && 'lg:bg-gray-1 transition-all duration-300'
								)}
								onMouseOver={() => {
									setSide('left')
								}}
								onBlur={() => {
									setSide('left')
								}}
							>
								<SignUp
									side={side}
									currentCustomer={currentCustomer}
								/>
							</div>

							<div
								class={clsx(
									'flex lg:h-100svh justify-center items-center lg:w-1/2 pt-12 lg:pt-0',
									side() === 'left' && 'lg:bg-gray-1 transition-all duration-600',
									side() === 'right' && ''
								)}
								onMouseOver={() => {
									setSide('right')
								}}
							>
								<SignIn
									side={side}
									currentCustomer={currentCustomer}
								/>
							</div>
						</Show>
						<Show when={currentCustomer.isSuccess}>
							<div class=" w-full max-h-90svh">
								<div class="flex flex-col  sm:content-container md:max-w-900px  justify-center lg:mt-20 space-y-2 sm:space-y-6 lg:space-y-10  ">
									<div class="sm:flex items-center justify-between">
										<div class="text-xl font-400 font-poppins text-gray-6 pl-1 sm:pl-0">Welcome back</div>
										<div class="flex justify-between p-1">
											<div class="text-xs font-500 font-poppins text-gray-6">
												Signed in as: {currentCustomer?.data?.customer?.email}
											</div>
											<div
												class="text-xs font-500 font-poppins sm:ml-4 underline cursor-pointer"
												onClick={() => {
													currentCustomerSignOut.refetch()
													currentCustomer.refetch()
												}}
											>
												sign out
											</div>
										</div>
									</div>
									<div class="space-y-3 flex-grow ">
										<div class="">Account Information</div>
										<ProductInformationTabs currentCustomer={currentCustomer?.data?.customer} />
									</div>
									<div class="mt-auto flex-shrink">
										<div class="space-y-3">
											<div>
												<div class="flex items-center space-x-3 ">
													<div class="i-wpf-faq w-6 h-6 text-gray-7" />
													<div class="text-lg">Questions? </div>
												</div>
												<div class="text-sm">Please visit out FAQ section for more information</div>
											</div>
											<div>
												<div class="flex items-center space-x-3">
													<div class="i-mdi-email-edit-outline w-6 h-6 text-gray-7" />
													<div class="text-lg">Something wrong? </div>
												</div>
												<div class="text-sm">
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
		overview: 'inactive',
		profile: 'inactive',
		orders: 'inactive',
		reviews: 'active',
		wishlist: 'inactive'
	})

	return (
		<div>
			<TabNav
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
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
			</div>
		</div>
	)
}

export function OverviewActiveTab(props: { currentCustomer: Customer }) {
	return (
		<div class="p-1 rounded-sm bg-gray-50 dark:bg-gray-800">
			<p class=" mb-3 text-gray-500 dark:text-gray-400">
				<Show when={props.currentCustomer?.orders}>
					<div class="my-2 font-500">Recent orders</div>
					<ul class="space-y-4 ">
						<For each={props.currentCustomer?.orders}>
							{(order: any) => {
								return (
									<li>
										<div
											class="flex sm:flex-row justify-between cursor-pointer p-1.5 rounded-sm hover:bg-gray-6/5"
											onClick={() => {}}
										>
											<div>
												<div class="text-sm">Order date:</div>
												<div class="text-sm font-500 capitalize">
													{new Date(order.created_at).toLocaleDateString('en-US', {
														month: 'long',
														day: 'numeric',
														year: 'numeric'
													})}
												</div>
											</div>
											<div class="hidden sm:block">
												<div class="text-sm">Order number:</div>
												<div class="text-sm">#{order.display_id}</div>
											</div>
											<div>
												<div class="text-sm">Payment status:</div>
												<div class="flex">
													<div
														class={clsx(
															'flex items-center',
															order.payment_status === 'not_paid' && 'text-red-500',
															order.payment_status === 'awaiting' && 'text-gray-500',
															order.payment_status === 'captured' && 'text-green-500',
															order.payment_status === 'partially_refunded' && 'text-yellow-500',
															order.payment_status === 'refunded' && 'text-red-500',
															order.payment_status === 'canceled' && 'text-red-500',
															order.payment_status === 'requires_action' && 'text-yellow-500'
														)}
													>
														<div class="i-material-symbols-circle mr-0.5 w-2.5" />
													</div>
													<div class="text-sm font-500 capitalize ">
														{order.payment_status === 'awaiting' ? 'Pending' : order.payment_status}
													</div>
												</div>
											</div>
											<div>
												<div>
													<div class="text-sm">Shipping status:</div>
													<div class="flex">
														<div
															class={clsx(
																'text-sm flex items-center',
																order.fulfillment_status === 'not_fulfilled' && 'text-gray-500',
																order.fulfillment_status === 'partially_fulfilled' && 'text-yellow-500',
																order.fulfillment_status === 'fulfilled' && 'text-blue-400',
																order.fulfillment_status === 'partially_shipped' && 'text-yellow-500',
																order.fulfillment_status === 'shipped' && 'text-green-500',
																order.fulfillment_status === 'partially_returned' && 'text-yellow-500',
																order.fulfillment_status === 'returned' && 'text-red-500',
																order.fulfillment_status === 'canceled' && 'text-red-500',
																order.fulfillment_status === 'requires_action' && 'text-yellow-500'
															)}
														>
															<div class="i-material-symbols-circle mr-0.5 w-2.5" />
														</div>
														<div class="font-500 capitalize">
															{order.fulfillment_status === 'not_fulfilled' ? 'Pending' : order.fulfillment_status}
														</div>
													</div>
												</div>
											</div>
											<div class="hidden sm:block">
												<div class="text-sm ">Order Items:</div>
												<div class="text-sm">{order.items.length}</div>
											</div>
										</div>
										<hr class="border-gray-400/40 my-2 mx-6" />
									</li>
								)
							}}
						</For>
					</ul>
				</Show>
				<Show when={props.currentCustomer?.orders.length === 0}>
					<div>No Orders Available</div>
				</Show>
			</p>
		</div>
	)
}

export function ProfileActiveTab(props: { currentCustomer: Customer }) {
	return (
		<div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-6">
			<div>Profile Active Tab</div>
		</div>
	)
}

export function OrdersActiveTab(props: { currentCustomer: Customer }) {
	return (
		<div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-6 text-sm">
			<div>
				<div class="text-gray-500 dark:text-gray-400 flex space-x-2">
					<div>Orders</div>
				</div>
				<div class="text-gray-600 dark:text-gray-300">Order 1</div>
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

	const currentCustomerSignOut = createQuery(() => ({
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
	return (
		<div class="sm:p-4 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-3 text-sm">
			<Show when={props.currentCustomer?.orders}>
				<div>Items that need a review:</div>
				<ul class="space-y-2">
					<For each={props.currentCustomer?.orders}>
						{(order: any) => {
							if (order?.fulfillment_status !== 'shipped') return
							return (
								<li>
									<For each={order.items}>
										{(item: any) => {
											if (variantId() === item.variant_id) return

											variantIds.add(item.variant_id)
											handleVariantIdChange({ target: { value: item.variant_id } })

											const [open, setOpen] = createSignal(false)
											return (
												<div class="flex items-center justify-center">
													<div
														class="grid grid-cols-9 space-x-1 text-sm font-500 text-gray-500 cursor-pointer w-[90svw] sm:w-[80svw] min-h-[68px]"
														tabindex="0" // add tabindex attribute to make the div focusable
													>
														<Image
															width={50}
															height={50}
															src={item.thumbnail}
															alt={item.title}
															class="-mb-px mr-2 rounded-md col-span-2 sm:col-span-1"
														></Image>
														<div class="max-w-[300px] col-span-4 sm:col-span-6 flex items-center">
															<div class="line-clamp-2   ellipsis text-xs ">{item.title}</div>
														</div>
														<div class="col-span-2 flex items-center">{currencyFormat(Number(item.unit_price), 'US')}</div>
													</div>
													<div class=" sm:w-[20svw]">
														<button
															class="flex text-gray-5 bg-transparent hover:text-gray-8 "
															onClick={() => {
																setOpen(open => !open)
																setReviewVariant(item.variant_id)
																setTimeout(() => {
																	currentCustomerSignOut.refetch()
																}, 250)
															}}
															tabindex="0"
														>
															<div class="flex items-center space-x-1">
																<div class="i-ic-outline-rate-review w-5 h-5" />
																<div>Review</div>
															</div>
														</button>

														{/* <!--Verically centered scrollable modal--> */}

														<dialog
															data-modal
															open={open()}
															id="dialog"
															aria-hidden="true"
															class="fixed top-0 left-0 right-0 z-50  overflow-x-hidden overflow-y-auto md:inset-0"
															style="backdrop-filter: blur(50px)"
														>
															<div class="relative w-full max-w-2xl max-h-full">
																{/*  <!-- Modal content --> */}
																<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
																	{/*  <!-- Modal header --> */}
																	<div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
																		<h3 class="text-xl font-semibold text-gray-900 dark:text-white">Review</h3>
																		<button
																			type="button"
																			class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
																	<div class="p-6 space-y-6">
																		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
																			With less than a month to go before the European Union enacts new consumer privacy laws for its
																			citizens, companies around the world are updating their terms of service agreements to comply.
																		</p>
																		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
																			The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is
																			meant to ensure a common set of data rights in the European Union. It requires organizations to
																			notify users as soon as possible of high-risk data breaches that could personally affect them.
																		</p>
																	</div>
																	{/*  <!-- Modal footer --> */}
																	<div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
																		<button
																			data-modal-hide="defaultModal"
																			type="button"
																			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
																		>
																			I accept
																		</button>
																		<button
																			data-modal-hide="defaultModal"
																			type="button"
																			class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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
		<div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-6 text-sm">
			<div>
				<div class="text-gray-500 dark:text-gray-400 flex space-x-2">
					<div>Orders</div>
				</div>
				<div class="text-gray-600 dark:text-gray-300">Order 1</div>
			</div>
		</div>
	)
}
