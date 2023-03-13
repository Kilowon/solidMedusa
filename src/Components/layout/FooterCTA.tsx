import { Switch, Match } from 'solid-js'
import { useWindowSize } from '@solid-primitives/resize-observer'
import UnderlineLink from '~/Components/common/Underline-link'

const size = useWindowSize()

export function FooterCTA() {
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
					<Switch fallback={<div>Loading...</div>}>
						<Match when={size.width < 400}>
							<img
								src="https://res.cloudinary.com/contentdelivery/image/upload/c_scale,w_440/v1677462424/cta_three_voqqzi.webp"
								alt=""
								class="absolute inset-0 w-full h-full object-cover sm:invisible"
							/>
						</Match>
						<Match when={size.width >= 400}>
							<img
								src="https://res.cloudinary.com/contentdelivery/image/upload/c_scale,w_840/v1677462424/cta_three_voqqzi.webp"
								alt=""
								class="absolute inset-0 w-full h-full object-cover invisible sm:visible"
							/>
						</Match>
					</Switch>
				</div>
			</div>
		</div>
	)
}
