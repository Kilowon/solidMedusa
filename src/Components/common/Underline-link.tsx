import { A } from 'solid-start'

type UnderlineLinkProps = {
	href: string
	children: any
}

export default function UnderlineLink({ href, children }: UnderlineLinkProps) {
	return (
		<div class="flex items-start">
			<A
				href={href}
				class="flex items-center text-large-regular border-b border-current gap-x-4 py-2 transition-all duration-300 group hover:pl-4 hover:pr-1"
			>
				<span>{children}</span>
				<div class="i-material-symbols-arrow-right-alt-rounded"></div>
			</A>
		</div>
	)
}
