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
import { Match, Switch, createEffect, Show, createSignal, Accessor, For } from 'solid-js'
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
		console.log(showForm())
	})

	createEffect(() => {
		if (showForm().customer === 'active') {
			setTimeout(() => {
				setCustomerDelayPassed(true)
			}, 2500)
		}
	})

	return (
		<div class=" text-gray-6">
			<Title>Checkout</Title>
			<CartDrawer
				mobileDrawer={mobileDrawer}
				setMobileDrawer={setMobileDrawer}
			/>
			<div
				class=" top-0 inset-x-0 z-100 bg-gradient-to-b from-white/50 to-white/10 h-23"
				style="backdrop-filter: blur(20px)"
			>
				<Header />
				<div class=" top-12 z-101 md:hidden mx-2 ">
					<Stepper
						formCompleted={formCompleted}
						setShowForm={setShowForm}
						showForm={showForm}
					/>
				</div>
			</div>

			<div class="md:flex md:content-container md:h-[80vh]">
				<div class="md:content-container md:w-[700px] md:space-y-12 mx-2">
					<div
						class="hidden md:block sticky top-12 z-101 bg-white/80 h-12 mx-2 "
						style="backdrop-filter: blur(10px)"
					>
						<Stepper
							formCompleted={formCompleted}
							setShowForm={setShowForm}
							showForm={showForm}
						/>
					</div>
					<Show when={showForm().customer === 'active'}>
						<input
							type="text"
							autofocus
							style="display:none"
						/>
						<Express />
						<div class="hidden md:flex items-center justify-center text-2xl m-2">or</div>
						<Show when={showForm().customer === 'active' && customerDelayPassed()}>
							<Customer
								setShowForm={setShowForm}
								showForm={showForm}
								setFormCompleted={setFormCompleted}
								formCompleted={formCompleted}
								cart={queryCart.data?.cart}
							/>
						</Show>
					</Show>

					<Show when={showForm().shipping === 'active'}>
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
					<Show when={showForm().billing === 'active'}>
						<Billing
							setShowForm={setShowForm}
							showForm={showForm}
							setFormCompleted={setFormCompleted}
							formCompleted={formCompleted}
							cart={queryCart.data?.cart}
						/>
					</Show>
					<Show when={showForm().payment === 'active'}>
						<Payment
							setShowForm={setShowForm}
							showForm={showForm}
							cart={queryCart.data?.cart}
						/>
					</Show>
				</div>
				<div class="hidden md:block md:w-[433px] mx-auto bg-white">
					<CartCore variant="checkout" />
				</div>
			</div>
		</div>
	)
}

export function Header() {
	return (
		<div>
			<header class={'relative h-12 md:h-16 mx-auto'}>
				<nav class={'flex items-center justify-between h-full '}>
					<div class="flex items-center ">
						<div class="i-fa-solid-lock text-gray-6 ml-4.5 text-base md:text-sm" />
						<div class="hidden md:block text-gray-6 md:ml-3 "> Secure Checkout </div>
					</div>

					<div class="flex items-center ">
						<A
							href="/"
							class="text-lg md:text-2xl font-semibold  "
						>
							<div class=" font-poppins uppercase "> Modern Edge </div>
						</A>
					</div>
					<div class="flex">
						<A
							href="/cart"
							class="text-xs font-semibold  "
						>
							<div class=" flex items-center font-poppins uppercase">
								Back
								<div class="hidden sm:block mr-0.5">to Shopping Cart</div>
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
				class="flex items-center  bg-red-7 rounded-full md:hidden z-1 relative"
				style="position: fixed; top: 25vh; right: -1.75rem; width: 3.75rem; height: 3rem;"
				onClick={() => props.setMobileDrawer({ cart: 'active', checkout: 'active' })}
			>
				<div class="i-ion-cart-outline bg-white text-2xl absolute top-3 left-1.75" />
			</div>
			<div
				class={`fixed inset-0 bg-white/30 z-200 transition-all duration-250 ease-in-out ${
					props.mobileDrawer().cart === 'active' ? '' : 'opacity-0 pointer-events-none'
				}`}
				style="backdrop-filter: blur(5px)"
				onClick={event => {
					if (event.target === event.currentTarget) {
						props.setMobileDrawer({ cart: 'hidden', checkout: 'active' })
					}
				}}
			>
				<div
					class="i-ph-x-circle-fill text-red-5 w-6 h-6 absolute top-3 right-4"
					onClick={event => {
						if (event.target === event.currentTarget) {
							props.setMobileDrawer({ cart: 'hidden', checkout: 'active' })
						}
					}}
				/>
				<div
					class={`fixed top-12 right-0 h-full w-[95vw] bg-white z-200 transform rounded-sm  transition-transform duration-500 ease-in-out p-2 ${
						props.mobileDrawer().cart === 'active' ? '' : 'translate-x-full'
					}`}
				>
					<CartCore variant="mobile-checkout" />
				</div>
			</div>
		</div>
	)
}

