import { Show, For } from 'solid-js'
import { A } from 'solid-start'
import { TransitionGroup } from 'solid-transition-group'
import clsx from 'clsx'

export function FlexCategories(props: any) {
	return (
		<div class="flex flex-col  mb-4 lg:mb-14">
			<span class="text-xs md:text-base text-gray-600 mb-6">Shop By Category</span>
			<div class=" flex flex-row text-sm lg:text-2xl text-gray-900 ">
				<Show when={props.parentCategories()}>
					<ol class="flex flex-row">
						<For each={props.parentCategories()}>
							{(category: any) => {
								if (category?.name === import.meta.env.VITE_MENU_CATEGORY_BASE) return

								return (
									<li class="flex flex-row whitespace-nowrap space-x-0.5 text-xs lg:text-base flex items-center text-gray-8">
										<A href={`/categories/${category?.handle}`}>
											<div class={category?.name === props.currentCategory?.()[0]?.name ? 'flex' : ''}>{category?.name}</div>
										</A>
										<div class={' font-bold lg:text-xl '}>
											<div class={category?.category_children?.length === 0 ? '' : 'i-ic-outline-chevron-right'} />
										</div>
									</li>
								)
							}}
						</For>
					</ol>
				</Show>

				<Show when={props.currentCategory?.()[0]?.category_children}>
					<ol
						class={clsx(
							'grid grid-cols-2 gap-1.5 md:flex md:flex-row md:flex-wrap',
							props.currentCategory?.()[0]?.category_children?.length < 4 && 'flex flex-row flex-wrap'
						)}
					>
						<TransitionGroup
							onEnter={(el, done) => {
								const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
									duration: 250
								})
								a.finished.then(done)
							}}
							onExit={(el, done) => {
								const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
									duration: 0
								})
								a.finished.then(done)
							}}
						>
							<For each={props.currentCategory()[0]?.category_children}>
								{(child: any, index) => (
									<div class="flex flex-row whitespace-nowrap items-center justify-center">
										<li class="text-xs lg:text-base border border-gray-5 text-gray-5 px-0.5  lg:px-1 lg:h-6  rounded-2  flex ">
											<A href={`/categories/${child?.handle}`}>{child?.name}</A>
										</li>
										<div class="flex flex-row items-center text-xl pr-1   "></div>
									</div>
								)}
							</For>
						</TransitionGroup>
					</ol>
				</Show>
			</div>
		</div>
	)
}
