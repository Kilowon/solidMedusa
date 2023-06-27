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
							<div class=" w-full">
								<div class="flex flex-col sm:content-container md:max-w-900px  justify-center lg:mt-20 space-y-4">
									<div class="sm:flex items-center justify-between">
										<div class="text-2xl font-400 font-poppins text-gray-6">Welcome back</div>
										<div class="text-xs font-500 font-poppins text-gray-6">
											Signed in as: {currentCustomer?.data?.customer?.email}
										</div>
									</div>
									<div class="space-y-3">
										<div>Account Information</div>
										<ProductInformationTabs currentCustomer={currentCustomer?.data?.customer} />
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

export function SignUp(props: SideProps) {
	const [customerSignUp, { Form, Field }] = createForm<PaymentForm>()
	const { queryCart } = useGlobalContext()
	const { medusa } = useGlobalContext()
	const [emailValue, setEmailValue] = createSignal('')
	const [passwordValue, setPasswordValue] = createSignal('')
	const [error, setError] = createSignal('hidden')
	const [errorMessage, setErrorMessage] = createSignal('')

	const [customerDelayPassed, setCustomerDelayPassed] = createSignal('show')

	createEffect(() => {
		setTimeout(() => {
			setCustomerDelayPassed('hidden')
		}, 100)
	})

	function handleSubmit(values: PaymentForm) {
		setEmailValue(values.email)
		setPasswordValue(values.password)
		emailCheck.refetch()
		console.log('emailcheck', emailCheck.isSuccess)
		setTimeout(() => {
			if (emailValue() && passwordValue() && emailCheck.isSuccess) {
				createCustomer.refetch()
				setTimeout(() => {
					if (createCustomer.isSuccess) {
						setError('hidden')
						queryCart.refetch()
						props.currentCustomer.refetch()
						console.log('customer created')
					}
					if (createCustomer.failureReason) {
						setError('active')
						setErrorMessage(createCustomer.failureReason.message)
					}
				}, 500)
			}
			if (emailCheck.failureReason) {
				setError('active')
				setErrorMessage(emailCheck.failureReason.message)
			}
		}, 500)
	}

	const emailCheck = createQuery(() => ({
		queryKey: ['customer_email_check', emailValue()],
		queryFn: async function () {
			const email = await medusa?.auth.exists(emailValue())
			return email
		},
		enabled: false
	}))

	const createCustomer = createQuery(() => ({
		queryKey: ['customer_signup', emailValue()],
		queryFn: async function () {
			const customer = await medusa?.customers.create({
				first_name: '',
				last_name: '',
				email: emailValue(),
				password: passwordValue()
			})
			return customer
		},
		enabled: false
	}))

	return (
		<div
			class={clsx(
				'',
				props.side?.() === 'left' && 'none',
				props.side?.() === 'right' && 'lg:blur-sm transition-all duration-1000'
			)}
		>
			<Form onSubmit={values => handleSubmit(values) as any}>
				<div class="space-y-3 md:w-60vw  lg:w-30vw xl:w-25vw">
					<Show when={error() === 'active'}>
						<div class="text-red-7">
							<div class="text-sm">{errorMessage()}</div>
							<div class="text-sm">This email is already in use please try to login</div>
						</div>
					</Show>
					<div class="flex items-center">
						<div class="i-ic-baseline-directions-run w-6 h-6 text-gray-5" />
						<div class="text-xl font-500 font-poppins ml-2 text-gray-6">I'm new here </div>
					</div>
					<div class="">
						{/* This is a hack fix for chromium browsers default focus on mobile.... the autofocus={false} was not working ... this prevents the keyboard popping and hiding other options  */}
						<Show when={customerDelayPassed() === 'show'}>
							<Field
								name="emailDelayFake"
								validate={[required('Please enter your email.'), email('The email address is badly formatted.')]}
							>
								{(field, props) => (
									<TextInput
										{...props}
										value={field.value}
										type="email"
										label="Email"
										placeholder="example@email.com"
									/>
								)}
							</Field>
						</Show>
						<Show when={customerDelayPassed() === 'hidden'}>
							<Field
								name="email"
								validate={[required('Please enter your email.'), email('The email address is badly formatted.')]}
							>
								{(field, props) => (
									<TextInput
										{...props}
										value={field.value}
										error={field.error}
										type="email"
										//description="We'll send your order confirmation here."
										label="Email (sign up)"
										placeholder="example@email.com"
										required
									/>
								)}
							</Field>
						</Show>
						<Field
							name="password"
							validate={[
								required('Please enter your password.'),
								minLength(8, 'You password must have 8 characters or more.')
							]}
						>
							{(field, props) => (
								<TextInput
									{...props}
									value={field.value}
									error={field.error}
									type="password"
									//description="Signup for an account to access your order history."
									label="Password"
									placeholder="********"
								/>
							)}
						</Field>
						<FormFooter of={customerSignUp} />
					</div>
					<FormHeader
						of={customerSignUp}
						heading=""
					/>
				</div>
			</Form>
		</div>
	)
}