export function StepperWIP(props: StepperProps) {
	/* 	const [stepperData, setStepperData] = createSignal([])

	createEffect(() => {
		const data = [
			{
				title: 'Customer',
				elementState: 'active'
			},
			{
				title: 'Shipping',
				elementState:
					props.formCompleted().customer === 'complete'
						? props.formCompleted().shipping === 'complete'
							? 'complete'
							: 'active'
						: 'queued'
			},
			{
				title: 'Carrier',
				elementState:
					props.formCompleted().shipping === 'complete'
						? props.formCompleted().carrier === 'complete'
							? 'complete'
							: 'active'
						: 'queued'
			},
			{
				title: 'Billing',
				elementState:
					props.formCompleted().carrier === 'complete'
						? props.formCompleted().billing === 'complete'
							? 'complete'
							: 'active'
						: 'queued'
			},
			{
				title: 'Payment',
				elementState: props.formCompleted().billing === 'complete' ? 'active-end' : 'queued-end'
			}
		]
		setStepperData(data)
	})

	return (
		<div>
			<ol class="flex items-center w-full">
				{stepperData().map((data, index) => {
					console.log(data.title, data.elementState)
					return (
						<StepperElement
							key={index}
							title={data.title}
							elementState={data.elementState}
							setShowForm={props.setShowForm}
						/>
					)
				})}
			</ol>
		</div>
	) */
}

