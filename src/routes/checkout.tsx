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
import { Match, Switch, createEffect, Show, createSignal, Accessor } from 'solid-js'
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
import CartCore from '~/Components/layout/CartCore'

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
	setShippingIsBilling?: (value: boolean) => void
	setFormCompleted: (value: any) => void
	formCompleted: Accessor<any>
}

interface BillingProps {
	setShowForm: (value: ShowForm) => void
	showForm: Accessor<ShowForm>
	cart: Cart
	shippingIsBilling: Accessor<boolean>
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

	createEffect(() => {
		console.log(showForm())
	})

	return (
		<div class=" text-gray-6 md:space-y-12 ">
			<Title>Checkout</Title>
			<div
				class="sticky top-0 inset-x-0 z-100 bg-gradient-to-b from-white/50 to-white/10 h-23"
				style="backdrop-filter: blur(20px)"
			>
				<Header />
				<div class="sticky top-12 z-101 md:hidden mx-2 ">
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
						class="hidden md:block sticky top-12 z-101 bg-white/80 h-12 "
						style="backdrop-filter: blur(10px)"
					>
						<Stepper
							formCompleted={formCompleted}
							setShowForm={setShowForm}
							showForm={showForm}
						/>
					</div>
					<Show when={showForm().customer === 'active'}>
						<Express />
						<div class="hidden md:flex items-center justify-center text-2xl m-2">or</div>
						<Customer
							setShowForm={setShowForm}
							showForm={showForm}
							setFormCompleted={setFormCompleted}
							formCompleted={formCompleted}
							cart={queryCart.data?.cart}
						/>
					</Show>

					<Show when={showForm().shipping === 'active'}>
						<Shipping
							setShowForm={setShowForm}
							showForm={showForm}
							setShippingIsBilling={setShippingIsBilling}
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
							shippingIsBilling={shippingIsBilling}
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
				<div class="hidden md:flex items-center md:block md:w-[433px] mx-auto bg-white">
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
		<div class="m-1 md:m-5 space-y-1 md:space-y-3 ">
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
						validate={[required('Please enter your password.'), minLength(8, 'You password must have 8 characters or more.')]}
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
					heading="Shipping"
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
								required
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
	async function handleSubmit() {
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
	}

	return (
		<div>
			<button onclick={() => handleSubmit()}>Carrier</button>
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
					numberLabel={'three'}
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
				numberLabel="four"
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
