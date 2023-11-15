import { Show, For, createSignal, createEffect } from 'solid-js'
import { A } from 'solid-start'
import { getWindowSize } from '@solid-primitives/resize-observer'
import { useGlobalContext } from '~/Context/Providers'
import clsx from 'clsx'

interface FeaturedProps {
	variant?: 'block_1' | 'block_2' | 'block_3' | 'block_4' | 'block_5' | 'block_6' | 'block_7' | 'block_8'
	item: {
		id: string
		status: string
		title: string
		title_2: string
		title_3: string
		sub_title: string
		action_url: string
		tags: string[]
		icons: [
			{
				image: string
				title: string
				sub_title: string
			}
		]

		text_size:
			| 'text-xs'
			| 'text-sm'
			| 'text-base'
			| 'text-lg'
			| 'text-xl'
			| 'text-2xl'
			| 'text-3xl'
			| 'text-4xl'
			| 'text-5xl'
			| 'text-6xl'
			| 'text-7xl'
			| 'text-8xl'

		text_size_b:
			| 'text-xs'
			| 'text-sm'
			| 'text-base'
			| 'text-lg'
			| 'text-xl'
			| 'text-2xl'
			| 'text-3xl'
			| 'text-4xl'
			| 'text-5xl'
			| 'text-6xl'
			| 'text-7xl'
			| 'text-8xl'

		background_colors:
			| 'normal_1'
			| 'normal_2'
			| 'normal_3'
			| 'normal_4'
			| 'surface'
			| 'text_4'
			| 'text_5'
			| 'accent_4'
			| 'accent_5'
			| 'accent_6'
			| 'accent_7'
			| 'accent_8'
			| 'accent_9'
			| 'accent_10'

		background_colors_b:
			| 'normal_1'
			| 'normal_2'
			| 'normal_3'
			| 'normal_4'
			| 'surface'
			| 'text_4'
			| 'text_5'
			| 'accent_4'
			| 'accent_5'
			| 'accent_6'
			| 'accent_7'
			| 'accent_8'
			| 'accent_9'
			| 'accent_10'
		menu_status: string
		menu_title: string
		location: string

		description: string
		type: string
		image: {
			id: string
		}
		image_2: {
			id: string
		}
		image_3: {
			id: string
		}
		image_4: {
			id: string
		}
		price: string
		price_2: string
		price_3: string
		call_to_action: string
		call_to_action_2: string
		call_to_action_3: string
		component_variant: 'default' | 'left' | 'center' | 'right'
		items: any[]
	}
}

