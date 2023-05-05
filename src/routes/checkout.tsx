import {
	createForm,
	email,
	getValue,
	pattern,
	required,
	minLength,
	getValues,
	validate,
	setValue
} from '@modular-forms/solid'
import { Match, Switch, createEffect, Show, createSignal, Accessor } from 'solid-js'
import { FormFooter } from '~/Components/checkout_components/FormFooter'
import { FormHeader } from '~/Components/checkout_components/FormHeader'
import { TextInput } from '~/Components/checkout_components/TextInput'
import { Title } from '~/Components/checkout_components/Title'
import { Select } from '~/Components/checkout_components/Select'
import { Checkbox } from '~/Components/checkout_components/Checkbox'
import { useGlobalContext } from '~/Context/Providers'
import { A } from 'solid-start'
import { Cart } from '~/types/types'
import { createQuery, createMutation } from '@tanstack/solid-query'

type PaymentForm = {
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
	setShowShipping: (value: boolean) => void
	cart: Cart
}

interface ShippingProps {
	showShipping: Accessor<boolean>
	setShowPayment?: (value: boolean) => void
	setShowBilling?: (value: boolean) => void
	cart: Cart
}

interface BillingProps {
	showBilling: Accessor<boolean>
	setShowPayment?: (value: boolean) => void
	cart: Cart
}

interface PaymentProps {
	showPayment: Accessor<boolean>
	cart: Cart
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
	const [showShipping, setShowShipping] = createSignal(false)
	const [showPayment, setShowPayment] = createSignal(false)
	const [showBilling, setShowBilling] = createSignal(false)

	return (
		<div class=" text-gray-6">
			<Title>Checkout</Title>
			<Header />
			<div class="flex content-container  ">
				<div class="content-container md:w-[700px]">
					<Express />

					<div class="flex items-center justify-center text-2xl m-2">or</div>
					<Customer
						setShowShipping={setShowShipping}
						cart={queryCart.data?.cart}
					/>
					<div class=" m-6" />
					<Shipping
						showShipping={showShipping}
						setShowPayment={setShowPayment}
						setShowBilling={setShowBilling}
						cart={queryCart.data?.cart}
					/>
					<Billing
						showBilling={showBilling}
						setShowPayment={setShowPayment}
						cart={queryCart.data?.cart}
					/>
					<div class=" m-6" />
					<Payment
						showPayment={showPayment}
						cart={queryCart.data?.cart}
					/>
				</div>
				<div class=" w-[440px] bg-white">Cart Review</div>
			</div>
		</div>
	)
}

export function Header() {
	return (
		<div class="sticky top-0 inset-x-0 z-50 group ">
			<header class={'relative h-16 mx-auto transition-colors border-b border-transparent duration-200 bg-[#fefcfa]'}>
				<nav
					class={
						'flex items-center justify-between w-full h-full text-sm transition-colors duration-200 text-dark group-hover:text-gray-900 relative'
					}
				>
					<div class="flex-1 basis-0 h-full flex items-center m-2">
						<div class="i-fa-solid-lock text-gray-6 " />
						<div class="m-2 text-gray-6">Secure Checkout</div>
					</div>

					<div class="flex items-center h-full"></div>
					<A
						href="/"
						class="text-2xl font-semibold  "
					>
						<div class="flex items-center">
							<div class=" font-poppins uppercase mx-8"> Modern Edge </div>
						</div>
					</A>
					<div class="flex items-center gap-x-10 h-full flex-1 basis-0 justify-end mr-10">
						<div class="hidden sm:flex items-center gap-x-2 h-full text-sm font-semibold font-poppins px-3"></div>
					</div>
					<div class="block m-2 ">
						<A
							href="/cart"
							class="text-xs font-semibold  "
						>
							<div class=" flex items-center font-poppins uppercase">
								Back
								<div class="hidden sm:block mx-0.5">to Shopping Cart</div>
								<div class={'i-tabler-chevron-right text-3xl '} />
							</div>
						</A>
					</div>
				</nav>
			</header>
		</div>
	)
}

export function Express() {
	return (
		<div class="flex flex-col items-center  text-xl m-5 ">
			<div class="text-2xl  font-poppins">Express Checkout</div>
			<div class="flex justify-between justify-center items-center space-x-2 lg:space-x-18">
				<div
					class="flex flex-col items-center   hover:cursor-pointer rounded-lg p-4 mx-4  "
					title="PayPal"
				>
					<div class="i-cib-paypal text-5xl bg-coolgray-7 hover:bg-blue-200" />
				</div>
				<div
					class="flex flex-col justify-center items-center  hover:cursor-pointer rounded-lg p-2  "
					title="Google Pay"
				>
					<div class="i-cib-google-pay text-7xl bg-coolgray-7 hover:bg-blue-200" />
				</div>
				<div
					class="flex flex-col justify-center items-center  hover:cursor-pointer rounded-lg p-2  "
					title="Apple Pay"
				>
					<div class="i-cib-apple-pay text-7xl bg-coolgray-7 hover:bg-blue-200" />
				</div>
				<div
					class="flex flex-col justify-center items-center  hover:cursor-pointer rounded-lg p-3   "
					title="Amazon Pay"
				>
					<div class="i-cib-amazon-pay text-6xl bg-coolgray-7 hover:bg-blue-200 " />
				</div>
			</div>
		</div>
	)
}

