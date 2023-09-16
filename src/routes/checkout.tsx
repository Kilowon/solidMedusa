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

import { createEffect, Show, createSignal, Accessor, For, onMount } from 'solid-js'
import { FormFooter } from '~/Components/checkout_components/FormFooter'
import { FormHeader } from '~/Components/checkout_components/FormHeader'
import { TextInput } from '~/Components/checkout_components/TextInput'
import { Title } from '~/Components/checkout_components/Title'
import { Select } from '~/Components/checkout_components/Select'
import { Checkbox } from '~/Components/checkout_components/Checkbox'
import { StepperElement } from '~/Components/checkout_components/StepperElement'
import { useGlobalContext } from '~/Context/Providers'
import { A } from 'solid-start'
import { Cart } from '~/types/types'
import { createQuery } from '@tanstack/solid-query'
import CartCore from '~/Components/Core/CartCore'
import Payment from '~/Components/checkout_components/Payment'
import Express from '~/Components/checkout_components/Express'
import { TransitionGroup } from 'solid-transition-group'

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

interface CustomerProps {
	setShowForm: (value: ShowForm) => void
	showForm: Accessor<ShowForm>
	cart: Cart
	setFormCompleted: (value: any) => void
	formCompleted: Accessor<any>
}

interface ShippingProps {
	setShowForm: (value: ShowForm) => void
	showForm: Accessor<ShowForm>
	cart: Cart
	setFormCompleted: (value: any) => void
	formCompleted: Accessor<any>
}

interface BillingProps {
	setShowForm: (value: ShowForm) => void
	showForm: Accessor<ShowForm>
	cart: Cart
	setFormCompleted: (value: any) => void
	formCompleted: Accessor<any>
}

interface PaymentProps {
	setShowForm: (value: ShowForm) => void
	showForm: Accessor<ShowForm>
	cart: Cart
}

interface CarrierProps {
	setShowForm: (value: ShowForm) => void
	showForm: Accessor<ShowForm>
	setFormCompleted: (value: any) => void
	formCompleted: Accessor<any>
	cart: Cart
}

interface StepperProps {
	setShowForm: (value: ShowForm) => void
	showForm: Accessor<ShowForm>
	formCompleted: Accessor<any>
}

type FormCompleted = {
	customer: 'complete' | 'queued'
	shipping: 'complete' | 'queued'
	carrier: 'complete' | 'queued'
	billing: 'complete' | 'queued'
}

type ShowForm = {
	customer: 'active' | 'hidden'
	shipping: 'active' | 'hidden'
	carrier: 'active' | 'hidden'
	billing: 'active' | 'hidden'
	payment: 'active' | 'hidden'
}

const StatesList = [
	'Alaska',
	'Alabama',
	'Arkansas',
	'American Samoa',
	'Arizona',
	'California',
	'Colorado',
	'Connecticut',
	'District of Columbia',
	'Delaware',
	'Florida',
	'Georgia',
	'Guam',
	'Hawaii',
	'Iowa',
	'Idaho',
	'Illinois',
	'Indiana',
	'Kansas',
	'Kentucky',
	'Louisiana',
	'Massachusetts',
	'Maryland',
	'Maine',
	'Michigan',
	'Minnesota',
	'Missouri',
	'Mississippi',
	'Montana',
	'North Carolina',
	'North Dakota',
	'Nebraska',
	'New Hampshire',
	'New Jersey',
	'New Mexico',
	'Nevada',
	'New York',
	'Ohio',
	'Oklahoma',
	'Oregon',
	'Pennsylvania',
	'Puerto Rico',
	'Rhode Island',
	'South Carolina',
	'South Dakota',
	'Tennessee',
	'Texas',
	'Utah',
	'Virginia',
	'Virgin Islands',
	'Vermont',
	'Washington',
	'Wisconsin',
	'West Virginia',
	'Wyoming'
]

async function autocompleteAddress(address: string) {
	fetch(
		`https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&lang=en&limit=10&type=country&filter=countrycode:us,ca&bias=countrycode:us,ca&format=json&apiKey=${
			import.meta.env.VITE_GEOAPIFY_API_KEY
		}`
	)
}

