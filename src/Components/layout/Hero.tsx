import { Show, For, createEffect, createSignal, createMemo, onCleanup } from 'solid-js'
import { A } from 'solid-start'
import { Image } from '@unpic/solid'
import { getWindowSize } from '@solid-primitives/resize-observer'
import { useGlobalContext } from '~/Context/Providers'
import { Motion, Presence } from '@motionone/solid'
import { Rerun } from '@solid-primitives/keyed'

export function Hero() {
	let heroArray = [
		'Design',
		'Living',
		'Creativity',
		'Colors',
		'Material',
		'Lighting',
		'Spaces',
		'Comfort',
		'Collections',
		'Edge'
	]
	let heroImages = [
		'https://res.cloudinary.com/contentdelivery/image/upload/v1688320548/Hero_Couch2_fl2ido.webp',
		'https://res.cloudinary.com/contentdelivery/image/upload/v1688323722/Hero_Couch3_twwlrw.webp',
		'https://res.cloudinary.com/contentdelivery/image/upload/v1688322936/Hero_Couch4_eq2jir.webp',
		'https://res.cloudinary.com/contentdelivery/image/upload/v1688322935/Hero_Couch5_ti5dlt.webp',
		'https://res.cloudinary.com/contentdelivery/image/upload/v1688322935/Hero_Couch6_pgqkmr.webp',
		'https://res.cloudinary.com/contentdelivery/image/upload/v1688327533/Hero_Couch7_an2rap.webp',
		'https://res.cloudinary.com/contentdelivery/image/upload/v1688323722/Hero_Couch8_cwlcr5.webp',
		'https://res.cloudinary.com/contentdelivery/image/upload/v1688322936/Hero_Couch9_r62fmf.webp',
		'https://res.cloudinary.com/contentdelivery/image/upload/v1688322935/Hero_Couch10_hiupk2.webp',
		'https://res.cloudinary.com/contentdelivery/image/upload/v1682174583/martin-pechy-bpg-ngqrPc8-unsplash_ctefbx.jpg'
	]

	const { rootCategories } = useGlobalContext()

	const [currentIndex, setCurrentIndex] = createSignal(0)
	const [count, setCount] = createSignal(1)
	const [imageIndex, setImageIndex] = createSignal(0)
	const [imageCount, setImageCount] = createSignal(0)
	const [time, setTime] = createSignal(5000)
	const [endWait, setEndWait] = createSignal(15000)

	createEffect(() => {
		const timeout = setTimeout(() => {
			const interval = setInterval(() => {
				if (currentIndex() === heroArray.length - 1) {
					setTimeout(() => {
						setCount(p => ++p)
						setCurrentIndex((currentIndex() + 1) % heroArray.length)
					}, endWait())
				}
				if (currentIndex() !== heroArray.length - 1) {
					setCount(p => ++p)
					setCurrentIndex((currentIndex() + 1) % heroArray.length)
				}
			}, time())
		}, 2000)

		onCleanup(() => clearTimeout(timeout))
	})
	createEffect(() => {
		const timeout = setTimeout(() => {
			const interval = setInterval(() => {
				if (imageIndex() === heroImages.length - 1) {
					setTimeout(() => {
						setImageCount(p => ++p)
						setImageIndex((imageIndex() + 1) % heroImages.length)
					}, endWait())
				}
				if (imageIndex() !== heroImages.length - 1) {
					setImageCount(p => ++p)
					setImageIndex((imageIndex() + 1) % heroImages.length)
				}
			}, time())
		}, 2000)

		onCleanup(() => clearTimeout(timeout))
	})

	return (
		<div
			class="h-[100svh] w-full top-0 left-0 z-0 bg-cover bg-center bg-no-repeat flex items-center md:items-end
		"
		>
			<Presence initial>
				<Show when={rootCategories()}>
					<div class="text-white z-10 flex flex-col items-start mb-20 md:ml-10">
						<Show when={true}>
							<div class="flex justify-between sm:block w-full px-10 sm:px-0">
								<Show when={getWindowSize().width > 768}>
									<Motion.div
										animate={{ opacity: [0, 1], x: [-1000, 0], transition: { duration: 1.5, easing: 'ease-out' } }}
										exit={{ opacity: 0, y: [0, 150], transition: { duration: 0.5 } }}
									>
										<div class="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 lg:space-x-6 mb-5">
											<For each={rootCategories()}>
												{(category, index) => {
													if (index() >= 4) return
													return (
														<A
															href={`/categories/${category?.handle}`}
															class="text-base sm:text-xl xl:text-4xl z-2 tracking-tight cursor-pointer tracking-tight p-1 capitalize hover:text-blue-3"
														>
															{category?.name}
														</A>
													)
												}}
											</For>
										</div>
									</Motion.div>
								</Show>
								<Show when={getWindowSize().width < 768}>
									<div class="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 lg:space-x-6 mb-5">
										<For each={rootCategories()}>
											{(category, index) => {
												if (index() >= 4) return
												return (
													<Motion.div
														animate={{
															opacity: [0, 1],
															x: [-1500, 0],
															transition: { duration: 2 + (index() - 4) * 0.1, easing: 'ease-out' }
														}}
														exit={{ opacity: 0, y: [0, 150], transition: { duration: 0.5 } }}
													>
														<A
															href={`/categories/${category?.handle}`}
															class="text-base sm:text-xl xl:text-4xl z-2 tracking-tight cursor-pointer tracking-tight p-1 capitalize"
														>
															{category?.name}
														</A>
													</Motion.div>
												)
											}}
										</For>
									</div>
								</Show>
								<Show when={getWindowSize().width > 768}>
									<Motion.div
										animate={{ opacity: [0, 1], x: [-1500, 0], transition: { duration: 2, easing: 'ease-out' } }}
										exit={{ opacity: 0, y: [0, 150], transition: { duration: 0.5 } }}
									>
										<div class="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 lg:space-x-6 mb-5 ">
											<For each={rootCategories()}>
												{(category, index) => {
													if (index() < 4 || index() >= 8) return
													return (
														<A
															href={`/categories/${category?.handle}`}
															class="text-base sm:text-xl xl:text-4xl z-2 tracking-tight cursor-pointer tracking-tight p-1 capitalize hover:text-blue-3"
														>
															{category?.name}
														</A>
													)
												}}
											</For>
										</div>
									</Motion.div>
								</Show>
								<Show when={getWindowSize().width < 768}>
									<div class="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 lg:space-x-6 mb-5">
										<For each={rootCategories()}>
											{(category, index) => {
												if (index() < 4 || index() >= 8) return
												return (
													<Motion.div
														animate={{
															opacity: [0, 1],
															x: [1500, 0],
															transition: { duration: 2 + (index() - 4) * 0.1, easing: 'ease-out' }
														}}
														exit={{ opacity: 0, y: [0, 150], transition: { duration: 0.5 } }}
													>
														<A
															href={`/categories/${category?.handle}`}
															class="text-base sm:text-xl xl:text-4xl z-2 tracking-tight cursor-pointer tracking-tight p-1 capitalize"
														>
															{category?.name}
														</A>
													</Motion.div>
												)
											}}
										</For>
									</div>
								</Show>
							</div>
						</Show>
						<Motion.div
							animate={{ opacity: [0, 1], x: [-2000, 0], transition: { duration: 2.5, easing: 'ease-out' } }}
							exit={{ opacity: 0, y: [0, 150], transition: { duration: 0.5 } }}
						>
							<div class="flex flex-col sm:flex-row sm:space-x-6.5">
								<h1 class="tracking-tighter text-6xl md:text-6xl lg:text-7xl xl:text-9xl drop-shadow-md shadow-black font-poppins font-400 z-2">
									Embrace Modern
								</h1>
								<Show when={getWindowSize().width > 768}>
									<Presence
										initial={false}
										exitBeforeEnter
									>
										<Rerun on={count()}>
											<Motion.div
												animate={{ opacity: [1, 0, 1], y: [-300, 0], transition: { duration: 1.75 } }}
												exit={{ opacity: 0, y: [0, 150], transition: { duration: 0.5, easing: 'ease-out' } }}
											>
												<h1 class="tracking-tighter text-6xl md:text-6xl lg:text-7xl xl:text-9xl mb-4 drop-shadow-md shadow-black font-700 text-blue-3 z-2 absolute">{`${
													heroArray[currentIndex()]
												}`}</h1>
											</Motion.div>
										</Rerun>
									</Presence>
								</Show>
								<Show when={getWindowSize().width < 768}>
									<Presence
										initial={true}
										exitBeforeEnter
									>
										<Rerun on={count()}>
											<Motion.div
												initial={{ opacity: 1, x: 0, transition: { duration: 0 } }}
												animate={{ opacity: [0, 0, 0, 1], x: [-100, 0], transition: { duration: 1, easing: 'ease-out' } }}
												exit={{ opacity: 0, x: [0, 300], transition: { duration: 0.5 } }}
											>
												<h1 class="tracking-tighter text-6xl md:text-6xl lg:text-7xl xl:text-9xl mb-4 drop-shadow-md shadow-black font-400 z-2">{`${
													heroArray[currentIndex()]
												}`}</h1>
											</Motion.div>
										</Rerun>
									</Presence>
								</Show>
							</div>
						</Motion.div>
						<Motion.div
							animate={{ opacity: [0, 1], x: [-2500, 0], transition: { duration: 2, easing: 'ease-out' } }}
							exit={{ opacity: 0, y: [0, 150], transition: { duration: 0.5 } }}
						>
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
						</Motion.div>
					</div>
				</Show>
			</Presence>
			<Show when={getWindowSize().width > 768}>
				<div class="hidden">
					<Image
						src={heroImages[(imageIndex() + 1) % heroImages.length]}
						layout="fullWidth"
						priority={true}
						class="object-cover object-right md:object-center h-full w-full z--10 absolute inset-0  filter brightness-65"
						alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
					/>
				</div>
				<Presence>
					<Rerun on={imageCount()}>
						<Motion.div
							animate={{ opacity: [0.3, 1], transition: { duration: 1.0 } }}
							exit={{ opacity: 0, transition: { duration: 0.5 } }}
						>
							<Image
								src={heroImages[imageIndex()]}
								layout="fullWidth"
								priority={true}
								class="object-cover object-right md:object-center h-full w-full z--10 absolute inset-0  filter brightness-65"
								alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
							/>
						</Motion.div>
					</Rerun>
				</Presence>
			</Show>
			<Show when={getWindowSize().width < 768}>
				<div class="hidden">
					<Image
						src={heroImages[(imageIndex() + 1) % heroImages.length]}
						layout="fullWidth"
						priority={true}
						class="object-cover object-right md:object-center h-full w-full z--10 absolute inset-0  filter brightness-65"
						alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
					/>
				</div>
				<Presence>
					<Rerun on={imageCount()}>
						<Motion.div
							animate={{ opacity: [0.3, 1], transition: { duration: 1.0 } }}
							exit={{ opacity: 0, transition: { duration: 0.5 } }}
						>
							<Image
								src={heroImages[imageIndex()]}
								layout="fullWidth"
								priority={true}
								class="object-cover object-right md:object-center h-full w-full z--10 absolute inset-0  filter brightness-65"
								alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
							/>
						</Motion.div>
					</Rerun>
				</Presence>
			</Show>
		</div>
	)
}