export default function DividerA(props: { item: FeaturedProps['item'] }) {
	const { medusa } = useGlobalContext()
	const [size, setSize] = createSignal(getWindowSize().width)

	return (
		<>
			<Show when={size() > 1300}>
				<div
					class={clsx(
						'flex justify-center items-center  rounded-0.5 overflow-hidden min-w-50px fill-current  my-10 w-full',
						props.item.background_colors === 'normal_1' && 'bg-normal_1',
						props.item.background_colors === 'normal_2' && 'bg-normal_2',
						props.item.background_colors === 'normal_3' && 'bg-normal_3',
						props.item.background_colors === 'normal_4' && 'bg-normal_4',
						props.item.background_colors === 'surface' && 'bg-surface',
						props.item.background_colors === 'text_4' && 'bg-text_4',
						props.item.background_colors === 'text_5' && 'bg-text_5',
						props.item.background_colors === 'accent_4' && 'bg-accent_4',
						props.item.background_colors === 'accent_5' && 'bg-accent_5',
						props.item.background_colors === 'accent_6' && 'bg-accent_6',
						props.item.background_colors === 'accent_7' && 'bg-accent_7',
						props.item.background_colors === 'accent_8' && 'bg-accent_8',
						props.item.background_colors === 'accent_9' && 'bg-accent_9',
						props.item.background_colors === 'accent_10' && 'bg-accent_10'
					)}
				>
					<div
						class={clsx(
							'flex  items-center ',
							props.item.component_variant === 'center' && 'flex-col py-2 sm:py-10',
							props.item.component_variant === 'default' && 'justify-between flex-row min-w-80vw py-2 sm:py-15',
							props.item.component_variant === 'left' &&
								'justify-between flex-row-reverse xl:min-w-[80vw] lg:min-w-98vw py-2 sm:py-15 '
						)}
					>
						<div class="flex flex-col items-center">
							<h1
								class={clsx(
									'tracking-tighter text-text_2   font-700 z-2  text-start px-8 max-w-130',
									props.item.text_size === 'text-xs' && 'text-xs',
									props.item.text_size === 'text-sm' && 'text-sm',
									props.item.text_size === 'text-base' && 'text-base',
									props.item.text_size === 'text-lg' && 'text-base sm:text-lg',
									props.item.text_size === 'text-xl' && 'text-base sm:text-xl',
									props.item.text_size === 'text-2xl' && 'text-base sm:text-2xl',
									props.item.text_size === 'text-3xl' && 'text-base sm:text-3xl',
									props.item.text_size === 'text-4xl' && 'text-base sm:text-4xl',
									props.item.text_size === 'text-5xl' && 'text-base sm:text-5xl',
									props.item.text_size === 'text-6xl' && 'text-base sm:text-6xl',
									props.item.text_size === 'text-7xl' && 'text-base sm:text-7xl',
									props.item.text_size === 'text-8xl' && 'text-base sm:text-8xl '
								)}
							>
								{props.item.title}
							</h1>
							<Show when={props.item.call_to_action !== null}>
								<div class="flex items-end pr-10 pt-5">
									<div class="flex items-center hover:underline bg-accent_6 text-accenttext_1 p-1 px-2  rounded-1 ">
										<A
											href={props.item?.action_url || '/store/Store'}
											class="text-sm z-2 tracking-tight"
										>
											{props.item.call_to_action || 'Shop All'}
										</A>
									</div>
								</div>
							</Show>
						</div>

						<ul
							class={clsx(
								'',
								props.item?.component_variant === 'center' && 'flex flex-row py-10  ',
								props.item?.component_variant === 'default' && 'grid grid-cols-3 gap-x-6 gap-y-8 mx-10',
								props.item?.component_variant === 'left' && 'grid grid-cols-3 gap-x-6 gap-y-8'
							)}
						>
							<For each={props.item.icons}>
								{(item: any, index) => {
									return (
										<li
											class={clsx(
												'flex  items-start justify-start rounded-1 mx-2 p-2 ',
												props.item.background_colors_b === 'normal_1' && 'bg-normal_1 border-1 border-text_2/50',
												props.item.background_colors_b === 'normal_2' && 'bg-normal_2 border-1 border-text_2/50',
												props.item.background_colors_b === 'normal_3' && 'bg-normal_3 border-1 border-text_2/50',
												props.item.background_colors_b === 'normal_4' && 'bg-normal_4 border-1 border-text_2/50',
												props.item.background_colors_b === 'surface' && 'bg-surface border-1 border-text_2/50',
												props.item.background_colors_b === 'text_4' && 'bg-text_4 border-1 border-text_2/50',
												props.item.background_colors_b === 'text_5' && 'bg-text_5 border-1 border-text_2/50',
												props.item.background_colors_b === 'accent_4' && 'bg-accent_4 border-1 border-text_2/50',
												props.item.background_colors_b === 'accent_5' && 'bg-accent_5 border-1 border-text_2/50',
												props.item.background_colors_b === 'accent_6' && 'bg-accent_6 border-1 border-text_2/50',
												props.item.background_colors_b === 'accent_7' && 'bg-accent_7 border-1 border-text_2/50',
												props.item.background_colors_b === 'accent_8' && 'bg-accent_8 border-1 border-text_2/50',
												props.item.background_colors_b === 'accent_9' && 'bg-accent_9 border-1 border-text_2/50',
												props.item.background_colors_b === 'accent_10' && 'bg-accent_10 border-1 border-text_2/50'
											)}
										>
											<div
												class={clsx(
													' flex  justify-center items-center  rounded-0.5 overflow-hidden min-w-75px fill-current min-h-20'
												)}
											>
												<Show when={item.item?.image}>
													<img
														src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${item.item?.image}?key=100-webp`}
														loading="lazy"
														alt={item.item?.title}
														role="img"
														class=" object-fill grayscale-100 contrast-50 sm:min-w-50px sm:max-w-50px mx-5

																		"
													/>
												</Show>
											</div>
											<div class="border-1 border-r-text_2/50 h-full w-1 ml-2"></div>
											<div class="flex flex-col justify-start items-start max-w-70 space-y-2 ml-2 pl-2">
												<Show when={item.item?.title}>
													<div class="font-700 text-text_3 text-sm tracking-tighter ">{item.item.title}</div>
												</Show>

												<Show when={item.item?.sub_title}>
													<div class="font-500 text-text_3 text-xs tracking-tighter ">{item.item.sub_title}</div>
												</Show>
											</div>
										</li>
									)
								}}
							</For>
						</ul>
					</div>
				</div>
			</Show>
			<Show when={size() <= 1300 && size() > 620}>
				<div
					class={clsx(
						'flex justify-center items-center  rounded-0.5 overflow-hidden min-w-50px fill-current  xl:my-10 w-full',
						props.item.background_colors === 'normal_1' && 'bg-normal_1',
						props.item.background_colors === 'normal_2' && 'bg-normal_2',
						props.item.background_colors === 'normal_3' && 'bg-normal_3',
						props.item.background_colors === 'normal_4' && 'bg-normal_4',
						props.item.background_colors === 'surface' && 'bg-surface',
						props.item.background_colors === 'text_4' && 'bg-text_4',
						props.item.background_colors === 'text_5' && 'bg-text_5',
						props.item.background_colors === 'accent_4' && 'bg-accent_4',
						props.item.background_colors === 'accent_5' && 'bg-accent_5',
						props.item.background_colors === 'accent_6' && 'bg-accent_6',
						props.item.background_colors === 'accent_7' && 'bg-accent_7',
						props.item.background_colors === 'accent_8' && 'bg-accent_8',
						props.item.background_colors === 'accent_9' && 'bg-accent_9',
						props.item.background_colors === 'accent_10' && 'bg-accent_10'
					)}
				>
					<div
						class={clsx(
							'flex  items-center ',
							props.item.component_variant === 'center' && 'flex-col py-2 sm:py-10',
							props.item.component_variant === 'default' && 'flex-col py-2 sm:py-10',
							props.item.component_variant === 'left' && 'flex-col py-2 sm:py-10'
						)}
					>
						<div class="flex flex-col items-center">
							<h1
								class={clsx(
									'tracking-tighter text-text_2   font-700 z-2  text-start px-8 max-w-130',
									props.item.text_size === 'text-xs' && 'text-xs',
									props.item.text_size === 'text-sm' && 'text-sm',
									props.item.text_size === 'text-base' && 'text-base',
									props.item.text_size === 'text-lg' && 'text-base sm:text-lg',
									props.item.text_size === 'text-xl' && 'text-base sm:text-xl',
									props.item.text_size === 'text-2xl' && 'text-base sm:text-2xl',
									props.item.text_size === 'text-3xl' && 'text-base sm:text-3xl',
									props.item.text_size === 'text-4xl' && 'text-base sm:text-4xl',
									props.item.text_size === 'text-5xl' && 'text-base sm:text-5xl',
									props.item.text_size === 'text-6xl' && 'text-base sm:text-6xl',
									props.item.text_size === 'text-7xl' && 'text-base sm:text-7xl',
									props.item.text_size === 'text-8xl' && 'text-base sm:text-8xl '
								)}
							>
								{props.item.title}
							</h1>
							<Show when={props.item.call_to_action !== null}>
								<div class="flex items-end pr-10 pt-5">
									<div class="flex items-center hover:underline bg-accent_6 text-accenttext_1 p-1 px-2  rounded-1 ">
										<A
											href={props.item?.action_url || '/store/Store'}
											class="text-sm z-2 tracking-tight"
										>
											{props.item.call_to_action || 'Shop All'}
										</A>
									</div>
								</div>
							</Show>
						</div>

						<ul
							class={clsx(
								'',
								props.item?.component_variant === 'center' && 'flex flex-row py-10  px-2',
								props.item?.component_variant === 'default' && 'flex flex-row py-10 px-2',
								props.item?.component_variant === 'left' && 'flex flex-row py-10 px-2'
							)}
						>
							<For each={props.item.icons}>
								{(item: any, index) => {
									return (
										<li
											class={clsx(
												' flex  items-center justify- p-2 m-2 rounded-1',
												props.item.background_colors_b === 'normal_1' && 'bg-normal_1 border border-text_2',
												props.item.background_colors_b === 'normal_2' && 'bg-normal_2 border border-text_2',
												props.item.background_colors_b === 'normal_3' && 'bg-normal_3 border border-text_2',
												props.item.background_colors_b === 'normal_4' && 'bg-normal_4 border border-text_2',
												props.item.background_colors_b === 'surface' && 'bg-surface border border-text_2',
												props.item.background_colors_b === 'text_4' && 'bg-text_4 border border-text_2',
												props.item.background_colors_b === 'text_5' && 'bg-text_5 border border-text_2',
												props.item.background_colors_b === 'accent_4' && 'bg-accent_4 border border-text_2',
												props.item.background_colors_b === 'accent_5' && 'bg-accent_5 border border-text_2',
												props.item.background_colors_b === 'accent_6' && 'bg-accent_6 border border-text_2',
												props.item.background_colors_b === 'accent_7' && 'bg-accent_7 border border-text_2',
												props.item.background_colors_b === 'accent_8' && 'bg-accent_8 border border-text_2',
												props.item.background_colors_b === 'accent_9' && 'bg-accent_9 border border-text_2',
												props.item.background_colors_b === 'accent_10' && 'bg-accent_10 border border-text_2'
											)}
										>
											<div
												class={clsx(
													' flex  justify-center items-center  rounded-0.5 overflow-hidden min-w-40px fill-current min-h-20'
												)}
											>
												<Show when={item.item?.image}>
													<img
														src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${item.item?.image}?key=100-webp`}
														loading="lazy"
														alt={item.item?.title}
														role="img"
														class=" object-fill grayscale-100 contrast-50 sm:min-w-40px sm:max-w-40px mx-2

																"
													/>
												</Show>
											</div>
											<div class="border-1 border-r-text_2/50 h-full w-1 ml-2 max-h-30 xl:max-h-20"></div>
											<div class="flex flex-col justify-start items-start max-w-70 space-y-2 ml-2">
												<Show when={item.item?.title}>
													<div class="font-700 text-text_3 text-sm tracking-tighter ">{item.item.title}</div>
												</Show>

												<Show when={item.item?.sub_title}>
													<div class="font-500 text-text_3 text-xs tracking-tighter ">{item.item.sub_title}</div>
												</Show>
											</div>
										</li>
									)
								}}
							</For>
						</ul>
					</div>
				</div>
			</Show>
			<Show when={size() < 620}>
				<div
					class={clsx(
						'flex justify-center items-center  rounded-0.5 overflow-hidden min-w-50px fill-current  my-6 w-full',
						props.item.background_colors === 'normal_1' && 'bg-normal_1',
						props.item.background_colors === 'normal_2' && 'bg-normal_2',
						props.item.background_colors === 'normal_3' && 'bg-normal_3',
						props.item.background_colors === 'normal_4' && 'bg-normal_4',
						props.item.background_colors === 'surface' && 'bg-surface',
						props.item.background_colors === 'text_4' && 'bg-text_4',
						props.item.background_colors === 'text_5' && 'bg-text_5',
						props.item.background_colors === 'accent_4' && 'bg-accent_4',
						props.item.background_colors === 'accent_5' && 'bg-accent_5',
						props.item.background_colors === 'accent_6' && 'bg-accent_6',
						props.item.background_colors === 'accent_7' && 'bg-accent_7',
						props.item.background_colors === 'accent_8' && 'bg-accent_8',
						props.item.background_colors === 'accent_9' && 'bg-accent_9',
						props.item.background_colors === 'accent_10' && 'bg-accent_10'
					)}
				>
					<div
						class={clsx(
							'flex  items-center ',
							props.item.component_variant === 'center' && 'flex-col pt-5 ',
							props.item.component_variant === 'default' && 'flex-col pt-5',
							props.item.component_variant === 'left' && 'flex-col pt-5 '
						)}
					>
						<div class="flex flex-col justify-center items-center">
							<h1
								class={clsx(
									'tracking-tighter text-balance text-text_2 text-center font-700 z-2 px-8 ',
									props.item.text_size === 'text-xs' && 'text-xs',
									props.item.text_size === 'text-sm' && 'text-sm',
									props.item.text_size === 'text-base' && 'text-base',
									props.item.text_size === 'text-lg' && 'text-xl sm:text-lg',
									props.item.text_size === 'text-xl' && 'text-xl sm:text-xl',
									props.item.text_size === 'text-2xl' && 'text-2xl sm:text-2xl',
									props.item.text_size === 'text-3xl' && 'text-2xl sm:text-3xl',
									props.item.text_size === 'text-4xl' && 'text-2xl sm:text-4xl',
									props.item.text_size === 'text-5xl' && 'text-2xl sm:text-5xl',
									props.item.text_size === 'text-6xl' && 'text-2xl sm:text-6xl',
									props.item.text_size === 'text-7xl' && 'text-2xl sm:text-7xl',
									props.item.text_size === 'text-8xl' && 'text-2xl sm:text-8xl '
								)}
							>
								{props.item.title}
							</h1>
							<Show when={props.item.call_to_action !== null}>
								<div class="flex items-end  pt-5">
									<div class="flex justify-center items-center hover:underline bg-accent_6 text-accenttext_1 p-1 px-2  rounded-1 ">
										<A
											href={props.item?.action_url || '/store/Store'}
											class="text-xs z-2 tracking-tight"
										>
											{props.item.call_to_action || 'Shop All'}
										</A>
									</div>
								</div>
							</Show>
						</div>

						<ul
							class={clsx(
								'',
								props.item?.component_variant === 'center' && 'flex flex-col py-2 space-y-2 ',
								props.item?.component_variant === 'default' && 'flex flex-col py-2 space-y-2',
								props.item?.component_variant === 'left' && 'flex flex-col py-2 space-y-2'
							)}
						>
							<For each={props.item.icons}>
								{(item: any, index) => {
									return (
										<li class="flex  items-start justify-start">
											<div
												class={clsx(
													' flex  justify-center items-center  rounded-0.5 overflow-hidden min-w-25px fill-current p-2 rounded-1',
													props.item.background_colors_b === 'normal_1' && 'bg-normal_1',
													props.item.background_colors_b === 'normal_2' && 'bg-normal_2',
													props.item.background_colors_b === 'normal_3' && 'bg-normal_3',
													props.item.background_colors_b === 'normal_4' && 'bg-normal_4',
													props.item.background_colors_b === 'surface' && 'bg-surface',
													props.item.background_colors_b === 'text_4' && 'bg-text_4',
													props.item.background_colors_b === 'text_5' && 'bg-text_5',
													props.item.background_colors_b === 'accent_4' && 'bg-accent_4',
													props.item.background_colors_b === 'accent_5' && 'bg-accent_5',
													props.item.background_colors_b === 'accent_6' && 'bg-accent_6',
													props.item.background_colors_b === 'accent_7' && 'bg-accent_7',
													props.item.background_colors_b === 'accent_8' && 'bg-accent_8',
													props.item.background_colors_b === 'accent_9' && 'bg-accent_9',
													props.item.background_colors_b === 'accent_10' && 'bg-accent_10'
												)}
											>
												<div
													class={clsx(
														' flex  justify-center items-center  rounded-0.5 overflow-hidden min-w-40px fill-current min-h-20'
													)}
												>
													<Show when={item.item?.image}>
														<img
															src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${item.item?.image}?key=100-webp`}
															loading="lazy"
															alt={item.item?.title}
															role="img"
															class=" object-fill grayscale-100 contrast-50 min-w-40px max-w-40px mx-2

																"
														/>
													</Show>
												</div>{' '}
												<div class="flex flex-col justify-start items-start max-w-70 space-y-0.5 ml-2">
													<Show when={item.item?.title}>
														<div class="font-700 text-text_3 text-xs tracking-tighter ">{item.item.title}</div>
													</Show>

													<Show when={item.item?.sub_title}>
														<div class="font-500 text-text_3 text-xs tracking-tighter text-balance">{item.item.sub_title}</div>
													</Show>
												</div>
											</div>
										</li>
									)
								}}
							</For>
						</ul>
					</div>
				</div>
			</Show>
		</>
	)
}