export default function CheckoutPage() {
	const { queryCart } = useGlobalContext()
	const [shippingIsBilling, setShippingIsBilling] = createSignal(true)
	const [customerDelayPassed, setCustomerDelayPassed] = createSignal(false)
	// show states 'hide', 'active', 'edit'

	const [showForm, setShowForm] = createSignal<ShowForm>({
		customer: 'active',
		shipping: 'hidden',
		carrier: 'hidden',
		billing: 'hidden',
		payment: 'hidden'
	})
	const [formCompleted, setFormCompleted] = createSignal<FormCompleted>({
		customer: 'queued',
		shipping: 'queued',
		carrier: 'queued',
		billing: 'queued'
	})
	const [mobileDrawer, setMobileDrawer] = createSignal({
		checkout: 'active',
		cart: 'hidden'
	})

	createEffect(() => {
		if (showForm().customer === 'active') {
			setTimeout(() => {
				setCustomerDelayPassed(true)
			}, 2500)
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
		<div
			class=" text-text_2 bg-normal_1 min-h-[150svh] sm:min-h-[100svh] "
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
			<Title>Checkout</Title>
			<CartDrawer
				mobileDrawer={mobileDrawer}
				setMobileDrawer={setMobileDrawer}
			/>
			<div class="h-16">
				<Header
					mobileDrawer={mobileDrawer}
					setMobileDrawer={setMobileDrawer}
				/>
			</div>
			<div class="mx-3 md:px-15 lg:mx-3 lg:content-container lg:hidden">
				<Stepper
					formCompleted={formCompleted}
					setShowForm={setShowForm}
					showForm={showForm}
				/>
			</div>
			<div class="md:flex md:content-container lg:min-h-[80vh]">
				<div class="md:content-container lg:w-[700px] sm:space-y-6 lg:space-y-12 mx-2">
					<div
						class="hidden lg:block sticky top-12 z-101 bg-transparent h-12 mx-2 "
						style="backdrop-filter: blur(10px)"
					>
						<Stepper
							formCompleted={formCompleted}
							setShowForm={setShowForm}
							showForm={showForm}
						/>
					</div>
					<TransitionGroup
						onEnter={(el, done) => {
							const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
								duration: 1000
							})
							a.finished.then(done)
						}}
						onExit={(el, done) => {
							const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
								duration: 200
							})
							a.finished.then(done)
						}}
					>
						<Show when={showForm()?.customer === 'active'}>
							<input
								type="text"
								autofocus
								style="display:none"
							/>
							<Express />
							<div class="hidden md:flex items-center justify-center text-2xl m-2">or</div>
							<Show when={showForm()?.customer === 'active'}>
								<Customer
									setShowForm={setShowForm}
									showForm={showForm}
									setFormCompleted={setFormCompleted}
									formCompleted={formCompleted}
									cart={queryCart.data?.cart}
								/>
							</Show>
						</Show>

						<Show when={showForm()?.shipping === 'active'}>
							<Shipping
								setShowForm={setShowForm}
								showForm={showForm}
								setFormCompleted={setFormCompleted}
								formCompleted={formCompleted}
								cart={queryCart.data?.cart}
							/>
						</Show>
						<Show when={showForm().carrier === 'active'}>
							<Carrier
								setShowForm={setShowForm}
								showForm={showForm}
								setFormCompleted={setFormCompleted}
								formCompleted={formCompleted}
								cart={queryCart.data?.cart}
							/>
						</Show>
						<Show when={showForm()?.billing === 'active'}>
							<Billing
								setShowForm={setShowForm}
								showForm={showForm}
								setFormCompleted={setFormCompleted}
								formCompleted={formCompleted}
								cart={queryCart.data?.cart}
							/>
						</Show>
						<Show when={showForm()?.payment === 'active'}>
							<Payment />
						</Show>
					</TransitionGroup>
				</div>
				<div class="hidden lg:flex lg:items-center lg:w-[433px]  mx-auto ">
					<CartCore variant="checkout" />
				</div>
			</div>
		</div>
	)
}

export function Header(props: { mobileDrawer: any; setMobileDrawer: any }) {
	return (
		<div>
			<header>
				<nav class="flex items-center justify-between h-16 text-text_2">
					<div class="flex items-center ">
						<div class="i-fa-solid-lock  ml-4.5 text-base lg:text-sm" />
						<div class="hidden lg:block  lg:ml-3 "> Secure Checkout </div>
					</div>

					<div class="flex items-center ">
						<A
							href="/"
							class="text-sm md:text-2xl font-semibold  "
						>
							<div class="  uppercase  "> Modern Edge </div>
						</A>
					</div>
					<div class="flex">
						<div
							class="i-ion-cart-outline bg-text_2 text-2xl lg:hidden mr-4 "
							onClick={() =>
								props.setMobileDrawer({
									checkout: 'hidden',
									cart: 'active'
								})
							}
						/>
						<A
							href="/cart"
							class="text-xs font-semibold  "
						>
							<div class=" hidden lg:flex items-center uppercase">
								<div class=" mr-0.5">Back to Shopping Cart</div>
								<div class={'i-tabler-chevron-right text-2xl md:text-3xl '} />
							</div>
						</A>
					</div>
				</nav>
			</header>
		</div>
	)
}

export function CartDrawer(props: any) {
	return (
		<div>
			<div
				class={`fixed inset-0  z-200 transition-all duration-250 ease-in-out backdrop-blur-6 ${
					props.mobileDrawer().cart === 'active' ? '' : 'opacity-0 pointer-events-none'
				}`}
				onClick={event => {
					if (event.target === event.currentTarget) {
						props.setMobileDrawer({ cart: 'hidden', checkout: 'active' })
					}
				}}
			>
				<div
					class="i-ph-x-bold text-text_2 w-6 h-6 absolute top-5 right-4"
					onClick={event => {
						if (event.target === event.currentTarget) {
							props.setMobileDrawer({ cart: 'hidden', checkout: 'active' })
						}
					}}
				/>
				<div
					class={`fixed top-16 right-0 h-full w-[100vw] sm:w-[70vw] md:w-[45vw] bg-normal_1  z-200 transform rounded-sm  transition-transform duration-500 ease-in-out p-2   ${
						props.mobileDrawer().cart === 'active' ? '' : 'translate-x-full'
					}`}
				>
					<CartCore variant="mobile-checkout" />
				</div>
			</div>
		</div>
	)
}

