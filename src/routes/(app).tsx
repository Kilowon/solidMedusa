import { lazy, Suspense } from 'solid-js'
import { Outlet } from 'solid-start'

const Navigation = lazy(() => import('~/Components/layout/Navigation'))
const Footer = lazy(() => import('~/Components/layout/Footer'))

// App.tsx
export default function Home() {
	return (
		<div>
			<Suspense>
				<Navigation />
			</Suspense>
			<Outlet />
			<Suspense>
				<Footer />
			</Suspense>
		</div>
	)
}
