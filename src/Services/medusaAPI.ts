import { ServerError } from 'solid-start'
import { isServer } from 'solid-js/web'
import { getPercentageDiff } from '~/lib/helpers/helpers'
import { CalculatedVariant } from '~/types/medusa'
import Medusa from '@medusajs/medusa-js'
import { Cart } from '~/types/types'

export function IsClientCheck(func: any) {
	if (!isServer) return func
	return null
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

export async function getProductList(
	medusa: Medusa | null | undefined,
	id?: Cart,
	limit?: number,
	region?: Cart
): Promise<ProductPreviewType> {
	const query = {
		is_giftcard: false,
		limit: limit,
		cart_id: null
	}
	if (!isServer) {
		query.cart_id = id
	}

	return medusa!.products.list(query).then(({ products: newProducts }: any) => {
		return newProducts
			.filter((p: any) => !!p.variants)
			.map((p: any) => {
				const variants = p.variants as CalculatedVariant[]
				const cheapestVariant = variants.reduce((acc, curr) => {
					if (acc.calculated_price > curr.calculated_price) {
						return curr
					}
					return acc
				}, variants[0])
				return {
					id: p.id,
					title: p.title,
					handle: p.handle,
					thumbnail: p.thumbnail,
					price: cheapestVariant
						? {
								calculated_price: cheapestVariant.calculated_price,

								original_price: cheapestVariant.original_price,

								difference: getPercentageDiff(
									cheapestVariant.original_price,
									cheapestVariant.calculated_price
								),
								price_type: cheapestVariant.calculated_price_type
						  }
						: {
								calculated_price: 'N/A',
								original_price: 'N/A',
								difference: 'N/A',
								price_type: 'default'
						  }
				}
			})
	})
}

export async function fetchProduct(
	medusa: Medusa | null | undefined,
	handle: string
) {
	return await medusa?.products.list({ handle })
}

export async function getProductInfo(
	medusa: Medusa | null | undefined,
	cart: Cart,
	productId: string
) {
	return await medusa?.products.retrieve(productId, cart.result?.cart.id)
}

export async function deleteLineItem(
	medusa: Medusa | null | undefined,
	cart: Cart,
	lineItemId: string
) {
	return await medusa?.carts.lineItems.delete(cart.result?.cart.id, lineItemId)
}

export async function updateLineItem(
	medusa: Medusa | null | undefined,
	cart: Cart,
	lineItemId: string,
	quantity: number
) {
	return await medusa?.carts.lineItems.update(cart.result?.cart.id, lineItemId, {
		quantity
	})
}

export async function addLineItem(
	medusa: Medusa | null | undefined,
	cart: Cart,
	variantId: string,
	quantity: number
) {
	try {
		console.log('CARTID', cart.result?.cart.id, variantId, quantity)
		const data = await medusa?.carts.lineItems.create(cart.result?.cart.id, {
			variant_id: variantId,
			quantity
		})
		return data
	} catch (error) {
		console.log(error)
	}
}

export async function listProductCategories(medusa: Medusa | null | undefined) {
	const data = await medusa?.productCategories.list()

	return data
}