export function Stepper(props: StepperProps) {
	return (
		<div>
			<Show when={props.formCompleted()?.customer !== 'complete'}>
				<ol class="flex items-center w-full">
					<StepperElement
						title="Customer"
						elementState="active"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Shipping"
						elementState="queued"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Carrier"
						elementState="queued"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Billing"
						elementState="queued"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Payment"
						elementState="queued-end"
						setShowForm={props.setShowForm}
					/>
				</ol>
			</Show>
			<Show when={props.formCompleted().customer === 'complete' && props.formCompleted().shipping !== 'complete'}>
				<ol class="flex items-center w-full">
					<StepperElement
						title="Customer"
						elementState="complete"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Shipping"
						elementState="active"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Carrier"
						elementState="queued"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Billing"
						elementState="queued"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Payment"
						elementState="queued-end"
						setShowForm={props.setShowForm}
					/>
				</ol>
			</Show>
			<Show
				when={
					props.formCompleted().customer === 'complete' &&
					props.formCompleted().shipping === 'complete' &&
					props.formCompleted().carrier !== 'complete'
				}
			>
				<ol class="flex items-center w-full">
					<StepperElement
						title="Customer"
						elementState="complete"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Shipping"
						elementState="complete"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Carrier"
						elementState="active"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Billing"
						elementState="queued"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Payment"
						elementState="queued-end"
						setShowForm={props.setShowForm}
					/>
				</ol>
			</Show>
			<Show
				when={
					props.formCompleted().customer === 'complete' &&
					props.formCompleted().shipping === 'complete' &&
					props.formCompleted().carrier === 'complete' &&
					props.formCompleted().billing !== 'complete'
				}
			>
				<ol class="flex items-center w-full">
					<StepperElement
						title="Customer"
						elementState="complete"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Shipping"
						elementState="complete"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Carrier"
						elementState="complete"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Billing"
						elementState="active"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Payment"
						elementState="queued-end"
						setShowForm={props.setShowForm}
					/>
				</ol>
			</Show>
			<Show
				when={
					props.formCompleted().customer === 'complete' &&
					props.formCompleted().shipping === 'complete' &&
					props.formCompleted().carrier === 'complete' &&
					props.formCompleted().billing === 'complete'
				}
			>
				<ol class="flex items-center w-full">
					<StepperElement
						title="Customer"
						elementState="complete"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Shipping"
						elementState="complete"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Carrier"
						elementState="complete"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Billing"
						elementState="complete"
						setShowForm={props.setShowForm}
					/>
					<StepperElement
						title="Payment"
						elementState="active-end"
						setShowForm={props.setShowForm}
					/>
				</ol>
			</Show>
		</div>
	)
}

export function Customer(props: CustomerProps) {
	const { medusa } = useGlobalContext()

	const [customerForm, { Form, Field }] = createForm<PaymentForm>()
	const [emailValue, setEmailValue] = createSignal('')
	const [passwordValue, setPasswordValue] = createSignal('')
	const [checkboxValue, setCheckboxValue] = createSignal('none')

	const [customerDelayPassed, setCustomerDelayPassed] = createSignal('show')

	createEffect(() => {
		if (getValue(customerForm, 'checkbox.signup')) {
			setCheckboxValue('signup')
			setValue(customerForm, 'checkbox.signin', false)
		}
	})

	createEffect(() => {
		if (getValue(customerForm, 'checkbox.signin')) {
			setCheckboxValue('signin')
			setValue(customerForm, 'checkbox.signup', false)
		}
	})

	createEffect(() => {
		if (getValue(customerForm, 'checkbox.signin') === false && getValue(customerForm, 'checkbox.signup') === false) {
			setCheckboxValue('none')
		}
	})

	createEffect(() => {
		if (props.cart?.email) {
			setEmailValue(props.cart?.email)
			setValue(customerForm, 'email', props.cart?.email)
			/* props.setShowShipping('active')
			props.setShowCustomer('hide') */
		}
	})

	createEffect(() => {
		if (props.showForm().customer === 'active') {
			setTimeout(() => {
				setCustomerDelayPassed('hidden')
			}, 100)
		}
	})

	function handleSubmit(values: PaymentForm) {
		setEmailValue(values.email)

		if (checkboxValue() === 'none') {
			handleGuest()
		}
		if (checkboxValue() === 'signup') {
			setPasswordValue(values.password)
			handleSignUp()
		}
		if (checkboxValue() === 'signin') {
			setPasswordValue(values.password)
			handleSignIn()
		}
		props.setShowForm({
			...props.showForm(),
			shipping: 'active',
			customer: 'hidden'
		})
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

	async function handleGuest() {
		console.log('Guest', emailValue())

		createGuest.refetch()
		props.setFormCompleted?.({
			...props.formCompleted(),
			customer: 'complete'
		})
	}

	const createGuest = createQuery(() => ({
		queryKey: ['cart'],
		queryFn: async function () {
			const customer = await medusa?.carts.update(props.cart.id, {
				email: emailValue()
			})
			return customer
		},
		enabled: false
	}))

	async function handleSignUp() {
		console.log('SIGNUP', emailValue(), passwordValue())

		createCustomer.refetch()
		props.setFormCompleted?.({
			...props.formCompleted(),
			customer: 'complete'
		})
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
		props.setFormCompleted?.({
			...props.formCompleted(),
			customer: 'complete'
		})
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
			<Form onSubmit={values => handleSubmit(values) as any}>
				<FormHeader
					of={customerForm}
					heading="Customer"
					numberLabel={'one'}
				/>

				<div class="h-[100%]">
					{/* This is a hack fix for chromium browsers default focus on mobile.... the autofocus={false} was not working ... this prevents the keyboard popping the page and hidding the express buttons  */}
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
									//description="We'll send your order confirmation here."
									label="Email"
									placeholder="example@email.com"
									required
								/>
							)}
						</Field>
					</Show>
					{/* //email */}
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
					{/* //password */}
					<Show when={getValues(customerForm)?.checkbox?.signup || getValues(customerForm)?.checkbox?.signin}>
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
					</Show>
					{/* //make account */}
					<div class="flex justify-between my-4">
						<Field
							name="checkbox.signup"
							type="boolean"
						>
							{(field, props) => (
								<Checkbox
									{...props}
									checked={field.value}
									error={field.error}
									label="sign up to create an account"
								/>
							)}
						</Field>
						<Field
							name="checkbox.signin"
							type="boolean"
						>
							{(field, props) => (
								<Checkbox
									{...props}
									checked={field.value}
									error={field.error}
									label={true ? 'sign in to an existing account' : ''}
								/>
							)}
						</Field>
					</div>
					<FormFooter of={customerForm} />
				</div>
			</Form>
		</div>
	)
}

