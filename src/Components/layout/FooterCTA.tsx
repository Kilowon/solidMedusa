import { Switch, Match, createEffect, createSignal } from 'solid-js'
import { useWindowSize } from '@solid-primitives/resize-observer'
import UnderlineLink from '~/Components/common/Underline-link'
import { getWindowSize } from '@solid-primitives/resize-observer'
import { Image } from '@unpic/solid'

const [size, setSize] = createSignal(getWindowSize())

export function FooterCTA() {
	createEffect(() => {
		setSize(getWindowSize())
		size()
	})
	return (
		<div class="bg-amber-100 w-full">
			<div class="max-w-[1440px] w-full mx-auto px8 flex flex-col-reverse gap-y-8 sm:flex-row sm:items-center justify-between py-16 relative">
				<div>
					<div class="text-2xl">Shop the latest styles</div>
					<div class="mt-6">
						<UnderlineLink href="/store">Explore products</UnderlineLink>
					</div>
				</div>
				<div class="relative w-full aspect-square sm:w-[35%] sm:aspect-[28/36]">
					<Image
						src="https://res.cloudinary.com/contentdelivery/image/upload/v1677462424/cta_three_voqqzi.jpeg"
						layout="constrained"
						width={600}
						height={600}
						class="absolute inset-0 w-full h-full object-cover "
						alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
					/>
				</div>
			</div>
		</div>
	)
}
