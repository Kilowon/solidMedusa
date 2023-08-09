import { Show, For } from 'solid-js'
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
		variant: string
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
	}
}

export default function FocusProductC(props: { item: FeaturedProps['item'] }) {
	const { medusa } = useGlobalContext()

	return (
		<Show when={true}>
			<div
				class="min-h-[800px] max-w-99svw lg:mb-auto lg:mt-auto  flex items-center  md:justify-center flex-col lg:flex-row space-x-8 mx-2 
		"
			>
				<Show when={getWindowSize().width > 1023}>
					<div class="flex flex-col justify-between max-h-600px min-h-300px max-w-200px  min-w-100px space-y-4 ">
						<div
							class={clsx(
								'max-w-200px max-h-200px min-w-100px min-h-100px aspect-[1/1] flex  justify-center  rounded-3 overflow-hidden',
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
								src={`https://direct.shauns.cool/assets/${props.item.image_2?.id}?key=200-avif`}
								loading="eager"
								alt="main image"
								class=" object-fill "
							/>
						</div>
						<div
							class={clsx(
								'max-w-200px max-h-200px min-w-100px min-h-100px aspect-[1/1] flex  justify-center  rounded-3 overflow-hidden',
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
								src={`https://direct.shauns.cool/assets/${props.item.image_3?.id}?key=200-avif`}
								loading="eager"
								alt="main image"
								class=" object-cover "
							/>
						</div>
						<div
							class={clsx(
								'max-w-200px max-h-200px min-w-100px min-h-100px aspect-[1/1] flex  justify-center  rounded-3 overflow-hidden',
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
								src={`https://direct.shauns.cool/assets/${props.item.image_4?.id}?key=200-avif`}
								loading="eager"
								alt="main image"
								class=" object-cover "
							/>
						</div>
					</div>
					<div
						class={clsx(
							'max-w-600px max-h-600px min-w-300px min-h-300px  aspect-[1/1] flex items-center justify-center  rounded-3 overflow-hidden',
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
							src={`https://direct.shauns.cool/assets/${props.item.image?.id}?key=600-avif`}
							height={600}
							width={600}
							alt={props.item.title || 'main image'}
							class="object-cover"
						/>
					</div>
					<div class="flex flex-col ">
						<div class="flex w-full  h-1/3"></div>
						<div class="flex  justify-center  ">
							<div class="text-text_2 z-10 flex flex-col  md:max-w-[512px] items-center space-y-3 lg:space-y-12 ">
								<div>
									<div class="flex flex-col    sm:h-auto  mx-6 md:mx-auto space-y-4">
										<div class="space-y-1">
											<Show when={props.item.tags?.length > 0}>
												<ul class="flex space-x-2">
													<For each={props.item.tags}>
														{(item: any) => {
															return (
																<li
																	class={clsx(
																		'flex items-center justify-center  font-500 px-1.5 text-normal_1 bg-accent_6 tracking-tighter text-balance rounded-0.5',
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
																	{item}
																</li>
															)
														}}
													</For>
												</ul>
											</Show>
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
													' tracking-tighter  font-700 z-2  text-start text-balance',
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
													' tracking-tighter  font-400 z-2  text-text_3 text-start text-balance whitespace-break-spaces',
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
									</div>
									<div class="flex flex-col items-center space-y-2">
										<Show when={props.item.call_to_action}>
											<div class="flex items-center hover:underline text-xs md:text-sm lg:text-base bg-accent_6 text-accenttext_1 p-2  rounded-1 ">
												<A
													href="/store/Store"
													class="text- z-2 tracking-tight"
												>
													{props.item.call_to_action}
												</A>
											</div>
										</Show>
										<Show when={props.item.price}>
											<div class="font-500 text-text_3  tracking-tighter ">{props.item.price}</div>
										</Show>
									</div>
									<div class="flex flex-col items-center justify-center space-y-2 mb-2 lg:mb-auto"></div>
								</div>
							</div>
							<div class="flex flex-grow h-1/3"></div>
						</div>
					</div>
				</Show>
				<Show when={getWindowSize().width <= 1023}>
					<div>NONE</div>
				</Show>
			</div>
		</Show>
	)
}
