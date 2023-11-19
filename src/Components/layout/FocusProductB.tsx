import { Show, For } from 'solid-js'
import { A } from 'solid-start'
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
		sub_title_3: string
		action_url: string
		action_url_2: string
		action_url_3: string
		tags: string[]
		tags_3: string[]
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

		text_size_c:
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

export default function FocusProductB(props: { item: FeaturedProps['item'] }) {
	const { medusa } = useGlobalContext()

	return (
		<Show when={true}>
			<section
				class="xl:py-10 max-w-[99svw] lg:mb-auto lg:mt-auto  flex items-center  md:justify-center flex-col lg:flex-row space-y-8 lg:space-y-auto lg:space-x-8 mx-2 my-25 sm:my-50 lg:my-auto 
		"
			>
				<Show when={true}>
					{/* //One */}
					<div
						class={clsx(
							'flex flex-col justify-between  max-h-600px min-h-600px rounded-2 overflow-hidden ',
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
						<div class="flex flex-col ">
							<div class="flex  justify-start max-w-350px  ">
								<div class="text-text_2 z-10 flex flex-col items-start space-y-3 p-4 relative  ">
									<div>
										<div class="flex flex-col space-y-4">
											<div class="space-y-1">
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
												<div class={clsx(' tracking-tighter text-text_2 text-base  font-500 z-2  text-start')}>
													{props.item.sub_title}
												</div>
												<h1
													class={clsx(
														'tracking-tighter text-text_2 text-balance  font-700 z-2  text-start ',
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
										</div>
									</div>
									<div class="flex flex-col items-center space-y-2 absolute bottom--15">
										<Show when={props.item.call_to_action}>
											<div class="flex items-center hover:underline text-xs  bg-accent_6 text-accenttext_1 p-1.5  rounded-1 ">
												<A
													href={props.item?.action_url || '/store/Store'}
													class=" z-2 tracking-tight"
												>
													{props.item.call_to_action}
												</A>
											</div>
										</Show>
										<Show when={props.item.price}>
											<div class="font-500 text-sm text-text_3 tracking-tighter  ">{props.item.price}</div>
										</Show>
									</div>
									<div class="flex flex-col items-center justify-center space-y-2 mb-2 lg:mb-auto"></div>
								</div>
							</div>
						</div>
						<div class={clsx('max-w-430px max-h-340px  aspect-[23/17] flex items-center justify-center overflow-hidden')}>
							<img
								src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${props.item.image?.id}?key=focus-product-b`}
								height={600}
								width={600}
								alt={props.item.title || 'main image'}
								class="object-cover "
								loading="lazy"
							/>
						</div>
					</div>
					{/* //Two */}
					<div
						class={clsx(
							'flex flex-col   min-h-600px rounded-2 overflow-hidden ',
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
						<div class={clsx('max-w-430px max-h-340px  aspect-[23/17] flex items-center justify-center   overflow-hidden')}>
							<img
								src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${props.item.image_2?.id}?key=focus-product-b`}
								loading="lazy"
								alt="main image"
								class=" object-fill "
							/>
						</div>
						<div class="min-h-260px flex items-center">
							<div class="text-text_2 z-10 flex flex-col sm:flex-row items-center  space-y-3 max-w-410px p-2 relative">
								<div class="w-70%">
									<div class="flex space-y-4">
										<div class="space-y-1">
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

											<h1
												class={clsx(
													'tracking-tighter text-text_2 text-balance   font-700 z-2  text-start pl-1',
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
												{props.item.title_2}
											</h1>
										</div>
									</div>
								</div>
								<div class="flex flex-col items-center justify-center space-y-2 sm:w-40% sm:absolute sm:right-0 sm:top-0">
									<Show when={props.item.price_2}>
										<div class="font-500 text-text_3 text-sm  tracking-tighter  ">{props.item.price_2}</div>
									</Show>
									<Show when={props.item.call_to_action_2}>
										<div class="flex items-center hover:underline text-xs   bg-accent_6 text-accenttext_1 p-1.5  rounded-1 ">
											<A
												href={props.item?.action_url_2 || '/store/Store'}
												class=" z-2 tracking-tight "
											>
												{props.item.call_to_action_2}
											</A>
										</div>
									</Show>
								</div>
							</div>
						</div>
					</div>
					{/* //Three */}
					<div
						class={clsx(
							'flex flex-col justify-end  max-h-600px min-h-600px rounded-2 overflow-hidden ',
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
						<div class="flex flex-col ">
							<div class="flex  text-text_2 justify-center items-center max-w-420px min-h-260px  relative ">
								<div class=" z-10 flex flex-col items-center space-y-3 p-4   ">
									<div>
										<div class="flex flex-col space-y-4">
											<div class="space-y-1">
												<Show when={props.item.tags_3?.length > 0}>
													<ul class="flex space-x-2">
														<For each={props.item.tags_3}>
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
												<Show when={props.item.sub_title_3}>
													<div class={clsx(' tracking-tighter text-text_2 text-base  font-500 z-2  text-start')}>
														{props.item.sub_title_3}
													</div>
												</Show>
												<Show when={props.item.title_3}>
													<h1
														class={clsx(
															'tracking-tighter text-balance text-text_2   font-700 z-2  text-start ',
															props.item.text_size_c === 'text-xs' && 'text-xs',
															props.item.text_size_c === 'text-sm' && 'text-sm',
															props.item.text_size_c === 'text-base' && 'text-base',
															props.item.text_size_c === 'text-lg' && 'text-lg',
															props.item.text_size_c === 'text-xl' && 'text-xl',
															props.item.text_size_c === 'text-2xl' && 'text-2xl',
															props.item.text_size_c === 'text-3xl' && 'text-3xl',
															props.item.text_size_c === 'text-4xl' && 'text-4xl',
															props.item.text_size_c === 'text-5xl' && 'text-5xl',
															props.item.text_size_c === 'text-6xl' && 'text-6xl',
															props.item.text_size_c === 'text-7xl' && 'text-7xl',
															props.item.text_size_c === 'text-8xl' && 'text-8xl'
														)}
													>
														{props.item.title_3}
													</h1>
												</Show>
											</div>
										</div>
									</div>
									<div class="flex flex-col items-center justify-center space-y-2 mb-2 lg:mb-auto"></div>
								</div>
								<div class="flex  items-center space-x-2 absolute bottom-0">
									<div class="font-500 text-text_3  tracking-tighter text-sm  ">{props.item.price_3}</div>
									<Show when={props.item.call_to_action_3}>
										<div class="flex items-center hover:underline text-xs  bg-accent_6 text-accenttext_1 p-1.5  rounded-1 ">
											<A
												href={props.item?.action_url_3 || '/store/Store'}
												class="text- z-2 tracking-tight"
											>
												{props.item.call_to_action_3}
											</A>
										</div>
									</Show>
								</div>
							</div>
						</div>
						<div class={clsx('max-w-430px max-h-340px  aspect-[23/17] flex items-center justify-center   overflow-hidden')}>
							<img
								src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${props.item.image_3?.id}?key=focus-product-b`}
								height={600}
								width={600}
								alt={props.item.title || 'main image'}
								class="object-cover"
								loading="lazy"
							/>
						</div>
					</div>
				</Show>
			</section>
		</Show>
	)
}