export function Customer(props: CustomerProps) {
	const { medusa } = useGlobalContext()

	const [customerForm, { Form, Field }] = createForm<PaymentForm>()
	const [showForm, setShowForm] = createSignal('active')
	const [emailValue, setEmailValue] = createSignal('')
	const [passwordValue, setPasswordValue] = createSignal('')
	const [checkboxValue, setCheckboxValue] = createSignal('none')

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
			setShowForm('edit')
			setValue(customerForm, 'email', props.cart?.email)
			props.setShowShipping(true)
		}
	})

	function handleSubmit(values: PaymentForm) {
		setEmailValue(values.email)
		props.setShowShipping(true)
		setShowForm('edit')
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
		<Form
			class="space-y-2"
			onSubmit={values => handleSubmit(values) as any}
		>
			<FormHeader
				of={customerForm}
				heading="Customer"
				numberLabel={showForm() === 'edit' ? 'check' : 'one'}
				showForm={showForm()}
				setShowForm={setShowForm}
			/>
			<Show when={showForm() === 'active'}>
				<div class="space-y-2">
					{/* //email */}
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
					{/* //password */}
					<Show when={getValues(customerForm).checkbox?.signup || getValues(customerForm).checkbox?.signin}>
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
					<FormFooter of={customerForm} />
					{/* //make account */}
					<div class="flex justify-between">
						<Field
							name="checkbox.signup"
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
						<Field
							name="checkbox.signin"
							type="boolean"
						>
							{(field, props) => (
								<Checkbox
									{...props}
									checked={field.value}
									error={field.error}
									label="sign in to an existing account"
								/>
							)}
						</Field>
					</div>
				</div>
			</Show>
			<Show when={showForm() === 'edit'}>
				<div class="flex px-14">{emailValue()}</div>
			</Show>
		</Form>
	)
}

