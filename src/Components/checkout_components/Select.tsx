import clsx from 'clsx'
import { createMemo, For, JSX, Show, splitProps } from 'solid-js'
import { AngleDownIcon } from '~/Components/checkout_components/icons/AngleDownIcon'
import { InputError } from './InputError'
import { InputLabel } from './InputLabel'

type SelectProps = {
	ref: (element: HTMLSelectElement) => void
	name: string
	value: string | string[] | undefined
	onInput: JSX.EventHandler<HTMLSelectElement, InputEvent>
	onChange: JSX.EventHandler<HTMLSelectElement, Event>
	onBlur: JSX.EventHandler<HTMLSelectElement, FocusEvent>
	options: { label: string; value: string }[]
	multiple?: boolean
	size?: string | number
	placeholder?: string
	required?: boolean
	class?: string
	label?: string
	error?: string
}

/**
 * Select field that allows users to select predefined values. Various
 * decorations can be displayed in or around the field to communicate the
 * entry requirements.
 */
export function Select(props: SelectProps) {
	// Split select element props
	const [, selectProps] = splitProps(props, [
		'class',
		'value',
		'options',
		'label',
		'error'
	])

	// Create values list
	const getValues = createMemo(() =>
		Array.isArray(props.value)
			? props.value
			: typeof props.value === 'string'
			? [props.value]
			: []
	)

	return (
		<div class={clsx('px-2 lg:px-2', props.class)}>
			<InputLabel
				name={props.name}
				label={props.label}
				required={props.required}
			/>
			<div class="relative flex items-center">
				<select
					{...selectProps}
					class={clsx(
						'w-full appearance-none space-y-1 rounded-[5px] border-2 bg-[ffffff] px-3 outline-none md:text-lg lg:space-y-1 lg:px-3 lg:text-lg ',
						props.error
							? 'border-red-600/50 dark:border-red-400/50'
							: 'border-slate-200 hover:border-slate-300 focus:border-sky-600/50 dark:border-slate-800 dark:hover:border-slate-700 dark:focus:border-sky-400/50',
						props.multiple ? 'py-5' : 'h-12 md:h-12 lg:h-12',
						props.placeholder && !props.value?.length && 'text-slate-500'
					)}
					id={props.name}
					aria-invalid={!!props.error}
					aria-errormessage={`${props.name}-error`}
				>
					<option
						value=""
						hidden
						selected
						disabled
					>
						{props.placeholder}
					</option>
					<For each={props.options}>
						{({ label, value }) => (
							<option
								value={value}
								selected={getValues().includes(value)}
							>
								{label}
							</option>
						)}
					</For>
				</select>
				<Show when={!props.multiple}>
					<AngleDownIcon class="pointer-events-none absolute right-6 h-5 lg:right-8 lg:h-6" />
				</Show>
			</div>
			<InputError
				name={props.name}
				error={props.error}
			/>
		</div>
	)
}
