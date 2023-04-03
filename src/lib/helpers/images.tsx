import cloudinary from 'cloudinary'

interface Props {
	image: {
		public_id: string
		contentType?: string
		description?: string
		width?: number
		height?: number
		class?: string
	}
}

function ResponsiveImage({ image }: Props) {
	const { contentType } = image
	// Inspect contentType to convert GIF to WebP and not AVIF
	// more info: https://twitter.com/whitep4nth3r/status/1460244790059188226
	const isGif = contentType === 'image/gif'

	// Note, this array could be further optimised looking at the resulting quality and file size
	const imageWidths = [100, 300, 500, 700, 900, 1100, 1300, 1500, 1700, 1900]

	// Below the maximum container size, make images span 100vw of the container
	// Above the maximum container size, serve the image at the width of the container and no bigger
	// The values in "sizes" are layout values, and not device pixel values
	// The actual size of the image resource chosen from the srcset will depend on DPR value
	const maxContainerSize = 600

	// Note, this could be further optimised by considering padding inside the container
	const sizes = `(max-width: ${
		maxContainerSize - 1
	}px) 100vw, ${maxContainerSize}px`

	function makeSrcSetArray(format: any) {
		const formatString = format === undefined ? '' : `&fm=${format}`
		const cloudinaryUrl = cloudinary.v2.url(image.public_id, {
			width: imageWidths,
			quality: 75,
			fetch_format: format,
			type: 'fetch'
		})
		return imageWidths.map(
			width => `${cloudinaryUrl}?w=${width}${formatString} ${width}w`
		)
	}

	function makeSrcSetString(format: any) {
		return makeSrcSetArray(format).join(', ')
	}

	return /* html */ `<picture>
        ${
									!isGif
										? `<source type="image/avif" srcSet="${makeSrcSetString(
												'avif'
										  )}" sizes="${sizes}" />`
										: ''
								}
        <source type="image/webp" srcSet="${makeSrcSetString(
									'webp'
								)}" sizes="${sizes}" />
        <img
          srcSet="${makeSrcSetString('webp')}"
          sizes="${sizes}"
          src="${(cloudinary as any).url(image.public_id, {
											width: imageWidths[imageWidths.length - 1],
											quality: 75,
											fetch_format: 'auto',
											type: 'fetch'
										})}"
          alt="${image.description}"
          loading="lazy"
          decoding="async"
          width="100%"
          height="auto"
          class="post__responsiveImage ${image.class}"
        />
      </picture>`
}

export default ResponsiveImage
