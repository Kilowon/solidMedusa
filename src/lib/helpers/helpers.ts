import { RegionInfo, ProductVariantInfo } from '~/types/types'
declare type FormatVariantPriceParams = {
	variant: ProductVariantInfo
	region: RegionInfo
	includeTaxes?: boolean
	minimumFractionDigits?: number
	maximumFractionDigits?: number
	locale?: string
}
/**
 * Takes a product variant and a region, and converts the variant's price to a localized decimal format
 */
export declare const formatVariantPrice: ({
	variant,
	region,
	includeTaxes,
	...rest
}: FormatVariantPriceParams) => string
declare type ComputeVariantPriceParams = {
	variant: ProductVariantInfo
	region: RegionInfo
	includeTaxes?: boolean
}
/**
 * Takes a product variant and region, and returns the variant price as a decimal number
 * @param params.variant - product variant
 * @param params.region - region
 * @param params.includeTaxes - whether to include taxes or not
 */
export declare const computeVariantPrice: ({
	variant,
	region,
	includeTaxes
}: ComputeVariantPriceParams) => number
/**
 * Finds the price amount correspoding to the region selected
 * @param variant - the product variant
 * @param region - the region
 * @returns - the price's amount
 */
export declare const getVariantPrice: (
	variant: ProductVariantInfo,
	region: RegionInfo
) => number
declare type ComputeAmountParams = {
	amount: number
	region: RegionInfo
	includeTaxes?: boolean
}
/**
 * Takes an amount, a region, and returns the amount as a decimal including or excluding taxes
 */
export declare const computeAmount: ({
	amount,
	region,
	includeTaxes
}: ComputeAmountParams) => number
declare type FormatAmountParams = {
	amount: number
	region: RegionInfo
	includeTaxes?: boolean
	minimumFractionDigits?: number
	maximumFractionDigits?: number
	locale?: string
}
/**
 * Takes an amount and a region, and converts the amount to a localized decimal format
 */
export declare const formatAmount: ({
	amount,
	region,
	includeTaxes,
	...rest
}: FormatAmountParams) => string
export {}

export const getPercentageDiff = (original: number, calculated: number) => {
	const diff = original - calculated
	const decrease = (diff / original) * 100

	return decrease.toFixed()
}
