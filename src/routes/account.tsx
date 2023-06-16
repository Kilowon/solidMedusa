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
	setValues
} from '@modular-forms/solid'
import { createEffect, Show, createSignal } from 'solid-js'
import { FormFooter } from '~/Components/checkout_components/FormFooter'
import { FormHeader } from '~/Components/checkout_components/FormHeader'
import { TextInput } from '~/Components/checkout_components/TextInput'
import { Checkbox } from '~/Components/checkout_components/Checkbox'
import { useGlobalContext } from '~/Context/Providers'
import { createQuery } from '@tanstack/solid-query'

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

export default function Account() {
	const [customerForm, { Form, Field }] = createForm<PaymentForm>()

	const { medusa } = useGlobalContext()
	const [emailValue, setEmailValue] = createSignal('')
	const [passwordValue, setPasswordValue] = createSignal('')
	const [checkboxValue, setCheckboxValue] = createSignal('none')

	const [customerDelayPassed, setCustomerDelayPassed] = createSignal('show')

	createEffect(() => {
		setTimeout(() => {
			setCustomerDelayPassed('hidden')
		}, 100)
	})

	function handleSubmit(values: PaymentForm) {
		setEmailValue(values.email)
	}
	//TODO: When logged in the customer info will pre-populate the form
	const checkCustomer = createQuery(() => ({
		queryKey: ['customer_info'],
		queryFn: async function () {
			const customer = await medusa?.customers.retrieve()

			return customer
		},
		enabled: false
	}))

	async function handleSignUp() {
		console.log('SIGNUP', emailValue(), passwordValue())

		createCustomer.refetch()
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

	async function handleSignIn() {
		console.log('SIGNIN', emailValue(), passwordValue())

		signInCustomer.refetch()
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
		<div>
			<Navigation />
			<div class="sm:flex sm:h-100svh sm:justify-center sm:items-center">
				<Form onSubmit={values => handleSubmit(values) as any}>
					<div class="lg:flex space-y-15 lg:space-y-0   lg:space-x-40">
						<div class="space-y-3 md:w-60vw  lg:w-30vw xl:w-25vw">
							<div class="text-xl font-500 font-poppins ml-2">I'm new here</div>
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
						<span class="bg-gray-3 w-0.5 "></span>
						<div class="space-y-3 md:w-60vw   lg:w-30vw xl:w-25vw">
							<div class="text-xl font-500 font-poppins ml-2">Welcome back</div>
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
					</div>
				</Form>
			</div>
		</div>
	)
}
