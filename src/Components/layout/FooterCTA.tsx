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
			<div class=" py-16">
				<div>
					<FeaturedProducts variant="footer" />
				</div>
			</div>
		</div>
	)
}
