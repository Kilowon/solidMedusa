import { Show, createEffect, onMount } from 'solid-js'
import { A } from 'solid-start'
import { isServer } from 'solid-js/web'
import { getWindowSize } from '@solid-primitives/resize-observer'
import {} from '~/Context/Providers'
import { createQuery } from '@tanstack/solid-query'
import clsx from 'clsx'
import { view, setView } from '~/state'
import { Spinner } from '../checkout_components/Spinner'

export function HeroFast() {
	const heroData = createQuery(() => ({
		queryKey: ['hero_data2'],
		queryFn: async function () {
			const bearerToken = import.meta.env.VITE_BEARER_TOKEN
			const response = await fetch(`${import.meta.env.VITE_DIRECTUS_URL}/items/main_hero?fields=*.item.*.*.*`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${bearerToken}`
				}
			})
			const data = await response.json()
			return data
		},

		retry: 0,
		enabled: true,
		deferStream: false
	}))

	onMount(() => {
		setView(getWindowSize().width !== undefined)
	})

	return (
		<Show
			when={heroData.isSuccess && heroData?.data?.data?.show_hero && view()}
			fallback={
				<div class="w-100vw h-100vh flex items-center justify-center">
					<Spinner />
				</div>
			}
		>
			<section
				class={clsx(
					'min-h-90svh xl:min-h-95vh lg:mb-auto lg:mt-auto w-full flex items-center lg:items-initial justify-center flex-col lg:flex-row ',
					heroData?.data?.data?.Hero_infor[0]?.item?.bg_color === 'normal_1' && 'bg-normal_1',
					heroData?.data?.data?.Hero_infor[0]?.item?.bg_color === 'normal_2' && 'bg-normal_2',
					heroData?.data?.data?.Hero_infor[0]?.item?.bg_color === 'normal_3' && 'bg-normal_3',
					heroData?.data?.data?.Hero_infor[0]?.item?.bg_color === 'normal_4' && 'bg-normal_4',
					heroData?.data?.data?.Hero_infor[0]?.item?.bg_color === 'surface' && 'bg-surface',
					heroData?.data?.data?.Hero_infor[0]?.item?.bg_color === 'text_4' && 'bg-text_4',
					heroData?.data?.data?.Hero_infor[0]?.item?.bg_color === 'text_5' && 'bg-text_5',
					heroData?.data?.data?.Hero_infor[0]?.item?.bg_color === 'accent_4' && 'bg-accent_4',
					heroData?.data?.data?.Hero_infor[0]?.item?.bg_color === 'accent_5' && 'bg-accent_5',
					heroData?.data?.data?.Hero_infor[0]?.item?.bg_color === 'accent_6' && 'bg-accent_6',
					heroData?.data?.data?.Hero_infor[0]?.item?.bg_color === 'accent_7' && 'bg-accent_7',
					heroData?.data?.data?.Hero_infor[0]?.item?.bg_color === 'accent_8' && 'bg-accent_8',
					heroData?.data?.data?.Hero_infor[0]?.item?.bg_color === 'accent_9' && 'bg-accent_9',
					heroData?.data?.data?.Hero_infor[0]?.item?.bg_color === 'accent_10' && 'bg-accent_10'
				)}
			>
				<header class="flex flex-col xl:pl-10">
					<div class="flex flex-grow w-full  h-1/3"></div>
					<div class="flex flex-col justify-center  min-h-35svh min-w-25vw lg:min-h-auto ">
						<div
							class={clsx(
								' text-text_2 z-10 flex flex-col  md:max-w-[512px] lg:min-w-[470px] items-center space-y-3 lg:space-y-12 ',
								heroData?.data?.data?.Hero_infor[0]?.item?.text_color === 'normal_1' && 'text-normal_1',
								heroData?.data?.data?.Hero_infor[0]?.item?.text_color === 'normal_2' && 'text-normal_2',
								heroData?.data?.data?.Hero_infor[0]?.item?.text_color === 'normal_3' && 'text-normal_3',
								heroData?.data?.data?.Hero_infor[0]?.item?.text_color === 'normal_4' && 'text-normal_4',
								heroData?.data?.data?.Hero_infor[0]?.item?.text_color === 'surface' && 'text-surface',
								heroData?.data?.data?.Hero_infor[0]?.item?.text_color === 'text_1' && 'text-text_1',
								heroData?.data?.data?.Hero_infor[0]?.item?.text_color === 'text_2' && 'text-text_2',
								heroData?.data?.data?.Hero_infor[0]?.item?.text_color === 'text_3' && 'text-text_3',
								heroData?.data?.data?.Hero_infor[0]?.item?.text_color === 'text_4' && 'text-text_4',
								heroData?.data?.data?.Hero_infor[0]?.item?.text_color === 'text_5' && 'text-text_5',
								heroData?.data?.data?.Hero_infor[0]?.item?.text_color === 'accenttext_1' && 'text-accenttext_1',
								heroData?.data?.data?.Hero_infor[0]?.item?.text_color === 'accenttext_2' && 'text-accenttext_2',
								heroData?.data?.data?.Hero_infor[0]?.item?.text_color === 'accent_4' && 'text-accent_4',
								heroData?.data?.data?.Hero_infor[0]?.item?.text_color === 'accent_5' && 'text-accent_5',
								heroData?.data?.data?.Hero_infor[0]?.item?.text_color === 'accent_6' && 'text-accent_6',
								heroData?.data?.data?.Hero_infor[0]?.item?.text_color === 'accent_7' && 'text-accent_7',
								heroData?.data?.data?.Hero_infor[0]?.item?.text_color === 'accent_8' && 'text-accent_8',
								heroData?.data?.data?.Hero_infor[0]?.item?.text_color === 'accent_9' && 'text-accent_9',
								heroData?.data?.data?.Hero_infor[0]?.item?.text_color === 'accent_10' && 'text-accent_10'
							)}
						>
							<div>
								<div class="flex flex-col items-center justify-center  sm:h-auto  mx-6 md:mx-auto space-y-1">
									<h1 class=" tracking-tighter text-4xl    lg:max-w-auto  sm:text-6xl  font-700 z-2 lg:text-balance text-center text-balance min-w-60 min-h-20 ">
										{heroData?.data?.data?.Hero_infor[0]?.item?.header || ''}
									</h1>
									<h2 class=" tracking-tighter text-xl  text-xl  lg:max-w-auto   sm:text-4xl  font-500 z-2 lg:text-balance  text-center text-balance min-w-40 min-h-10">
										{heroData?.data?.data?.Hero_infor[0]?.item?.subtitle || ''}
									</h2>
								</div>
							</div>
							<div class="flex flex-col items-center justify-center space-y-2 mb-2 lg:mb-auto">
								<div class="flex items-center hover:underline text-xs md:text-sm lg:text-base bg-accent_6 text-accenttext_1 p-2  rounded-1 min-w-30 min-h-8">
									<A
										href={heroData?.data?.data?.Hero_infor[0]?.item?.call_to_action_href || '/store/Store'}
										class="text- z-2 tracking-tight"
									>
										{heroData?.data?.data?.Hero_infor[0]?.item?.call_to_action}
									</A>
								</div>
							</div>
						</div>
					</div>
					<div class="flex flex-grow h-1/3"></div>
				</header>

				<A
					class="  flex flex-col items-center justify-center   lg:h-auto"
					href={heroData?.data?.data?.Hero_infor[0]?.item?.image_href || '/store/Store'}
				>
					<div
						class={clsx(
							'',
							isServer && '',
							getWindowSize().width <= 600 && ' max-w-[375px]',
							getWindowSize().width > 1023 && ' max-w-[1210px] max-h-[765px]',
							getWindowSize().width <= 1023 && ' max-w-[1210px] max-h-[765px]'
						)}
					>
						<img
							src={clsx(
								'',
								getWindowSize().width <= 1023 &&
									`${import.meta.env.VITE_DIRECTUS_URL}/assets/${
										heroData?.data?.data?.Hero_infor[0]?.item?.mobile_image?.id
									}?key=hero-small`,
								isServer && '',
								getWindowSize().width > 1023 &&
									`${import.meta.env.VITE_DIRECTUS_URL}/assets/${
										heroData?.data?.data?.Hero_infor[0]?.item?.image?.id
									}?key=hero-large`
							)}
							width={1210}
							height={765}
							decoding="sync"
							loading="eager"
							fetchpriority="high"
							alt="Hero Image"
							class={clsx(
								'object-cover object-left',

								getWindowSize().width > 1500 && 'w-[1210px] max-h-[765px] min-h-[36rem] aspect-[242/153]',
								getWindowSize().width > 1023 && 'w-[1210px] max-h-[765px] min-h-[36rem] aspect-[242/153]',

								getWindowSize().width <= 1023 && 'min-h-292px'
							)}
						/>
					</div>
					<div class="text-xs lg:text-sm xl:text-base text-text_2 xl:mt-1">
						{heroData?.data?.data?.Hero_infor[0]?.item?.image_tagline}
					</div>
				</A>
			</section>

			{/* <div class="h-5vw w-99svw bg-transparent"></div> */}
		</Show>
	)
}
