import { Hero } from '~/Components/layout/Hero'
import { lazy, Suspense } from 'solid-js'

const FeaturedProducts = lazy(() => import('~/Components/layout/FeaturedProducts'))

export default function App() {
	return (
		<main>
			<Hero />
			<div class="my-16">
				<Suspense>
					<FeaturedProducts variant="hero" />
				</Suspense>
			</div>
		</main>
	)
}
