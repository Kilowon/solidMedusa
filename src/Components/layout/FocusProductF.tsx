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
		component_variant: 'default' | 'left' | 'center' | 'right'
		items: any[]
	}
}

export default function FocusProductE(props: { item: FeaturedProps['item'] }) {
	const { medusa } = useGlobalContext()

	return (
		<Show when={true}>
			<section
				class={clsx(
					'  max-w-100svw  flex flex-col lg:flex-row justify-center px-2 ',
					props.item.component_variant === 'left' && 'flex-row-reverse py-5 xl:py-10  items-center',
					props.item.component_variant === 'default' && 'py-5 xl:py-10  items-center',
					props.item.component_variant === 'center' && ' py-5 xl:py-10  items-center lg:items-end mb-15',
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
				<Show when={getWindowSize().width > 1023}>
					<div
						class={clsx(
							'flex  ',
							props.item.component_variant === 'center' && 'justify-center items-end',
							props.item.component_variant === 'default' &&
								getWindowSize().width > 1300 &&
								'justify-between flex-row xl:min-w-360 items-center',
							props.item.component_variant === 'left' &&
								getWindowSize().width > 1300 &&
								'justify-between flex-row-reverse xl:min-w-360 items-center'
						)}
					>
						<div class="flex flex-col ">
							<div class="flex  justify-center  ">
								<div
									class={clsx(
										'text-text_2 z-10 flex flex-col items-center ',
										props.item.component_variant === 'center' && 'lg:min-w-[300px] max-w-400px',
										props.item.component_variant === 'default' && 'min-w-170 max-w-195 space-y-3 ',
										props.item.component_variant === 'left' && 'min-w-170 max-w-195  space-y-3 '
									)}
								>
									<div>
										<div
											class={clsx(
												'flex flex-col ',
												props.item.component_variant === 'center' && '',
												props.item.component_variant === 'default' && ' space-y-8',
												props.item.component_variant === 'left' && ' space-y-8 '
											)}
										>
											<Show when={props.item?.component_variant !== 'center'}>
												<div class="pb-2   ">
													<div
														class={clsx(
															' tracking-tighter text-text_2   font-500 z-2  text-start',
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
															'tracking-tighter text-text_2   font-700 z-2  text-start text-balance whitespace-break-spaces mb-8',
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
													<p
														class={clsx(
															' tracking-tighter  text-text_3   font-500 z-2  text-start whitespace-pre-line',
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
														{props.item.description}
													</p>
												</div>
											</Show>

											<ul
												class={clsx(
													'',
													props.item?.component_variant === 'center' && 'flex flex-col space-y-10 h-136',
													props.item?.component_variant === 'default' && 'grid grid-cols-2 gap-x-6 gap-y-8',
													props.item?.component_variant === 'left' && 'grid grid-cols-2 gap-x-6 gap-y-8'
												)}
											>
												<For each={props.item.icons}>
													{(item: any, index) => {
														if (props.item?.component_variant === 'center') {
															if (index() % 2 !== 0) return
														}

														return (
															<li
																class={clsx(
																	'flex items-center justify-center rounded-1 p-2',
																	props.item.background_colors_b === 'normal_1' && 'bg-normal_1 border border-text_2/50',
																	props.item.background_colors_b === 'normal_2' && 'bg-normal_2 border border-text_2/50',
																	props.item.background_colors_b === 'normal_3' && 'bg-normal_3 border border-text_2/50',
																	props.item.background_colors_b === 'normal_4' && 'bg-normal_4 border border-text_2/50',
																	props.item.background_colors_b === 'surface' && 'bg-surface border border-text_2/50',
																	props.item.background_colors_b === 'text_4' && 'bg-text_4 border border-text_2/50',
																	props.item.background_colors_b === 'text_5' && 'bg-text_5 border border-text_2/50',
																	props.item.background_colors_b === 'accent_4' && 'bg-accent_4 border border-text_2/50',
																	props.item.background_colors_b === 'accent_5' && 'bg-accent_5 border border-text_2/50',
																	props.item.background_colors_b === 'accent_6' && 'bg-accent_6 border border-text_2/50',
																	props.item.background_colors_b === 'accent_7' && 'bg-accent_7 border border-text_2/50',
																	props.item.background_colors_b === 'accent_8' && 'bg-accent_8 border border-text_2/50',
																	props.item.background_colors_b === 'accent_9' && 'bg-accent_9 border border-text_2/50',
																	props.item.background_colors_b === 'accent_10' && 'bg-accent_10 border border-text_2/50'
																)}
															>
																<div
																	class={clsx(
																		' flex  justify-center items-center  rounded-0.5 overflow-hidden min-w-40px fill-current min-h-18 h-full'
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
																</div>
																<div class="border-1 border-r-text_2/50 h-20 w-1 ml-2"></div>
																<div class="flex flex-col justify-start items-start min-w-40% space-y-2 ml-2 px-2">
																	<Show when={item.item?.title}>
																		<div class="font-700 text-text_3 text-sm tracking-tighter ">{item.item.title}</div>
																	</Show>
																	<Show when={item.item?.sub_title}>
																		<div class="font-500 text-text_3 text-xs tracking-tighter text-balance ">{item.item.sub_title}</div>
																	</Show>
																</div>
															</li>
														)
													}}
												</For>
											</ul>
											<div
												class={clsx(
													'flex items-end ',
													props.item.component_variant === 'left' && 'justify-start',
													props.item.component_variant === 'default' && 'justify-end',
													props.item.component_variant === 'center' && 'justify-end pr-4'
												)}
											>
												<div
													class={clsx(
														'flex items-center space-x-3 ',
														props.item.component_variant === 'center' && 'mt-8',
														props.item.component_variant === 'default' && ' ',
														props.item.component_variant === 'left' && ''
													)}
												>
													<Show when={props.item?.price}>
														<div class="font-500 text-text_3 text-sm tracking-tighter ">{props.item?.price}</div>
													</Show>
													<Show when={props.item?.call_to_action}>
														<div class="flex items-center hover:underline text-sm font-500 bg-accent_6 text-accenttext_1 px-2.5 py-1 rounded-1 ">
															<A
																href={props.item?.action_url || '/store/Store'}
																class="text- z-2 tracking-tight"
															>
																{props.item?.call_to_action}
															</A>
														</div>
													</Show>
												</div>
											</div>
										</div>
									</div>

									<div class="flex flex-col items-center justify-center space-y-2 mb-2 lg:mb-auto"></div>
								</div>
							</div>
						</div>

						<div class="  ">
							<Show when={props.item?.component_variant === 'center'}>
								<div class="space-y-1 mb-2 max-w-500px">
									<div
										class={clsx(
											' tracking-tighter text-text_2   font-500 z-2  text-start',
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
									<p
										class={clsx(
											' tracking-tighter  text-text_4   font-500 z-2  text-start whitespace-pre-line ',
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
										{props.item.description}
									</p>
								</div>
							</Show>
							<div
								class={clsx(
									'max-w-600px max-h-600px min-h-600px   flex items-center justify-center overflow-hidden rounded-2 relative ',
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
									src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${props.item.image?.id}?key=600-avif`}
									height={600}
									width={600}
									alt={props.item.title || 'main image'}
									class={clsx('object-cover object-center min-h-450px z-5')}
									loading="lazy"
								/>
							</div>
						</div>

						<Show when={props.item?.component_variant === 'center'}>
							<div class="flex  justify-center  ml-10 lg:ml-auto">
								<div
									class={clsx(
										'text-text_2 z-10 flex flex-col items-center  ',
										props.item.component_variant === 'center' && 'lg:min-w-[300px] max-w-400px',
										props.item.component_variant === 'default' && 'min-w-[600px] max-w-800px space-y-3 lg:space-y-12',
										props.item.component_variant === 'left' && 'min-w-[600px] max-w-800px space-y-3 lg:space-y-12'
									)}
								>
									<div>
										<div class="flex flex-col space-y-8 ">
											<ul
												class={clsx(
													'',
													props.item.component_variant === 'center' && 'flex flex-col space-y-15 pl-5 h-136',
													props.item.component_variant === 'default' && 'grid grid-cols-2 gap-x-6 gap-y-8',
													props.item.component_variant === 'left' && 'grid grid-cols-2 gap-x-6 gap-y-8'
												)}
											>
												<For each={props.item.icons}>
													{(item: any, index) => {
														if (props.item?.component_variant === 'center') {
															if (index() % 2 === 0) return
														}

														return (
															<li class="flex items-center justify-center">
																<div
																	class={clsx(
																		' flex  justify-center items-center  rounded-0.5 overflow-hidden min-w-40px fill-current',
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
																	<Show when={item.item?.image}>
																		<img
																			src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${item.item?.image}?key=100-webp`}
																			loading="lazy"
																			alt={item.item?.title}
																			role="img"
																			class=" object-fill grayscale-100 contrast-50 min-w-40px max-w-40px"
																		/>
																	</Show>
																</div>
																<div class="border-1 border-r-black h-20 w-3 ml-2"></div>
																<div class="flex flex-col justify-start items-start min-w-40% space-y-2 ml-2">
																	<Show when={item.item?.title}>
																		<div class="font-700 text-text_3 text-sm tracking-tighter ">{item.item.title}</div>
																	</Show>
																	<Show when={item.item?.sub_title}>
																		<div class="font-500 text-text_3 text-xs tracking-tighter text-balance ">{item.item.sub_title}</div>
																	</Show>
																</div>
															</li>
														)
													}}
												</For>
											</ul>
											<Show when={props.item?.call_to_action}>
												<div class="h-1.4rem "></div>
											</Show>
										</div>
									</div>

									<div class="flex flex-col items-center justify-center space-y-2 mb-2 lg:mb-auto"></div>
								</div>
							</div>
						</Show>
					</div>
				</Show>
				<Show when={getWindowSize().width < 1023 && getWindowSize().width > 640}>
					<div class="flex flex-col justify-center items-center my-10">
						<div class="mx-4 mb-8 flex">
							<div class="flex flex-col items-center justify-center mr-4">
								<div class="space-y-1 mb-2 max-w-500px">
									<div
										class={clsx(
											' tracking-tighter text-text_2   font-500 z-2  text-start',
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
											props.item.text_size === 'text-5xl' && 'text-5xl',
											props.item.text_size === 'text-6xl' && 'text-5xl',
											props.item.text_size === 'text-7xl' && 'text-5xl',
											props.item.text_size === 'text-8xl' && 'text-5xl'
										)}
									>
										{props.item.title}
									</h1>
									<p
										class={clsx(
											' tracking-tighter  text-text_4   font-500 z-2  text-start whitespace-break-spaces ',
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
										{props.item.description}
									</p>
								</div>
								<div class={clsx('flex items-end justify-end mt-8')}>
									<div class={clsx('flex items-center space-x-3 ')}>
										<Show when={props.item?.price}>
											<div class="font-500 text-text_3 text-xs tracking-tighter ">{props.item?.price}</div>
										</Show>
										<Show when={props.item?.call_to_action}>
											<div class="flex items-center hover:underline text-xs font-500 bg-accent_6 text-accenttext_1 px-2.5 py-1 rounded-1 ">
												<A
													href={props.item?.action_url || '/store/Store'}
													class="text- z-2 tracking-tight"
												>
													{props.item?.call_to_action}
												</A>
											</div>
										</Show>
									</div>
								</div>
							</div>

							<div
								class={clsx(
									'max-w-600px max-h-600px min-h-600px flex justify-center overflow-hidden rounded-2 relative ',
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
									src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${props.item.image?.id}?key=600-avif`}
									height={600}
									width={600}
									alt={props.item.title || 'main image'}
									class={clsx('object-cover object-center min-h-450px z-5')}
									loading="lazy"
								/>
							</div>
						</div>

						<div class="flex flex-col ">
							<div class="flex  justify-center  ">
								<div class={clsx('text-text_2 z-10 flex flex-col items-center ')}>
									<div>
										<div class={clsx('flex flex-col ')}>
											<ul class={clsx('grid grid-cols-2 gap-x-6 gap-y-6')}>
												<For each={props.item.icons}>
													{(item: any, index) => {
														return (
															<li class="flex items-start justify-start">
																<div
																	class={clsx(
																		' flex  justify-center items-center  rounded-0.5 overflow-hidden max-w-30px min-w-30px fill-current',
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
																	<Show when={item.item?.image}>
																		<img
																			src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${item.item?.image}?key=100-webp`}
																			loading="lazy"
																			alt={item.item?.title}
																			role="img"
																			class=" object-fill grayscale-100 contrast-50  

																		"
																		/>
																	</Show>
																</div>
																<div class="flex flex-col justify-start items-start min-w-40% space-y-2 ml-2">
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

									<div class="flex flex-col items-center justify-center space-y-2 mb-2 lg:mb-auto"></div>
								</div>
							</div>
						</div>
					</div>
				</Show>
				<Show when={getWindowSize().width <= 640}>
					<div class="flex flex-col justify-center items-center my-10">
						<div class="mb-8 flex flex-col">
							<div class="flex flex-col items-center justify-center mb-4">
								<div class="space-y-1 mb-2 max-w-500px">
									<div
										class={clsx(
											' tracking-tighter text-text_2   font-500 z-2  text-start',
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
											'tracking-tighter text-text_2  text-balance font-700 z-2  text-start',
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
									<p
										class={clsx(
											' tracking-tighter  text-text_4   font-500 z-2  text-start whitespace-break-spaces ',
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
										{props.item.description}
									</p>
								</div>
								<div class={clsx('flex items-end justify-end mt-8')}>
									<div class={clsx('flex items-center space-x-3 ')}>
										<Show when={props.item?.price}>
											<div class="font-500 text-text_3 text-xs tracking-tighter ">{props.item?.price}</div>
										</Show>
										<Show when={props.item?.call_to_action}>
											<div class="flex items-center hover:underline text-xs font-500 bg-accent_6 text-accenttext_1 px-2.5 py-1 rounded-1 ">
												<A
													href={props.item?.action_url || '/store/Store'}
													class="text- z-2 tracking-tight"
												>
													{props.item?.call_to_action}
												</A>
											</div>
										</Show>
									</div>
								</div>
							</div>

							<div
								class={clsx(
									'max-w-600px max-h-600px min-h-300px   flex items-center justify-center overflow-hidden rounded-2 relative ',
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
									src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${props.item.image?.id}?key=600-avif`}
									height={600}
									width={600}
									alt={props.item.title || 'main image'}
									class={clsx('object-cover object-center min-h-250px z-5')}
									loading="lazy"
								/>
							</div>
						</div>

						<div class="flex flex-col ">
							<div class="flex  justify-center  ">
								<div class={clsx('text-text_2 z-10 flex flex-col items-center ')}>
									<div>
										<div class={clsx('flex ')}>
											<ul class={clsx('grid grid-cols-1 gap-y-2')}>
												<For each={props.item.icons}>
													{(item: any, index) => {
														if (props.item?.component_variant === 'center') {
															if (index() % 2 !== 0) return
														}

														return (
															<li
																class={clsx(
																	'flex items-start justify-start rounded-1 p-1',
																	props.item.background_colors_b === 'normal_1' && 'bg-normal_1 border border-text_2/50',
																	props.item.background_colors_b === 'normal_2' && 'bg-normal_2 border border-text_2/50',
																	props.item.background_colors_b === 'normal_3' && 'bg-normal_3 border border-text_2/50',
																	props.item.background_colors_b === 'normal_4' && 'bg-normal_4 border border-text_2/50',
																	props.item.background_colors_b === 'surface' && 'bg-surface border border-text_2/50',
																	props.item.background_colors_b === 'text_4' && 'bg-text_4 border border-text_2/50',
																	props.item.background_colors_b === 'text_5' && 'bg-text_5 border border-text_2/50',
																	props.item.background_colors_b === 'accent_4' && 'bg-accent_4 border border-text_2/50',
																	props.item.background_colors_b === 'accent_5' && 'bg-accent_5 border border-text_2/50',
																	props.item.background_colors_b === 'accent_6' && 'bg-accent_6 border border-text_2/50',
																	props.item.background_colors_b === 'accent_7' && 'bg-accent_7 border border-text_2/50',
																	props.item.background_colors_b === 'accent_8' && 'bg-accent_8 border border-text_2/50',
																	props.item.background_colors_b === 'accent_9' && 'bg-accent_9 border border-text_2/50',
																	props.item.background_colors_b === 'accent_10' && 'bg-accent_10 border border-text_2/50'
																)}
															>
																<div
																	class={clsx(
																		' flex  justify-center items-center  rounded-0.5 overflow-hidden min-w-40px fill-current min-h-18 h-full'
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
																</div>

																<div class="flex flex-col justify-start items-start min-w-40% space-y-2 ml-4  ">
																	<Show when={item.item?.title}>
																		<div class="font-700 text-text_3 text-xs tracking-tighter ">{item.item.title}</div>
																	</Show>
																	<Show when={item.item?.sub_title}>
																		<div class="font-500 text-text_3 text-xs tracking-tighter text-balance">{item.item.sub_title}</div>
																	</Show>
																</div>
															</li>
														)
													}}
												</For>
											</ul>
										</div>
										<div class={clsx('flex items-end justify-center mt-8')}>
											<div class={clsx('flex items-center space-x-3 ')}>
												<Show when={props.item?.call_to_action}>
													<div class="flex items-center hover:underline text-xs font-500 bg-accent_6 text-accenttext_1 px-2.5 py-1 rounded-1 ">
														<A
															href={props.item?.action_url || '/store/Store'}
															class="text- z-2 tracking-tight"
														>
															{props.item?.call_to_action}
														</A>
													</div>
												</Show>
											</div>
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