export function SignIn(props: SideProps) {
	const [customerForm, { Form, Field }] = createForm<PaymentForm>()

	const { medusa } = useGlobalContext()
	const { queryCart } = useGlobalContext()
	const [emailValue, setEmailValue] = createSignal('')
	const [passwordValue, setPasswordValue] = createSignal('')
	const [error, setError] = createSignal('hidden')
	const [errorMessage, setErrorMessage] = createSignal('')

	const [customerDelayPassed, setCustomerDelayPassed] = createSignal('show')

	function handleSubmit(values: PaymentForm) {
		setEmailValue(values.email)
		setPasswordValue(values.password)
		if (emailValue() && passwordValue()) {
			signInCustomer.refetch()
			setTimeout(() => {
				if (signInCustomer.isSuccess) {
					setError('hidden')
					queryCart.refetch()
					props.currentCustomer.refetch()
				}
				if (signInCustomer.failureReason) {
					setError('active')
					setErrorMessage(signInCustomer.failureReason.message)
				}
			}, 500)
		}
	}

	const signInCustomer = createQuery(() => ({
		queryKey: ['customer_signin', emailValue()],
		queryFn: async function () {
			const customer = await medusa?.auth.authenticate({
				email: emailValue(),
				password: passwordValue()
			})

			return customer
		},
		enabled: false
	}))

	return (
		<div
			class={clsx(
				'',
				props.side?.() === 'left' && 'lg:blur-sm  transition-all duration-1000',
				props.side?.() === 'right' && 'none'
			)}
		>
			<Form onSubmit={values => handleSubmit(values) as any}>
				<div class="space-y-3 md:w-60vw   lg:w-30vw xl:w-25vw">
					<Show when={error() === 'active'}>
						<div class="flex flex-col text-red-7">
							<div class="text-sm">{errorMessage()}</div>
							<div class="text-sm">You may have entered the wrong email or password please try again</div>
						</div>
					</Show>
					<div class="flex items-center">
						<div class="i-ic-round-hiking h-6 w-6 text-gray-5" />
						<div class="text-xl font-500 font-poppins ml-2 text-gray-6">Welcome back</div>
					</div>
					<div class="">
						{/* This is a hack fix for chromium browsers default focus on mobile.... the autofocus={false} was not working ... this prevents the keyboard popping and hiding other options  */}

						<Field
							name="email"
							validate={[required('Please enter your email.'), email('The email address is badly formatted.')]}
						>
							{(field, props) => (
								<TextInput
									{...props}
									value={field.value}
									error={field.error}
									type="email"
									//description="We'll send your order confirmation here."
									label="Email (sign in)"
									placeholder="example@email.com"
									required
								/>
							)}
						</Field>

						<Field
							name="password"
							validate={[
								required('Please enter your password.'),
								minLength(8, 'You password must have 8 characters or more.')
							]}
						>
							{(field, props) => (
								<TextInput
									{...props}
									value={field.value}
									error={field.error}
									type="password"
									//description="Signup for an account to access your order history."
									label="Password"
									placeholder="********"
								/>
							)}
						</Field>
						<FormFooter of={customerForm} />
					</div>
					<FormHeader
						of={customerForm}
						heading=""
					/>
				</div>
			</Form>
		</div>
	)
}

