import {
	deleteLineItem,
	addLineItem,
	updateLineItem
} from '~/Services/medusaAPI'
import Medusa from '@medusajs/medusa-js'
import { Cart } from '~/types/types'
import { createContext, useContext } from 'solid-js'
import { isServer } from 'solid-js/web'

interface StoreContextValue {
	deleteItem: (lineId: string) => void
	getRegion: () => string | null
	addItem: (lineId: string) => void
	updateItem: (lineId: string, quantity: number) => void
	getCart: () => string | null
	deleteCart: () => void
	createNew: () => void
}

const StoreContext = createContext<StoreContextValue>()

export function StoreProvider(props: {
	medusa: Medusa | null | undefined
	cart: Cart
	children: any
}) {
	function getRegion() {
		if (!isServer) {
			const region = localStorage.getItem('cart_reg_id')
			if (region) return region
		}
		return null
	}

	function addItem(lineId: string) {
		addLineItem(props.medusa, props.cart, lineId, 1)
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

	return (
		<StoreContext.Provider
			value={{
				deleteItem,
				getRegion,
				addItem,
				updateItem,
				getCart,
				deleteCart,
				createNew
			}}
		>
			{props.children}
		</StoreContext.Provider>
	)
}

export const useStore = () => {
	const store = useContext(StoreContext)
	if (!store) {
		throw new Error('useStore must be used within a StoreProvider.')
	}
	return store
}
