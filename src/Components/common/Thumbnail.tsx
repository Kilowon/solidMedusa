import { PlaceholderImage } from '~/Components/common/PlaceholderImage'
import clsx from 'clsx'
import { Image } from '@unpic/solid'

interface MedusaImage {
	url: string
	metadata: Record<string, unknown>
}

export type ThumbnailProps = {
	thumbnail?: string | null
	images?: MedusaImage[] | null
	size?: string | 'small' | 'medium' | 'large' | 'full'
	title?: string | null
	variant?: 'wide' | 'clothing' | 'tall'
}

export function Thumbnail(props: ThumbnailProps) {
	const initialImage = props.thumbnail || props.images?.[0]?.url

	return (
		<div
			class={clsx(
				'relative aspect-[100/75]',
				props.variant === 'clothing' && 'aspect-[29/34]',
				props.variant === 'tall' && 'aspect-[75/100]',
				props.variant === 'wide' && 'aspect-[100/75]'
			)}
		>
			<ImageOrPlaceholder
				title={props.title}
				image={initialImage}
				size={props.size}
			/>
		</div>
	)
}

const ImageOrPlaceholder = ({
	image,
	size,
	title
}: Pick<ThumbnailProps, 'size'> & { image?: string } & Pick<ThumbnailProps, 'title'>) => {
	return image ? (
		<div class="w-full h-full">
			<Image
				src={image}
				height={300}
				width={400}
				alt="Thumbnail"
				class="object-contain w-full h-full"
			/>
		</div>
	) : (
		<div class="w-full h-full absolute inset-0 border-blueGray flex items-center justify-center ">
			<PlaceholderImage title={title} />
		</div>
	)
}

export default Thumbnail