export function Profile(props: SideProps) {
	return <div>Profile</div>
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
			<div class="mb-4 border-b border-gray-200 dark:border-gray-700">
				<ul
					class="flex -mb-px text-xs lg:text-base font-medium text-center space-x-0.25 md:space-x-4 lg:space-x-6 "
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
								'inline-block p-1 lg:p-3 border-b-2 rounded-t-lg h-full w-18 sm:w-25 lg:w-31 bg-white md:bg-gray-1',
								activeTab().overview === 'active' && ' border-gray-600 text-gray-600 dark:border-gray-300 dark:text-gray-300',
								activeTab().overview === 'inactive' && 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
							)}
							id="description-tab"
							data-tabs-target="#description"
							type="button"
							role="tab"
							aria-controls="description"
							aria-selected="false"
							onClick={() => {
								if (activeTab().overview === 'inactive') {
									setActiveTab({
										overview: 'active',
										profile: 'inactive',
										orders: 'inactive',
										reviews: 'inactive',
										wishlist: 'inactive'
									})
									return
								}
								if (activeTab().overview === 'active') {
									setActiveTab({
										overview: 'inactive',
										profile: 'inactive',
										orders: 'inactive',
										reviews: 'inactive',
										wishlist: 'inactive'
									})
								}
							}}
						>
							<div class="flex flex-col lg:flex-row justify-center items-center ">
								<div class="i-fluent-clipboard-text-ltr-24-regular text-lg text-gray-6 lg:mr-2 " />
								Overview
							</div>
						</button>
					</li>
					<li
						class=""
						role="presentation"
					>
						<button
							class={clsx(
								'inline-block p-1 border-b-2 rounded-t-lg h-full w-18 sm:w-25 lg:w-33 bg-white md:bg-gray-1',
								activeTab().profile === 'active' && ' border-gray-600 text-gray-600 dark:border-gray-300 dark:text-gray-300',
								activeTab().profile === 'inactive' && 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
							)}
							id="profile-tab"
							data-tabs-target="#profile"
							type="button"
							role="tab"
							aria-controls="profile"
							aria-selected="false"
							onClick={() => {
								if (activeTab().profile === 'inactive') {
									setActiveTab({
										overview: 'inactive',
										profile: 'active',
										orders: 'inactive',
										reviews: 'inactive',
										wishlist: 'inactive'
									})
									return
								}
								if (activeTab().profile === 'active') {
									setActiveTab({
										overview: 'inactive',
										profile: 'inactive',
										orders: 'inactive',
										reviews: 'inactive',
										wishlist: 'inactive'
									})
								}
							}}
						>
							<div class="flex flex-col lg:flex-row justify-center items-center ">
								<div class="i-vaadin-clipboard-user text-lg bg-gray-6 lg:mr-2" />
								Profile
							</div>
						</button>
					</li>
					<li
						class=""
						role="presentation"
					>
						<button
							class={clsx(
								'inline-block p-1 border-b-2 rounded-t-lg h-full w-18 sm:w-25 lg:w-31 bg-white md:bg-gray-1',
								activeTab().orders === 'active' && ' border-gray-600 text-gray-600 dark:border-gray-300 dark:text-gray-300',
								activeTab().orders === 'inactive' && 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
							)}
							id="orders-tab"
							data-tabs-target="#orders"
							type="button"
							role="tab"
							aria-controls="orders"
							aria-selected="false"
							onClick={() => {
								if (activeTab().orders === 'inactive') {
									setActiveTab({
										overview: 'inactive',
										profile: 'inactive',
										orders: 'active',
										reviews: 'inactive',
										wishlist: 'inactive'
									})
									return
								}
								if (activeTab().orders === 'active') {
									setActiveTab({
										overview: 'inactive',
										profile: 'inactive',
										orders: 'inactive',
										reviews: 'inactive',
										wishlist: 'inactive'
									})
								}
							}}
						>
							{' '}
							<div class="flex flex-col lg:flex-row justify-center items-center ">
								<div class="i-ph-truck text-lg text-gray-6 lg:mr-2" />
								Orders
							</div>
						</button>
					</li>
					<li
						class=""
						role="presentation"
					>
						<button
							class={clsx(
								'inline-block p-1 border-b-2 rounded-t-lg  h-full  w-18 sm:w-25 lg:w-31 bg-white md:bg-gray-1',
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
									setActiveTab({
										overview: 'inactive',
										profile: 'inactive',
										orders: 'inactive',
										reviews: 'active',
										wishlist: 'inactive'
									})
									return
								}
								if (activeTab().reviews === 'active') {
									setActiveTab({
										overview: 'inactive',
										profile: 'inactive',
										orders: 'inactive',
										reviews: 'inactive',
										wishlist: 'inactive'
									})
								}
							}}
						>
							<div class="flex flex-col sm:flex-row sm:space-x-1  lg:flex-row justify-center items-center">
								<div class="i-ic-baseline-star-rate text-lg text-gray-6 lg:mr-2" />
								<div>Reviews</div>
							</div>
						</button>
					</li>
					<li
						class=""
						role="presentation"
					>
						<button
							class={clsx(
								'inline-block p-1 border-b-2 rounded-t-lg h-full w-18 sm:w-25 lg:w-31 bg-white md:bg-gray-1',
								activeTab().wishlist === 'active' && ' border-gray-600 text-gray-600 dark:border-gray-300 dark:text-gray-300',
								activeTab().wishlist === 'inactive' && 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
							)}
							id="wishlist-tab"
							data-tabs-target="#wishlist"
							type="button"
							role="tab"
							aria-controls="wishlist"
							aria-selected="false"
							onClick={() => {
								if (activeTab().wishlist === 'inactive') {
									setActiveTab({
										overview: 'inactive',
										profile: 'inactive',
										orders: 'inactive',
										reviews: 'inactive',
										wishlist: 'active'
									})
									return
								}
								if (activeTab().wishlist === 'active') {
									setActiveTab({
										overview: 'inactive',
										profile: 'inactive',
										orders: 'inactive',
										reviews: 'inactive',
										wishlist: 'inactive'
									})
								}
							}}
						>
							{' '}
							<div class="flex flex-col sm:flex-row sm:space-x-1  justify-center items-center">
								<div class="i-fa6-regular-thumbs-up text-lg text-gray-6 lg:mr-2" />
								<div>Wish List</div>
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
					<Show when={activeTab().overview === 'active'}>
						<div class={clsx('p-1 rounded-sm bg-gray-50 dark:bg-gray-800', activeTab().overview === 'active' && '')}>
							<p class=" mb-3 text-gray-500 dark:text-gray-400">
								<Show when={props.currentCustomer}>
									<ul class="space-y-4 ">
										<For each={props.currentCustomer?.orders}>
											{(order: any) => {
												return (
													<li
														class="flex sm:flex-row justify-between cursor-pointer bg-gray-6/5 p-1.5 rounded-sm hover:bg-gray-6/20"
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
																			order.fulfillment_status === 'fulfilled' && 'text-green-500',
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
													</li>
												)
											}}
										</For>
									</ul>
								</Show>
							</p>
						</div>
					</Show>
					<Show when={activeTab().profile === 'active'}>
						<div class={clsx('p-4 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-6', activeTab().profile === 'active' && '')}>
							<div>This en</div>
						</div>
					</Show>
					<Show when={activeTab().orders === 'active'}>
						<div
							class={clsx(
								'p-4 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-6 text-sm',
								activeTab().orders === 'active' && ''
							)}
						>
							<div>
								<div class="text-gray-500 dark:text-gray-400 flex space-x-2">
									<div>Your orders</div>
								</div>
								<div class="text-gray-600 dark:text-gray-300">Order 1</div>
							</div>
						</div>
					</Show>
					<Show when={activeTab().reviews === 'active'}>
						<div
							class={clsx(
								'p-4 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-3 text-sm',
								activeTab().reviews === 'active' && ''
							)}
						>
							<div>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur dolore est deserunt amet dolores aliquam!
								Delectus accusantium, quod tempore praesentium, voluptates culpa eaque et ullam consequatur placeat odio
								excepturi quaerat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum
								<div class="space-y-3"></div>
							</div>
						</div>
					</Show>
					<Show when={activeTab().wishlist === 'active'}>
						<div
							class={clsx(
								'p-4 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-3 text-sm',
								activeTab().wishlist === 'active' && ''
							)}
						>
							Wishlist
							<div>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur dolore est deserunt amet dolores aliquam!
								Delectus accusantium, quod tempore praesentium, voluptates culpa eaque et ullam consequatur placeat odio
								excepturi quaerat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum
								<div class="space-y-3"></div>
							</div>
						</div>
					</Show>
				</TransitionGroup>
			</div>
		</div>
	)
}
