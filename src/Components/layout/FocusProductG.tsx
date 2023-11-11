import { Show, For, createEffect } from 'solid-js'
import { A } from 'solid-start'
import { getWindowSize } from '@solid-primitives/resize-observer'
import { useGlobalContext } from '~/Context/Providers'
import clsx from 'clsx'
import { create } from 'domain'

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

		body: string[]
		body_alt: string[]

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
		component_variant: 'default' | 'text' | 'text_only'
	}
}

export default function FocusProductG(props: { item: FeaturedProps['item'] }) {
	const { medusa } = useGlobalContext()

	return (
		<Show when={true}>
			<section
				class={clsx(
					'  max-w-99svw lg:mb-auto lg:mt-auto flex flex-col xl:flex-row  justify-center mx-2 ',

					props.item.component_variant === 'default' && 'min-h-[900px] items-center ',
					props.item.component_variant === 'text' && 'min-h-[900px] items-center',
					props.item.component_variant === 'text_only' && 'min-h-[400px] items-center mt-4'
				)}
			>
				<Show when={true}>
					<div class="flex flex-col ">
						<div
							class={clsx(
								'',
								props.item?.component_variant === 'default' && 'xl:min-w-1200px mb-4',
								props.item.component_variant === 'text' && 'xl:min-w-1200px mb-4',
								props.item.component_variant === 'text_only' && 'xl:min-w-1200px  mb-4'
							)}
						>
							<ul
								class={clsx(
									'',

									props.item?.component_variant === 'default' && 'flex flex-col max-w-7xl space-y-4',
									props.item?.component_variant === 'text' && 'flex flex-col max-w-7xl space-y-4',
									props.item?.component_variant === 'text_only' && 'flex flex-col max-w-7xl space-y-4'
								)}
							>
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
								</div>
								<div
									class={clsx(
										'',
										props.item?.component_variant === 'default' && 'column-1 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4',
										props.item?.component_variant === 'text' && 'column-1 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4',
										props.item?.component_variant === 'text_only' && 'column-1 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4'
									)}
								>
									<For each={props.item.body}>
										{(item: any) => {
											return (
												<div class="break-words">
													<Show when={item.item?.body_title}>
														<div class="font-700 text-text_3 text-sm tracking-tight ">{item.item.body_title}</div>
													</Show>
													<Show when={item.item?.body_text}>
														<div class="font-500 text-text_3 text-xs tracking-normal  ">{item.item.body_text}</div>
													</Show>
												</div>
											)
										}}
									</For>
								</div>
							</ul>
						</div>
						<div class="flex flex-col xl:space-x-16 xl:flex-row ">
							<div class="flex items-center justify-center space-x-10 ">
								<div class="flex flex-col items-center justify-center space-y-20">
									<div class="flex sm:min-w-400px space-x-5">
										<Show when={props.item?.image_3}>
											<div
												class={clsx(
													'max-w-200px max-h-200px min-h-200px   flex items-center justify-center overflow-hidden rounded-2 relative ',
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
													src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${props.item.image_3?.id}?key=200-avif`}
													height={600}
													width={600}
													alt={props.item.title || 'main image'}
													class={clsx('object-contain object-center min-h-200px z-5')}
												/>
											</div>
										</Show>
										<Show when={props.item?.image_2}>
											<div
												class={clsx(
													'max-w-200px max-h-200px min-h-200px   flex items-center justify-center overflow-hidden rounded-2 relative ',
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
													src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${props.item.image_2?.id}?key=200-avif`}
													height={600}
													width={600}
													alt={props.item.title || 'main image'}
													class={clsx('object-contain object-center min-h-200px z-5')}
												/>
											</div>
										</Show>
									</div>
									<div
										class={clsx(
											'flex items-end ',

											props.item.component_variant === 'default' && 'justify-end',
											props.item.component_variant === 'text' && 'justify-end'
										)}
									>
										<div class="flex items-center space-x-3">
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
								<Show when={props.item?.image}>
									<div
										class={clsx(
											'max-w-450px max-h-450px min-h-450px hidden  sm:flex items-center justify-center overflow-hidden rounded-2 relative ',
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
											class={clsx('object-contain object-center min-h-450px z-5')}
										/>
									</div>
								</Show>
							</div>

							<ul
								class={clsx(
									'',
									props.item?.component_variant === 'text' && ' lg:max-w-7xl xl:max-w-300px mt-5 xl:mt-auto',
									props.item?.component_variant === 'default' &&
										'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-6 xl:gap-6 xl:max-w-400px '
								)}
							>
								<Show when={props.item?.body_alt.length > 0}>
									<div
										class={clsx(
											'',
											props.item?.component_variant === 'default' && 'column-1 sm:columns-2 lg:columns-3 xl:columns-1  space-y-4',
											props.item?.component_variant === 'text' && 'column-1 sm:columns-2 lg:columns-3 xl:columns-1 space-y-4'
										)}
									>
										<For each={props.item.body_alt}>
											{(item: any) => {
												return (
													<div class="break-inside-auto">
														<Show when={item.item?.body_title}>
															<div class="font-700 text-text_3 text-sm tracking-tight ">{item.item.body_title}</div>
														</Show>
														<Show when={item.item?.body_text}>
															<div class="font-500 text-text_3 text-xs tracking-normal whitespace-break-spaces ">
																{item.item.body_text}
															</div>
														</Show>
													</div>
												)
											}}
										</For>
									</div>
								</Show>
								<Show when={props.item?.icons.length > 0}>
									<For each={props.item.icons}>
										{(item: any, index) => {
											return (
												<li class="flex items-start justify-start">
													{' '}
													<div
														class={clsx(' flex  justify-center items-center  rounded-0.5 overflow-hidden min-w-50px fill-current')}
													>
														<Show when={item.item?.image}>
															<img
																src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${item.item?.image}?key=100-webp`}
																loading="lazy"
																alt={item.item?.title}
																role="img"
																class=" object-fill grayscale-100 contrast-50 min-w-50px max-w-50px

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
								</Show>
							</ul>
						</div>
					</div>
				</Show>
				{/* <Show when={getWindowSize().width <= 1023}>
					<div>NONE</div>
				</Show> */}
			</section>
		</Show>
	)
}