export function Shipping(props: ShippingProps) {
	const { medusa } = useGlobalContext()

	const [shippingForm, { Form, Field }] = createForm<PaymentForm>()
	const [firstTime, setFirstTime] = createSignal(true)

	function initialServersideState() {
		if (firstTime()) {
			setValue(shippingForm, 'checkbox.billing', true)
		}
		if (props.cart?.shipping_address?.metadata?.validated === 'validated' && firstTime()) {
			setValues(shippingForm, props.cart?.shipping_address)
			setValue(shippingForm, 'checkbox.phone', props.cart?.shipping_address?.metadata?.checkbox?.phone)
			setValue(shippingForm, 'checkbox.company', props.cart?.shipping_address?.metadata?.checkbox?.company)
			setValue(shippingForm, 'checkbox.billing', props.cart?.shipping_address?.metadata?.checkbox?.billing)
			setFirstTime(false)
		}
	}

	createEffect(() => {
		initialServersideState()
	})

	async function handleSubmit(values: PaymentForm) {
		console.log('SUBMIT', values.first_name)
		queryShippingAddress.refetch()
		//This One runs when the data is changed a second time
		setTimeout(() => {
			if (getValues(shippingForm).checkbox?.billing === true) {
				props.setFormCompleted?.({
					...props.formCompleted(),
					shipping: 'complete',
					billing: 'complete'
				})
				props.setShowForm({
					...props.showForm(),
					carrier: 'active',
					shipping: 'hidden'
				})
			}

			if (getValues(shippingForm).checkbox?.billing === false) {
				props.setFormCompleted?.({
					...props.formCompleted(),
					shipping: 'complete',
					billing: 'queued'
				})

				props.setShowForm({
					...props.showForm(),
					carrier: 'active',
					shipping: 'hidden'
				})
			}
		}, 500)
	}

	async function handleShippingAddress() {
		console.log('SHIPPING', getValues(shippingForm).first_name)

		const address = await medusa?.carts.update(props.cart?.id, {
			shipping_address: {
				first_name: getValues(shippingForm).first_name,
				last_name: getValues(shippingForm).last_name,
				address_1: getValues(shippingForm).address_1,
				city: getValues(shippingForm).city,
				postal_code: getValues(shippingForm).postal_code,
				phone: getValues(shippingForm).phone,
				company: getValues(shippingForm).company,
				address_2: getValues(shippingForm).address_2,
				province: getValues(shippingForm).province,
				metadata: {
					validated: 'validated',
					checkbox: {
						phone: getValues(shippingForm).checkbox?.phone,
						company: getValues(shippingForm).checkbox?.company,
						billing: getValues(shippingForm).checkbox?.billing
					}
				}
			},
			billing_address:
				getValues(shippingForm).checkbox?.billing === true
					? {
							first_name: getValues(shippingForm).first_name,
							last_name: getValues(shippingForm).last_name,
							address_1: getValues(shippingForm).address_1,
							city: getValues(shippingForm).city,
							postal_code: getValues(shippingForm).postal_code,
							phone: getValues(shippingForm).phone,
							company: getValues(shippingForm).company,
							address_2: getValues(shippingForm).address_2,
							province: getValues(shippingForm).province,
							metadata: {
								validated: 'validated',
								checkbox: {
									phone: getValues(shippingForm).checkbox?.phone,
									company: getValues(shippingForm).checkbox?.company,
									billing: getValues(shippingForm).checkbox?.billing
								}
							}
					  }
					: undefined
		})

		return address
	}
	const queryShippingAddress = createQuery(() => ({
		queryKey: ['cart'],
		queryFn: handleShippingAddress,
		enabled: false
	}))

	return (
		<div>
			<Form onSubmit={values => handleSubmit(values)}>
				<FormHeader
					of={shippingForm}
					heading="Shipping Address"
					numberLabel={'two'}
				/>

				<div class="space-y-1 md:space-y-2">
					<div class="flex flex-col md:flex-row w-full space-y-1 md:space-y-0">
						<div class="w-full md:w-1/2">
							{/* //first name */}
							<Field
								name="first_name"
								validate={[required('Please enter your first name.'), pattern(/^[a-zA-Z]+$/, 'The name is badly formatted.')]}
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
								name="last_name"
								validate={[required('Please enter your last name.'), pattern(/^[a-zA-Z]+$/, 'The name is badly formatted.')]}
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

					{/* //Address */}

					<Field
						name="address_1"
						validate={required('Please enter your address.')}
					>
						{(field, props) => (
							<TextInput
								{...props}
								value={field.value}
								error={field.error}
								type="text"
								label="Address"
								required
							/>
						)}
					</Field>
					{/* /Apt# */}
					<Field name="address_2">
						{(field, props) => (
							<TextInput
								{...props}
								value={field.value}
								error={field.error}
								type="text"
								label="Apartment/Suite/Building (optional)"
							/>
						)}
					</Field>

					{/* City */}
					<Field
						name="city"
						validate={required('Please enter your city.')}
					>
						{(field, props) => (
							<TextInput
								{...props}
								value={field.value}
								error={field.error}
								type="text"
								label="City"
								required
							/>
						)}
					</Field>
					<div class="flex flex-row  w-full">
						<div class="w-2/3">
							{/* State */}
							<Field
								name="province"
								validate={required('Please select your state.')}
							>
								{(field, props) => (
									<Select
										{...props}
										value={field.value}
										options={StatesList.map(state => ({
											label: state,
											value: state
										}))}
										error={field.error}
										label="State"
										placeholder="Select a State"
										required
									/>
								)}
							</Field>
						</div>
						<div class="w-1/3">
							{/* zipcode */}
							<Field
								name="postal_code"
								validate={[
									required('Please enter your zipcode.'),
									pattern(/^\d{5}(?:[-\s]\d{4})?$/, 'Please check zipcodes formatting.')
								]}
							>
								{(field, props) => (
									<TextInput
										{...props}
										value={field.value}
										error={field.error}
										type="text"
										label="Zipcode"
										required
									/>
								)}
							</Field>
						</div>
					</div>
					<Show when={getValues(shippingForm)?.checkbox?.phone}>
						{/* //Phone Number */}
						<Field name="phone">
							{(field, props) => (
								<TextInput
									{...props}
									value={field.value}
									error={field.error}
									//description="We'll only use this if we need to contact you about your order."
									type="tel"
									label="Phone Number"
									placeholder="Enter your phone number here"
								/>
							)}
						</Field>
					</Show>

					<Show when={getValues(shippingForm)?.checkbox?.company}>
						{/* //company Name */}
						<Field name="company">
							{(field, props) => (
								<TextInput
									{...props}
									value={field.value}
									error={field.error}
									type="text"
									label="Company Name"
								/>
							)}
						</Field>
					</Show>
				</div>
				<div class="space-y-6 my-6">
					<div class="flex justify-between">
						{/* //ask phone */}
						<Field
							name="checkbox.phone"
							type="boolean"
						>
							{(field, props) => (
								<Checkbox
									{...props}
									checked={field.value}
									error={field.error}
									label="add a number"
								/>
							)}
						</Field>
						{/* //business account */}
						<Field
							name="checkbox.company"
							type="boolean"
						>
							{(field, props) => (
								<Checkbox
									{...props}
									checked={field.value}
									error={field.error}
									label="business purchase"
								/>
							)}
						</Field>
					</div>
					<div class="">
						<Field
							name="checkbox.billing"
							type="boolean"
						>
							{(field, props) => (
								<Checkbox
									{...props}
									checked={field.value}
									error={field.error}
									label="My billing address is the same as my shipping address."
								/>
							)}
						</Field>
					</div>
				</div>

				<FormFooter of={shippingForm} />
			</Form>
		</div>
	)
}

