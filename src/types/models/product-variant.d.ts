import { MoneyAmount } from './money-amount'
import { Product } from './product'
import { ProductOptionValue } from './product-option-value'
import { SoftDeletableEntity } from '../interfaces/models/soft-deletable-entity'
export declare class ProductVariant extends SoftDeletableEntity {
	title: string
	product_id: string
	product: Product
	prices: MoneyAmount[]
	sku: string
	barcode: string
	ean: string
	upc: string
	variant_rank: number
	inventory_quantity: number
	allow_backorder: boolean
	manage_inventory: boolean
	hs_code: string
	origin_country: string
	mid_code: string
	material: string
	weight: number
	length: number
	height: number
	width: number
	options: ProductOptionValue[]
	metadata: Record<string, unknown>
	private beforeInsert
	purchasable: any
}
/**
 * @schema ProductVariant
 * title: "Product Variant"
 * description: "Product Variants represent a Product with a specific set of Product Option configurations. The maximum number of Product Variants that a Product can have is given by the number of available Product Option combinations."
 * type: object
 * required:
 *   - title
 *   - product_id
 *   - inventory_quantity
 * properties:
 *   id:
 *     type: string
 *     description: The product variant's ID
 *     example: variant_01G1G5V2MRX2V3PVSR2WXYPFB6
 *   title:
 *     description: "A title that can be displayed for easy identification of the Product Variant."
 *     type: string
 *     example: Small
 *   product_id:
 *     description: "The ID of the Product that the Product Variant belongs to."
 *     type: string
 *     example: prod_01G1G5V2MBA328390B5AXJ610F
 *   product:
 *     description: A product object. Available if the relation `product` is expanded.
 *     type: object
 *   prices:
 *     description: The Money Amounts defined for the Product Variant. Each Money Amount represents a price in a given currency or a price in a specific Region. Available if the relation `prices` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/MoneyAmount"
 *   sku:
 *     description: "The unique stock keeping unit used to identify the Product Variant. This will usually be a unqiue identifer for the item that is to be shipped, and can be referenced across multiple systems."
 *     type: string
 *     example: shirt-123
 *   barcode:
 *     description: "A generic field for a GTIN number that can be used to identify the Product Variant."
 *     type: string
 *     example: null
 *   ean:
 *     description: "An EAN barcode number that can be used to identify the Product Variant."
 *     type: string
 *     example: null
 *   upc:
 *     description: "A UPC barcode number that can be used to identify the Product Variant."
 *     type: string
 *     example: null
 *   variant_rank:
 *     description: The ranking of this variant
 *     type: number
 *     default: 0
 *   inventory_quantity:
 *     description: "The current quantity of the item that is stocked."
 *     type: integer
 *     example: 100
 *   allow_backorder:
 *     description: "Whether the Product Variant should be purchasable when `inventory_quantity` is 0."
 *     type: boolean
 *     default: false
 *   manage_inventory:
 *     description: "Whether Medusa should manage inventory for the Product Variant."
 *     type: boolean
 *     default: true
 *   hs_code:
 *     description: "The Harmonized System code of the Product Variant. May be used by Fulfillment Providers to pass customs information to shipping carriers."
 *     type: string
 *     example: null
 *   origin_country:
 *     description: "The country in which the Product Variant was produced. May be used by Fulfillment Providers to pass customs information to shipping carriers."
 *     type: string
 *     example: null
 *   mid_code:
 *     description: "The Manufacturers Identification code that identifies the manufacturer of the Product Variant. May be used by Fulfillment Providers to pass customs information to shipping carriers."
 *     type: string
 *     example: null
 *   material:
 *     description: "The material and composition that the Product Variant is made of, May be used by Fulfillment Providers to pass customs information to shipping carriers."
 *     type: string
 *     example: null
 *   weight:
 *     description: "The weight of the Product Variant. May be used in shipping rate calculations."
 *     type: number
 *     example: null
 *   height:
 *     description: "The height of the Product Variant. May be used in shipping rate calculations."
 *     type: number
 *     example: null
 *   width:
 *     description: "The width of the Product Variant. May be used in shipping rate calculations."
 *     type: number
 *     example: null
 *   length:
 *     description: "The length of the Product Variant. May be used in shipping rate calculations."
 *     type: number
 *     example: null
 *   options:
 *     description: The Product Option Values specified for the Product Variant. Available if the relation `options` is expanded.
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/ProductOptionValue"
 *   created_at:
 *     type: string
 *     description: "The date with timezone at which the resource was created."
 *     format: date-time
 *   updated_at:
 *     type: string
 *     description: "The date with timezone at which the resource was updated."
 *     format: date-time
 *   deleted_at:
 *     type: string
 *     description: "The date with timezone at which the resource was deleted."
 *     format: date-time
 *   metadata:
 *     type: object
 *     description: An optional key-value map with additional details
 *     example: {car: "white"}
 */
/**
 * @schema ProductVariantPricesFields
 * title: "Product Variant Prices Fields"
 * description: "Product Variants Prices Fields that are only available in some requests."
 * type: object
 * properties:
 *   original_price:
 *     type: number
 *     description: The original price of the variant without any discounted prices applied.
 *   calculated_price:
 *     type: number
 *     description: The calculated price of the variant. Can be a discounted price.
 *   original_price_incl_tax:
 *     type: number
 *     description: The original price of the variant including taxes.
 *   calculated_price_incl_tax:
 *     type: number
 *     description: The calculated price of the variant including taxes.
 *   original_tax:
 *     type: number
 *     description: The taxes applied on the original price.
 *   calculated_tax:
 *     type: number
 *     description: The taxes applied on the calculated price.
 *   tax_rates:
 *     type: array
 *     description: An array of applied tax rates
 *     items:
 *       type: object
 *       properties:
 *         rate:
 *           type: number
 *           description: The tax rate value
 *         name:
 *           type: string
 *           description: The name of the tax rate
 *         code:
 *           type: string
 *           description: The code of the tax rate
 */
