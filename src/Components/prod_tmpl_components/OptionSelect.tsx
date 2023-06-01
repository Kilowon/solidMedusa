import clsx from 'clsx'
import { For, Show, createEffect } from 'solid-js'

export const onlyUnique = (value: unknown, index: number, self: unknown[]) => self.indexOf(value) === index

type OptionSelectProps = {
	option: any
	current: string
	updateOption: (option: Record<string, string>) => void
	title: string
}
//TODO: Need Hook to update the option selection
export default function OptionSelect({ option, current, updateOption, title }: OptionSelectProps) {
	const filteredOptions = option.values.map((v: any) => v.value).filter(onlyUnique)

	return (
		<Show when={option.values.length > 0}>
			<div class="flex flex-col gap-y-3">
				<span class="text-base font-semibold">Select {title}</span>
				<div class="grid grid-cols-3 lg:grid-cols-6 gap-2">
					<For each={filteredOptions}>
						{v => {
							return (
								<button
									onClick={() => {
										updateOption({ [option.id]: v })
									}}
									class={clsx('border-gray-200 border text-xs h-[50px] transition-all duration-200', {
										'bg-gray-900 text-white': v === current,
										'bg-gray-900': v === current
									})}
								>
									{v}
								</button>
							)
						}}
					</For>
				</div>
			</div>
		</Show>
	)
}
