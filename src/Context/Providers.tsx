import { isServer } from 'solid-js/web'
import {
	createContext,
	useContext,
	createSignal,
	createResource,
	createEffect
} from 'solid-js'
import { createRouteAction } from 'solid-start'

//TODO: Becareful with imports from @medusajs/medusa-js as it will break the build process with too many imports it seems some webpack issue even though vite is used for the frontend
//TODO: In the future we should move away from @medusajs/medusa-js and use the api directly - this could be a slight performance boost on client side start bundle size
import Medusa from '@medusajs/medusa-js'
import { Cart } from '~/types/types'
import { redirect } from 'solid-start'
import { createMachine } from 'xstate'
import { useMachine } from '@xstate/solid'

interface ContextProps {
	medusa?: Medusa | null
	cart?: Cart | null
}

const GlobalContext = createContext<ContextProps>()

//TODO: This is a hacky way to get the cart to work - we should use a state machine to handle the cart state and make it more robust
//TODO: SolidJS makes addressing Object properties a bit of a pain - we should look into a better way to do this
const [useMedusa, setMedusa] = createSignal<Medusa>(newMedusa())

function newMedusa() {
	const medusa = new Medusa({
		maxRetries: 3,
		baseUrl: import.meta.env.VITE_PUBLIC_MEDUSA_BACKEND_URL
	})
	return medusa
}
const medusa = useMedusa()

async function fetchMedusaCart(): Promise<Cart> {
	const cart = await medusa.carts.create()
	console.log('CART', cart)
	return cart
}

async function fetchSavedCart(): Promise<Cart> {
	const cartId = localStorage.getItem('cart_id')!
	console.log('CARTID', cartId)
	const cart = await medusa.carts.retrieve(cartId)
	console.log('CART', cart)
	return cart
}

async function getRequiredCart() {
	const cartId = localStorage.getItem('cart_id')
	if (cartId !== undefined && cartId !== null) {
		return fetchSavedCart()
	} else {
		return fetchMedusaCart()
	}

	/* return fetchMedusaCart() */
}

export function GlobalContextProvider(props: any) {
	const [cart, cartState] = createRouteAction(getRequiredCart)

	createEffect(() => {
		if (!isServer) {
			cartState()
		}
	})

	createEffect(() => {
		if (!isServer && cart?.result?.cart?.id !== undefined) {
			console.log('CART SAVED', cart?.result.cart.id)
			localStorage.setItem('cart_id', cart?.result.cart.id)
		}
	})

	return (
		<GlobalContext.Provider value={{ medusa, cart }}>
			{props.children}
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(GlobalContext)!
