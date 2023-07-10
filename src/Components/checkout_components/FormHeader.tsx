import { FormStore, reset } from '@modular-forms/solid'
import { ActionButton } from './ActionButton'
import clsx from 'clsx'
import { Show, createEffect } from 'solid-js'
import { create } from 'domain'

type FormHeaderProps = {
	of: FormStore<any, any>
	heading: string
	numberLabel?: string
	showForm?: string
	setShowForm?: (value: string) => void
	setRefreshForm?: (value: boolean) => void
}

type FormHeaderButtonProps = {
	numberLabel?: string
}

/**
 * Form header with heading and buttons to reset and submit the form.
 */
export function FormHeader(props: FormHeaderProps) {
	function handleEdit() {
		props.setShowForm?.('active')
		props.setRefreshForm?.(true)
	}

	return (
		<header class="flex items-center justify-between my-3">
			<div class=" flex items-center">
				<NumberIcons numberLabel={props.numberLabel} />
				<h1 class="text-base font-500 text-text_2 tracking-tighter ">{props.heading}</h1>
			</div>
			<div class="hidden md:flex md:space-x-8">
				{/* <ActionButton
					variant="secondary"
					label="Reset"
					type="button"
					onClick={() => reset(props.of)}
				/> */}
				<ActionButton
					variant="primary"
					label="Submit"
					type="submit"
				/>

				{/* <Show when={props.showForm === 'edit'}>
					<ActionButton
						variant="secondary"
						label="Edit"
						type="button"
						onClick={() => handleEdit()}
					/>
				</Show> */}
			</div>
		</header>
	)
}

export function NumberIcons(props: FormHeaderButtonProps) {
	return (
		<div
			class={clsx(
				'w-5 h-5 mr-1 md:mr-2 md:ml-1',
				props.numberLabel === 'one' && 'i-ph-number-circle-one-fill',
				props.numberLabel === 'two' && 'i-ph-number-circle-two-fill',
				props.numberLabel === 'three' && 'i-ph-number-circle-three-fill',
				props.numberLabel === 'four' && 'i-ph-number-circle-four-fill',
				props.numberLabel === 'five' && 'i-ph-number-circle-five-fill',
				props.numberLabel === 'check' && 'i-ph-check-circle-fill text-accent_2',
				props.numberLabel === 'x' && 'i-ph-x-circle-fill text-accent_3',
				props.numberLabel === 'fill' && 'i-ph-circle-fill '
			)}
		/>
	)
}
