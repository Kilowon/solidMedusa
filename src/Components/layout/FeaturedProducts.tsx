import { For } from 'solid-js'
import ProductPreview from '~/Components/nav_components/ProductPreview'
import UnderlineLink from '~/Components/common/Underline-link'

export function FeaturedProducts(props: any) {
	return (
		<div class="py-12 ">
			<div class="content-container py-12 ">
				<div class="flex flex-col items-center text-center mb-16 ">
					<span class="text-base text-gray-600 mb-6">Latest products</span>
					<p class="text-2xl text-gray-900 max-w-lg mb-4">
						Our newest styles are here to help you look your best.
					</p>
					<UnderlineLink href="/store">Explore products</UnderlineLink>
				</div>
				<ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
					<For each={props?.featuredProducts}>
						{product => (
							<li>
								<ProductPreview {...product} />
							</li>
						)}
					</For>
				</ul>
			</div>
		</div>
	)
}