export function Shipping(props: ShippingProps) {
	const { medusa } = useGlobalContext()

	const [shippingForm, { Form, Field }] = createForm<PaymentForm>()
	const [showForm, setShowForm] = createSignal('hide')
	const [shippingAddress, setShippingAddress] = createSignal<PaymentForm>()
	const [addressAutoComplete, setAddressAutoComplete] = createSignal('')

	function handleSubmit(values: PaymentForm) {
		setShippingAddress(values)
		props.setShowPayment?.(true)
		setShowForm('edit')
		handleShippingAddress()
		//TODO: Add shipping address to Customer account
	}

	createEffect(() => {
		if (props.showShipping() === true) {
			setShowForm('active')
		}
	})

	createEffect(() => {
		if (props.cart?.shipping_address?.customer_id) {
			setShowForm('edit')
			setValue(shippingForm, 'first_name', props.cart?.shipping_address.first_name)
			setValue(shippingForm, 'last_name', props.cart?.shipping_address.last_name)
			setValue(shippingForm, 'address_1', props.cart?.shipping_address.address_1)
			setValue(shippingForm, 'city', props.cart?.shipping_address.city)
			setValue(shippingForm, 'postal_code', props.cart?.shipping_address.postal_code)
			setValue(shippingForm, 'phone', props.cart?.shipping_address.phone)
			setValue(shippingForm, 'company', props.cart?.shipping_address.companyName)
			setValue(shippingForm, 'address_2', props.cart?.shipping_address.aptNumber)
			setValue(shippingForm, 'province', props.cart?.shipping_address.province)
			setValue(shippingForm, 'company', props.cart?.shipping_address.company)
			setValue(shippingForm, 'checkbox.phone', props.cart?.shipping_address.metadata?.checkbox?.phone)
			setValue(shippingForm, 'checkbox.company', props.cart?.shipping_address.metadata?.checkbox?.company)

			setShippingAddress({
				...props.cart?.shipping_address,
				checkbox: props.cart?.shipping_address.metadata?.checkbox
			})
			setShowForm('edit')
			props.setShowPayment?.(true)
		}
	})

	async function handleShippingAddress() {
		queryShippingAddress.refetch()

		//TODO: IDK if this is needed yet
		addCustomerAddress.refetch()
	}

	const addCustomerAddress = createQuery(() => ({
		queryKey: ['customer_info'],
		queryFn: async function () {
			const address = await medusa?.customers.update({
				billing_address: {
					first_name: shippingAddress()?.first_name,
					last_name: shippingAddress()?.last_name,
					address_1: shippingAddress()?.address_1,
					city: shippingAddress()?.city,
					postal_code: shippingAddress()?.postal_code,
					phone: shippingAddress()?.phone,
					company: shippingAddress()?.company,
					address_2: shippingAddress()?.address_2,
					province: shippingAddress()?.province
				}
			})

			return address
		},
		enabled: false
	}))

	const queryShippingAddress = createQuery(() => ({
		queryKey: ['cart'],
		queryFn: async function () {
			const address = await medusa?.carts.update(props.cart?.id, {
				shipping_address: {
					first_name: shippingAddress()?.first_name,
					last_name: shippingAddress()?.last_name,
					address_1: shippingAddress()?.address_1,
					city: shippingAddress()?.city,
					postal_code: shippingAddress()?.postal_code,
					phone: shippingAddress()?.phone,
					company: shippingAddress()?.company,
					address_2: shippingAddress()?.address_2,
					province: shippingAddress()?.province,
					metadata: {
						checkbox: {
							phone: shippingAddress()?.checkbox.phone,
							company: shippingAddress()?.checkbox.company
						}
					}
				}
			})

			return address
		},
		enabled: false
	}))

	return (
		<Form onSubmit={values => handleSubmit(values)}>
			<FormHeader
				of={shippingForm}
				heading="Shipping"
				numberLabel={showForm() === 'edit' ? 'check' : 'two'}
				showForm={showForm()}
				setShowForm={setShowForm}
			/>
			<Show when={props.showShipping() === true && showForm() === 'active'}>
				<div class="space-y-2">
					<div class="flex flex-col md:flex-row w-full">
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

					<Show when={getValues(shippingForm).checkbox?.phone}>
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
									type="text"
									label="Phone Number (optional)"
								/>
							)}
						</Field>
					</Show>

					<Show when={getValues(shippingForm).checkbox?.company}>
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
					<div class="space-y-8">
						<div class="flex ">
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
					</div>
				</div>
			</Show>

			<Show when={showForm() === 'edit'}>
				<div class="flex  flex-col px-14">
					<div>Shipping Address:</div>
					<div class="flex space-x-2">
						<div>{shippingAddress()?.first_name}</div>
						<div>{shippingAddress()?.last_name}</div>
					</div>

					<div class="flex space-x-2">
						<div>{shippingAddress()?.address_1}</div>
					</div>
					<div class="flex space-x-2">
						<div>{shippingAddress()?.address_2 ? shippingAddress()?.address_2 : ''}</div>
					</div>

					<div class="flex space-x-2">
						<div>{shippingAddress()?.city}</div>,<div>{shippingAddress()?.province}</div>
						<div>{shippingAddress()?.postal_code}</div>
					</div>
					<div>{shippingAddress()?.checkbox?.company ? shippingAddress()?.company : ''}</div>
					<div>{shippingAddress()?.checkbox?.phone ? shippingAddress()?.phone : ''}</div>
				</div>
			</Show>
			<FormFooter of={shippingForm} />
		</Form>
	)
}

