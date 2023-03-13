import { FooterCTA } from './FooterCTA'
import { FooterNav } from './FooterNav'
import { MedusaCTA } from './MedusaCTA'

export function Footer() {
	return (
		<footer class="bg-gradient-to-l from-blue-5 to-purple-5">
			<FooterCTA />
			<FooterNav />
			<MedusaCTA />
		</footer>
	)
}
