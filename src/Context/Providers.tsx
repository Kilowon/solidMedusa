import { isServer } from 'solid-js/web'
import { createContext, useContext, createSignal, createEffect, onMount } from 'solid-js'
import { createQuery } from '@tanstack/solid-query'

//TODO: Becareful with imports from @medusajs/medusa-js as it will break the build process with too many imports it seems some webpack issue even though vite is used for the frontend
//TODO: In the future we should move away from @medusajs/medusa-js and use the api directly - this could be a slight performance boost on client side start bundle size
import Medusa from '@medusajs/medusa-js'
import { Cart } from '~/types/types'

interface ContextProps {
	medusa?: Medusa | null
	cart?: Cart | null
	queryCart?: Cart | null
	queryNewCart?: Cart | null
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
		baseUrl: import.meta.env.VITE_PUBLIC_MEDUSA_BACKEND_URL,
		publishableApiKey: import.meta.env.VITE_MEDUSA_API_KEY
	})
	return medusa
}
const medusa = useMedusa()

//TODO: The region is set to the US region this should be changed to a region that is chosen by the user or by IP address location
async function fetchRegion(): Promise<any> {
	if (!isServer && localStorage.getItem('cart_reg_id') !== null) {
		return localStorage.getItem('cart_reg_id')
	}

	const region = await medusa.regions.list().then(({ regions }: any) => {
		return regions[0]
	})

	if (!isServer) {
		localStorage.setItem('cart_reg_id', region?.id)
	}

	return region
}

const [saveCart, setSaveCart] = createSignal<Cart>(null)

async function fetchNewCart(): Promise<Cart> {
	const region = await fetchRegion()
	const cart = await medusa.carts.create({ region_id: region.id })
	setSaveCart(cart)
	if (!isServer) {
		localStorage.setItem('cart_id', saveCart()?.cart?.id)
	}
	return saveCart()
}

async function fetchSavedCart(): Promise<Cart> {
	if (!isServer) {
		try {
			const cartId = localStorage.getItem('cart_id')!
			const cart = await medusa.carts.retrieve(cartId)
			if (cart?.cart?.payment_authorized_at !== null) return fetchNewCart()
			return cart
		} catch (e) {
			console.log(e)
			return fetchNewCart()
		}
	}
	if (isServer) {
		return fetchNewCart()
	}
}

export function GlobalContextProvider(props: any) {
	///////////////////////////////////////////////////////////////////////////
	const queryNewCart = createQuery(() => ({
		queryKey: ['cart'],
		queryFn: async function () {
			const cart = await fetchNewCart()
			console.log('RAN NEW CART')
			return cart
		},
		retry: 0,
		enabled: isServer || localStorage.getItem('cart_id') === null ? true : false
	}))

	const querySavedCart = createQuery(() => ({
		queryKey: ['cart'],
		queryFn: async function () {
			const cart = await fetchSavedCart()
			console.log('RAN SAVED CART')
			return cart
		},
		retry: 0,
		enabled: isServer || (!localStorage.getItem('cart_id') !== null && !!queryNewCart.isSuccess) ? false : true
	}))

	const [queue, setQueue] = createSignal<Array<() => Promise<any>>>([])

	createEffect(() => {
		if (!querySavedCart.isPending && querySavedCart.isSuccess) {
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
		if (querySavedCart.isPending) {
			addToQueue(querySavedCart.refetch)
		} else {
			querySavedCart.refetch()
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
		cacheTime: 15 * 60 * 1000,
		enabled: false
		//staleTime: 15 * 60 * 1000
	}))

	/* 	onMount(() => {
		if (!isServer && queryCart?.data?.cart?.id !== undefined) {
			localStorage.setItem('cart_id', queryCart?.data.cart.id)
		}
	}) */

	const primaryData = createQuery(() => ({
		queryKey: ['primary_data'],
		queryFn: async function () {
			const bearerToken = import.meta.env.VITE_BEARER_TOKEN
			const response = await fetch(`${import.meta.env.VITE_DIRECTUS_URL}/items/Primary`, {
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

	const heroData = createQuery(() => ({
		queryKey: ['hero_data'],
		queryFn: async function () {
			const bearerToken = import.meta.env.VITE_BEARER_TOKEN
			const response = await fetch(`${import.meta.env.VITE_DIRECTUS_URL}/items/main_hero?fields=*.item.*.*.*`, {
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
		heroData.refetch()
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
		console.log('categories', rootCategories())
		console.log('categories', import.meta.env.VITE_MENU_CATEGORY_BASE)
	})

	createEffect(() => {
		categoriesServerState(queryCategories.data?.product_categories)

		// Find the parent category
		const parentCategory: any = categories()?.find(
			(category: any) => category.name === import.meta.env.VITE_MENU_CATEGORY_BASE
		)

		// Filter the categories where parent_category_id matches the parent category's id
		setRootCategories(categories()?.filter((category: any) => category.parent_category_id === parentCategory?.id))
	}, [queryCategories])

	const [currentCategoryId, setCurrentCategoryId] = createSignal([''])

	const queryCategoryProducts = createQuery(() => ({
		queryKey: ['categories_products', currentCategoryId()],
		queryFn: async function () {
			const product = await medusa.products.list({
				category_id: currentCategoryId(),
				cart_id: querySavedCart?.data?.cart?.id
			})
			return product
		},
		cacheTime: 15 * 60 * 1000
		//enabled: false
	}))

	const [categoryProducts, setCategoryProducts] = createSignal([])

	createEffect(() => {
		setCategoryProducts(queryCategoryProducts.data?.products)
	}, [queryCategoryProducts, currentCategoryId])

	const queryCollections = createQuery(() => ({
		queryKey: ['collections-list'],
		queryFn: async function () {
			const product = await medusa.collections.list()
			setCollections(product)
			return product
		},
		cacheTime: 15 * 60 * 1000,
		enabled: false
	}))

	const [collections, setCollections] = createSignal([])

	onMount(() => {
		queryCollections.refetch()

		/* setTimeout(() => {
			setCollections(queryCollections?.data)
		}, 350) */
	})

	return (
		<GlobalContext.Provider
			value={{
				medusa,
				queryCart: querySavedCart as Cart,
				queryNewCart,
				queryCartRefetch,
				queryByProductId,
				setCurrentProductId,
				rootCategories,
				categories,
				setCurrentCategoryId,
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
