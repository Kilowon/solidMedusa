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
	variant?: 'wide' | 'default' | 'tall' | 'default_cart'
}

export function Thumbnail(props: ThumbnailProps) {
	const initialImage = props.thumbnail || props.images?.[0]?.url

	return (
		<div
			class={clsx(
				'relative aspect-[100/75]',
				props.variant === 'default' && 'aspect-[29/34]',
				props.variant === 'tall' && 'aspect-[75/100]',
				props.variant === 'wide' && 'aspect-[100/75]'
			)}
		>
			<ImageOrPlaceholder
				title={props.title}
				image={initialImage}
				size={props.size}
				variant={props.variant}
			/>
		</div>
	)
}

const ImageOrPlaceholder = ({
	image,
	size,
	title,
	variant
}: Pick<ThumbnailProps, 'size'> & { image?: string } & Pick<ThumbnailProps, 'title'> &
	Pick<ThumbnailProps, 'variant'>) => {
	return image ? (
		<div class="w-full h-full">
			<Image
				src={image}
				height={variant === 'default_cart' ? 100 : 422}
				width={variant === 'default_cart' ? 84 : 360}
				alt="Thumbnail"
				class={variant === 'default_cart' ? 'object-contain w-full h-full' : 'object-cover w-full h-full'}
			/>
		</div>
	) : (
		<div class="w-full  absolute inset-0 border-blueGray flex items-center justify-center ">
			<PlaceholderImage title={title} />
		</div>
	)
}

export default Thumbnail