export function Stepper(props: StepperProps) {
	return (
		<div>
			<Show when={props.formCompleted().customer !== 'complete'}>
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

export function Express() {
	return (
		<div class="m-1 md:m-2 space-y-1 md:space-y-3 ">
			<div class=" text-lg md:text-2xl font-medium text-slate-700 dark:text-slate-200 md:text-2xl  ">Express Checkout</div>
			<div class=" space-y-1 md:space-y-2 ">
				<div class="md:flex md:flex-row justify-center  space-y-1 md:space-y-0 md:space-x-2 ">
					<div
						class="flex flex-col items-center h-[44px] md:h-[66px]  hover:cursor-pointer rounded-t-sm rounded-b-sm md:rounded-l-sm md:rounded-r-0 p-2 bg-[#E5E5E5] border border-sky-500/50 hover:border-sky-500  md:w-1/2  "
						title="PayPal"
						role="button"
						tabindex="0"
					>
						<svg
							clip-rule="evenodd"
							fill-rule="evenodd"
							stroke-linejoin="round"
							stroke-miterlimit="1.414"
							viewBox="87 152 387 94"
							xmlns="http://www.w3.org/2000/svg"
							height={50}
							width={125}
						>
							<g fill-rule="nonzero">
								<path
									d="M233.53 175.128h-20.397a2.844 2.844 0 0 0-2.8 2.391l-8.249 52.3a1.707 1.707 0 0 0 1.679 1.962l9.74.001a2.844 2.844 0 0 0 2.8-2.394l2.225-14.107a2.841 2.841 0 0 1 2.798-2.395h6.456c13.436 0 21.19-6.501 23.215-19.385.912-5.636.038-10.065-2.6-13.166-2.9-3.406-8.041-5.207-14.868-5.207zm2.352 19.101c-1.115 7.319-6.707 7.319-12.114 7.319h-3.077l2.159-13.668a1.706 1.706 0 0 1 1.679-1.435h1.41c3.684 0 7.158 0 8.953 2.1 1.07 1.252 1.399 3.113.99 5.684zm58.615-.235h-9.768c-.832 0-1.547.61-1.679 1.434l-.432 2.732-.683-.99c-2.114-3.07-6.83-4.095-11.535-4.095-10.793 0-20.012 8.175-21.807 19.641-.933 5.72.394 11.19 3.638 15.004 2.977 3.508 7.235 4.969 12.302 4.969 8.697 0 13.52-5.592 13.52-5.592l-.436 2.714a1.708 1.708 0 0 0 1.676 1.968h8.798a2.844 2.844 0 0 0 2.8-2.394l5.279-33.43a1.7 1.7 0 0 0-1.673-1.962zm-13.615 19.009c-.942 5.58-5.37 9.325-11.02 9.325-2.835 0-5.102-.91-6.557-2.633-1.444-1.712-1.993-4.148-1.533-6.862.88-5.532 5.383-9.4 10.945-9.4 2.773 0 5.028.921 6.513 2.66 1.488 1.756 2.079 4.208 1.652 6.91zm65.632-19.01h-9.815c-.94 0-1.82.469-2.347 1.244l-13.537 19.94-5.738-19.161a2.849 2.849 0 0 0-2.72-2.022h-9.65c-.93 0-1.7.766-1.7 1.7 0 .187.033.372.092.548l10.811 31.726-10.164 14.348a1.708 1.708 0 0 0-.313.984c0 .933.767 1.7 1.7 1.7h9.803c.928 0 1.801-.453 2.33-1.217l32.644-47.12c.196-.284.304-.624.304-.97 0-.933-.767-1.7-1.7-1.7z"
									fill="#253b80"
								/>
								<path
									d="M379.009 175.128H358.61a2.84 2.84 0 0 0-2.797 2.391l-8.25 52.3a1.706 1.706 0 0 0 1.676 1.962l10.468.001c.973 0 1.808-.715 1.957-1.676l2.341-14.825a2.841 2.841 0 0 1 2.797-2.395h6.454c13.438 0 21.19-6.501 23.217-19.385.916-5.636.036-10.065-2.603-13.166-2.896-3.406-8.035-5.207-14.861-5.207zm2.353 19.101c-1.112 7.319-6.704 7.319-12.114 7.319h-3.075l2.162-13.668a1.701 1.701 0 0 1 1.676-1.435h1.411c3.68 0 7.157 0 8.953 2.1 1.07 1.252 1.396 3.113.987 5.684zm58.611-.235h-9.76a1.696 1.696 0 0 0-1.677 1.434l-.432 2.732-.686-.99c-2.115-3.07-6.827-4.095-11.533-4.095-10.793 0-20.008 8.175-21.804 19.641-.93 5.72.391 11.19 3.636 15.004 2.982 3.508 7.235 4.969 12.302 4.969 8.696 0 13.519-5.592 13.519-5.592l-.436 2.714a1.707 1.707 0 0 0 1.679 1.968h8.798a2.841 2.841 0 0 0 2.797-2.394l5.282-33.43c.012-.086.021-.172.021-.259 0-.933-.77-1.702-1.703-1.702h-.003zm-13.614 19.009c-.937 5.58-5.371 9.325-11.02 9.325-2.83 0-5.102-.91-6.558-2.633-1.443-1.712-1.986-4.148-1.533-6.862.886-5.532 5.383-9.4 10.945-9.4 2.774 0 5.029.921 6.514 2.66 1.494 1.756 2.084 4.208 1.652 6.91zm25.129-36.441-8.372 53.258a1.706 1.706 0 0 0 1.676 1.962h8.417a2.83 2.83 0 0 0 2.8-2.394l8.255-52.298a1.71 1.71 0 0 0-1.676-1.965h-9.424a1.706 1.706 0 0 0-1.676 1.437z"
									fill="#179bd7"
								/>
								<path
									d="m117.384 241.946 1.56-9.907-3.475-.08H98.88l11.53-73.106a.946.946 0 0 1 .936-.8h27.974c9.286 0 15.695 1.933 19.041 5.748 1.57 1.79 2.568 3.659 3.051 5.717.507 2.159.516 4.739.021 7.885l-.036.23v2.016l1.57.888a10.963 10.963 0 0 1 3.175 2.422c1.342 1.53 2.21 3.474 2.577 5.78.379 2.37.254 5.192-.367 8.386-.716 3.674-1.873 6.874-3.435 9.493a19.491 19.491 0 0 1-5.443 5.964c-2.076 1.474-4.542 2.592-7.33 3.308-2.703.703-5.783 1.058-9.162 1.058h-2.177c-1.557 0-3.07.561-4.256 1.566a6.6 6.6 0 0 0-2.219 3.96l-.164.892-2.756 17.462-.125.64c-.033.204-.09.305-.173.374a.456.456 0 0 1-.286.104z"
									fill="#253b80"
								/>
								<path
									d="M164.45 177.865c-.083.534-.179 1.08-.286 1.64-3.69 18.941-16.31 25.484-32.43 25.484h-8.207a3.986 3.986 0 0 0-3.94 3.376l-4.201 26.65-1.19 7.554a2.001 2.001 0 0 0-.027.328c0 1.151.948 2.1 2.1 2.1h14.556a3.503 3.503 0 0 0 3.46-2.953l.143-.74 2.74-17.392.176-.954a3.5 3.5 0 0 1 3.46-2.959h2.177c14.103 0 25.144-5.726 28.37-22.295 1.348-6.922.65-12.702-2.916-16.767a13.887 13.887 0 0 0-3.985-3.072z"
									fill="#179bd7"
								/>
								<path
									d="M160.591 176.326a29.514 29.514 0 0 0-3.587-.796 45.558 45.558 0 0 0-7.236-.528h-21.925a3.506 3.506 0 0 0-3.457 2.959l-4.664 29.542-.134.862a3.998 3.998 0 0 1 3.94-3.376h8.207c16.119 0 28.74-6.546 32.429-25.483.11-.561.203-1.107.286-1.64-.972-.51-1.989-.94-3.033-1.28-.274-.09-.548-.176-.826-.26z"
									fill="#222d65"
								/>
								<path
									d="M124.386 177.96a3.498 3.498 0 0 1 3.457-2.955h21.925c2.598 0 5.023.17 7.236.528 1.497.236 2.973.588 4.416 1.053 1.089.36 2.1.787 3.033 1.28 1.098-7-.009-11.766-3.793-16.081-4.172-4.751-11.703-6.785-21.339-6.785h-27.973a3.998 3.998 0 0 0-3.952 3.379l-11.652 73.857a2.415 2.415 0 0 0 2.37 2.78h17.272l4.336-27.513z"
									fill="#253b80"
								/>
							</g>
						</svg>
					</div>
					<div
						class="flex flex-col justify-center items-center h-[44px] md:h-[66px]  hover:cursor-pointer rounded-sm md:rounded-r-sm md:rounded-l-0  p-2 bg-[#E5E5E5] border border-sky-500/50 hover:border-sky-500 md:w-1/2  "
						title="Google Pay"
						role="button"
						tabindex="0"
					>
						<svg
							clip-rule="evenodd"
							fill-rule="evenodd"
							stroke-linejoin="round"
							stroke-miterlimit="2"
							viewBox="28 153 503 90"
							xmlns="http://www.w3.org/2000/svg"
							height={50}
							width={150}
						>
							<linearGradient
								id="a"
								gradientTransform="matrix(37.1617 13.5257 -13.5257 37.1617 89.5958 189.705)"
								gradientUnits="userSpaceOnUse"
								x1="0"
								x2="1"
								y1="0"
								y2="0"
							>
								<stop
									offset="0"
									stop-color="#d93025"
								/>
								<stop
									offset=".2"
									stop-color="#d93025"
								/>
								<stop
									offset=".6"
									stop-color="#ea4335"
								/>
								<stop
									offset="1"
									stop-color="#ea4335"
								/>
							</linearGradient>
							<linearGradient
								id="b"
								gradientTransform="matrix(41.3983 15.0678 -15.0678 41.3983 33.1792 194.082)"
								gradientUnits="userSpaceOnUse"
								x1="0"
								x2="1"
								y1="0"
								y2="0"
							>
								<stop
									offset="0"
									stop-color="#4285f4"
								/>
								<stop
									offset=".2"
									stop-color="#4285f4"
								/>
								<stop
									offset=".8"
									stop-color="#1b74e8"
								/>
								<stop
									offset="1"
									stop-color="#1b74e8"
								/>
							</linearGradient>
							<g fill-rule="nonzero">
								<g fill="#5f6368">
									<path d="m432.811 205.534v21.064h-6.699v-52.015h17.733c4.514 0 8.347 1.504 11.499 4.514 3.188 3.009 4.801 6.663 4.801 10.962 0 4.406-1.613 8.096-4.801 11.033-3.116 2.974-6.914 4.442-11.499 4.442zm0-24.539v18.163h11.177c2.651 0 4.872-.896 6.628-2.687 1.791-1.791 2.686-3.941 2.686-6.412 0-2.436-.895-4.514-2.686-6.305-1.756-1.827-3.941-2.759-6.628-2.759z" />
									<path d="m477.626 189.844c4.944 0 8.849 1.325 11.715 3.976 2.865 2.651 4.298 6.269 4.298 10.855v21.959h-6.412v-4.943h-.287c-2.758 4.083-6.448 6.09-11.033 6.09-3.941 0-7.201-1.147-9.852-3.475-2.651-2.329-3.976-5.231-3.976-8.705 0-3.69 1.397-6.628 4.191-8.777 2.795-2.185 6.52-3.26 11.141-3.26 3.977 0 7.237.716 9.816 2.185v-1.54c0-2.329-.931-4.299-2.758-5.911s-4.013-2.436-6.484-2.436c-3.726 0-6.699 1.576-8.849 4.729l-5.875-3.69c3.224-4.729 8.025-7.057 14.365-7.057zm-8.633 25.864c0 1.755.752 3.188 2.221 4.371 1.469 1.146 3.224 1.755 5.194 1.755 2.795 0 5.302-1.039 7.523-3.117 2.221-2.077 3.296-4.513 3.296-7.344-2.078-1.647-4.979-2.471-8.705-2.471-2.723 0-4.98.644-6.807 1.97-1.827 1.29-2.722 2.902-2.722 4.836z" />
									<path d="m530 191.026-22.318 51.299h-6.914l8.275-17.948-14.687-33.351h7.272l10.604 25.578h.143l10.317-25.578z" />
									<path d="m200.318 203.815v-8.06h26.939c.287 1.432.43 3.116.43 4.943 0 6.018-1.648 13.506-6.95 18.807-5.158 5.374-11.786 8.276-20.527 8.276-16.228 0-29.876-13.219-29.876-29.447s13.613-29.483 29.841-29.483c8.991 0 15.368 3.511 20.168 8.132l-5.66 5.66c-3.439-3.224-8.132-5.732-14.508-5.732-11.858 0-21.1 9.565-21.1 21.423 0 11.857 9.242 21.386 21.1 21.386 7.702 0 12.072-3.08 14.866-5.875 2.293-2.292 3.798-5.552 4.371-10.03z" />
									<path d="m268.705 208.794c0 10.926-8.562 18.951-19.023 18.951-10.46 0-19.022-8.061-19.022-18.951 0-10.998 8.562-18.95 19.022-18.95 10.497 0 19.023 7.988 19.023 18.95zm-8.311 0c0-6.842-4.944-11.499-10.712-11.499-5.731 0-10.711 4.657-10.711 11.499 0 6.735 4.944 11.499 10.711 11.499 5.768 0 10.712-4.728 10.712-11.499z" />
									<path d="m310.224 208.794c0 10.926-8.562 18.951-19.022 18.951-10.461 0-19.023-8.025-19.023-18.951 0-10.998 8.562-18.95 19.023-18.95 10.496 0 19.022 7.988 19.022 18.95zm-8.311 0c0-6.842-4.944-11.499-10.711-11.499-5.732 0-10.711 4.657-10.711 11.499 0 6.735 4.943 11.499 10.711 11.499 5.731 0 10.711-4.728 10.711-11.499z" />
									<path d="m350.024 190.99v34.032c0 14.007-8.276 19.739-18.02 19.739-9.206 0-14.723-6.162-16.801-11.213l7.237-3.009c1.289 3.081 4.442 6.735 9.564 6.735 6.234 0 10.138-3.869 10.138-11.141v-2.723h-.286c-1.863 2.293-5.445 4.299-9.995 4.299-9.493 0-18.162-8.275-18.162-18.879 0-10.711 8.705-19.022 18.162-19.022 4.514 0 8.132 2.006 9.995 4.227h.286v-3.081zm-7.308 17.876c0-6.663-4.442-11.571-10.138-11.571-5.732 0-10.568 4.872-10.568 11.571 0 6.591 4.8 11.427 10.568 11.427 5.66 0 10.138-4.8 10.138-11.427z" />
									<path d="m355.791 171.072h8.347v55.562h-8.347z" />
									<path d="m396.307 215.063 6.449 4.299c-2.078 3.081-7.093 8.419-15.799 8.419-10.782 0-18.807-8.347-18.807-18.951 0-11.284 8.132-18.951 17.876-18.951 9.851 0 14.652 7.846 16.228 12.073l.86 2.149-25.363 10.497c1.934 3.797 4.943 5.731 9.206 5.731 4.263-.036 7.201-2.113 9.35-5.266zm-19.882-6.842 16.945-7.057c-.932-2.365-3.726-4.012-7.022-4.012-4.263.035-10.138 3.761-9.923 11.069z" />
								</g>
								<path
									d="m83.319 207.29 25.04-43.382 13.649 7.881c8.813 5.087 11.822 16.335 6.735 25.148l-14.115 24.431c-3.188 5.517-10.209 7.38-15.726 4.227l-12.646-7.308c-3.833-2.256-5.158-7.164-2.937-10.997z"
									fill="url(#a)"
								/>
								<path
									d="m80.668 177.162-31.13 53.95 13.648 7.881c8.813 5.087 20.061 2.078 25.148-6.735l20.205-34.999c3.188-5.517 1.289-12.538-4.228-15.726l-12.681-7.308c-3.833-2.221-8.741-.896-10.962 2.937z"
									fill="#fdbd00"
								/>
								<path
									d="m108.359 163.908-9.636-5.589c-10.998-6.341-25.076-2.579-31.453 8.419l-17.912 31.023c-3.188 5.516-1.289 12.538 4.228 15.726l9.636 5.588c5.517 3.189 12.538 1.29 15.726-4.227l21.387-37.041c4.442-7.702 14.258-10.317 21.96-5.875"
									fill="#2da94f"
								/>
								<path
									d="m70.064 175.837-10.639-6.126c-4.765-2.723-10.819-1.111-13.541 3.618l-12.825 22.067c-6.305 10.855-2.544 24.754 8.347 31.059l8.096 4.657 9.851 5.66 4.263 2.472c-7.559-5.087-9.959-15.225-5.338-23.213l3.296-5.696 12.108-20.921c2.759-4.801 1.111-10.855-3.618-13.577z"
									fill="url(#b)"
								/>
							</g>
						</svg>
					</div>
				</div>
				<div class="md:flex md:flex-row justify-center space-y-1 md:space-y-0 md:space-x-2">
					<div
						class="flex flex-col justify-center items-center h-[44px] md:h-[66px]  hover:cursor-pointer rounded-sm md:rounded-l-sm md:rounded-tr-0 md:rounded-bl-md  p-2 bg-[#E5E5E5] border border-sky-500/50 hover:border-sky-500 md:w-1/2 "
						title="Apple Pay"
						role="button"
						tabindex="0"
					>
						<svg
							fill="#000000"
							width="100px"
							height="35px"
							viewBox="0 0 120.3 51"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g fill="#7d7d7d">
								<path d="M22.8 6.6c1.4-1.8 2.4-4.2 2.1-6.6-2.1.1-4.6 1.4-6.1 3.1-1.3 1.5-2.5 4-2.2 6.3 2.4.3 4.7-1 6.2-2.8M24.9 10c-3.4-.2-6.3 1.9-7.9 1.9-1.6 0-4.1-1.8-6.8-1.8-3.5.1-6.7 2-8.5 5.2-3.6 6.3-1 15.6 2.6 20.7 1.7 2.5 3.8 5.3 6.5 5.2 2.6-.1 3.6-1.7 6.7-1.7s4 1.7 6.8 1.6 4.6-2.5 6.3-5.1c2-2.9 2.8-5.7 2.8-5.8-.1-.1-5.5-2.1-5.5-8.3-.1-5.2 4.2-7.7 4.4-7.8-2.3-3.6-6.1-4-7.4-4.1" />
							</g>

							<g fill="#7d7d7d">
								<path d="M54.3 2.9c7.4 0 12.5 5.1 12.5 12.4 0 7.4-5.2 12.5-12.7 12.5H46v12.9h-5.9V2.9h14.2zm-8.3 20h6.7c5.1 0 8-2.8 8-7.5 0-4.8-2.9-7.5-8-7.5h-6.8v15h.1zM68.3 33c0-4.8 3.7-7.8 10.3-8.2l7.6-.4v-2.1c0-3.1-2.1-4.9-5.5-4.9-3.3 0-5.3 1.6-5.8 4h-5.4c.3-5 4.6-8.7 11.4-8.7 6.7 0 11 3.5 11 9.1v19h-5.4v-4.5h-.1c-1.6 3.1-5.1 5-8.7 5-5.6 0-9.4-3.4-9.4-8.3zm17.9-2.5v-2.2l-6.8.4c-3.4.2-5.3 1.7-5.3 4.1 0 2.4 2 4 5 4 4 0 7.1-2.7 7.1-6.3zM96.9 51v-4.6c.4.1 1.4.1 1.8.1 2.6 0 4-1.1 4.9-3.9 0-.1.5-1.7.5-1.7l-10-27.6h6.1l7 22.5h.1l7-22.5h6L110 42.4c-2.4 6.7-5.1 8.8-10.8 8.8-.4-.1-1.8-.1-2.3-.2z" />
							</g>
						</svg>
					</div>
					<div
						class="flex flex-col justify-center items-center h-[44px] md:h-[66px]  hover:cursor-pointer rounded-b-sm rounded-t-sm md:rounded-sm md:rounded-tl-0 md:rounded-br-md p-2 bg-[#E5E5E5] border border-sky-500/50 hover:border-sky-500 md:w-1/2   "
						title="Amazon Pay"
						role="button"
						tabindex="0"
					>
						<svg
							clip-rule="evenodd"
							fill-rule="evenodd"
							stroke-linejoin="round"
							stroke-miterlimit="2"
							viewBox="44 153 471 93"
							xmlns="http://www.w3.org/2000/svg"
							height={50}
							width={150}
						>
							<g transform="matrix(2.65777 0 0 2.65777 45.4321 155)">
								<path
									d="m69.652 26.489c-6.523 4.814-15.98 7.374-24.124 7.374-11.413 0-21.691-4.219-29.469-11.242-.61-.552-.066-1.305.668-.878 8.391 4.883 18.769 7.824 29.486 7.824 7.23 0 15.178-1.501 22.491-4.603 1.103-.467 2.028.727.948 1.525z"
									fill="#f79c34"
								/>
								<path
									d="m72.367 23.389c-.835-1.068-5.515-.506-7.618-.254-.637.077-.736-.48-.162-.883 3.734-2.623 9.853-1.866 10.564-.987.716.885-.189 7.02-3.687 9.947-.539.45-1.051.21-.812-.384.788-1.967 2.55-6.369 1.715-7.439z"
									fill="#f79c34"
								/>
								<g fill="#333e47">
									<path d="m64.897 3.724v-2.548c.002-.388.294-.646.646-.645l11.422-.001c.365 0 .659.265.659.643v2.185c-.004.367-.313.845-.86 1.604l-5.917 8.448c2.196-.051 4.519.278 6.515 1.399.45.253.571.628.606.995v2.719c0 .375-.41.808-.842.583-3.515-1.842-8.18-2.043-12.068.022-.397.212-.812-.216-.812-.591v-2.585c0-.413.008-1.121.425-1.751l6.854-9.834-5.968-.001c-.365 0-.658-.26-.66-.642z" />
									<path d="m23.233 19.641h-3.475c-.331-.021-.595-.269-.622-.587l.003-17.835c0-.356.3-.641.671-.641l3.236-.001c.338.017.61.273.631.599v2.328h.066c.843-2.252 2.432-3.303 4.573-3.303 2.173 0 3.536 1.051 4.509 3.303.843-2.252 2.757-3.303 4.8-3.303 1.46 0 3.049.601 4.022 1.952 1.103 1.502.877 3.678.877 5.592l-.004 11.255c0 .355-.299.641-.67.641h-3.47c-.35-.022-.624-.298-.624-.64l-.001-9.455c0-.75.065-2.626-.098-3.339-.259-1.202-1.037-1.54-2.042-1.54-.844 0-1.72.563-2.077 1.463-.357.902-.324 2.402-.324 3.416v9.454c0 .355-.3.641-.67.641h-3.471c-.349-.022-.624-.298-.624-.64l-.004-9.455c0-1.989.325-4.915-2.14-4.915-2.498 0-2.4 2.851-2.4 4.915l-.002 9.454c0 .355-.3.641-.67.641z" />
									<path d="m87.488 3.842c-2.562 0-2.724 3.489-2.724 5.666s-.032 6.831 2.693 6.831c2.692 0 2.822-3.753 2.822-6.042 0-1.501-.066-3.303-.52-4.729-.389-1.239-1.168-1.726-2.271-1.726zm-.031-3.641c5.157 0 7.946 4.43 7.946 10.059 0 5.44-3.081 9.757-7.946 9.757-5.061 0-7.818-4.429-7.818-9.945 0-5.555 2.789-9.871 7.818-9.871z" />
									<path d="m102.092 19.641h-3.463c-.347-.022-.623-.298-.623-.64l-.006-17.841c.03-.327.318-.582.668-.582l3.223-.001c.304.016.554.222.618.499v2.728h.065c.974-2.44 2.335-3.603 4.735-3.603 1.557 0 3.082.563 4.055 2.102.908 1.426.908 3.827.908 5.554v11.223c-.038.316-.322.561-.666.561h-3.483c-.322-.02-.581-.257-.619-.561v-9.683c0-1.952.228-4.805-2.173-4.805-.843 0-1.622.563-2.011 1.426-.487 1.089-.552 2.177-.552 3.379v9.603c-.006.355-.306.641-.676.641z" />
									<path d="m59.294 19.597c-.229.206-.56.22-.82.081-1.154-.959-1.361-1.402-1.992-2.316-1.907 1.943-3.258 2.526-5.729 2.526-2.925 0-5.201-1.806-5.201-5.416 0-2.821 1.529-4.739 3.706-5.679 1.885-.828 4.518-.978 6.534-1.204v-.451c0-.829.065-1.805-.423-2.52-.423-.64-1.235-.903-1.95-.903-1.326 0-2.503.679-2.793 2.086-.061.313-.289.624-.603.64l-3.369-.365c-.284-.065-.6-.293-.519-.727.765-4.029 4.363-5.285 7.633-5.319h.258c1.674.021 3.812.48 5.114 1.729 1.691 1.58 1.527 3.686 1.527 5.981v5.413c0 1.629.677 2.343 1.312 3.22.223.317.272.692-.011.924-.71.595-1.971 1.69-2.664 2.308zm-3.502-8.472c0 1.354.032 2.482-.65 3.686-.553.977-1.431 1.579-2.406 1.579-1.332 0-2.112-1.015-2.112-2.52 0-2.96 2.654-3.498 5.168-3.498z" />
									<path d="m13.743 19.597c-.23.206-.562.22-.821.081-1.155-.959-1.362-1.402-1.992-2.316-1.908 1.943-3.258 2.526-5.729 2.526-2.925 0-5.201-1.806-5.201-5.416 0-2.821 1.527-4.739 3.706-5.679 1.885-.828 4.518-.978 6.533-1.204v-.451c0-.829.066-1.805-.422-2.52-.423-.64-1.236-.903-1.95-.903-1.326 0-2.505.679-2.793 2.086-.06.313-.289.624-.604.64l-3.368-.365c-.285-.065-.601-.293-.519-.727.763-4.029 4.362-5.285 7.633-5.319h.258c1.674.021 3.812.48 5.114 1.729 1.69 1.58 1.527 3.686 1.527 5.981v5.413c0 1.629.677 2.343 1.312 3.22.221.317.272.692-.011.924-.71.595-1.972 1.69-2.665 2.308zm-3.504-8.472c0 1.354.033 2.482-.65 3.686-.552.977-1.43 1.579-2.406 1.579-1.332 0-2.112-1.015-2.112-2.52 0-2.96 2.655-3.498 5.168-3.498z" />
									<path d="m159.773 26.039v-1.31c0-.373.183-.63.572-.607.726.103 1.753.206 2.482.056.952-.198 1.635-.873 2.039-1.798.569-1.302.946-2.352 1.184-3.041l-7.229-17.908c-.122-.304-.158-.868.449-.868h2.527c.482 0 .678.306.786.606l5.241 14.546 5.003-14.546c.102-.298.307-.606.785-.606h2.383c.603 0 .569.563.449.868l-7.171 18.467c-.928 2.458-2.164 6.373-4.948 7.053-1.396.365-3.157.233-4.191-.2-.261-.131-.361-.481-.361-.712z" />
									<path d="m156.402 18.55c0 .333-.273.606-.608.606h-1.782c-.385 0-.648-.278-.697-.606l-.179-1.213c-.819.693-1.824 1.302-2.914 1.726-2.096.814-4.512.949-6.56-.309-1.481-.909-2.267-2.686-2.267-4.519 0-1.418.437-2.824 1.406-3.845 1.293-1.395 3.167-2.08 5.43-2.08 1.367 0 3.323.161 4.746.626v-2.441c0-2.482-1.045-3.556-3.8-3.556-2.106 0-3.717.318-5.959 1.015-.359.012-.569-.261-.569-.594v-1.392c0-.334.285-.657.594-.755 1.601-.698 3.869-1.133 6.28-1.213 3.143 0 6.879.709 6.879 5.543zm-3.425-3.564v-3.683c-1.196-.327-3.175-.463-3.941-.463-1.21 0-2.535.286-3.227 1.031-.517.546-.751 1.33-.751 2.088 0 .98.339 1.963 1.131 2.449.92.625 2.347.549 3.688.168 1.289-.366 2.499-1.013 3.1-1.59z" />
									<path d="m130.127 2.994c3.954 0 5.031 3.109 5.031 6.669.022 2.4-.419 4.54-1.662 5.765-.93.917-1.969 1.167-3.533 1.167-1.392 0-3.223-.726-4.591-1.737v-10.179c1.424-1.094 3.241-1.685 4.755-1.685zm-5.361 23.684h-2.387c-.334 0-.607-.273-.607-.606v-24.871c0-.333.273-.606.607-.606h1.827c.384 0 .647.278.696.606l.192 1.303c1.711-1.519 3.914-2.493 6.013-2.493 5.879 0 7.812 4.844 7.812 9.881 0 5.389-2.957 9.719-7.958 9.719-2.106 0-4.075-.777-5.589-2.127v8.588c0 .333-.273.606-.606.606z" />
								</g>
							</g>
						</svg>
					</div>
				</div>
			</div>
		</div>
	)
}

export function Customer(props: CustomerProps) {
	const { medusa } = useGlobalContext()

	const [customerForm, { Form, Field }] = createForm<PaymentForm>()
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
			setValue(customerForm, 'email', props.cart?.email)
			/* props.setShowShipping('active')
			props.setShowCustomer('hide') */
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
			<form id="your-form-id">
				<input
					type="text"
					style={{ display: 'none' }}
				/>
				{/* Rest of your form fields */}
			</form>

			<Form onSubmit={values => handleSubmit(values) as any}>
				<FormHeader
					of={customerForm}
					heading="Customer"
					numberLabel={'one'}
				/>

				<div class="h-[100%]">
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
					shipping: 'complete'
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
					<Show when={getValues(shippingForm).checkbox?.phone}>
						{/* //Phone Number */}
						<Field name="phone">
							{(field, props) => (
								<TextInput
									{...props}
									value={field.value}
									error={field.error}
									//description="We'll only use this if we need to contact you about your order."
									type="text"
									label="Phone Number"
									placeholder="Enter your phone number here"
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

	async function handleSubmit(values: any) {
		if (optionId() === null) return
		console.log('VALUES', optionId())

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
			const response = await medusa?.carts.addShippingMethod(props.cart?.id, {
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
								<li onClick={() => setOptionId(option?.id)}>
									<input
										type="radio"
										id={option?.id}
										name="hosting"
										value={option?.id}
										class="hidden peer"
										checked={option?.id === props.cart?.shipping_methods?.shipping_option_id}
									/>
									<label
										for={option?.id}
										class="grid grid-cols-3 items-center justify-between w-full p-2 text-gray-500 bg-[#E5E5E5] border border-gray-200 rounded-md cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-sky-500 peer-checked:border-sky-600 peer-checked:text-sky-600 peer-checked:border-2 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
									>
										<div class="block ">
											<div class="w-full text-lg font-semibold">${(option?.amount / 100).toFixed(2)}</div>
											<div class="w-full">{option?.name}</div>
										</div>
										<div class="flex item-center justify-self-center md:justify-self-center w-13 h-11 md:w-18 md:h-14 ">
											{carrierIcon(option?.metadata?.logo)}
										</div>
										<div class=" flex flex-col  ml-4 md:justify-self-center">
											<div class=" flex item-center justify-center">{option?.metadata?.estimate}</div>
											<div class=" flex item-center justify-center peer-checked:border-blue-600 peer-checked:text-blue-600">
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

export function Payment(props: PaymentProps) {
	const [paymentForm, { Form, Field }] = createForm<PaymentForm>()

	return (
		<Form onSubmit={values => alert(JSON.stringify(values, null, 4))}>
			<FormHeader
				of={paymentForm}
				heading="Payment"
				numberLabel="five"
			/>

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

			<FormFooter of={paymentForm} />
		</Form>
	)
}
