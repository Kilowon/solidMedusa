import { Region, MoneyAmount } from '~/types/models'
import { Variant } from '~/types/medusa'

export function currencyFormat(price: number, currency: string) {
	let selectCurrency =
		(typeof currency === 'string' && currency.toLowerCase()) || ''
	let formatedCurency = ''

	switch (selectCurrency) {
		case 'usd':
			formatedCurency = 'USD'
			break
		case 'eur':
			formatedCurency = 'EUR'
			break
		case 'gbp':
			formatedCurency = 'GBP'
			break
		case 'us':
			formatedCurency = 'USD'
			break
		case 'eu':
			formatedCurency = 'EUR'
			break
		case 'gb':
			formatedCurency = 'GBP'
			break
		case 'uk':
			formatedCurency = 'GBP'
			break
		default:
			formatedCurency = 'USD'
			break
	}

	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: formatedCurency
	}).format(price / 100)
}

export function getPercentageDiff(original: number, calculated: number) {
	return Math.round(((original - calculated) / original) * 100)
}

export const findCheapestRegionPrice = (
	variants: Variant[],
	regionId: string
) => {
	const regionPrices = variants.reduce((acc, v) => {
		const price = v.prices.find(p => p.region_id === regionId)
		if (price) {
			acc.push(price)
		}

		return acc
	}, [] as MoneyAmount[])

	if (!regionPrices.length) {
		return undefined
	}

	//find the price with the lowest amount in regionPrices
	const cheapestPrice = regionPrices.reduce((acc, p) => {
		if (acc.amount > p.amount) {
			return p
		}

		return acc
	})

	return cheapestPrice
}

export const findCheapestCurrencyPrice = (
	variants: Variant[],
	currencyCode: string
) => {
	const currencyPrices = variants.reduce((acc, v) => {
		const price = v.prices.find(p => p.currency_code === currencyCode)
		if (price) {
			acc.push(price)
		}

		return acc
	}, [] as MoneyAmount[])

	if (!currencyPrices.length) {
		return undefined
	}

	//find the price with the lowest amount in currencyPrices
	const cheapestPrice = currencyPrices.reduce((acc, p) => {
		if (acc.amount > p.amount) {
			return p
		}

		return acc
	})

	return cheapestPrice
}

export const findCheapestPrice = (variants: Variant[], region: Region) => {
	const { id, currency_code } = region

	let cheapestPrice = findCheapestRegionPrice(variants, id)

	if (!cheapestPrice) {
		cheapestPrice = findCheapestCurrencyPrice(variants, currency_code)
	}

	if (cheapestPrice) {
		return currencyFormat(Number(cheapestPrice.amount), region.id)
	}

	// if we can't find any price that matches the current region,
	// either by id or currency, then the product is not available in
	// the current region
	return 'Not available in your region'
}
