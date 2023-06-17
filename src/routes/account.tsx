import Navigation from '~/Components/layout/Navigation'
import {
	createForm,
	email,
	getValue,
	pattern,
	required,
	minLength,
	getValues,
	setValue,
	setValues,
	Form
} from '@modular-forms/solid'
import { createEffect, Show, createSignal, Accessor } from 'solid-js'
import { FormFooter } from '~/Components/checkout_components/FormFooter'
import { FormHeader } from '~/Components/checkout_components/FormHeader'
import { TextInput } from '~/Components/checkout_components/TextInput'
import { useGlobalContext } from '~/Context/Providers'
import { createQuery } from '@tanstack/solid-query'
import clsx from 'clsx'

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
	side: Accessor<string>
}

export default function Account() {
	const [side, setSide] = createSignal('right')

	createEffect(() => {
		console.log(side())
	})
	return (
		<div>
			<Navigation />
			<div>
				<div class="flex flex-col lg:flex-row   lg:w-full sm:mt-20">
					<div
						class={clsx(
							'flex lg:h-100svh justify-center items-center lg:w-1/2 pt-12 lg:pt-0',
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
						<SignUp side={side} />
					</div>
					{/* <span class="hidden md:block bg-gray-6 md:w-0.5" /> */}
					{/* 	<hr class="border-gray-400/50 my-2 mx-6 md:hidden" /> */}
					<div
						class={clsx(
							'flex lg:h-100svh justify-center items-center lg:w-1/2 pt-12 lg:pt-0',
							side() === 'left' && 'lg:bg-gray-1 transition-all duration-300',
							side() === 'right' && ''
						)}
						onMouseOver={() => {
							setSide('right')
						}}
					>
						<SignIn side={side} />
					</div>
				</div>
			</div>
		</div>
	)
}

export function SignUp(props: SideProps) {
	const [customerSignUp, { Form, Field }] = createForm<PaymentForm>()

	const { medusa } = useGlobalContext()
	const [emailValue, setEmailValue] = createSignal('')
	const [passwordValue, setPasswordValue] = createSignal('')

	const [customerDelayPassed, setCustomerDelayPassed] = createSignal('show')

	createEffect(() => {
		setTimeout(() => {
			setCustomerDelayPassed('hidden')
		}, 100)
	})

	function handleSubmit(values: PaymentForm) {
		setEmailValue(values.email)
		setPasswordValue(values.password)
		if (emailValue() && passwordValue()) {
			createCustomer.refetch()
		}
	}

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
				props.side() === 'left' && 'none',
				props.side() === 'right' && 'lg:blur-sm transition-all duration-300'
			)}
		>
			<Form onSubmit={values => handleSubmit(values) as any}>
				<div class="space-y-3 md:w-60vw  lg:w-30vw xl:w-25vw">
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
										error={field.error}
										type="email"
										label="Email"
										placeholder="example@email.com"
										required
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
	const [emailValue, setEmailValue] = createSignal('')
	const [passwordValue, setPasswordValue] = createSignal('')

	const [customerDelayPassed, setCustomerDelayPassed] = createSignal('show')

	function handleSubmit(values: PaymentForm) {
		setEmailValue(values.email)
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
				props.side() === 'left' && 'lg:blur-sm  transition-all duration-300',
				props.side() === 'right' && 'none'
			)}
		>
			<Form onSubmit={values => handleSubmit(values) as any}>
				<div class="space-y-3 md:w-60vw   lg:w-30vw xl:w-25vw">
					<div class="flex items-center">
						<div class="i-ic-round-hiking h-6 w-6 text-gray-5" />
						<div class="text-xl font-500 font-poppins ml-2 text-gray-6">Welcome back</div>
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
										error={field.error}
										type="email"
										label="Email"
										placeholder="example@email.com"
										required
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
