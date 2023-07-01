import { createSignal } from 'solid-js'
import { A } from 'solid-start'
import { Image } from '@unpic/solid'
import { getWindowSize } from '@solid-primitives/resize-observer'
import { useGlobalContext } from '~/Context/Providers'

export function Hero() {
	const { rootCategories } = useGlobalContext()
	let windowSize = getWindowSize()

	let categories = rootCategories()

	let isLargeScreen = windowSize.width > 768

	return (
		<div class="h-[100svh] w-full top-0 left-0 z-0 bg-cover bg-center bg-no-repeat flex items-center md:items-end">
			<div class="text-white z-10 flex flex-col items-start mb-20 md:ml-10">
				<div class="flex justify-between sm:block w-full px-10 sm:px-0">
					<div class="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 lg:space-x-6 mb-5">
						{categories.slice(0, 4).map((category: any, index: number) => (
							<A
								href={`/categories/${category?.handle}`}
								class="text-base sm:text-xl xl:text-4xl z-2 tracking-tight cursor-pointer tracking-tight p-1 capitalize"
							>
								{category?.name}
							</A>
						))}
					</div>
					<div class="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 lg:space-x-6 mb-5">
						{categories.slice(4, 8).map((category: any, index: number) => (
							<A
								href={`/categories/${category?.handle}`}
								class="text-base sm:text-xl xl:text-4xl z-2 tracking-tight cursor-pointer tracking-tight p-1 capitalize"
							>
								{category?.name}
							</A>
						))}
					</div>
				</div>
				<h1 class="tracking-tighter text-6xl md:text-6xl lg:text-7xl xl:text-9xl mb-4 drop-shadow-md shadow-black font-poppins font-400 z-2">
					Embrace Modern Design
				</h1>
				<div class="flex items-center hover:underline">
					<A
						href="/store/Store"
						class="text-base sm:text-xl xl:text-4xl z-2 tracking-tight"
					>
						Explore our entire selection
					</A>
					<div class="text-xl md:text-5xl">
						<div class="i-material-symbols-arrow-right-alt-rounded" />
					</div>
				</div>
			</div>
			{isLargeScreen ? (
				<Image
					src="https://res.cloudinary.com/contentdelivery/image/upload/v1682174583/martin-pechy-bpg-ngqrPc8-unsplash_ctefbx.jpg"
					layout="fullWidth"
					priority={true}
					class="object-cover object-right md:object-center h-full w-full z--10 absolute inset-0 filter brightness-65"
					alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
				/>
			) : (
				<Image
					src="https://res.cloudinary.com/contentdelivery/image/upload/v1682276307/MobileHero_uguc1l.webp"
					width={windowSize.width}
					height={windowSize.height}
					priority={true}
					class="object-cover object-right md:object-center h-full w-full z-0 absolute inset-0 filter brightness-65"
					alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
				/>
			)}
		</div>
	)
}
