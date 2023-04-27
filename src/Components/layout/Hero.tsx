import { getWindowSize } from '@solid-primitives/resize-observer'
import { createSignal, createEffect, Show } from 'solid-js'
import { A } from 'solid-start'
import { Image } from '@unpic/solid'

const [size, setSize] = createSignal(getWindowSize())

export function Hero() {
	createEffect(() => {
		setSize(getWindowSize())
		size()
	})

	return (
		<div
			class="h-[100vh] w-full relative 
		"
		>
			<div class="text-white absolute inset-0 z-10 flex flex-col justify-center items-center text-center sm:text-left md:justify-end md:items-start md:p-32 font-poppins">
				<div>w:{size()?.width}px</div>
				<h1 class="text-2xl mb-4 drop-shadow-md shadow-black flex items-baseline">
					Embrace Modern Design with Modern Edge
				</h1>
				<p class="text-base max-w-[32rem] mb-6 drop-shadow-md shadow-black">
					At Modern Edge, we believe that furniture should be as stylish as it is
					functional. That's why we offer a wide range of modern furniture pieces
					that are designed to elevate your space. From sleek sofas to
					statement-making accent chairs, we have everything you need to add a touch
					of modern design to your home. Shop now and embrace the future of furniture
					with Modern Edge.
				</p>
				<div class="flex items-center hover:underline">
					<A
						href="/store/Store"
						class="text-4xl"
					>
						Explore products
					</A>
					<div class="text-5xl">
						<div class="i-material-symbols-arrow-right-alt-rounded" />
					</div>
				</div>
			</div>
			<Show when={size()?.width > 768}>
				<Image
					src="https://res.cloudinary.com/contentdelivery/image/upload/v1682174583/martin-pechy-bpg-ngqrPc8-unsplash_ctefbx.jpg"
					layout="fullWidth"
					priority={true}
					class="object-cover h-full w-full z-0 absolute inset-0  filter brightness-65 animate-fade-in"
					alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
				/>
			</Show>

			<Show when={size()?.width < 768}>
				<Image
					src="https://res.cloudinary.com/contentdelivery/image/upload/v1682276307/MobileHero_uguc1l.webp"
					layout="fullWidth"
					priority={true}
					class="object-cover h-full w-full z-0 absolute inset-0  filter brightness-65 animate-fade-in"
					alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
				/>
			</Show>
		</div>
	)
}
