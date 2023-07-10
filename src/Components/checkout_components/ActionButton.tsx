import clsx from 'clsx'
import { Show } from 'solid-js'
import { Spinner } from './Spinner'
import { UnstyledButton, DefaultButtonProps } from './UnstyledButton'

type ActionButtonProps = DefaultButtonProps & {
	variant: 'primary' | 'secondary'
	label: string
}

/**
 * Button that is used for navigation, to confirm form entries or perform
 * individual actions.
 */
export function ActionButton(props: ActionButtonProps) {
	return (
		<UnstyledButton
			class={clsx(
				'relative flex items-center justify-center rounded-1.1 w-[95vw] md:w-20 px-5 py-2.5  font-500 no-underline transition-colors   md:px-1.5 md:py-1.5  md:text-base',
				props.variant === 'primary' && ' border hover:border-accent_5 text-normal_1 bg-text_2',
				props.variant === 'secondary' && ' border hover:border-accent_5 text-normal_1 bg-text_2 '
			)}
			{...props}
		>
			{renderProps => (
				<Show
					when={renderProps.loading}
					fallback={props.label}
				>
					<Spinner label={`${props.label} is loading`} />
				</Show>
			)}
		</UnstyledButton>
	)
}
