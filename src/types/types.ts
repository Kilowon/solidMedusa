import {
	ProductVariant as ProductVariantEntity,
	Region,
	StoreCartsRes
} from '@medusajs/medusa'

export declare type RegionInfo = Pick<
	Region,
	'currency_code' | 'tax_code' | 'tax_rate'
>
export declare type ProductVariant = ConvertDateToString<
	Omit<ProductVariantEntity, 'beforeInsert'>
>
export declare type ProductVariantInfo = Pick<ProductVariant, 'prices'>
declare type ConvertDateToString<T extends {}> = {
	[P in keyof T]: T[P] extends Date ? Date | string : T[P]
}
export declare type Cart = StoreCartsRes['cart']
export declare type TQueryKey<TKey, TListQuery = any, TDetailQuery = string> = {
	all: [TKey]
	lists: () => [...TQueryKey<TKey>['all'], 'list']
	list: (query?: TListQuery) => [
		...ReturnType<TQueryKey<TKey>['lists']>,
		{
			query: TListQuery | undefined
		}
	]
	details: () => [...TQueryKey<TKey>['all'], 'detail']
	detail: (
		id: TDetailQuery
	) => [...ReturnType<TQueryKey<TKey>['details']>, TDetailQuery]
}
export {}
