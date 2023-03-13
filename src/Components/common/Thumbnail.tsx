import { Image as MedusaImage } from '@medusajs/medusa'
import { PlaceholderImage } from '~/Components/common/PlaceholderImage'
import clsx from 'clsx'

export type ThumbnailProps = {
	thumbnail?: string | null
	images?: MedusaImage[] | null
	size?: string | 'small' | 'medium' | 'large' | 'full'
	title?: string | null
}

export function Thumbnail({
	thumbnail,
	images,
	size = 'small',
	title
}: ThumbnailProps) {
	const initialImage = thumbnail || images?.[0]?.url

	return (
		<div
			class={clsx('relative aspect-[29/34]', {
				'w-[180px]': size === 'small',
				'w-[290px]': size === 'medium',
				'w-[440px]': size === 'large',
				'w-full': size === 'full'
			})}
		>
			<ImageOrPlaceholder title={title} image={initialImage} size={size} />
		</div>
	)
}

const ImageOrPlaceholder = ({
	image,
	size,
	title
}: Pick<ThumbnailProps, 'size'> & { image?: string } & Pick<
		ThumbnailProps,
		'title'
	>) => {
	return image ? (
		<div class="w-full h-full absolute inset-0 bg-gray-100 flex items-center justify-center overflow-hidden ">
			<img src={image} alt="Thumbnail" />
		</div>
	) : (
		<div class="w-full h-full absolute inset-0 bg-gray-100 flex items-center justify-center ">
			<PlaceholderImage title={title} />
		</div>
	)
}

export default Thumbnail
