import { createEffect, Show, createSignal, For } from 'solid-js'
import { useGlobalContext } from '~/Context/Providers'
import { createQuery } from '@tanstack/solid-query'
import { currencyFormat } from '~/lib/helpers/currency'
import { useParams, A } from 'solid-start'

export default function Order() {
	const params = useParams()

	const { medusa } = useGlobalContext()

	const [orderNumber, setOrderNumber] = createSignal<any>('')

	const currentOrder = createQuery(() => ({
		queryKey: ['currentOrder', params.handle],
		queryFn: async function () {
			const customerOrder = await medusa?.orders?.retrieve(params.handle)
			return customerOrder
		},
		retry: 0,
		enabled: !!params.handle
	}))

	createEffect(() => {
		if (currentOrder?.data?.order?.id !== params.handle) {
			currentOrder.refetch()
		}
	})

	createEffect(() => {
		const createdAtDate = new Date(currentOrder?.data?.order?.created_at)
		const formattedDate = `${createdAtDate.getFullYear()}${(createdAtDate.getMonth() + 1)
			.toString()
			.padStart(2, '0')}${createdAtDate.getDate().toString().padStart(2, '0')}`
		const formattedOrderId = `${formattedDate}-${currentOrder?.data?.order?.display_id}`
		setOrderNumber(formattedOrderId)
	})

	return (
		<div class="min-h-200vh p-1 rounded-sm bg-normal_1 ">
			<div class=" mb-3 text-text_2">
				<Show when={currentOrder.isSuccess}>
					<div class="flex flex-col justify-center items-center space-y-10 ">
						<div class="flex justify-center items-center mt-10">
							<div class="i-ic-outline-check-circle h-7 w-7 bg-green-6" />
							<h1 class="text-text_2 text-xl font-500">Thank you for your order!</h1>
						</div>
						<h2 class="sm:flex justify-center items-center text-text_2 text-xs m-2">
							<div class="i-ic-outline-email h-5 w-5 mr-1 " /> Your order has been received and is being processed. You will
							receive an email confirmation shortly.
						</h2>

						<div class="relative min-w-95% sm:min-w-auto md:max-w-2xl md:max-h-full bg-transparent">
							{/*  <!-- Modal content --> */}
							<div class="relative bg-normal_2 rounded-lg shadow border-1 border-surface ">
								{/*  <!-- Modal header --> */}

								<div class="flex items-start justify-between p-2 lg:p-4 border-b rounded-t  ">
									<div class="flex flex-col space-y-5">
										<h3 class="text-base  font-semibold text-text_2 tracking-tighter text-balance ">
											Order: <div class="text-sm">#{orderNumber()}</div>
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
										onClick={() => {}}
									>
										<span class="sr-only">Close modal</span>
									</button>
								</div>
								{/*  <!-- Modal body --> */}
								<div class="p-2 lg:p-6 space-y-6 flex flex-col bg-normal_2">
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
												{currentOrder?.data?.order?.shipping_address?.city}, {currentOrder?.data?.order?.shipping_address?.province}{' '}
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
											<div>{currencyFormat(currentOrder?.data?.order?.subtotal, currentOrder?.data?.order?.currency_code)}</div>
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
											<div>{currencyFormat(currentOrder?.data?.order?.tax_total, currentOrder?.data?.order?.currency_code)}</div>
										</div>

										<div class="flex justify-between max-w-200px text-sm font-500 text-text_2 mb-2">
											Total <div>{currencyFormat(currentOrder?.data?.order?.total, currentOrder?.data?.order?.currency_code)}</div>
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
								<div class="flex items-center p-2 lg:p-6 space-x-2 border-t border-normal_2 rounded-b "></div>
							</div>
						</div>
						<p class="text-xs max-w-600px p-2 ">
							*If you did not sign-up for a customer account, you will not be able to view your order history. **Please save
							your order number for your records. You can also bookmark this page to view this order in the future.
						</p>
					</div>
				</Show>
				<hr class="border-text_3/40 my-2 mx-6" />

				<Show when={currentOrder.isError}>
					<section class="flex items-center h-full p-16 text-text_2">
						<div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
							<div class="max-w-md text-center">
								<h2 class="mb-8 font-extrabold text-9xl dark:text-gray-600">
									<span class="sr-only">Error</span>OOPS!
								</h2>
								<p class="text-2xl font-semibold md:text-3xl">Page not found</p>
								<p class="mt-4 mb-8 dark:text-gray-400">
									Sorry, we couldn't find the page you were looking for and suggest you return to our home page
								</p>
								<A
									rel="noopener noreferrer"
									href="/"
									class="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
								>
									Back to homepage
								</A>
							</div>
						</div>
					</section>
				</Show>
			</div>
		</div>
	)
}
