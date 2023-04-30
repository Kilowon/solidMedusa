import { FormStore, reset } from '@modular-forms/solid'
import { ActionButton } from './ActionButton'
import clsx from 'clsx'
import { Show } from 'solid-js'

type FormHeaderProps = {
	of: FormStore<any, any>
	heading: string
	numberLabel?: string
}

type FormHeaderButtonProps = {
	numberLabel?: string
}

/**
 * Form header with heading and buttons to reset and submit the form.
 */
export function FormHeader(props: FormHeaderProps) {
	return (
		<header class="flex items-center justify-between my-3">
			<div class=" flex items-center">
				<NumberIcons numberLabel={props.numberLabel} />
				<h1 class="text-2xl font-medium text-slate-700 dark:text-slate-200 ">
					{props.heading}
				</h1>
			</div>
			<div class="hidden lg:flex lg:space-x-8">
				<Show when={true}>
					<div></div>
				</Show>
				<Show when={false}>
					<ActionButton
						variant="secondary"
						label="Reset"
						type="button"
						onClick={() => reset(props.of)}
					/>
					<ActionButton
						variant="primary"
						label="Submit"
						type="submit"
					/>
				</Show>
				<Show when={false}>
					<ActionButton
						variant="secondary"
						label="Edit"
						type="button"
						onClick={() => reset(props.of)}
					/>
				</Show>
			</div>
		</header>
	)
}

export function NumberIcons(props: FormHeaderButtonProps) {
	return (
		<div
			class={clsx(
				'text-4xl mx-2',
				props.numberLabel === 'one' && 'i-ph-number-circle-one-fill',
				props.numberLabel === 'two' && 'i-ph-number-circle-two-fill',
				props.numberLabel === 'three' && 'i-ph-number-circle-three-fill',
				props.numberLabel === 'check' && 'i-ph-check-circle-fill text-green-700'
			)}
		/>
	)
}
