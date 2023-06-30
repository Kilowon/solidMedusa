import { Show, For, createEffect } from 'solid-js'
import { A } from 'solid-start'
import { Image } from '@unpic/solid'
import { getWindowSize } from '@solid-primitives/resize-observer'
import { useGlobalContext } from '~/Context/Providers'

export function Hero() {
	const { rootCategories } = useGlobalContext()

	createEffect(() => {
		getWindowSize().width
	})

	return (
		<div
			class="h-[100svh] w-full top-0 left-0 z-0 bg-cover bg-center bg-no-repeat flex items-center md:items-end
		"
		>
			<Show when={true}>
				<div class="text-white z-10 flex flex-col items-start mb-20 md:ml-10">
					<Show when={true}>
						<div class="flex justify-between sm:block w-full px-10 sm:px-0">
							<div class="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 lg:space-x-6 mb-5">
								<For each={rootCategories()}>
									{(category, index) => {
										if (index() >= 4) return
										return (
											<A
												href={`/categories/${category?.handle}`}
												class="text-base sm:text-xl xl:text-4xl z-2 tracking-tight cursor-pointer tracking-tight p-1 capitalize"
											>
												{category?.name}
											</A>
										)
									}}
								</For>
							</div>
							<div class="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 lg:space-x-6 mb-5">
								<For each={rootCategories()}>
									{(category, index) => {
										if (index() < 4 || index() >= 8) return
										return (
											<A
												href={`/categories/${category?.handle}`}
												class="text-base sm:text-xl xl:text-4xl z-2 tracking-tight cursor-pointer tracking-tight p-1 capitalize"
											>
												{category?.name}
											</A>
										)
									}}
								</For>
							</div>
						</div>
					</Show>
					<h1 class="tracking-tighter text-6xl md:text-6xl lg:text-7xl xl:text-9xl mb-4 drop-shadow-md shadow-black  font-poppins font-400 z-2">
						Embrace Modern Design
					</h1>
					<div class="flex items-center hover:underline">
						<A
							href="/store/Store"
							class="text-base sm:text-xl xl:text-4xl z-2 tracking-tight"
						>
							Explore products
						</A>
						<div class="text-xl md:text-5xl">
							<div class="i-material-symbols-arrow-right-alt-rounded" />
						</div>
					</div>
				</div>
			</Show>
			<Show when={getWindowSize().width > 768}>
				<Image
					src="https://res.cloudinary.com/contentdelivery/image/upload/v1682174583/martin-pechy-bpg-ngqrPc8-unsplash_ctefbx.jpg"
					layout="fullWidth"
					priority={true}
					class="object-cover object-right md:object-center h-full w-full z--10 absolute inset-0  filter brightness-65"
					alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
				/>
			</Show>
			<Show when={getWindowSize().width < 768}>
				<Image
					src="https://res.cloudinary.com/contentdelivery/image/upload/v1682276307/MobileHero_uguc1l.webp"
					width={getWindowSize().width}
					height={getWindowSize().height}
					priority={true}
					class="object-cover object-right md:object-center h-full w-full z-0 absolute inset-0  filter brightness-65"
					alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
				/>
			</Show>
		</div>
	)
}
