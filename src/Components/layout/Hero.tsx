import { useWindowSize } from '@solid-primitives/resize-observer'
import { createEffect, Switch, Match } from 'solid-js'
import { A } from 'solid-start'

const size = useWindowSize()

export function Hero() {
	return (
		<div
			class="h-[90vh] w-full relative 
		"
		>
			<div class="text-white absolute inset-0 z-10 flex flex-col justify-center items-center text-center sm:text-left md:justify-end md:items-start md:p-32">
				<div>w:{size.width}px</div>
				<h1 class="text-2xl mb-4 drop-shadow-md shadow-black">
					Summer styles are finally here
				</h1>
				<p class="text-base max-w-[32rem] mb-6 drop-shadow-md shadow-black">
					This year, our new summer collection will shelter you from the harsh
					elements of a world that doesn&apos;t care if you live or die.
				</p>
				<div>
					<A href="/store" class="text-2xl">
						Explore products
					</A>
					<div class="i-material-symbols-arrow-right-alt-rounded"></div>
				</div>
			</div>
			<Switch fallback={<div>Loading...</div>}>
				{' '}
				TODO: Fix weird loading issue with images
				<Match when={size.width >= 400}>
					<img
						src="https://res.cloudinary.com/contentdelivery/image/upload/c_scale,w_1440,z_1/v1677462156/hero_b4p7fs.webp"
						class="object-cover h-full w-full z-0 absolute inset-0 opacity-90 filter brightness-65 
				"
						alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
					/>
				</Match>
				<Match when={size.width < 400}>
					<img
						src="https://res.cloudinary.com/contentdelivery/image/upload/c_scale,w_600,z_1/v1677462156/hero_b4p7fs.webp"
						class="object-cover h-full w-full z-0 absolute inset-0 opacity-90 filter brightness-65 
				"
						alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
					/>
				</Match>
			</Switch>
		</div>
	)
}
