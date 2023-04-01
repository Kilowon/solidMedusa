export function currencyFormat(price: number, currency: string) {
	let selectCurrency = (typeof currency === 'string' && currency.toLowerCase()) || ''
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
