import Navigation from '~/Components/layout/Navigation'
import { createForm, email, required, minLength, setError } from '@modular-forms/solid'
import { createEffect, Show, createSignal, Accessor, Suspense } from 'solid-js'
import { FormFooter } from '~/Components/checkout_components/FormFooter'
import { FormHeader } from '~/Components/checkout_components/FormHeader'
import { TextInput } from '~/Components/checkout_components/TextInput'
import { useGlobalContext } from '~/Context/Providers'
import { createQuery } from '@tanstack/solid-query'
import clsx from 'clsx'
import { Image } from '@unpic/solid'

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
				<div class="flex flex-col lg:flex-row   lg:w-full sm:mt-20 lg:mt-0">
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
							{/* <span class="hidden md:block bg-gray-6 md:w-0.5" /> */}
							{/* 	<hr class="border-gray-400/50 my-2 mx-6 md:hidden" /> */}
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
							<div class="flex flex-col items-center justify-center lg:w-full lg:mt-20">
								<div class="text-2xl font-500 font-poppins text-gray-6">Welcome back</div>
								<div class="text-xl font-500 font-poppins text-gray-6">{currentCustomer?.data?.customer?.email}</div>
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
							<div>{errorMessage()}</div>
							<div>This email is already in use please try to login</div>
						</div>
					</Show>
					<div class="flex items-center">
						<div class="i-ic-baseline-directions-run w-6 h-6 text-gray-5" />
						<div class="text-xl font-500 font-poppins ml-2 text-gray-6">I'm new here</div>
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
										label="Email"
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
							<div>{errorMessage()}</div>
							<div>You may have entered the wrong email or password please try again</div>
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
									label="Email"
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
