import { createEffect, createSignal, lazy, ErrorBoundary, Show, onMount } from 'solid-js'
import { useGlobalContext } from '~/Context/Providers'
import { isServer } from 'solid-js/web'

const CartCore = lazy(() => import('../Core/CartCore'))

export function totalItemsInCart(items: any) {
	let total = 0
	items?.forEach((item: any) => {
		total += item.quantity
	})
	return total
}

export default function CartDrawerNav(props: {
	cartDrawer: () => { cart: 'active' | 'hidden' }
	setCartDrawer: (arg: { cart: 'active' | 'hidden' }) => void
}) {
	const { queryCart } = useGlobalContext()
	const [items, setItems] = createSignal(queryCart.data?.cart?.items)

	createEffect(() => {
		if (!isServer || queryCart.data !== undefined) {
			setItems(queryCart?.data?.cart?.items)
		}
	})

	return (
		<div>
			<div
				class={`fixed inset-0 bg-normal_2/50 backdrop-blur-6px z-200 transition-all duration-250 ease-in-out ${
					props.cartDrawer().cart === 'active' ? '' : 'opacity-0 pointer-events-none'
				}`}
				onClick={e => {
					e.stopPropagation()
					if (e.target === e.currentTarget) {
						props.setCartDrawer({ cart: 'hidden' })
					}
				}}
			>
				<div
					class="i-ph-x-bold absolute right-3 top-4 w-5 h-5"
					onClick={event => {
						if (event.target === event.currentTarget) {
							props.setCartDrawer({ cart: 'hidden' })
						}
					}}
				/>
				<div
					class={`fixed top-12 right-0 h-full w-[100vw] sm:w-[85vw] md:w-[45vw] bg-normal_1 z-200 transform rounded-sm  transition-transform duration-250 ease-in-out p-2 ${
						props.cartDrawer().cart === 'active' ? '' : 'translate-x-full'
					}`}
				>
					<Show when={!isServer && props.cartDrawer().cart === 'active'}>
						<CartCore
							variant="mobile-panel"
							setCartDrawer={props.setCartDrawer}
						/>
					</Show>
				</div>
			</div>
		</div>
	)
}
