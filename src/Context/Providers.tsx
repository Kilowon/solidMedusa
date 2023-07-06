import { isServer } from 'solid-js/web'
import { createContext, useContext, createSignal, createEffect, onMount } from 'solid-js'
import { createRouteAction } from 'solid-start'
import { createQuery } from '@tanstack/solid-query'

//TODO: Becareful with imports from @medusajs/medusa-js as it will break the build process with too many imports it seems some webpack issue even though vite is used for the frontend
//TODO: In the future we should move away from @medusajs/medusa-js and use the api directly - this could be a slight performance boost on client side start bundle size
import Medusa from '@medusajs/medusa-js'
import { Cart } from '~/types/types'
import { on } from 'events'

interface ContextProps {
	medusa?: Medusa | null
	cart?: Cart | null
	queryCart?: Cart | null
	queryCartRefetch?: () => void
	setCurrentProductId?: (id: string) => void
	rootCategories?: any
	categories?: any
	setCurrentCategoryId?: (id: string[]) => void
	categoryProducts?: any
	queryByProductId?: any
	setCategoryProducts?: (products: any) => void
	collections?: any
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

//TODO: The region is set to the US region this should be changed to a region that is chosen by the user or by IP address location
async function fetchRegion(): Promise<any> {
	const region = await medusa.regions.list().then(({ regions }: any) => {
		return regions[0]
	})
	if (!isServer) {
		localStorage.setItem('cart_reg_id', region?.id)
	}

	return region
}

//const [useCart, setCart] = createSignal<Cart>(newCart())

async function fetchNewCart(): Promise<Cart> {
	const region = await fetchRegion()
	const cart = await medusa.carts.create({ region_id: region.id })
	return cart
}

async function fetchSavedCart(): Promise<Cart> {
	try {
		const cartId = localStorage.getItem('cart_id')!
		const cart = await medusa.carts.retrieve(cartId)
		return cart
	} catch (e) {
		console.log(e)
		return fetchNewCart()
	}
}

async function getRequiredCart() {
	const cartId = localStorage.getItem('cart_id')
	if (cartId !== undefined && cartId !== null) {
		return fetchSavedCart()
	} else {
		return fetchNewCart()
	}
}

export function GlobalContextProvider(props: any) {
	///////////////////////////////////////////////////////////////////////////
	const queryCart = createQuery(() => ({
		queryKey: ['cart'],
		queryFn: async function () {
			await new Promise(r => setTimeout(r, 500))
			const cart = await getRequiredCart()
			return cart
		}
	}))
	const [queue, setQueue] = createSignal<Array<() => Promise<any>>>([])

	createEffect(() => {
		if (!queryCart.isPending && queryCart.isSuccess) {
			const next = queue()[0]
			if (next) {
				setQueue(queue().slice(1))
				next()
			}
		}
	})

	function addToQueue(fn: () => Promise<any>) {
		if (queue().length < 3) {
			setQueue([...queue(), fn])
		}
	}

	function queryCartRefetch() {
		if (queryCart.isPending) {
			addToQueue(queryCart.refetch)
		} else {
			queryCart.refetch()
		}
	}

	///////////////////////////////////////////////////////////////////////////
	const [currentProductId, setCurrentProductId] = createSignal<string>('')

	const queryByProductId = createQuery(() => ({
		queryKey: ['product', currentProductId()],
		queryFn: async function () {
			const product = await medusa.products.retrieve(currentProductId())
			return product
		},
		cacheTime: 15 * 60 * 1000
		//staleTime: 15 * 60 * 1000
	}))

	onMount(() => {
		if (!isServer && queryCart?.data?.cart?.id !== undefined) {
			localStorage.setItem('cart_id', queryCart?.data.cart.id)
		}
	})

	const primaryData = createQuery(() => ({
		queryKey: ['primary_data'],
		queryFn: async function () {
			const bearerToken = import.meta.env.VITE_BEARER_TOKEN
			const response = await fetch(`https://direct.shauns.cool/items/Primary`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${bearerToken}`
				}
			})
			const data = await response.json()
			return data
		},
		cacheTime: 15 * 60 * 1000,
		retry: 0,
		enabled: false
	}))

	onMount(() => {
		primaryData.refetch()
	})

	///////////////////////////////////////////////////////////////////////////

	const queryCategories = createQuery(() => ({
		queryKey: ['categories_list'],
		queryFn: async function () {
			const product = await medusa.productCategories.list({ limit: '200' })
			return product
		},
		cacheTime: 15 * 60 * 1000
	}))

	const [categories, categoriesServerState] = createSignal([])

	const [rootCategories, setRootCategories] = createSignal([])
	createEffect(() => {
		categoriesServerState(queryCategories.data?.product_categories)
		setRootCategories(categories()?.filter((category: any) => category.parent_category_id === null))
	}, [queryCategories])

	const [categoryProducts, setCategoryProducts] = createSignal([])

	const queryCollections = createQuery(() => ({
		queryKey: ['collections'],
		queryFn: async function () {
			const product = await medusa.collections.list()
			return product
		},
		cacheTime: 15 * 60 * 1000,
		enabled: false
	}))

	const [collections, setCollections] = createSignal([])

	onMount(() => {
		queryCollections.refetch()

		setTimeout(() => {
			setCollections(queryCollections?.data)
		}, 350)
	})

	return (
		<GlobalContext.Provider
			value={{
				medusa,
				queryCart: queryCart as Cart,
				queryCartRefetch,
				queryByProductId,
				setCurrentProductId,
				rootCategories,
				categories,

				categoryProducts,
				setCategoryProducts,
				collections
			}}
		>
			{props.children}
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(GlobalContext)!
