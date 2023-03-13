import { Product } from '@medusajs/medusa'

export type CollectionData = {
	id: string
	title: string
}

export type FeaturedProduct = {
	id: string
	title: string
	handle: string
	thumbnail?: string
}

export type StoreNavData = {
	collections: CollectionData[]
	hasMoreCollections: boolean
	featuredProducts: Product[]
}

// page props for store pages (products and collection pages)
export type StoreProps<T extends unknown> = {
	page: {
		data: T
	}
}

// page props for non-store pages (home, about, contact, etc)
export type SiteProps = {
	site: {
		navData: StoreNavData
	}
}

export type PrefetchedPageProps = {
	notFound: boolean
}

export type ProductPreviewType = {
	id: string
	title: string
	handle: string | null
	thumbnail: string | null
	price?: {
		calculated_price: string
		original_price: string
		difference: string
		price_type: 'default' | 'sale'
	}
}

export type InfiniteProductPage = {
	response: {
		products: Product[]
		count: number
	}
}
