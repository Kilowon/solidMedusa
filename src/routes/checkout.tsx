import {
	createForm,
	email,
	getValue,
	pattern,
	required,
	minLength
} from '@modular-forms/solid'
import { Match, Switch, createEffect } from 'solid-js'
import { FormFooter } from '~/Components/checkout_components/FormFooter'
import { FormHeader } from '~/Components/checkout_components/FormHeader'
import { TextInput } from '~/Components/checkout_components/TextInput'
import { Title } from '~/Components/checkout_components/Title'
import { Select } from '~/Components/checkout_components/Select'
import { Checkbox } from '~/Components/checkout_components/Checkbox'
import { useGlobalContext } from '~/Context/Providers'
import { A } from 'solid-start'

type PaymentForm = {
	email: string
	password: string
	firstName: string
	lastName: string
	companyName: string
	streetAddress: string
	aptNumber: string
	city: string
	country: string
	state: string
	zipCode: string
	phoneNumber: string
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
		boolean: boolean
	}
}

export default function PaymentPage() {
	const { cart } = useGlobalContext()
	// Create payment form
	createEffect(() => {
		console.log(cart)
	})

	const [paymentForm, { Form, Field }] = createForm<PaymentForm>()

	return (
		<div class="bg-[#fefcfa]">
			<div class="sticky top-0 inset-x-0 z-50 group ">
				<header
					class={
						'relative h-16 mx-auto transition-colors border-b border-transparent duration-200 bg-[#fefcfa]'
					}
				>
					<nav
						class={
							'flex items-center justify-between w-full h-full text-sm transition-colors duration-200 text-dark group-hover:text-gray-900 relative'
						}
					>
						<div class="flex-1 basis-0 h-full flex items-center">
							<div class="block ">
								<A
									href="/cart"
									class="text-xs font-semibold  "
								>
									<div class=" flex items-center font-poppins uppercase">
										<div class={'i-tabler-chevron-left text-3xl '} />
										Back
										<div class="hidden sm:block mx-0.5">to Shopping Cart</div>
									</div>
								</A>
							</div>
							<div class="hidden sm:block h-full ml-10"></div>
						</div>

						<div class="flex items-center h-full"></div>
						<A
							href="/"
							class="text-2xl font-semibold  "
						>
							<div class=" font-poppins uppercase"> Modern Edge </div>
						</A>
						<div class="flex items-center gap-x-10 h-full flex-1 basis-0 justify-end mr-10">
							<div class="hidden sm:flex items-center gap-x-2 h-full text-sm font-semibold font-poppins px-3"></div>
						</div>
					</nav>
				</header>
			</div>
			<div class="flex content-container ">
				<div class="content-container">
					<Title>Checkout</Title>

					<Form
						class="space-y-12 md:space-y-14 lg:space-y-16"
						onSubmit={values => alert(JSON.stringify(values, null, 4))}
					>
						<FormHeader
							of={paymentForm}
							heading="Customer"
						/>
						<div class="space-y-2">
							{/* //email */}
							<Field
								name="email"
								validate={[
									required('Please enter your email.'),
									email('The email address is badly formatted.')
								]}
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
							{/* //password */}
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
										label="Password"
										placeholder="********"
									/>
								)}
							</Field>
							<FormFooter of={paymentForm} />
							{/* //account */}
							<Field
								name="checkbox.boolean"
								type="boolean"
							>
								{(field, props) => (
									<Checkbox
										{...props}
										checked={field.value}
										error={field.error}
										label="create an account"
									/>
								)}
							</Field>
						</div>
					</Form>

					<Form
						class="space-y-8 md:space-y-14 lg:space-y-16"
						onSubmit={values => alert(JSON.stringify(values, null, 4))}
					>
						<FormHeader
							of={paymentForm}
							heading="Shipping Information"
						/>
						<div class="space-y-2 ">
							<div class="flex flex-col md:flex-row w-full">
								<div class="w-full md:w-1/2">
									{/* //first name */}
									<Field
										name="firstName"
										validate={required('Please enter your name.')}
									>
										{(field, props) => (
											<TextInput
												{...props}
												value={field.value}
												error={field.error}
												type="text"
												label="First Name"
												required
											/>
										)}
									</Field>
								</div>
								<div class="w-full md:w-1/2">
									{/* //last name */}
									<Field
										name="lastName"
										validate={required('Please enter your name.')}
									>
										{(field, props) => (
											<TextInput
												{...props}
												value={field.value}
												error={field.error}
												type="text"
												label="Last Name"
												required
											/>
										)}
									</Field>
								</div>
							</div>
							{/* //company Name */}
							<Field
								name="companyName"
								validate={required('Please enter your name.')}
							>
								{(field, props) => (
									<TextInput
										{...props}
										value={field.value}
										error={field.error}
										type="text"
										label="Company Name (optional)"
									/>
								)}
							</Field>
							{/* //Phone Number */}
							<Field
								name="phoneNumber"
								validate={required('Please enter your name.')}
							>
								{(field, props) => (
									<TextInput
										{...props}
										value={field.value}
										error={field.error}
										type="text"
										label="Phone Number"
									/>
								)}
							</Field>
							{/* //Address */}

							<Field
								name="streetAddress"
								validate={required('Please enter your name.')}
							>
								{(field, props) => (
									<TextInput
										{...props}
										value={field.value}
										error={field.error}
										type="text"
										label="Address"
									/>
								)}
							</Field>
							{/* /Apt# */}
							<Field
								name="aptNumber"
								validate={required('Please enter your name.')}
							>
								{(field, props) => (
									<TextInput
										{...props}
										value={field.value}
										error={field.error}
										type="text"
										label="Apartment/Suite/Building (Optional)"
									/>
								)}
							</Field>

							<Field
								name="type"
								validate={required('Please select the payment type.')}
							>
								{(field, props) => (
									<Select
										{...props}
										value={field.value}
										options={[
											{ label: 'Card', value: 'card' },
											{ label: 'PayPal', value: 'paypal' }
										]}
										error={field.error}
										label="Type"
										placeholder="Card or PayPal?"
										required
									/>
								)}
							</Field>
							<Switch>
								<Match when={getValue(paymentForm, 'type') === 'card'}>
									<Field
										name="card.number"
										validate={[
											required('Please enter your card number.'),
											pattern(
												/^\d{4}\s?(\d{6}\s?\d{5}|\d{4}\s?\d{4}\s?\d{4})$/,
												'The card number is badly formatted.'
											)
										]}
									>
										{(field, props) => (
											<TextInput
												{...props}
												value={field.value}
												error={field.error}
												type="text"
												label="Number"
												placeholder="1234 1234 1234 1234"
												required
											/>
										)}
									</Field>
									<Field
										name="card.expiration"
										validate={[
											required('Please enter your card number.'),
											pattern(
												/^(0[1-9]|1[0-2])\/2[2-9]$/,
												'The expiration date is badly formatted.'
											)
										]}
									>
										{(field, props) => (
											<TextInput
												{...props}
												value={field.value}
												error={field.error}
												type="text"
												label="Expiration"
												placeholder="MM/YY"
												required
											/>
										)}
									</Field>
								</Match>
								<Match when={getValue(paymentForm, 'type') === 'paypal'}>
									<Field
										name="paypal.email"
										validate={[
											required('Please enter your PayPal email.'),
											email('The email address is badly formatted.')
										]}
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
								</Match>
							</Switch>
						</div>
						<FormFooter of={paymentForm} />
					</Form>
				</div>
			</div>
		</div>
	)
}
