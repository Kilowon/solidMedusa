import { createEffect, createSignal, Show, lazy, Suspense } from 'solid-js'
import { useGlobalContext } from '~/Context/Providers'
import { Transition } from 'solid-transition-group'
import { useStore } from '~/Context/StoreContext'
import { isServer } from 'solid-js/web'

const CartCore = lazy(() => import('../Core/CartCore'))

export function totalItemsInCart(items: any) {
	let total = 0
	items?.forEach((item: any) => {
		total += item.quantity
	})
	return total
}

export default function CartDropdown(props: any) {
	const [open, setOpen] = createSignal(false)

	const { queryCart } = useGlobalContext()
	const { queryCartRefetch } = useGlobalContext()
	const { deleteItem } = useStore()

	const [cart, setCart] = createSignal(queryCart.data?.cart)
	const [items, setItems] = createSignal(queryCart.data?.cart?.items)

	createEffect(() => {
		if (!isServer || queryCart.data !== undefined) {
			setItems(queryCart?.data?.cart?.items)
		}
	}, [queryCart])

	function handleOnClick(e: Event) {
		const target = e.target as HTMLElement
		if (target.classList.contains('i-ion-cart-outline')) {
			props.setStayOpen(!props.stayOpen())
		}
	}

	function handleOnMouseOver() {
		if (props.stayOpen()) return
		setOpen(true)
	}

	function handleOnMouseLeave() {
		if (props.stayOpen()) return
		setOpen(false)
	}

	return (
		<div
			onMouseOver={() => handleOnMouseOver()}
			onMouseLeave={() => handleOnMouseLeave()}
			onClick={e => handleOnClick(e)}
			onKeyDown={e => {
				if (e.key === 'Enter') {
					setOpen(true)
				}
				if (e.key === 'Escape') {
					setOpen(false)
				}
			}}
			title="Cart"
			role="button"
			tabindex="0"
		>
			<div
				class={props.stayOpen() ? 'flex text-2xl p-5 text-amber-5 h-full relative' : 'flex text-2xl p-5 h-full relative '}
			>
				<div class="i-ion-cart-outline w-7 h-7 hover:cursor-pointer"></div>
				<div
					class={
						'w-5 h-5 absolute top-3 right-3 bg-gray-5 text-xs text-white font-semibold flex items-center justify-center rounded-full'
					}
				>
					{totalItemsInCart(items())}
				</div>
			</div>

			<Transition
				onEnter={(el, done) => {
					const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
						duration: 200
					})
					a.finished.then(done)
				}}
				onExit={(el, done) => {
					const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
						duration: 200
					})
					a.finished.then(done)
				}}
			>
				<Suspense>
					<Show when={open() && items() !== undefined && isServer === false}>
						<div class="bg-white absolute top-[calc(100%+1px)] right-0 w-[440px] h-[100vh]  text-sm text-gray-7 z-10 mx-auto px-8">
							<CartCore variant="panel" />
						</div>
					</Show>
				</Suspense>
			</Transition>
		</div>
	)
}
