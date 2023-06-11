import { createEffect, createSignal, lazy } from 'solid-js'
import { getWindowSize } from '@solid-primitives/resize-observer'
import { isClient } from '@solid-primitives/utils'

const FeaturedProducts = lazy(() => import('~/Components/layout/FeaturedProducts'))

const [size, setSize] = createSignal(getWindowSize())

export default function FooterCTA() {
	createEffect(() => {
		if (isClient) {
			setSize(getWindowSize())
			size()
		}
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
