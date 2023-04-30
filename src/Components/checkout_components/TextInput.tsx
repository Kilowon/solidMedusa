import clsx from 'clsx'
import { createMemo, JSX, splitProps } from 'solid-js'
import { InputError } from './InputError'
import { InputLabel } from './InputLabel'

type TextInputProps = {
	ref: (element: HTMLInputElement) => void
	type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'number' | 'date'
	name: string
	description?: string
	value: string | number | undefined
	onInput: JSX.EventHandler<HTMLInputElement, InputEvent>
	onChange: JSX.EventHandler<HTMLInputElement, Event>
	onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>
	placeholder?: string
	required?: boolean
	class?: string
	label?: string
	error?: string
	padding?: 'none'
}

/**
 * Text input field that users can type into. Various decorations can be
 * displayed in or around the field to communicate the entry requirements.
 */
export function TextInput(props: TextInputProps) {
	// Split input element props
	const [, inputProps] = splitProps(props, [
		'class',
		'value',
		'label',
		'error',
		'padding'
	])

	// Create memoized value
	const getValue = createMemo<string | number | undefined>(
		prevValue =>
			props.value === undefined
				? ''
				: !Number.isNaN(props.value)
				? props.value
				: prevValue,
		''
	)

	return (
		<div class={clsx(!props.padding && 'px-2 ', props.class)}>
			<InputLabel
				name={props.name}
				description={props.description}
				label={props.label}
				required={props.required}
			/>
			<input
				{...inputProps}
				class={clsx(
					'h-12 w-full rounded-[5px] border-2 bg-[ffffff] px-2 outline-none placeholder:text-slate-500 dark:bg-gray-900 ',
					props.error
						? 'border-red-600/50 dark:border-red-400/50'
						: 'border-slate-3 hover:border-slate-4 focus:border-sky-600/50 dark:border-slate-800 dark:hover:border-slate-700 dark:focus:border-sky-400/50'
				)}
				id={props.name}
				value={getValue()}
				aria-invalid={!!props.error}
				aria-errormessage={`${props.name}-error`}
			/>
			<InputError
				name={props.name}
				error={props.error}
			/>
		</div>
	)
}
