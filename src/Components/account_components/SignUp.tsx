import { createForm, email, required, minLength, setError } from '@modular-forms/solid'
import { createEffect, Show, createSignal, Accessor, Suspense, For } from 'solid-js'
import { FormFooter } from '~/Components/checkout_components/FormFooter'
import { FormHeader } from '~/Components/checkout_components/FormHeader'
import { TextInput } from '~/Components/checkout_components/TextInput'
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

interface SideProps {
	side?: Accessor<string>
	currentCustomer?: any
}

export default function SignUp(props: SideProps) {
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
		<div>
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
