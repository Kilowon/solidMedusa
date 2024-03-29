import { Show, lazy, Accessor, Suspense } from 'solid-js'
import { Transition } from 'solid-transition-group'

const CartCore = lazy(() => import('../Core/CartCore'))

export default function CartDropdown(props: { openCart: Accessor<boolean>; setOpenCart: (arg: boolean) => void }) {
	return (
		<div>
			<Transition
				onEnter={(el, done) => {
					const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
						duration: 200
					})
					a.finished.then(done)
				}}
				onExit={(el, done) => {
					const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
						duration: 0
					})
					a.finished.then(done)
				}}
			>
				<Show when={props.openCart() === true}>
					<div class=" bg-normal_1 absolute top-[calc(100%+1px)] right-0 min-w-[440px] min-h-[100svh]  text-sm  z-10 mx-auto px-2">
						<CartCore variant="panel" />
					</div>
				</Show>
			</Transition>
		</div>
	)
}
