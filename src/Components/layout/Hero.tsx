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
			class="h-[100vh] w-full top-0 left-0 z-0 bg-cover bg-center bg-no-repeat 
		"
		>
			<div class="text-white absolute inset-0 z-10 flex flex-col  items-center text-center sm:text-left md:justify-end md:items-start md:p-32 font-poppins">
				<span>
					<div class="relative block md:hidden mt-[20vh]">
						<Image
							src="https://res.cloudinary.com/contentdelivery/image/upload/v1684413389/couch_npht3q.webp"
							width={100}
							height={100}
							alt="couch"
						/>
						<div class="absolute text-white top-6 right-3.5 z-15 text-2xl font-bold font-poppins ">ME</div>
						<h1 class=" absolute top-17 left--17 w-300% text-xl md:text-2xl drop-shadow-md shadow-black flex items-baseline font-poppins">
							Embrace Modern Design
						</h1>
					</div>
				</span>
				<h1 class="hidden  text-xl md:text-6xl lg:text-7xl xl:text-9xl mb-4 drop-shadow-md shadow-black md:flex items-baseline font-poppins">
					Embrace Modern Design
				</h1>
				<div class="flex items-center hover:underline">
					<A
						href="/store/Store"
						class="text-xl md:text-4xl"
					>
						Explore products
					</A>
					<div class="text-xl md:text-5xl">
						<div class="i-material-symbols-arrow-right-alt-rounded" />
					</div>
				</div>
			</div>

			<Image
				src="https://res.cloudinary.com/contentdelivery/image/upload/v1682174583/martin-pechy-bpg-ngqrPc8-unsplash_ctefbx.jpg"
				layout="fullWidth"
				priority={true}
				class="object-cover object-right md:object-center h-full w-full z-0 absolute inset-0  filter brightness-65 animate-fade-in"
				alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
			/>
		</div>
	)
}
