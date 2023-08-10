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
		icons: any[]

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
		component_variant: 'default' | 'right' | 'three' | 'nine'
		items: any[]
	}
}

export default function FocusProductsD(props: { item: FeaturedProps['item'] }) {
	const { medusa } = useGlobalContext()

	return (
		<Show when={true}>
			<div
				class={clsx(
					'min-h-[800px] max-w-99svw lg:mb-auto lg:mt-auto flex  justify-center  mx-2 relative',
					props.item?.component_variant === 'default' && ' flex-col items-center',
					props.item?.component_variant === 'right' && ' flex-col items-center',
					props.item?.component_variant === 'three' && '  items-start',
					props.item?.component_variant === 'nine' && '  items-start'
				)}
			>
				<Show when={getWindowSize().width > 1023}>
					<Show when={props.item?.component_variant === 'default' || props.item?.component_variant === 'right'}>
						<div class="flex justify-center items-center my-8">
							<div class="flex flex-col  max-w-120">
								<div
									class={clsx(
										' tracking-tighter text-text_2   font-500 z-2  text-start text-balance',
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
							<div class="max-w-245">
								<ul
									class={clsx(
										'',

										props.item?.component_variant === 'default' && 'grid grid-cols-2 gap-x-2 gap-y-4',
										props.item?.component_variant === 'right' && 'grid grid-cols-2 gap-x-2 gap-y-4'
									)}
								>
									<For each={props.item.icons}>
										{(item: any) => {
											return (
												<li class="flex items-start justify-start">
													<div class="flex flex-col justify-start items-start min-w-40% space-y-2 ml-2">
														<div class="flex flex-start  w-full">
															<div class={clsx(' flex  justify-center items-center  rounded-0.5 overflow-hidden w-10% fill-current')}>
																<Show when={item.item?.image}>
																	<img
																		src={`https://direct.shauns.cool/assets/${item.item?.image}?key=100-webp`}
																		loading="lazy"
																		alt={item.item?.title}
																		role="img"
																		class=" object-fill grayscale-100 contrast-50 max-w-20px
																
																"
																	/>
																</Show>
															</div>

															<Show when={item.item?.title}>
																<div class="font-700 text-text_3 text-xs tracking-tighter ">{item.item.title}</div>
															</Show>
														</div>
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
					<Show when={props.item?.component_variant === 'three' || props.item?.component_variant === 'nine'}>
						<div class="flex flex-col justify-start items-start space-y-8 mx-8">
							<div class="flex flex-col  max-w-120">
								<div
									class={clsx(
										' tracking-tighter text-text_2   font-500 z-2  text-start text-balance',
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
							<div class="max-w-120">
								<ul
									class={clsx(
										'',

										props.item?.component_variant === 'default' && 'grid grid-cols-2 gap-x-2 gap-y-4',
										props.item?.component_variant === 'three' && 'grid grid-cols-1 gap-y-8',
										props.item?.component_variant === 'nine' && 'grid grid-cols-1 lg:gap-y-3 xl:gap-y-8'
									)}
								>
									<For each={props.item.icons}>
										{(item: any) => {
											return (
												<li class="flex items-start justify-start">
													<div class="flex flex-col justify-start items-start min-w-40% space-y-2 ml-2">
														<div class="flex flex-start  w-full">
															<div class={clsx(' flex  justify-center items-center  rounded-0.5 overflow-hidden w-10% fill-current')}>
																<Show when={item.item?.image}>
																	<img
																		src={`https://direct.shauns.cool/assets/${item.item?.image}?key=100-webp`}
																		loading="lazy"
																		alt={item.item?.title}
																		role="img"
																		class=" object-fill grayscale-100 contrast-50 max-w-25px 
																
																"
																	/>
																</Show>
															</div>

															<Show when={item.item?.title}>
																<div class="font-700 text-text_3 text-xs tracking-tighter ">{item.item.title}</div>
															</Show>
														</div>
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

					<Show
						when={
							props.item?.component_variant === 'default' ||
							props.item?.component_variant === 'right' ||
							props.item?.component_variant === 'three' ||
							props.item?.component_variant === 'nine'
						}
					>
						<div class="flex flex-col ">
							<div
								class={clsx(
									'',
									props.item?.component_variant === 'default' && 'flex  justify-center  ',
									props.item?.component_variant === 'right' && 'flex flex-row-reverse justify-between  ',
									props.item?.component_variant === 'three' && 'flex  justify-center  ',
									props.item?.component_variant === 'nine' && ''
								)}
							>
								<div class="text-text_2 z-10 flex items-center space-y-3 lg:space-y-12 ">
									<div>
										<div class="flex flex-col space-y-2 ">
											<ul
												class={clsx(
													'',

													props.item?.component_variant === 'default' && 'grid grid-cols-2 gap-x-6 gap-y-3.75',
													props.item?.component_variant === 'right' && 'grid grid-cols-2 gap-x-6 gap-y-3.75',
													props.item?.component_variant === 'three' && 'grid grid-cols-1 gap-x-2 gap-y-4',
													props.item?.component_variant === 'nine' && 'grid lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-3.75'
												)}
											>
												<For each={props.item.items}>
													{(item: any) => {
														return (
															<li class="flex ">
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
																		src={`https://direct.shauns.cool/assets/${item.item?.image}?key=200-avif`}
																		loading="eager"
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
																		<div class="flex items-center hover:underline text-xs font-500  bg-accent_6 text-accenttext_1 px-1 py-0.25 rounded-1 ">
																			<A
																				href="/store/Store"
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
								<div
									class={clsx(
										' relative ',

										props.item?.component_variant === 'default' && 'ml-17',
										props.item?.component_variant === 'right' && 'mr-17',
										props.item?.component_variant === 'three' && 'mx-8'
									)}
								>
									<Show
										when={
											props.item?.component_variant === 'default' ||
											props.item?.component_variant === 'right' ||
											props.item?.component_variant === 'three'
										}
									>
										<div
											class={clsx(
												'max-w-600px max-h-600px min-w-300px min-h-300px  aspect-[1/1] flex items-center justify-center overflow-hidden rounded-2 relative ',
												props.item.background_colors === 'normal_1' && 'bg-normal_1',
												props.item.background_colors === 'normal_2' && 'bg-normal_2',
												props.item.background_colors === 'normal_3' && 'bg-normal_3',
												props.item.background_colors === 'normal_4' && 'bg-normal_4',
												props.item.background_colors === 'surface' && 'bg-surface',
												props.item.background_colors === 'text_4' && 'bg-text_4',
												props.item.background_colors === 'text_5' && 'bg-text_5',
												props.item.background_colors === 'accent_4' && 'bg-accent_4',
												props.item.background_colors === 'accent_5' && 'bg-accent_5',
												props.item.background_colors === 'accent_6' && 'bg-accent_6'
											)}
										>
											<img
												src={`https://direct.shauns.cool/assets/${props.item?.image.id}?key=600-avif`}
												height={600}
												width={600}
												alt={props.item.title || 'main image'}
												class={clsx('object-cover z-5')}
											/>
										</div>
									</Show>
								</div>
							</div>
						</div>
					</Show>
				</Show>
				<Show when={getWindowSize().width <= 1023}>
					<div>NONE</div>
				</Show>
			</div>
		</Show>
	)
}