export function Billing(props: BillingProps) {
	const { medusa } = useGlobalContext()

	const [billingForm, { Form, Field }] = createForm<PaymentForm>()

	//TODO: ShowForm is never used in props to make it active

	const [showForm, setShowForm] = createSignal('hide')
	const [billingAddress, setBillingAddress] = createSignal<PaymentForm>()
	const [addressAutoComplete, setAddressAutoComplete] = createSignal('')

	function handleSubmit(values: PaymentForm) {
		setBillingAddress(values)
		props.setShowPayment?.(true)
		setShowForm('edit')
		handleShippingAddress()
		//TODO: Add shipping address to Customer account
	}

	createEffect(() => {
		if (props.showBilling() === true) {
			setShowForm('active')
		}
	})

	createEffect(() => {
		if (props.cart?.billing_address) {
			setShowForm('edit')
			setValue(billingForm, 'first_name', props.cart?.billing_address.first_name)
			setValue(billingForm, 'last_name', props.cart?.billing_address.last_name)
			setValue(billingForm, 'address_1', props.cart?.billing_address.address_1)
			setValue(billingForm, 'city', props.cart?.billing_address.city)
			setValue(billingForm, 'postal_code', props.cart?.billing_address.postal_code)
			setValue(billingForm, 'phone', props.cart?.billing_address.phone)
			setValue(billingForm, 'company', props.cart?.billing_address.companyName)
			setValue(billingForm, 'address_2', props.cart?.billing_address.aptNumber)
			setValue(billingForm, 'province', props.cart?.billing_address.province)
			setValue(billingForm, 'company', props.cart?.billing_address.company)
			setValue(billingForm, 'checkbox.phone', props.cart?.billing_address.metadata.checkbox?.phone)
			setValue(billingForm, 'checkbox.company', props.cart?.billing_address.metadata.checkbox?.company)

			setBillingAddress({
				...props.cart?.shipping_address,
				checkbox: props.cart?.shipping_address.metadata?.checkbox
			})
			setShowForm('edit')
			props.setShowPayment?.(true)
		}
	})

	async function handleShippingAddress() {
		queryShippingAddress.refetch()
		addCustomerAddress.refetch()
	}

	const addCustomerAddress = createQuery(() => ({
		queryKey: ['customer_info'],
		queryFn: async function () {
			const address = await medusa?.customers.update({
				billing_address: {
					first_name: billingAddress()?.first_name,
					last_name: billingAddress()?.last_name,
					address_1: billingAddress()?.address_1,
					city: billingAddress()?.city,
					postal_code: billingAddress()?.postal_code,
					phone: billingAddress()?.phone,
					company: billingAddress()?.company,
					address_2: billingAddress()?.address_2,
					province: billingAddress()?.province
				}
			})

			return address
		},
		enabled: false
	}))

	const queryShippingAddress = createQuery(() => ({
		queryKey: ['cart'],
		queryFn: async function () {
			const address = await medusa?.carts.update(props.cart?.id, {
				shipping_address: {
					first_name: billingAddress()?.first_name,
					last_name: billingAddress()?.last_name,
					address_1: billingAddress()?.address_1,
					city: billingAddress()?.city,
					postal_code: billingAddress()?.postal_code,
					phone: billingAddress()?.phone,
					company: billingAddress()?.company,
					address_2: billingAddress()?.address_2,
					province: billingAddress()?.province,
					metadata: {
						checkbox: {
							phone: billingAddress()?.checkbox.phone,
							company: billingAddress()?.checkbox.company
						}
					}
				}
			})

			return address
		},
		enabled: false
	}))

	return (
		<Form onSubmit={values => handleSubmit(values)}>
			<Show when={props.cart?.customer_id}>
				<Field
					name="checkbox.billing"
					type="boolean"
				>
					{(field, props) => (
						<Checkbox
							{...props}
							checked={true}
							error={field.error}
							label="My billing address is the same as my shipping address."
						/>
					)}
				</Field>
			</Show>
			<Show when={getValues(billingForm).checkbox?.billing === false}>
				<FormHeader
					of={billingForm}
					heading="Billing Address"
					numberLabel={showForm() === 'edit' ? 'check' : 'fill'}
					showForm={showForm()}
					setShowForm={setShowForm}
				/>

				<div class="space-y-2">
					<div class="flex flex-col md:flex-row w-full">
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

					<Show when={getValues(billingForm).checkbox?.phone}>
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
									type="text"
									label="Phone Number (optional)"
								/>
							)}
						</Field>
					</Show>

					<Show when={getValues(billingForm).checkbox?.company}>
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

					<div class="flex ">
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
				</div>
			</Show>

			<Show when={showForm() === 'edit'}>
				<div class="flex  flex-col px-14">
					<div>Shipping Address:</div>
					<div class="flex space-x-2">
						<div>{billingAddress()?.first_name}</div>
						<div>{billingAddress()?.last_name}</div>
					</div>

					<div class="flex space-x-2">
						<div>{billingAddress()?.address_1}</div>
					</div>
					<div class="flex space-x-2">
						<div>{billingAddress()?.address_2 ? billingAddress()?.address_2 : ''}</div>
					</div>

					<div class="flex space-x-2">
						<div>{billingAddress()?.city}</div>,<div>{billingAddress()?.province}</div>
						<div>{billingAddress()?.postal_code}</div>
					</div>
					<div>{billingAddress()?.checkbox.company ? billingAddress()?.company : ''}</div>
					<div>{billingAddress()?.checkbox.phone ? billingAddress()?.phone : ''}</div>
				</div>
			</Show>
			<FormFooter of={billingForm} />
		</Form>
	)
}

export function Payment(props: PaymentProps) {
	const [paymentForm, { Form, Field }] = createForm<PaymentForm>()

	return (
		<Form onSubmit={values => alert(JSON.stringify(values, null, 4))}>
			<FormHeader
				of={paymentForm}
				heading="Payment"
				numberLabel="three"
			/>
			<Show when={props.showPayment() === true}>
				<div class="space-y-2 ">
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
									pattern(/^\d{4}\s?(\d{6}\s?\d{5}|\d{4}\s?\d{4}\s?\d{4})$/, 'The card number is badly formatted.')
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
									pattern(/^(0[1-9]|1[0-2])\/2[2-9]$/, 'The expiration date is badly formatted.')
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
								validate={[required('Please enter your PayPal email.'), email('The email address is badly formatted.')]}
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
			</Show>
			<FormFooter of={paymentForm} />
		</Form>
	)
}