export function Carrier(props: CarrierProps) {
	const { medusa } = useGlobalContext()

	const [carrierForm, { Form, Field }] = createForm<PaymentForm>()

	const [optionId, setOptionId] = createSignal(null)
	const [selectedCarrier, setSelectedCarrier] = createSignal(null)

	async function handleSubmit(values: any) {
		if (optionId() === null) return

		mutateCarriers.refetch()
		setTimeout(() => {
			if (props.formCompleted().billing === 'complete') {
				props.setFormCompleted?.({
					...props.formCompleted(),
					carrier: 'complete'
				})
				props.setShowForm({
					...props.showForm(),
					carrier: 'hidden',
					payment: 'active'
				})
			}

			if (props.formCompleted().billing === 'queued') {
				props.setFormCompleted?.({
					...props.formCompleted(),
					carrier: 'complete'
				})

				props.setShowForm({
					...props.showForm(),
					carrier: 'hidden',
					billing: 'active'
				})
			}
		}, 250)
	}

	const queryCarriers = createQuery(() => ({
		queryKey: ['carrier-list'],
		queryFn: async function () {
			const response = await medusa?.shippingOptions.listCartOptions(props.cart?.id)
			return response
		}
	}))

	const mutateCarriers = createQuery(() => ({
		queryKey: ['cart'],
		queryFn: async function () {
			const response = await medusa?.carts?.addShippingMethod(props.cart?.id, {
				option_id: optionId()
			})
			return response
		},
		enabled: false
	}))

	function carrierIcon(logo: any) {
		switch (logo) {
			case 'ups':
				return (
					<svg
						viewBox="0 0 54 63"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g transform="matrix(1.25, 0, 0, -1.25, -46.822689, 729.93866)">
							<g transform="translate(.36060 .36060)">
								<path
									d="m38.962 567.66 0.17739-20.134 4.5235-5.5879 13.571-7.1844 16.675 8.1601 3.4592 8.2488-0.35478 26.698-12.595 0.35478-13.127-2.1287-11.974-6.9183z"
									fill-rule="evenodd"
									fill="#301506"
								/>
								<path
									d="m25.619 0c-9.881 0-18.5 1.913-25.619 5.6855v30.16c0 6.3462 2.3845 11.653 6.8945 15.35 4.1875 3.435 17.138 9.0957 18.725 9.7832 1.505-0.655 14.609-6.4032 18.73-9.7832 4.5075-3.695 6.8926-9.0034 6.8926-15.35v-30.16c-7.12-3.773-15.739-5.686-25.624-5.686zm14.631 5.8398c2.9466 0.038525 5.8399 0.22055 8.6367 0.48047v29.525c0 5.6738-2.0588 10.257-6.0312 13.529-3.5488 2.9225-14.25 7.717-17.236 9.0332-3.026-1.334-13.754-6.189-17.239-9.032-3.9489-3.216-6.0275-7.908-6.0275-13.529v-17.252c11.348-10.407 25.128-12.921 37.896-12.754zm-13.963 13.748c-2.4312 0-4.3928 0.54344-6.0078 1.5859v29.049h4.459v-9.3848c0.445 0.13125 1.0909 0.25391 2.0059 0.25391 4.9462 0 7.7891-4.4588 7.7891-10.969 0-6.4975-2.9273-10.535-8.2461-10.535zm15.236 0c-2.9325 0.085-5.9992 2.2093-5.9805 5.8105 0.0075 2.3712 0.66484 4.1445 4.3398 6.3008 1.9612 1.1512 2.7514 1.9098 2.7852 3.3086 0.0375 1.555-1.0369 2.4926-2.6719 2.4863-1.4225-0.01125-3.123-0.8007-4.2617-1.8145v4.1035c1.3962 0.8325 3.1384 1.3828 4.8984 1.3828 4.405 0 6.372-3.1116 6.457-5.9629 0.08375-2.5988-0.63438-4.5652-4.3594-6.7539-1.6625-0.975-2.9754-1.6158-2.9316-3.2383 0.04375-1.5838 1.3586-2.1402 2.6211-2.1289 1.5575 0.01375 3.0641 0.87633 3.9941 1.8301v-3.875c-0.78375-0.60375-2.4431-1.5242-4.8906-1.4492zm-36.893 0.45117v14.012c0 4.7238 2.2345 7.1152 6.6445 7.1152 2.7288 0 5.0143-0.63156 6.7168-1.7891v-19.338h-4.4492v16.801c-0.485 0.3325-1.2044 0.54492-2.1094 0.54492-2.0425 0-2.3477-1.873-2.3477-3.1367v-14.209h-4.4551zm21.687 3.1387c2.5862 0 3.6582 2.0648 3.6582 7.0586 0.000001 4.8725-1.226 7.2266-3.791 7.2266-0.60375 0-1.1285-0.14953-1.4473-0.26953v-13.693c0.36125-0.18 0.97508-0.32227 1.5801-0.32227z"
									transform="matrix(.8 0 0 -.8 37.897 582.21)"
									fill="#fab80a"
								/>
							</g>
						</g>
					</svg>
				)
			case 'fedex':
				return (
					<svg
						viewBox="0 0 167 53"
						xmlns="http://www.w3.org/2000/svg"
						// @ts-ignore
						xmlns:xlink="http://www.w3.org/1999/xlink"
					>
						<image
							width="184.796"
							height="51.685"
							x="-0.212"
							y="0.006"
							style=""
							// @ts-ignore
							xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAACzCAYAAAAZvK0JAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAxhUlEQVR42u3deXwU9fkH8M8zsznIbkBBpV4kAaxaNAmNF1qViiYcYr2w1l5aD7RAEKqQRPtz20oSkAosoOLdqq2C9UKOBLSoVbQaSYIoIpANXqCCkmSTbLIzz+8PwCaIHCHJzmw+79eLFy+WZPc7z3dm9jOzs89ITkZAQY5iJKLHkrdya1gJ6sqGDQz8yLaxxqnjM2FvmT98Zm/OVFSs9RUFT2QZiA4ia7AERERERAyARERERMQASEREREQMgERERETEAEhEREREDIBERERExABIRERERAyARERERMQASEREREQMgERERETEAEhEREREDIBERERExABIRERERAyARERERAyARERERMQASEREREQMgERERETEAEhEREREDIBERERExABIRERERAyARERERMQASEREREQMgERERETEAEhEREREDIBERERExABIRERERAyARERERMQASERERMQASEREREQMgERERETEAEhEREREDIBERERExABIRERERAyARERERMQASEREREQMgERERETEAEhERERE7cPjxkGLyHTbsp+M1Unx9TkyhLe4chLRwe4s7fMVcVtibbFsG42cXKIuGADVxielq8eXxeysrOaKSUQHz4jEf5g0bf0nrAQRfWf/wBIQERERMQASEREREQMgERERETEAEhEREREDIBERERExABIRERERAyARERERMQASEREREQMgERERETEAEhEREREDIBERERExABIRERERAyARERERMQASERERMQASERERUdfgYQmoPWSn3+WNU2+87Yl4miNW8rdHGJJYF6favDnerCsrG93MShERETEAkguMGnR3t9pa4zg1zONUcJxAj1OVH4ihvaHoDeBwAAkRiQA2YBpmi99uRkSAwyIR5GQEAKAWKp9A9DMIPhXVz1TwidrGB1aTVLy0duxWVrzjjcyal9QUaU5TtfsaQJqK9ADUC8AHQQIUPSBoEJVGwA4ppElUt0OMjwE7GPFgUyT5689WrPBHWE0iIgZAcnvYGzXfrFu3Od2GnA7YpwFyak09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"
						/>
					</svg>
				)
			case 'usps':
				return (
					<svg
						viewBox="0 0 136 84"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g
							fill-rule="nonzero"
							transform="matrix(1, 0, 0, 1, -135.041672, -123.805031)"
						>
							<path
								d="M 269.62 124.913 L 153.254 124.919 L 153.184 125.307 C 153.184 125.307 221.594 139.353 222.95 139.595 C 238.667 142.369 238.181 145.401 238.181 145.401 C 249.195 145.346 250.549 145.792 252.474 147.396 C 258.264 152.234 248.851 166.488 248.851 166.488 C 247.505 167.481 145.741 206.78 145.741 206.78 L 252.208 206.78 L 269.617 124.915 L 269.62 124.913 Z M 209.152 143.843 C 206.067 143.819 203.896 143.863 203.647 143.849 L 149.247 143.849 L 135.88 206.802 C 135.88 206.802 176.821 186.71 181.829 184.136 C 192.087 178.866 206.274 171.903 219.385 167.438 C 221.883 166.593 232.585 163.292 238.816 162.181 C 241.232 161.75 242.26 161.339 242.229 160.887 C 242.136 159.597 239.705 159.512 235.592 159.712 C 223.042 160.302 198.994 169.88 192.07 173.531 L 184.258 149.312 L 234.19 149.312 C 235.871 144.6 218.408 143.916 209.152 143.843 Z M 235.624 149.677 C 235.262 149.677 234.951 149.922 234.53 150.491 C 234.147 150.985 233.836 151.317 232.842 151.818 C 231.3 152.577 227.268 153.001 225.381 153.16 C 223.569 153.312 223.077 153.495 223.046 154.195 C 223.029 154.82 223.316 155.177 225.914 155.177 C 231.894 155.177 242.657 152.921 245.901 153.953 C 247.612 154.501 246.238 157.551 244.833 161.56 C 244.288 163.11 245.355 163 245.976 162.32 C 246.597 161.637 249.388 156.528 249.691 153.926 C 250.123 150.23 246.952 149.677 242.58 149.677 L 235.625 149.677 L 235.624 149.677 Z"
								fill="#15569c"
							/>
						</g>
					</svg>
				)
			case 'dhl':
				return (
					<svg
						viewBox="0 0 167 26"
						xmlns="http://www.w3.org/2000/svg"
						// @ts-ignore
						xmlns:xlink="http://www.w3.org/1999/xlink"
					>
						<image
							width="165.593"
							height="23.028"
							x="1.181"
							y="1.314"
							style=""
							// @ts-ignore
							xlink:href="data:image/png;base64,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"
						/>
					</svg>
				)
			default:
				return <div class="ic-twotone-local-shipping" />
		}
	}

	return (
		<div>
			<Form onSubmit={values => handleSubmit(values)}>
				<FormHeader
					of={carrierForm}
					heading="Shipping Options"
					numberLabel={'three'}
				/>

				<ul>
					<div class="space-y-1 md:space-y-2 p-1">
						<For each={queryCarriers?.data?.shipping_options}>
							{option => (
								<li
									onClick={() => setOptionId(option?.id)}
									title="Click to select shipping option"
									role="button"
									tabindex="0"
									onkeypress={e => {
										if (e.key === 'Enter') {
											console.log('ITs a me', option?.id)
											setOptionId(option?.id)
											setSelectedCarrier(option?.id)
										}
									}}
								>
									<input
										type="radio"
										id={option?.id}
										name="hosting"
										value={option?.id}
										class="hidden peer"
										checked={option?.id === props.cart?.shipping_methods?.shipping_option_id || selectedCarrier() === option?.id}
									/>
									<label
										for={option?.id}
										class="grid grid-cols-3 items-center justify-between w-full p-2 text-text_4 bg-normal_1 border border-normal_4 rounded-md cursor-pointer peer-checked:border-accent_5 peer-checked:text-accent_5 peer-checked:border-2 hover:text-accent_5 hover:bg-normal_1"
									>
										<div class="block ">
											<div class="w-full text-base font-500">${(option?.amount / 100).toFixed(2)}</div>
											<div class="w-full">{option?.name}</div>
										</div>
										<div class="flex item-center justify-self-center md:justify-self-center w-13 h-11 md:w-18 md:h-14 ">
											{carrierIcon(option?.metadata?.logo)}
										</div>
										<div class=" flex flex-col  ml-4 md:justify-self-center">
											<div class=" flex items-center justify-center">{option?.metadata?.estimate}</div>
											<div class=" flex items-center justify-center peer-checked:border-accent_5 peer-checked:text-accent_5">
												<div class="i-ic-twotone-local-shipping w-5 h-5" />
												<svg
													aria-hidden="true"
													class="w-6 h-6 mr-1 ml-2"
													fill="currentColor"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														fill-rule="evenodd"
														d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
														clip-rule="evenodd"
													></path>
												</svg>

												<div class="i-bi-house-fill w-5 h-5" />
											</div>
										</div>
									</label>
								</li>
							)}
						</For>
					</div>
				</ul>

				<FormFooter of={carrierForm} />
			</Form>
		</div>
	)
}

