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
					' max-w-99svw justify-center mx-2 relative',
					props.item?.component_variant === 'default' && 'flex  flex-col items-center ',
					props.item?.component_variant === 'right' && 'flex  flex-col items-center ',
					props.item?.component_variant === 'three' && 'flex   items-center ',
					props.item?.component_variant === 'nine' && 'flex   items-center  lg:flex-col xl:flex-row'
				)}
			>
				<Show when={getWindowSize().width > 640}>
					<div
						class={clsx(
							' max-w-99svw ',
							props.item?.component_variant === 'default' && ' flex-col items-center ',
							props.item?.component_variant === 'right' && ' flex-col items-center ',
							props.item?.component_variant === 'three' && ' lg:flex items-center ',
							props.item?.component_variant === 'nine' && 'lg:flex  items-end flex-col xl:flex-row'
						)}
					>
						<Show when={props.item?.component_variant === 'default' || props.item?.component_variant === 'right'}>
							<div class="lg:flex justify-between items-center my-8">
								<div class="flex flex-col  max-w-150 min-w-100 my-8 lg:my-auto">
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
											'tracking-tighter text-text_2 font-700 z-2 text-start text-balance tracking-tighter ',
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
								<div class="  lg:max-w-195  flex">
									<ul
										class={clsx(
											'',

											props.item?.component_variant === 'default' && 'grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-4',
											props.item?.component_variant === 'right' && 'grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-4'
										)}
									>
										<For each={props.item.icons}>
											{(item: any) => {
												return (
													<li class="flex items-center justify-center ">
														<div
															class={clsx(' flex  justify-center items-center  rounded-0.5 overflow-hidden fill-current min-w-40px ')}
														>
															<Show when={item.item?.image}>
																<img
																	src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${item.item?.image}?key=100-webp`}
																	loading="lazy"
																	alt={item.item?.title}
																	role="img"
																	class=" object-fill grayscale-100 contrast-50 max-w-40px min-w-40px
																
																"
																/>
															</Show>
														</div>
														<div class="border-1 border-r-text_2/50 h-full w-1 ml-2"></div>
														<div class="flex flex-col justify-start items-start min-w-40% pb-1 ml-2">
															<div class="flex flex-start  w-full">
																<Show when={item.item?.title}>
																	<div class="font-700 text-text_3 text-sm tracking-tighter   flex items-center pb-1">
																		{item.item.title}
																	</div>
																</Show>
															</div>
															<Show when={item.item?.sub_title}>
																<div class="font-500 text-text_3 text-xs tracking-tighter text-balance ">{item.item.sub_title}</div>
															</Show>
														</div>
													</li>
												)
											}}
										</For>
									</ul>
									<Show when={props.item?.component_variant === 'default' || props.item?.component_variant === 'right'}>
										<div
											class={clsx(
												'max-w-600px max-h-600px min-h-363px min-w-363px flex  lg:hidden  justify-center overflow-hidden rounded-2 relative ',
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
												src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${props.item?.image.id}?key=600-avif`}
												height={600}
												width={600}
												alt={props.item.title || 'main image'}
												class={clsx('object-cover object-center min-h-450px z-5 p-2')}
												loading="lazy"
											/>
										</div>
									</Show>
								</div>
							</div>
						</Show>
						<Show when={props.item?.component_variant === 'three' || props.item?.component_variant === 'nine'}>
							<div class="flex flex-col justify-start items-start space-y-8  my-8 lg:my-auto lg:mr-2">
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
								<div>
									<ul
										class={clsx(
											' ',

											props.item?.component_variant === 'default' && 'grid grid-cols-2 gap-x-2 gap-y-4',
											props.item?.component_variant === 'three' &&
												'grid grid-cols-2 lg:grid-cols-1 gap-y-4 gap-x-2 mb-8 lg:max-w-200 xl:max-w-120',
											props.item?.component_variant === 'nine' &&
												'grid grid-cols-2 xl:grid-cols-1 gap-y-3 xl:gap-y-8 lg:max-w-200 xl:max-w-120'
										)}
									>
										<For each={props.item.icons}>
											{(item: any) => {
												return (
													<li class="flex items-center justify-center  rounded-1">
														<div
															class={clsx(
																' flex  justify-center items-center  rounded-0.5 overflow-hidden w-10% fill-current min-w-15'
															)}
														>
															<Show when={item.item?.image}>
																<img
																	src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${item.item?.image}?key=100-webp`}
																	loading="lazy"
																	alt={item.item?.title}
																	role="img"
																	class=" object-fill grayscale-100 contrast-50 max-w-40px min-w-40px 
																
																"
																/>
															</Show>
														</div>
														<div class="border-1 border-r-text_2/50 h-full w-1 ml-2 max-h-20"></div>
														<div class="flex flex-col justify-start items-start min-w-40% space-y-2 ml-2 p-2">
															<div class="flex flex-start  w-full">
																<Show when={item.item?.title}>
																	<div class="font-700 text-text_3 text-xs tracking-tighter ">{item.item.title}</div>
																</Show>
															</div>
															<Show when={item.item?.sub_title}>
																<div class="font-500 text-text_3 text-xs tracking-tighte text-balance ">{item.item.sub_title}</div>
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
										props.item?.component_variant === 'default' && 'lg:flex  justify-center  ',
										props.item?.component_variant === 'right' && 'lg:flex flex-row-reverse justify-between  ',
										props.item?.component_variant === 'three' && 'flex  justify-center  ',
										props.item?.component_variant === 'nine' && ''
									)}
								>
									<div class="text-text_2 z-10 flex items-center justify-center  space-y-3 lg:space-y-12 ">
										<div>
											<div class="flex ">
												<ul
													class={clsx(
														'',

														props.item?.component_variant === 'default' &&
															'grid grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-3.75  lg:min-w-680px',
														props.item?.component_variant === 'right' &&
															'grid grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-3.75  lg:min-w-680px',
														props.item?.component_variant === 'three' && 'grid grid-cols-1 gap-x-2 gap-y-4 min-w-340px',
														props.item?.component_variant === 'nine' &&
															'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-1%  min-w-70%'
													)}
												>
													<For each={props.item.items}>
														{(item: any) => {
															return (
																<li
																	class={clsx(
																		'flex rounded-1.5 px-1.5',
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
																	<div class={clsx('flex justify-center items-center  rounded-3 overflow-hidden')}>
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
																					href={`${item?.item?.action_url}` || '/store/Store'}
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
											props.item?.component_variant === 'three' && ' ml-2 '
										)}
									>
										<Show when={props.item?.component_variant === 'default' || props.item?.component_variant === 'right'}>
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
													props.item.background_colors === 'accent_6' && 'bg-accent_6'
												)}
											>
												<img
													src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${props.item?.image.id}?key=600-avif`}
													height={600}
													width={600}
													alt={props.item.title || 'main image'}
													class={clsx('object-cover object-center min-h-450px z-5')}
													loading="lazy"
												/>
											</div>
										</Show>
										<Show when={props.item?.component_variant === 'three'}>
											<div
												class={clsx(
													'max-w-600px max-h-600px min-h-600px flex  lg:hidden   xl:flex items-center justify-center overflow-hidden rounded-2  ',
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
													src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${props.item?.image.id}?key=600-avif`}
													height={600}
													width={600}
													alt={props.item.title || 'main image'}
													class={clsx('object-cover object-center min-h-450px z-5 p-2')}
													loading="lazy"
												/>
											</div>
										</Show>
									</div>
								</div>
							</div>
						</Show>
					</div>
				</Show>
				<Show when={getWindowSize().width <= 640}>
					<div class={clsx(' max-w-90svw  flex-col items-center')}>
						<div class="lg:flex justify-center items-center my-2 ">
							<div class="flex flex-col   my-2 ">
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
							<div class="lg:max-w-245  flex">
								<ul class={clsx('grid grid-cols-2 gap-y-3')}>
									<For each={props.item.icons}>
										{(item: any) => {
											return (
												<li class="flex items-start justify-start ">
													<div class="flex flex-col justify-start items-start  space-y-2 ml-2">
														<div class="flex justify-center items-center min-h-40px">
															<div
																class={clsx(
																	' flex  justify-center items-center  rounded-0.5 overflow-hidden w-30px h-30px mr-2 fill-current'
																)}
															>
																<Show when={item.item?.image}>
																	<img
																		src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${item.item?.image}?key=100-webp`}
																		loading="lazy"
																		alt={item.item?.title}
																		role="img"
																		class=" object-fill grayscale-100 contrast-50 \
																
																"
																	/>
																</Show>
															</div>
															<Show when={item.item?.title}>
																<div class="font-700 text-text_3 text-xs tracking-tighter w-100% ">{item.item.title}</div>
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

						<div class="flex flex-col ">
							<div class={clsx('', props.item?.component_variant === 'default' && ' ')}>
								<div class="text-text_2 z-10 flex items-center space-y-3 lg:space-y-12 ">
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
																				href={item?.item?.action_url || '/store/Store'}
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
			</div>
		</Show>
	)
}
