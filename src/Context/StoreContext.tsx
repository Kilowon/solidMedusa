import {
	deleteLineItem,
	addLineItem,
	updateLineItem
} from '~/Services/medusaAPI'
import Medusa from '@medusajs/medusa-js'
import { Cart, ProductVariant } from '~/types/types'
import {
	createContext,
	useContext,
	createMemo,
	createSignal,
	createEffect
} from 'solid-js'
import { isServer } from 'solid-js/web'
import { Product } from '~/types/models'
import { currencyFormat, findCheapestPrice } from '~/lib/helpers/currency'
import { Accessor } from 'solid-js'

interface StoreContextValue {
	deleteItem: (lineId: string) => void
	getRegion: () => string | null
	addItem: (lineId: string, quantity: number) => void
	updateItem: (lineId: string, quantity: number) => void
	getCart: () => string | null
	deleteCart: () => void
	createNew: () => void
	addToCart: () => void
	increaseQuantity: () => void
	decreaseQuantity: () => void
	updateOptions: (options: Record<string, string>) => void
	options: Accessor<Record<string, string>>
	inStock: Accessor<boolean>
	quantity: Accessor<number>
	variant: Accessor<ProductVariant | undefined>
}

const StoreContext = createContext<StoreContextValue>()

export function StoreProvider(props: {
	medusa?: Medusa | null | undefined
	cart?: Cart
	product?: Product
	children: any
}) {
	const [options, setOptions] = createSignal({})
	const [inStock, setInStock] = createSignal<boolean>(true)
	const [quantity, setQuantity] = createSignal(1)
	const [maxQuantityMet, setMaxQuantityMet] = createSignal(false)
	const [product, setProduct] = createSignal(props.product)

	createEffect(() => {
		setProduct(props.product)
	}, [props.product])

	function getRegion() {
		if (!isServer) {
			const region = localStorage.getItem('cart_reg_id')
			if (region) return region
		}
		return null
	}

	function addItem(lineId: string, quantity: number) {
		addLineItem(props.medusa, props.cart, lineId, quantity)
	}

	function deleteItem(lineId: string) {
		deleteLineItem(props.medusa, props.cart, lineId)
	}

	function updateItem(lineId: string, quantity: number) {
		updateLineItem(props.medusa, props.cart, lineId, quantity)
	}

	function getCart() {
		if (!isServer) {
			const cart = localStorage.getItem('cart_id')
			if (cart) return cart
		}
		return null
	}

	function deleteCart() {
		if (!isServer) {
			localStorage.removeItem('cart_id')
		}
	}

	function createNew() {
		props.medusa!.carts.create({ region_id: getRegion() }).then((res: any) => {
			if (!isServer) {
				localStorage.setItem('cart_id', res.cart.id)
			}
		})
	}

	function variantId(variant: any) {
		return variant.id
	}

	createEffect(() => {
		// initialize the option state
		const optionObj: Record<string, string> = {}
		for (const option of props.product?.options || []) {
			Object.assign(optionObj, { [option.id]: undefined })
		}
		setOptions(optionObj)
	}, [product()])

	// memoized record of the product's variants
	const variantRecord = createMemo(() => {
		console.log('variantRecord', props.product?.variants)
		const map: Record<string, Record<string, string>> = {}

		for (const variant of product()?.variants || []) {
			const tmp: Record<string, string> = {}

			for (const option of variant.options) {
				tmp[option.option_id] = option.value
			}

			map[variant.id] = tmp
		}

		return map
	}, [product()?.variants])

	const variant = createMemo(() => {
		console.log('variant', variantRecord())
		console.log('options', options())
		let variantId: string | undefined = undefined

		for (const key of Object.keys(variantRecord())) {
			const variantOptions = variantRecord()[key]
			const variantOptionsString = JSON.stringify(variantOptions)
			const optionsString = JSON.stringify(options())

			if (variantOptionsString === optionsString) {
				console.log('variantKEY', key)
				variantId = key
				break
			}
		}

		return product()?.variants.find(v => v.id === variantId)
	}, [options, variantRecord, product()?.variants])

	createEffect(() => {
		if (!isServer) {
			console.log(
				'ISEQUAL',
				product()?.variants.find(v => v.id === variant()?.id)
			)
			console.log('variant', variant())
			console.log('options', options())
			console.log('variantRecord', variantRecord())
		}
	}, [variant])
	// if product only has one variant, then select it
	createEffect(() => {
		if (props.product?.variants.length === 1) {
			setOptions(variantRecord()[product()!.variants[0].id])
		}
	}, [props.product?.variants, variantRecord])

	const disabled = createMemo(() => {
		return !variant
	}, [variant()])

	// memoized function to get the price of the current variant
	const formattedPrice = createMemo(() => {
		if (variant() && props.cart?.region) {
			return currencyFormat(Number(variant), props.cart.region.id)
		} else if (props.cart?.region) {
			return findCheapestPrice(props.product?.variants || [], props.cart.region)
		} else {
			// if no variant is selected, or we couldn't find a price for the region/currency
			return 'N/A'
		}
	}, [variant, props.product?.variants, props.cart])

	function canBuy(variant: ProductVariant) {
		return variant.inventory_quantity > 0 || variant.allow_backorder === true
	}

	createEffect(() => {
		if (variant()) {
			setInStock(canBuy(variant))
		}
	}, [variant])

	function updateOptions(update: Record<string, string>) {
		console.log('updateOptions', update)
		setOptions({ ...options(), ...update })
	}

	function addToCart() {
		if (variant()) {
			console.log('adding to cart', variant()?.id, quantity())
			addItem(variant()?.id as string, quantity())
		}
	}

	const increaseQuantity = () => {
		const maxQuantity = variant()?.inventory_quantity || 0

		if (maxQuantity > quantity() + 1) {
			setQuantity(quantity() + 1)
		} else {
			setMaxQuantityMet(true)
		}
	}

	const decreaseQuantity = () => {
		if (quantity() > 1) {
			setQuantity(quantity() - 1)

			if (maxQuantityMet()) {
				setMaxQuantityMet(false)
			}
		}
	}

	return (
		<StoreContext.Provider
			value={{
				getRegion,
				addItem,
				deleteItem,
				updateItem,
				getCart,
				deleteCart,
				createNew,
				addToCart,
				increaseQuantity,
				decreaseQuantity,
				updateOptions,
				options,
				inStock,
				quantity,
				variant
			}}
		>
			{props.children}
		</StoreContext.Provider>
	)
}

export const useStore = () => useContext(StoreContext)!