export function Billing(props: BillingProps) {
	const { medusa } = useGlobalContext()

	const [billingForm, { Form, Field }] = createForm<PaymentForm>()
	const [refreshForm, setRefreshForm] = createSignal(true)

	function initialServerSideState() {
		console.log(refreshForm())
		if (props.cart?.billing_address?.metadata.validated === 'validated' && refreshForm()) {
			setValues(billingForm, props.cart?.billing_address)
			setValue(billingForm, 'checkbox.phone', props.cart?.billing_address.metadata.checkbox?.phone)
			setValue(billingForm, 'checkbox.company', props.cart?.billing_address.metadata.checkbox?.company)
			setRefreshForm(false)
			/* 
			if (firstRender()) {
				props.setShowBilling?.('edit')
				props.setShowPayment?.('active')
				setFirstRender(false)
			} */
		}
	}

	createEffect(() => {
		initialServerSideState()
	})

	async function handleSubmit() {
		await handleBillingAddress()
	}

	async function handleBillingAddress() {
		await queryBillingAddress.refetch()

		setTimeout(() => {
			props.setFormCompleted?.({
				...props.formCompleted(),
				billing: 'complete'
			})
			props.setShowForm({
				...props.showForm(),
				billing: 'hidden',
				payment: 'active'
			})
		}, 250)
	}

	const queryBillingAddress = createQuery(() => ({
		queryKey: ['cart'],
		queryFn: async function () {
			const address = await medusa?.carts.update(props.cart?.id, {
				billing_address: {
					first_name: getValues(billingForm).first_name,
					last_name: getValues(billingForm).last_name,
					address_1: getValues(billingForm).address_1,
					city: getValues(billingForm).city,
					postal_code: getValues(billingForm).postal_code,
					phone: getValues(billingForm).phone,
					company: getValues(billingForm).company,
					address_2: getValues(billingForm).address_2,
					province: getValues(billingForm).province,
					metadata: {
						validated: 'validated',
						checkbox: {
							phone: getValues(billingForm).checkbox?.phone,
							company: getValues(billingForm).checkbox?.company
						}
					}
				}
			})

			return address
		},
		enabled: false,
		retry: false
	}))

	return (
		<div>
			<Form
				onSubmit={() => handleSubmit()}
				keepResponse={true}
			>
				<FormHeader
					of={billingForm}
					heading="Billing Address"
					numberLabel={'four'}
				/>

				<div class="space-y-1 md:space-y-2">
					<div class="flex flex-col md:flex-row w-full space-y-1">
						<div class="w-full md:w-1/2">
							{/* //first name */}
							<Field
								name="first_name"
								validate={required('Please enter your first name.')}
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
								name="last_name"
								validate={required('Please enter your last name.')}
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

					{/* //Address */}

					<Field
						name="address_1"
						validate={required('Please enter your address.')}
					>
						{(field, props) => (
							<TextInput
								{...props}
								value={field.value}
								error={field.error}
								type="text"
								label="Address"
								required
							/>
						)}
					</Field>
					{/* /Apt# */}
					<Field name="address_2">
						{(field, props) => (
							<TextInput
								{...props}
								value={field.value}
								error={field.error}
								type="text"
								label="Apartment/Suite/Building (optional)"
							/>
						)}
					</Field>

					{/* City */}
					<Field
						name="city"
						validate={required('Please enter your city.')}
					>
						{(field, props) => (
							<TextInput
								{...props}
								value={field.value}
								error={field.error}
								type="text"
								label="City"
								required
							/>
						)}
					</Field>
					<div class="flex flex-row  w-full">
						<div class="w-2/3">
							{/* State */}
							<Field
								name="province"
								validate={required('Please select your state.')}
							>
								{(field, props) => (
									<Select
										{...props}
										value={field.value}
										options={StatesList.map(state => ({
											label: state,
											value: state
										}))}
										error={field.error}
										label="State"
										placeholder="Select a State"
										required
									/>
								)}
							</Field>{' '}
						</div>
						{/* zipcode */}
						<div class="w-1/3">
							<Field
								name="postal_code"
								validate={required('Please enter your zipcode.')}
							>
								{(field, props) => (
									<TextInput
										{...props}
										value={field.value}
										error={field.error}
										type="text"
										label="Zipcode"
										required
									/>
								)}
							</Field>
						</div>
					</div>

					<Show when={getValues(billingForm)?.checkbox?.phone}>
						{/* //Phone Number */}
						<Field
							name="phone"
							validate={required('Please enter your number.')}
						>
							{(field, props) => (
								<TextInput
									{...props}
									value={field.value}
									error={field.error}
									//description="We'll only use this if we need to contact you about your order."
									type="tel"
									label="Phone Number (optional)"
								/>
							)}
						</Field>
					</Show>

					<Show when={getValues(billingForm)?.checkbox?.company}>
						{/* //company Name */}
						<Field name="company">
							{(field, props) => (
								<TextInput
									{...props}
									value={field.value}
									error={field.error}
									type="text"
									label="Company Name"
								/>
							)}
						</Field>
					</Show>
				</div>
				<div class="flex justify-between my-8">
					{/* //ask phone */}
					<Field
						name="checkbox.phone"
						type="boolean"
					>
						{(field, props) => (
							<Checkbox
								{...props}
								checked={field.value}
								error={field.error}
								label="add a number"
							/>
						)}
					</Field>
					{/* //business account */}
					<Field
						name="checkbox.company"
						type="boolean"
					>
						{(field, props) => (
							<Checkbox
								{...props}
								checked={field.value}
								error={field.error}
								label="business purchase"
							/>
						)}
					</Field>
				</div>

				<FormFooter of={billingForm} />
			</Form>
		</div>
	)
}
