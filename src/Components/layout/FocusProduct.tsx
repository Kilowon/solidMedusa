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

export default function FocusProduct(props: { item: FeaturedProps['item'] }) {
	const { medusa } = useGlobalContext()

	return (
		<Show when={true}>
			<div
				class="sm:min-h-[800px]  max-w-99svw lg:mb-auto lg:mt-auto  flex flex-col lg:flex-row items-center lg:space-x-8 justify-center my-25 sm:my-50  mx-2 
		"
			>
				<Show when={getWindowSize().width > 1023}>
					<div class="flex ">
						<div class="flex flex-col justify-center space-y-18 min-h-600px">
							<div
								class={clsx(
									'max-w-200px max-h-200px  min-h-200px  flex  justify-center  rounded-3 overflow-hidden',
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
									loading="eager"
									alt="main image"
									class="object-cover object-center min-h-100px z-5 "
								/>
							</div>
							<div
								class={clsx(
									'max-w-200px max-h-200px min-h-200px  flex  justify-center  rounded-3 overflow-hidden',
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
									loading="eager"
									alt="main image"
									class="object-cover object-center min-h-100px z-5 "
								/>
							</div>
						</div>
					</div>
					<div class="flex flex-col ">
						<div class="flex  justify-center  ">
							<div class="text-text_2 z-10 flex flex-col  md:max-w-[520px] lg:min-w-[400px] items-center space-y-3 lg:space-y-12 ">
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
										<p
											class={clsx(
												' tracking-tighter  text-text_4   font-500 z-2  text-start whitespace-pre-line',
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
								<div
									class={clsx(
										' flex flex-col items-center space-y-6',
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
									<div class="flex items-center hover:underline bg-accent_6 text-accenttext_1 p-2  rounded-1 ">
										<A
											href="/store/Store"
											class="text- z-2 tracking-tight"
										>
											{props.item.call_to_action}
										</A>
									</div>
									<div class="font-500 text-text_3  tracking-tighter ">{props.item.price}</div>
								</div>
								<div class="flex flex-col items-center justify-center space-y-2 mb-2 lg:mb-auto"></div>
							</div>
						</div>
					</div>
					<div class="space-x-18 flex ">
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
								class="object-cover object-left min-h-600px z-5"
							/>
						</div>
					</div>
				</Show>
				<Show when={getWindowSize().width <= 1023 && getWindowSize().width > 620}>
					<div class="flex   justify-center mb-8 ">
						<div class="text-text_2 z-10 flex justify-between items-center space-y-3 lg:space-y-12 ">
							<div class="w-60%">
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
									<p
										class={clsx(
											' tracking-tighter  text-text_4   font-500 z-2  text-start whitespace-pre-line',
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
							<div
								class={clsx(
									' flex flex-col items-center space-y-6',
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
								<div class="flex items-center hover:underline bg-accent_6 text-accenttext_1 p-2  rounded-1 ">
									<A
										href="/store/Store"
										class="text- z-2 tracking-tight"
									>
										{props.item.call_to_action}
									</A>
								</div>
								<div class="font-500 text-text_3  tracking-tighter ">{props.item.price}</div>
							</div>
							<div class="flex flex-col items-center justify-center space-y-2 mb-2 lg:mb-auto"></div>
						</div>
					</div>

					<div class="space-x-2 flex ">
						<div class="flex flex-col justify-start space-y-2 ">
							<div
								class={clsx(
									'max-w-200px max-h-200px  min-h-200px  flex  justify-center  rounded-3 overflow-hidden',
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
									loading="eager"
									alt="main image"
									class="object-cover object-center min-h-100px z-5 "
								/>
							</div>
							<div
								class={clsx(
									'max-w-200px max-h-200px min-h-200px  flex  justify-center  rounded-3 overflow-hidden',
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
									loading="eager"
									alt="main image"
									class="object-cover object-center min-h-100px z-5 "
								/>
							</div>
						</div>
						<div
							class={clsx(
								'max-w-600px max-h-600px min-h-400px   flex items-center justify-center overflow-hidden rounded-2 relative ',
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
								class="object-cover object-left min-h-600px z-5"
							/>
						</div>
					</div>
				</Show>
				<Show when={getWindowSize().width <= 620}>
					<div class="flex   justify-center mb-8 ">
						<div class="text-text_2 z-10 flex flex-col justify-between items-center space-y-3 lg:space-y-12 ">
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
									<div
										class={clsx(
											' tracking-tighter text-text_2   font-500 z-2  text-start',
											props.item.text_size_b === 'text-xs' && 'text-xs',
											props.item.text_size_b === 'text-sm' && 'text-sm',
											props.item.text_size_b === 'text-base' && 'text-base',
											props.item.text_size_b === 'text-lg' && 'text-lg'
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
								<p
									class={clsx(
										' tracking-tighter  text-text_4   font-500 z-2  text-start whitespace-pre-line',
										props.item.text_size_b === 'text-xs' && 'text-xs',
										props.item.text_size_b === 'text-sm' && 'text-xs',
										props.item.text_size_b === 'text-base' && 'text-xs',
										props.item.text_size_b === 'text-lg' && 'text-xs'
									)}
								>
									{props.item.description}
								</p>
							</div>
						</div>
					</div>
					<div
						class={clsx(
							' flex flex-row items-center justify-center space-x-6 mb-4',
							props.item.text_size_b === 'text-xs' && 'text-xs',
							props.item.text_size_b === 'text-sm' && 'text-xs',
							props.item.text_size_b === 'text-base' && 'text-xs',
							props.item.text_size_b === 'text-lg' && 'text-xs'
						)}
					>
						<div class="font-500 text-text_3  tracking-tighter ">{props.item.price}</div>
						<div class="flex items-center hover:underline bg-accent_6 text-accenttext_1 p-2  rounded-1 ">
							<A
								href="/store/Store"
								class="text- z-2 tracking-tight"
							>
								{props.item.call_to_action}
							</A>
						</div>
					</div>
					<div class="space-y-2 flex flex-col">
						<div
							class={clsx(
								'  flex items-center justify-center overflow-hidden rounded-2 relative ',
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
								class="object-cover object-left  z-5"
							/>
						</div>{' '}
					</div>
				</Show>
			</div>
		</Show>
	)
}
