import { Show, For } from 'solid-js'
import { A } from 'solid-start'
import { TransitionGroup } from 'solid-transition-group'

export function FlexCategories(props: any) {
	return (
		<div class="flex flex-col  mb-16 ">
			<span class="text-sm md:text-base text-gray-600 mb-6">Shop By Category</span>
			<div class="text-sm lg:text-2xl text-gray-900 ">
				<ol class="flex flex-row flex-wrap">
					<Show when={props.parentCategories()}>
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
							<For each={props.parentCategories()}>
								{(category: any) => (
									<li class="flex flex-row pr-1 whitespace-nowrap">
										<A href={`/categories/${category?.handle}`}>
											<div class={category?.name === props.currentCategory()[0]?.name ? 'flex' : ''}>{category?.name}</div>
										</A>
										<div class={'pr-1 font-bold lg:text-3xl flex flex-row items-center '}>
											<div class={category?.category_children.length === 0 ? '' : 'i-ic-outline-chevron-right'} />
										</div>
									</li>
								)}
							</For>
						</TransitionGroup>
					</Show>

					<Show when={props.currentCategory()[0]?.category_children}>
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
									<div class="flex flex-row whitespace-nowrap">
										<li class="pr-1 text-gray-5/75 underline">
											<A href={`/categories/${child?.handle}`}>{child?.name}</A>
										</li>
										<div class="flex flex-row items-center text-xl pr-1   ">
											{/* <div
												class={
													props.currentCategory()[0]?.category_children.length === index() + 1 ? ' ' : 'i-ph-dot-outline-light'
												}
											/> */}
										</div>
									</div>
								)}
							</For>
						</TransitionGroup>
					</Show>
				</ol>
			</div>
		</div>
	)
}
