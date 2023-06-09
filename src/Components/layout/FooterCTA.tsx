import { createEffect, createSignal } from 'solid-js'
import UnderlineLink from '~/Components/common/Underline-link'
import { getWindowSize } from '@solid-primitives/resize-observer'
import { FeaturedProducts } from '~/Components/layout/FeaturedProducts'

const [size, setSize] = createSignal(getWindowSize())

export function FooterCTA() {
	createEffect(() => {
		setSize(getWindowSize())
		size()
	})
	return (
		<div class="bg-gray-1 w-full">
			<div class="max-w-[1440px] w-full mx-auto px8 flex flex-col-reverse gap-y-8 sm:flex-row sm:items-center justify-between py-16 relative">
				<div>
					<FeaturedProducts variant="footer" />
				</div>
			</div>
		</div>
	)
}
