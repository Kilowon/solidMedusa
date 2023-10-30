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
		Cards_Order: any
	}
}

export default function FocusProductH(props: { item: FeaturedProps['item'] }) {
	const { medusa } = useGlobalContext()

	return (
		<Show when={true}>
			<ol
				class="py-10 max-w-[99svw] flex justify-center px-1
		"
			>
				<li
					class={clsx(
						'grid grid-cols-1  gap-x-8 gap-y-5',
						props.item?.Cards_Order.length === 2 && 'sm:grid-cols-2 lg:grid-cols-2',
						props.item?.Cards_Order.length === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
						props.item?.Cards_Order.length === 4 && 'sm:grid-cols-2 lg:grid-cols-4',
						props.item?.Cards_Order.length === 5 && 'sm:grid-cols-2 lg:grid-cols-3',
						props.item?.Cards_Order.length === 6 && 'sm:grid-cols-2 lg:grid-cols-3',
						props.item?.Cards_Order.length >= 7 && 'sm:grid-cols-2 lg:grid-cols-3'
					)}
				>
					<For each={props.item?.Cards_Order}>
						{item => {
							if (item?.item === null) return
							if (import.meta.env.VITE_DRAFT_SITE === 'false') {
								if (item.item.status === 'draft') return
							}
							if (item.item.status === 'archived') return

							return (
								<div class="snap-start">
									<Show when={item?.item?.type === 'card_a'}>
										<CardA item={item.item} />
									</Show>
									<Show when={item?.item?.type === 'card_b'}>
										<CardB item={item.item} />
									</Show>
									<Show when={item?.item?.type === 'card_c'}>
										<CardC item={item.item} />
									</Show>
									<Show when={item?.item?.type === 'card_d'}>
										<CardD item={item.item} />
									</Show>
								</div>
							)
						}}
					</For>
				</li>
			</ol>
		</Show>
	)
}

export function CardA(props: { item: FeaturedProps['item'] }) {
	return (
		<div
			class={clsx(
				'flex flex-col justify-between  max-w-90 min-w-70 rounded-4 overflow-hidden ',
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
				<div class="flex  justify-start max-w-350px absolute  ">
					<div class="text-text_2 z-10 flex flex-col items-start p-2 relative  ">
						<div>
							<div class="flex flex-col space-y-4">
								<div class="space-y-1">
									<div class={clsx(' tracking-tighter text-text_2 text-sm  font-500 z-2  text-start')}>
										{props.item.sub_title}
									</div>
									<h1
										class={clsx(
											'tracking-tighter text-text_2 font-700 z-2 text-start ',
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
								<div class="flex items-center hover:underline text-sm bg-accent_6 text-accenttext_1 p-2  rounded-1 ">
									<A
										href={props.item?.action_url || '/store/Store'}
										class="text-accenttext_1 z-2 tracking-tight"
									>
										{props.item.call_to_action}
									</A>
								</div>
							</Show>
							<Show when={props.item.price}>
								<div class="font-500 text-text_3 tracking-tighter text-sm ">{props.item.price}</div>
							</Show>
						</div>
						<div class="flex flex-col items-center justify-center space-y-2 mb-2 lg:mb-auto"></div>
					</div>
				</div>
			</div>
			<div class={clsx('max-w-417px max-h-589px flex items-center justify-center overflow-hidden')}>
				<img
					src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${props.item.image}`}
					alt={props.item.title || 'main image'}
					class="object-cover"
				/>
			</div>
		</div>
	)
}

export function CardB(props: { item: FeaturedProps['item'] }) {
	return (
		<div
			class={clsx(
				'flex flex-col   max-w-90 lg:min-w-70  rounded-4 overflow-hidden relative ',
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
			<div class={clsx('max-w-417px max-h-589px flex items-center justify-center overflow-hidden')}>
				<img
					src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${props.item.image}`}
					alt={props.item.title || 'main image'}
					class="object-cover"
				/>
			</div>
			<div class="flex items-center absolute bottom-0 ">
				<div class="text-text_2  z-10 flex flex-row items-center w-85 lg:w-90">
					<div class="lg:w-65%">
						<div class="flex justify-center items-center space-y-4">
							<h1
								class={clsx(
									'tracking-tighter text-text_2 min-w-50% font-700 z-2  text-start pb-1',
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
					<div class="flex flex-col items-center justify-center w-35% ">
						<Show when={props.item.call_to_action}>
							<div class="flex items-center text-sm bg-accent_6 text-accenttext_1 rounded-1 p-2 mb-2">
								<A
									href={props.item?.action_url || '/store/Store'}
									class=" z-2 tracking-tight "
								>
									{props.item.call_to_action}
								</A>
							</div>
							<Show when={props.item.price}>
								<div class="font-500 text-text_3 text-sm tracking-tighter mb-2 ">{props.item.price}</div>
							</Show>
						</Show>
					</div>
				</div>
			</div>
		</div>
	)
}

export function CardC(props: { item: FeaturedProps['item'] }) {
	return (
		<div
			class={clsx(
				'flex flex-col justify-end   max-w-90 min-w-70  rounded-4 overflow-hidden ',
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
				<div class="flex flex-col text-text_2 justify-center items-center absolute ">
					<div class=" z-10 flex flex-col items-center space-y-3 p-4   ">
						<div>
							<div class="flex flex-col space-y-4 max-w-70 lg:max-w-90">
								<Show when={props.item.sub_title}>
									<div class={clsx(' tracking-tighter text-text_2 text-sm  font-500 z-2  text-start')}>
										{props.item.sub_title}
									</div>
								</Show>
								<Show when={props.item.title}>
									<h1
										class={clsx(
											'tracking-tighter text-text_2   font-700 z-2  text-start ',
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
						</div>
					</div>
					<div class="flex  items-center space-x-2">
						<div class="font-500 text-text_3  tracking-tighter  ">{props.item.price}</div>
						<Show when={props.item.call_to_action}>
							<div class="flex items-center hover:underline text-sm bg-accent_6 text-accenttext_1 p-2  rounded-1 ">
								<A
									href={props.item?.action_url || '/store/Store'}
									class="text-sm z-2 tracking-tight"
								>
									{props.item.call_to_action}
								</A>
							</div>
						</Show>
					</div>
				</div>
			</div>
			<div class={clsx('max-w-417px max-h-589px flex items-center justify-center overflow-hidden')}>
				<img
					src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${props.item.image}`}
					alt={props.item.title || 'main image'}
					class="object-cover"
				/>
			</div>
		</div>
	)
}

export function CardD(props: { item: FeaturedProps['item'] }) {
	return (
		<div class={clsx('flex flex-col justify-end   max-w-90 min-w-70  rounded-4 overflow-hidden ')}>
			<div class="flex flex-col relative">
				<div class="flex flex-col text-text_2 justify-center items-center absolute top-110 left-5">
					<div class="flex  items-center space-x-2">
						<Show when={props.item.call_to_action}>
							<div class="flex items-center hover:underline text-sm bg-accent_6 text-accenttext_1 p-2  rounded-1 ">
								<A
									href={props.item?.action_url || '/store/Store'}
									class="text-sm z-2 tracking-tight"
								>
									{props.item.call_to_action}
								</A>
							</div>
						</Show>
					</div>
				</div>
			</div>
			<div class={clsx('max-w-90 flex items-center justify-center overflow-hidden')}>
				<img
					src={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${props.item.image}`}
					alt={props.item.title || 'main image'}
					class="object-cover"
				/>
			</div>
		</div>
	)
}
