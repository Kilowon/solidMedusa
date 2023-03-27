import clsx from 'clsx'
import { For, Show } from 'solid-js'

export const onlyUnique = (value: unknown, index: number, self: unknown[]) =>
	self.indexOf(value) === index

type OptionSelectProps = {
	option: ProductOption
	current: string
	updateOption: (option: Record<string, string>) => void
	title: string
}
//TODO: Need Hook to update the option selection
export default function OptionSelect({
	option,

	title
}: OptionSelectProps) {
	const filteredOptions = option.values
		.map((v: any) => v.value)
		.filter(onlyUnique)

	return (
		<Show when={option.values.length > 0}>
			<div class="flex flex-col gap-y-3">
				<span class="text-base">Select {title}</span>
				<div class="grid grid-cols-3 lg:grid-cols-6 gap-2">
					<For each={filteredOptions}>
						{v => {
							return (
								<button
									//TODO: Add onClick to update the option selection
									//onClick={() => updateOption({ [option.id]: v })}
									class="border-gray-200 border text-xs h-[50px] transition-all duration-200"
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
