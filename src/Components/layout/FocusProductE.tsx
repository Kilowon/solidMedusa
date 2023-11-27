import { Show, For, createEffect } from 'solid-js'
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
		icons: {
			image: string
			title: string
			sub_title: string
		}

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

		background_colors_c:
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
		component_variant: 'default' | 'left'
		items: any[]
	}
}

export default function FocusProductE(props: { item: FeaturedProps['item'] }) {
	const { medusa } = useGlobalContext()

	return (
		<Show when={true}>
			<section
				class={clsx(
					'py-5 xl:py-10  max-w-99svw lg:mb-auto lg:mt-auto flex items-center justify-center sm:my-20 lg:my-auto px-2 ',
					props.item.background_colors_c === 'normal_1' && 'bg-normal_1',
					props.item.background_colors_c === 'normal_2' && 'bg-normal_2',
					props.item.background_colors_c === 'normal_3' && 'bg-normal_3',
					props.item.background_colors_c === 'normal_4' && 'bg-normal_4',
					props.item.background_colors_c === 'surface' && 'bg-surface',
					props.item.background_colors_c === 'text_4' && 'bg-text_4',
					props.item.background_colors_c === 'text_5' && 'bg-text_5',
					props.item.background_colors_c === 'accent_4' && 'bg-accent_4',
					props.item.background_colors_c === 'accent_5' && 'bg-accent_5',
					props.item.background_colors_c === 'accent_6' && 'bg-accent_6',
					props.item.background_colors_c === 'accent_7' && 'bg-accent_7',
					props.item.background_colors_c === 'accent_8' && 'bg-accent_8',
					props.item.background_colors_c === 'accent_9' && 'bg-accent_9',
					props.item.background_colors_c === 'accent_10' && 'bg-accent_10'
				)}
			>
				<Show when={getWindowSize().width > 640}>
					<div
						class={clsx(
							' flex justify-between items-center ',
							props.item.component_variant === 'left' && 'lg:flex-row-reverse',
							props.item.component_variant === 'left' &&
								getWindowSize().width > 1300 &&
								'lg:flex-row-reverse xl:min-w-360 xl:max-w-360',
							props.item.component_variant === 'default' &&
								getWindowSize().width > 1300 &&
								'lg:flex-row-reverse xl:min-w-360 xl:max-w-360'
						)}
					>
						<div class="lg:flex flex-col">
							<div class="lg:flex  justify-center  ">
								<div class="text-text_2 z-10 lg:flex flex-col xl:min-w-170 xl:max-w-190 xl:items-center lg:space-y-12 ">
									<div>
										<div class="lg:flex lg:flex-col sm:space-y-2 ">
											<Show when={props.item?.component_variant === 'default' || getWindowSize().width <= 1023}>
												<div class="mb-8">
													<Show when={props.item.tags?.length > 0}>
														<ul class="flex space-x-2">
															<For each={props.item.tags}>
																{(item: any) => {
																	return (
																		<li class="flex items-center justify-center text-xs  xl:text-base font-500 px-1.5 text-normal_1 bg-accent_6 tracking-tighter text-balance rounded-0.5">
																			{item}
																		</li>
																	)
																}}
															</For>
														</ul>
													</Show>
													<div
														class={clsx(
															' tracking-tighter text-text_2   font-500 z-2  text-start ',
															props.item.text_size_b === 'text-xs' && 'text-xs',
															props.item.text_size_b === 'text-sm' && 'text-sm',
															props.item.text_size_b === 'text-base' && 'text-base',
															props.item.text_size_b === 'text-lg' && 'text-lg',
															props.item.text_size_b === 'text-xl' && 'text-xl',
															props.item.text_size_b === 'text-2xl' && 'text-2xl',
															props.item.text_size_b === 'text-3xl' && 'text-3xl',
															props.item.text_size_b === 'text-4xl' && 'text-4xl',
															props.item.text_size_b === 'text-5xl' && 'text-5xl',
															props.item.text_size_b === 'text-6xl' && 'text-6xl',
															props.item.text_size_b === 'text-7xl' && 'text-7xl',
															props.item.text_size_b === 'text-8xl' && 'text-8xl'
														)}
													>
														{props.item.sub_title}
													</div>
													<h1
														class={clsx(
															'tracking-tighter text-text_2   font-700 z-2  text-start',
															props.item.text_size === 'text-xs' && 'text-xs',
															props.item.text_size === 'text-sm' && 'text-sm',
															props.item.text_size === 'text-base' && 'text-base',
															props.item.text_size === 'text-lg' && 'text-lg',
															props.item.text_size === 'text-xl' && 'text-xl',
															props.item.text_size === 'text-2xl' && 'text-2xl',
															props.item.text_size === 'text-3xl' && 'text-3xl',
															props.item.text_size === 'text-4xl' && 'text-4xl',
															props.item.text_size === 'text-5xl' && 'text-5xl',
															props.item.text_size === 'text-6xl' && 'text-6xl',
															props.item.text_size === 'text-7xl' && 'text-7xl',
															props.item.text_size === 'text-8xl' && 'text-8xl'
														)}
													>
														{props.item.title}
													</h1>
												</div>
											</Show>

											<ul class="grid grid-cols-2 gap-x-6 gap-y-3.75">
												<For each={props.item.items}>
													{(item: any) => {
														return (
															<li class="flex">
																<div
																	class={clsx(
																		'flex justify-center items-center  rounded-2 overflow-hidden',
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
																	<img
																		src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${item.item?.image}?key=200-avif`}
																		loading="lazy"
																		alt="main image"
																		class=" object-fill max-w-190px max-h-190px min-w-100px min-h-100px "
																	/>
																</div>

																<div class="flex flex-col justify-center items-start min-w-40% space-y-2 ml-2">
																	<div class="flex flex-col items-start">
																		<Show when={item.item?.Title}>
																			<div class="font-700 text-text_3 text-sm tracking-tighter ">{item.item.Title}</div>
																		</Show>

																		<Show when={item.item?.price}>
																			<div class="font-500 text-text_3 text-xs tracking-tighter ">{item.item.price}</div>
																		</Show>
																	</div>
																	<Show when={item.item?.call_to_action}>
																		<div class="flex items-center hover:underline text-xs font-500  bg-accent_6 text-accenttext_1 px-1.5 py-0.75 rounded-1 ">
																			<A
																				href={item.item?.action_url || '/store/Store'}
																				class="text- z-2 tracking-tight"
																			>
																				{item.item?.call_to_action}
																			</A>
																		</div>
																	</Show>
																</div>
															</li>
														)
													}}
												</For>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="relative  ">
							<div class="absolute top-10 left-5 z-10">
								<Show when={props.item.tags?.length > 0}>
									<ul class="flex space-x-2">
										<For each={props.item.tags}>
											{(item: any) => {
												return (
													<li class="flex items-center justify-center text-xs  xl:text-base font-500 px-1.5 text-normal_1 bg-accent_6 tracking-tighter text-balance rounded-0.5">
														{item}
													</li>
												)
											}}
										</For>
									</ul>
								</Show>
								<Show when={props.item?.component_variant === 'left' && getWindowSize().width > 1024}>
									<div
										class={clsx(
											' tracking-tighter text-text_2   font-500 z-10  text-start ',
											props.item.text_size_b === 'text-xs' && 'text-xs',
											props.item.text_size_b === 'text-sm' && 'text-sm',
											props.item.text_size_b === 'text-base' && 'text-base',
											props.item.text_size_b === 'text-lg' && 'text-lg',
											props.item.text_size_b === 'text-xl' && 'text-xl',
											props.item.text_size_b === 'text-2xl' && 'text-2xl',
											props.item.text_size_b === 'text-3xl' && 'text-3xl',
											props.item.text_size_b === 'text-4xl' && 'text-4xl',
											props.item.text_size_b === 'text-5xl' && 'text-5xl',
											props.item.text_size_b === 'text-6xl' && 'text-6xl',
											props.item.text_size_b === 'text-7xl' && 'text-7xl',
											props.item.text_size_b === 'text-8xl' && 'text-8xl'
										)}
									>
										{props.item.sub_title}
									</div>
									<h1
										class={clsx(
											'tracking-tighter text-text_2   font-700 z-10  text-start',
											props.item.text_size === 'text-xs' && 'text-xs',
											props.item.text_size === 'text-sm' && 'text-sm',
											props.item.text_size === 'text-base' && 'text-base',
											props.item.text_size === 'text-lg' && 'text-lg',
											props.item.text_size === 'text-xl' && 'text-xl',
											props.item.text_size === 'text-2xl' && 'text-2xl',
											props.item.text_size === 'text-3xl' && 'text-3xl',
											props.item.text_size === 'text-4xl' && 'text-4xl',
											props.item.text_size === 'text-5xl' && 'text-5xl',
											props.item.text_size === 'text-6xl' && 'text-6xl',
											props.item.text_size === 'text-7xl' && 'text-7xl',
											props.item.text_size === 'text-8xl' && 'text-8xl'
										)}
									>
										{props.item.title}
									</h1>
								</Show>
							</div>

							<div
								class={clsx(
									'max-w-600px max-h-600px min-h-600px hidden  lg:flex items-center justify-center overflow-hidden rounded-2 relative ',
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
								<img
									src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${props.item?.image.id}?key=600-avif`}
									alt={props.item.title || 'main image'}
									class={clsx('object-cover object-left min-h-600px z-5 p-2')}
									loading="lazy"
								/>
							</div>
						</div>
					</div>
				</Show>
				<Show when={getWindowSize().width <= 640}>
					<div class={clsx(' max-w-90svw  flex-col items-center')}>
						<div class="lg:flex justify-center items-center my- ">
							<div class="flex flex-col    ">
								<div
									class={clsx(
										' tracking-tighter text-text_2   font-500 z-2  text-start text-balance',
										props.item.text_size_b === 'text-xs' && 'text-xs',
										props.item.text_size_b === 'text-sm' && 'text-sm',
										props.item.text_size_b === 'text-base' && 'text-sm',
										props.item.text_size_b === 'text-lg' && 'text-sm',
										props.item.text_size_b === 'text-xl' && 'text-xl',
										props.item.text_size_b === 'text-2xl' && 'text-xl',
										props.item.text_size_b === 'text-3xl' && 'text-xl',
										props.item.text_size_b === 'text-4xl' && 'text-xl',
										props.item.text_size_b === 'text-5xl' && 'text-xl',
										props.item.text_size_b === 'text-6xl' && 'text-xl',
										props.item.text_size_b === 'text-7xl' && 'text-xl',
										props.item.text_size_b === 'text-8xl' && 'text-xl'
									)}
								>
									{props.item.sub_title}
								</div>
								<h1
									class={clsx(
										'tracking-tighter text-text_2   font-700 z-2  text-start',
										props.item.text_size === 'text-xs' && 'text-xs',
										props.item.text_size === 'text-sm' && 'text-sm',
										props.item.text_size === 'text-base' && 'text-base',
										props.item.text_size === 'text-lg' && 'text-lg',
										props.item.text_size === 'text-xl' && 'text-xl',
										props.item.text_size === 'text-2xl' && 'text-2xl',
										props.item.text_size === 'text-3xl' && 'text-3xl',
										props.item.text_size === 'text-4xl' && 'text-4xl',
										props.item.text_size === 'text-5xl' && 'text-4xl',
										props.item.text_size === 'text-6xl' && 'text-4xl',
										props.item.text_size === 'text-7xl' && 'text-4xl',
										props.item.text_size === 'text-8xl' && 'text-4xl'
									)}
								>
									{props.item.title}
								</h1>
							</div>
						</div>

						<div class="flex flex-col ">
							<div class={clsx('', props.item?.component_variant === 'default' && ' ')}>
								<div class="text-text_2 z-10 flex items-center  lg:space-y-12 ">
									<div>
										<div class="flex  ">
											<ul class={clsx('grid grid-cols-2  gap-x-6 gap-y-3.75 min-w-70')}>
												<For each={props.item.items}>
													{(item: any) => {
														return (
															<li class="flex flex-col ">
																<div
																	class={clsx(
																		' flex  justify-center items-center  rounded-3 overflow-hidden',
																		props.item.background_colors_b === 'normal_1' && 'bg-normal_1',
																		props.item.background_colors_b === 'normal_2' && 'bg-normal_2',
																		props.item.background_colors_b === 'normal_3' && 'bg-normal_3',
																		props.item.background_colors_b === 'normal_4' && 'bg-normal_4',
																		props.item.background_colors_b === 'surface' && 'bg-surface',
																		props.item.background_colors_b === 'text_4' && 'bg-text_4',
																		props.item.background_colors_b === 'text_5' && 'bg-text_5',
																		props.item.background_colors_b === 'accent_4' && 'bg-accent_4',
																		props.item.background_colors_b === 'accent_5' && 'bg-accent_5',
																		props.item.background_colors_b === 'accent_6' && 'bg-accent_6'
																	)}
																>
																	<img
																		src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${item.item?.image}?key=200-avif`}
																		loading="lazy"
																		alt="main image"
																		class=" object-fill  "
																	/>
																</div>

																<div class="flex flex-col justify-center items-start min-w-40% space-y-2 ml-2">
																	<div class="flex flex-col items-start">
																		<Show when={item.item?.Title}>
																			<div class="font-700 text-text_3 text-sm tracking-tighter ">{item.item.Title}</div>
																		</Show>

																		<Show when={item.item?.price}>
																			<div class="font-500 text-text_3 text-xs tracking-tighter ">{item.item.price}</div>
																		</Show>
																	</div>
																	<Show when={item.item?.call_to_action}>
																		<div class="flex items-center hover:underline text-xs font-500  bg-accent_6 text-accenttext_1 px-1.5 py-0.75 rounded-1 ">
																			<A
																				href={item.item?.action_url || '/store/Store'}
																				class="text- z-2 tracking-tight"
																			>
																				{item.item?.call_to_action}
																			</A>
																		</div>
																	</Show>
																</div>
															</li>
														)
													}}
												</For>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Show>
			</section>
		</Show>
	)
}
