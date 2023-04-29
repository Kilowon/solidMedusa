import { FormStore, reset } from '@modular-forms/solid'
import { ActionButton } from './ActionButton'

type FormHeaderProps = {
	of: FormStore<any, any>
	heading: string
}

/**
 * Form header with heading and buttons to reset and submit the form.
 */
export function FormHeader(props: FormHeaderProps) {
	return (
		<header class="flex items-center justify-between">
			<h1 class="text-2xl font-medium text-slate-700 dark:text-slate-200 ">
				{props.heading}
			</h1>
			<div class="hidden lg:flex lg:space-x-8">
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
			</div>
		</header>
	)
}
