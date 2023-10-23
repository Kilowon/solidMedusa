import { createEffect, createSignal, lazy, Suspense } from 'solid-js'
import { getWindowSize } from '@solid-primitives/resize-observer'
import { isClient } from '@solid-primitives/utils'

/* const FeaturedProducts = lazy(() => import('~/Components/layout/FeaturedProducts'))
 */
const [size, setSize] = createSignal(getWindowSize())

export default function FooterCTA() {
	createEffect(() => {
		if (isClient) {
			setSize(getWindowSize())
			size()
		}
	})
	return (
		<div class=" w-full">
			<div class=" ">
				<div>
					{/* <Suspense fallback={<div>FOOTER</div>}>
						<FeaturedProducts variant="footer" />
					</Suspense> */}
				</div>
			</div>
		</div>
	)
}
