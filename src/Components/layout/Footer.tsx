import { lazy, For } from 'solid-js'
import { Transition } from 'solid-transition-group'
import { A } from 'solid-start'

const FooterNav = lazy(() => import('~/Components/layout/FooterNav'))

export default function Footer() {
	return (
		<footer>
			<FooterNav />
		</footer>
	)
}
