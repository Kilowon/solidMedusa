import { lazy } from 'solid-js'
import { Transition } from 'solid-transition-group'

const FooterCTA = lazy(() => import('~/Components/layout/FooterCTA'))
const FooterNav = lazy(() => import('~/Components/layout/FooterNav'))
const MECTA = lazy(() => import('~/Components/layout/MECTA'))

export default function Footer() {
	return (
		<footer>
			<Transition
				onEnter={(el, done) => {
					const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
						duration: 300
					})
					a.finished.then(done)
				}}
				onExit={(el, done) => {
					const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
						duration: 200
					})
					a.finished.then(done)
				}}
			>
				<FooterCTA />
			</Transition>
			<FooterNav />
			<MECTA />
		</footer>
	)
}
