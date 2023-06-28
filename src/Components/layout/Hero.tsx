import { Show, Suspense, createEffect } from 'solid-js'
import { A } from 'solid-start'
import { Image } from '@unpic/solid'
import { getWindowSize } from '@solid-primitives/resize-observer'
import { create } from 'domain'

export function Hero() {
	createEffect(() => {
		getWindowSize().width
	})

	return (
		<div
			class="h-[100svh] w-full top-0 left-0 z-0 bg-cover bg-center bg-no-repeat 
		"
		>
			<Show when={getWindowSize().width > 768}>
				<div class="text-white absolute inset-0 z-10 flex flex-col  items-center text-center sm:text-left md:justify-end md:items-start md:p-32 font-poppins">
					{/* 	
					<h1 class="hidden  text-xl md:text-6xl lg:text-7xl xl:text-9xl mb-4 drop-shadow-md shadow-black md:flex items-baseline font-poppins font-400 z-2">
						Embrace Modern Design
					</h1>
					<div class="flex items-center hover:underline">
						<A
							href="/store/Store"
							class="text-xl md:text-4xl z-2"
						>
							Explore products
						</A>
						<div class="text-xl md:text-5xl">
							<div class="i-material-symbols-arrow-right-alt-rounded" />
						</div>
					</div> */}
				</div>
			</Show>
			<Show when={getWindowSize().width > 768}>
				<Image
					src="https://res.cloudinary.com/contentdelivery/image/upload/v1682174583/martin-pechy-bpg-ngqrPc8-unsplash_ctefbx.jpg"
					layout="fullWidth"
					priority={true}
					class="object-cover object-right md:object-center h-full w-full z-0 absolute inset-0  filter brightness-65"
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
