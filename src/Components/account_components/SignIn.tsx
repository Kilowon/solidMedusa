import { createForm, email, required, minLength, setError } from '@modular-forms/solid'
import { createEffect, Show, createSignal, Accessor, Suspense, For } from 'solid-js'
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
	side?: Accessor<string>
	currentCustomer?: any
	setSide?: (side: string) => void
}

export default function SignIn(props: SideProps) {
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
						<div class="i-ic-round-hiking h-6 w-6 text-text_2" />
						<div class="text-xl font-500 ml-2 text-text_2">Welcome back</div>
					</div>
					<div class="">
						{/* This is a hack fix for chromium browsers default focus on mobile.... the autofocus={false} was not working ... this prevents the keyboard popping and hiding other options  */}

						<Field
							name="email"
							validate={[required('Please enter your email.'), email('The email address is badly formatted.')]}
						>
							{(field, fieldprops) => (
								<TextInput
									{...fieldprops}
									value={field.value}
									error={field.error}
									type="email"
									//description="We'll send your order confirmation here."
									label="Email (sign in)"
									placeholder="example@email.com"
									required
									onFocus={() => props.setSide?.('right')}
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
							{(field, fieldprops) => (
								<TextInput
									{...fieldprops}
									value={field.value}
									error={field.error}
									type="password"
									//description="Signup for an account to access your order history."
									label="Password"
									placeholder="********"
									required
									onFocus={() => props.setSide?.('right')}
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
