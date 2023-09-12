import clsx from 'clsx'
import { Show } from 'solid-js'

type InputLabelProps = {
	name: string
	description?: string
	label?: string
	required?: boolean
	margin?: 'none'
}

/**
 * Input label for a form field.
 */
export function InputLabel(props: InputLabelProps) {
	return (
		<Show when={props.label}>
			<label
				class={clsx('inline-block font-medium text-xs text-text_2 ')}
				for={props.name}
			>
				{props.label}
				{props.required && <span class=" text-red-600 ">*</span>}

				{props.description && <span class="text-sm  text-text_3  mx-9">{props.description}</span>}
			</label>
		</Show>
	)
}
