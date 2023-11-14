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
				<li class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-normal_3/80 after:border-4 after:inline-block">
					<div class="flex items-center justify-center w-11 h-11 bg-accent_5 rounded-full lg:h-13 lg:w-13 shrink-0 z-01 ">
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
							class="flex items-center justify-center w-10 h-10 bg-surface rounded-full lg:h-12 lg:w-12 shrink-0 z-1"
						>
							<div class="text-accent_5 animate-pulse z-1">
								<Icon icon={props.title} />
							</div>
						</span>
					</div>
				</li>
			</Show>
			<Show when={props.elementState === 'complete'}>
				<li class="relative flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-accent_5/30 after:border-4 after:inline-block">
					<div class="flex items-center justify-center w-11 h-11 bg-accent_5/50 rounded-full lg:h-13 lg:w-13 shrink-0 z-01 ">
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
							class="flex items-center justify-center w-10 h-10 bg-surface rounded-full lg:h-12 lg:w-12 shrink-0"
						>
							<div class="  text-accent_5/80 hover:cursor-pointer relative">
								<Icon icon={props.title} />
							</div>
						</span>
					</div>
				</li>
			</Show>
			<Show when={props.elementState === 'queued'}>
				<li class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-normal_3/80 after:border-4 after:inline-block ">
					<span class="flex items-center justify-center w-10 h-10 bg-normal_3/80 rounded-full lg:h-12 lg:w-12 shrink-0">
						<div class=" text-text_2/40   ">
							<Icon icon={props.title} />
						</div>
					</span>
				</li>
			</Show>
			<Show when={props.elementState === 'active-end'}>
				<li class="flex items-center">
					<div class="flex items-center justify-center w-11 h-11 bg-accent_5 rounded-full lg:h-13 lg:w-13 shrink-0  z-01 ">
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
							class="flex items-center justify-center w-10 h-10 bg-surface rounded-full lg:h-12 lg:w-12 shrink-0 z-1"
						>
							<div class=" text-accent_5 hover:cursor-pointer animate-pulse z-1">
								<Icon icon={props.title} />
							</div>
						</span>
					</div>
				</li>
			</Show>
			<Show when={props.elementState === 'queued-end'}>
				<li class="flex items-center">
					<span class="flex items-center justify-center w-10 h-10 bg-normal_3/80 rounded-full lg:h-12 lg:w-12  shrink-0">
						<div class=" text-text_2/40">
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
