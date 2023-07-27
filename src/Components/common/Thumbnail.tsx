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
	bgVariant?: 'default' | 'type_1' | 'type_2' | 'type_3' | 'type_4' | 'type_5' | 'type_6'
}

export function Thumbnail(props: ThumbnailProps) {
	const initialImage = props.thumbnail || props.images?.[0]?.url

	return (
		<div
			class={clsx(
				'',
				props.bgVariant === 'default' && '',
				props.bgVariant === 'type_1' && 'rounded-md bg-surface overflow-hidden',
				props.bgVariant === 'type_2' && 'rounded-t-md bg-surface overflow-hidden border border-normal_4 ',
				props.bgVariant === 'type_3' && 'rounded-t-md bg-surface shadow-sm shadow-text_5/50 shadow-sm shadow-text_5/50',
				props.bgVariant === 'type_4' && 'bg-surface rounded-t-md shadow-md shadow-text_5/50 ',
				props.bgVariant === 'type_5' && 'bg-normal_1 rounded-t-sm border border-normal_4 shadow-sm shadow-text_5/50',
				props.bgVariant === 'type_6' && 'bg-normal_1 rounded-t-md border border-normal_4 shadow-md shadow-text_5/50'
			)}
		>
			<div
				class={clsx(
					'relative aspect-[100/75]  ',
					props.variant === 'default' && 'aspect-[29/34]',
					props.variant === 'tall' && 'aspect-[75/100]',
					props.variant === 'wide' && 'aspect-[100/75]'
				)}
			>
				<div></div>
				<ImageOrPlaceholder
					title={props.title}
					image={initialImage}
					size={props.size}
					variant={props.variant}
				/>
			</div>
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
		<div class={variant === 'default_cart' ? 'w-full' : 'w-full h-full'}>
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
