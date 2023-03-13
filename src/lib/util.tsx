export const repeat = (times: number) => {
	return Array.from(Array(times).keys())
}

export const getPercentageDiff = (original: number, calculated: number) => {
	const diff = original - calculated
	const decrease = (diff / original) * 100

	return decrease.toFixed()
}
