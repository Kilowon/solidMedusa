import { createEffect, createSignal, lazy, ErrorBoundary, Show } from 'solid-js'
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

export default function CartDrawerNav(props: any) {
	const { queryCart } = useGlobalContext()
	const [items, setItems] = createSignal(queryCart.data?.cart?.items)

	createEffect(() => {
		if (!isServer || queryCart.data !== undefined) {
			setItems(queryCart?.data?.cart?.items)
		}
	})

	return (
		<div>
			{/* <div
				class="flex items-center rounded-full xl:hidden z-1 relative"
				style="position: fixed; top: 0.85vh; right: -0.5rem; width: 3.75rem; height: 3rem;"
				title="Cart"
				role="button"
				tabindex="0"
				onClick={() => props.setCartDrawer({ cart: 'active', checkout: 'active' })}
			>
				<div class="i-ion-cart-outline h-7 w-7 absolute top-3 left-1.75" />
				<div class="absolute top-1.5 left-5.8 w-4 h-4 text-normal_1 text-xs flex items-center justify-center bg-text_2 rounded-full">
					{totalItemsInCart(items())}
				</div>
			</div> */}
			<div
				class={`fixed inset-0 bg-normal_2/50 backdrop-blur-6px z-200 transition-all duration-250 ease-in-out ${
					props.cartDrawer().cart === 'active' ? '' : 'opacity-0 pointer-events-none'
				}`}
				onClick={event => {
					if (event.target === event.currentTarget) {
						props.setCartDrawer({ cart: 'hidden', checkout: 'active' })
					}
				}}
			>
				<div
					class="i-ph-x-bold absolute right-3 top-4 w-5 h-5"
					onClick={event => {
						if (event.target === event.currentTarget) {
							props.setCartDrawer({ cart: 'hidden', checkout: 'active' })
						}
					}}
				/>
				<div
					class={`fixed top-12 right-0 h-full w-[95vw] sm:w-[85vw] md:w-[45vw] bg-normal_1 z-200 transform rounded-sm  transition-transform duration-500 ease-in-out p-2 ${
						props.cartDrawer().cart === 'active' ? '' : 'translate-x-full'
					}`}
				>
					<ErrorBoundary fallback={<div>f</div>}>
						<Show when={!isServer && props.cartDrawer().cart === 'active'}>
							<CartCore
								variant="mobile-panel"
								setCartDrawer={props.setCartDrawer}
							/>
						</Show>
					</ErrorBoundary>
				</div>
			</div>
		</div>
	)
}
