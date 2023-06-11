import { lazy } from 'solid-js'

const FooterCTA = lazy(() => import('~/Components/layout/FooterCTA'))
const FooterNav = lazy(() => import('~/Components/layout/FooterNav'))
const MECTA = lazy(() => import('~/Components/layout/MECTA'))

export function Footer() {
	return (
		<footer>
			<FooterCTA />
			<FooterNav />
			<MECTA />
		</footer>
	)
}
