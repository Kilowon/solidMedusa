import clsx from 'clsx'
import { Show, createEffect } from 'solid-js'
import { create } from 'domain'

type StepperProps = {
	title: 'Customer' | 'Shipping' | 'Billing' | 'Payment' | 'Carrier'
	elementState: 'complete' | 'queued' | 'active-end' | 'queued-end' | 'active'
	setShowForm: (value: any) => void
}

type StepperIconProps = {
	icon: string
}

export function StepperElement(props: StepperProps) {
	function handleClick(activeComponent: string) {
		if (activeComponent === 'Customer') {
			props.setShowForm({
				customer: 'active',
				shipping: 'hidden',
				carrier: 'hidden',
				billing: 'hidden',
				payment: 'hidden'
			})
		}
		if (activeComponent === 'Shipping') {
			props.setShowForm({
				customer: 'hidden',
				shipping: 'active',
				carrier: 'hidden',
				billing: 'hidden',
				payment: 'hidden'
			})
		}
		if (activeComponent === 'Carrier') {
			props.setShowForm({
				customer: 'hidden',
				shipping: 'hidden',
				carrier: 'active',
				billing: 'hidden',
				payment: 'hidden'
			})
		}
		if (activeComponent === 'Billing') {
			props.setShowForm({
				customer: 'hidden',
				shipping: 'hidden',
				carrier: 'hidden',
				billing: 'active',
				payment: 'hidden'
			})
		}
		if (activeComponent === 'Payment') {
			props.setShowForm({
				customer: 'hidden',
				shipping: 'hidden',
				carrier: 'hidden',
				billing: 'hidden',
				payment: 'active'
			})
		}
	}

	return (
		<>
			<Show when={props.elementState === 'active'}>
				<li class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-[#E5E5E5] after:border-4 after:inline-block dark:after:border-blue-800">
					<div class="flex items-center justify-center w-11 h-11 bg-sky-500 rounded-full lg:h-13 lg:w-13 dark:bg-blue-300 shrink-0  z-01 ">
						<span
							onMouseDown={() => handleClick(props.title)}
							onKeyDown={event => {
								if (event.key === 'Enter') {
									console.log('This should not trigger on tabout')
									handleClick(props.title)
								}
							}}
							title={props.title}
							role="button"
							tabindex="0"
							class="flex items-center justify-center w-10 h-10 bg-sky-200 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0 z-1"
						>
							<div class="text-sky-500 dark:text-sky-300 animate-pulse z-1">
								<Icon icon={props.title} />
							</div>
						</span>
					</div>
				</li>
			</Show>
			<Show when={props.elementState === 'complete'}>
				<li class="relative flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-[#E5E5E5] after:border-4 after:inline-block dark:after:border-gray-700">
					<div class="i-tabler-discount-check-filled absolute top--1 left-5 lg:left-7 text-gray-5/80 text-xl" />
					<span
						onMouseDown={() => handleClick(props.title)}
						onKeyDown={event => {
							if (event.code === 'Enter') {
								handleClick(props.title)
							}
						}}
						title={props.title}
						role="button"
						tabindex="0"
						class="flex items-center justify-center w-10 h-10 bg-[#E5E5E5] rounded-full lg:h-12 lg:w-12 dark:bg-sky-800 shrink-0"
					>
						<div class="  text-gray-400/50  dark:text-gray-200  hover:cursor-pointer relative">
							<Icon icon={props.title} />
						</div>
					</span>
				</li>
			</Show>
			<Show when={props.elementState === 'queued'}>
				<li class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-[#E5E5E5] after:border-4 after:inline-block dark:after:border-gray-700">
					<span class="flex items-center justify-center w-10 h-10 bg-[#E5E5E5] rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
						<div class=" text-gray-500  dark:text-gray-200 ">
							<Icon icon={props.title} />
						</div>
					</span>
				</li>
			</Show>
			<Show when={props.elementState === 'active-end'}>
				<li class="flex items-center">
					<div class="flex items-center justify-center w-11 h-11 bg-sky-500 rounded-full lg:h-13 lg:w-13 dark:bg-blue-300 shrink-0  z-01 ">
						<span
							onMouseDown={() => handleClick(props.title)}
							onKeyDown={event => {
								if (event.key === 'Enter') {
									handleClick(props.title)
								}
							}}
							title={props.title}
							role="button"
							tabindex="0"
							class="flex items-center justify-center w-10 h-10 bg-sky-200 rounded-full lg:h-12 lg:w-12 dark:bg-sky-800 shrink-0 z-1"
						>
							<div class=" text-sky-500  dark:text-sky-300 hover:cursor-pointer animate-pulse z-1">
								<Icon icon={props.title} />
							</div>
						</span>
					</div>
				</li>
			</Show>
			<Show when={props.elementState === 'queued-end'}>
				<li class="flex items-center">
					<span class="flex items-center justify-center w-10 h-10 bg-[#E5E5E5] rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
						<div class=" text-gray-500  dark:text-gray-200 ">
							<Icon icon={props.title} />
						</div>
					</span>
				</li>
			</Show>
		</>
	)
}

export function Icon(props: StepperIconProps) {
	return (
		<div
			class={clsx(
				'w-6 h-6 lg:w-8 lg:h-8 ',
				props.icon === 'Customer' && 'i-mdi-email-fast-outline',
				props.icon === 'Shipping' && 'i-mdi-address-marker-outline',
				props.icon === 'Carrier' && 'i-ph-package',
				props.icon === 'Billing' && 'i-mdi-id-card-outline',
				props.icon === 'Payment' && 'i-mdi-payment'
			)}
		/>
	)
}
