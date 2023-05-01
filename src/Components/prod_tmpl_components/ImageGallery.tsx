import { For } from 'solid-js'

export default function ImageGallery(props: {
	images: { url: string; id: string }[] | undefined
}) {
	const handleScrollTo = (id: string) => {
		const element = document.getElementById(id)
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
				inline: 'nearest'
			})
		}
	}

	return (
		<div class="flex items-start relative">
			<div class="hidden sm:flex flex-col gap-y-4 sticky top-20">
				<For each={props.images}>
					{(image, index) => {
						return (
							<button
								class="h-14 w-12 relative border border-white"
								onClick={() => {
									handleScrollTo(image.id)
								}}
							>
								<span class="sr-only">Go to image {Number(index) + 1}</span>
								<img
									src={image.url}
									class="absolute inset-0"
									alt="Thumbnail"
								/>
							</button>
						)
					}}
				</For>
			</div>
			<div class="flex flex-col flex-1 sm:mx-16 gap-y-4">
				<For each={props.images}>
					{(image, index) => {
						return (
							<div
								class="relative aspect-[29/34] w-full"
								id={image.id}
							>
								<img
									src={image.url}
									class="absolute inset-0"
									alt={`Product image ${Number(index) + 1}`}
								/>
							</div>
						)
					}}
				</For>
			</div>
		</div>
	)
}
