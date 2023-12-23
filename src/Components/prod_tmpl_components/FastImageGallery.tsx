import { Show } from 'solid-js'
import { Transition } from 'solid-transition-group'

export default function FastImageGallery(props: {
	images: { url: string; id: string }[] | undefined
	productInfo: any | undefined
	params: any
}) {
	return (
		<div>
			{/* this is a preloader to prevent the slider issues with initial load */}

			<Show
				when={props.images && props.images?.length > 0}
				fallback={<div class=" min-h-900px flex pt-70 justify-center">Loading</div>}
			>
				<div class=" lg:flex lg:min-w-200 lg:max-w-800px lg:mx-8">
					<img
						src={`${props.images && props.images[0]?.url}`}
						height={765}
						decoding="sync"
						loading="eager"
						fetchpriority="high"
						alt="Hero Image"
					/>
				</div>
			</Show>
		</div>
	)
}
