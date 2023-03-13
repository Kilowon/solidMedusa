import { isServer } from 'solid-js/web'
import { createContext, useContext, createSignal } from 'solid-js'
//TODO: Becareful with imports from @medusajs/medusa-js as it will break the build process with too many imports it seems some webpack issue even though vite is used for the frontend
import Medusa from '@medusajs/medusa-js'
import { Cart } from '~/types/types'
import { redirect } from 'solid-start'
import { createMachine } from 'xstate'
import { useMachine } from '@xstate/solid'

interface ContextProps {
	medusa?: Medusa | null
	cart?: Cart | null
}

const cartIDFetch = createMachine({
	id: 'CartIDFetch',
	initial: 'idle',
	states: {
		idle: {
			initial: 'noError',
			states: {
				noError: {
					entry: 'clearErrorMessage'
				},
				errored: {}
			},
			on: {
				SERVER_CHECK: {
					target: 'isServer'
				}
			}
		},
		CreateCart: {
			invoke: {
				src: 'fetchData',
				onError: [
					{
						target: '#CartIDFetch.idle.errored',
						actions: 'assignErrorToContext'
					}
				]
			},
			on: {
				FETCH: {
					target: 'CreateCart',
					internal: false
				},
				RECEIVE_DATA: {
					target: 'SaveCartID',
					cond: 'New guard',
					actions: 'assignDataToContext'
				}
			}
		},
		isServer: {
			on: {
				false: {
					target: 'isCartID'
				},
				true: {
					target: 'idle'
				}
			}
		},
		isCartID: {
			on: {
				true: {
					target: 'GetCart'
				},
				false: {
					target: 'CreateCart'
				}
			}
		},
		SaveCartID: {
			on: {
				complete: {
					target: 'idle'
				}
			}
		},
		GetCart: {
			invoke: {
				src: 'fetchData',
				onError: [
					{
						target: '#CartIDFetch.idle.errored',
						actions: 'assignErrorToContext'
					}
				]
			},
			on: {
				FETCH: {},
				RECEIVE_DATA: {
					target: 'SaveCartID',
					cond: 'New guard',
					actions: 'assignDataToContext'
				}
			}
		}
	},
	schema: {
		context: {} as {},
		events: {} as
			| { type: 'FETCH' }
			| { type: 'RECEIVE_DATA' }
			| { type: 'SERVER_CHECK' }
			| { type: 'false' }
			| { type: 'true' }
			| { type: 'complete' }
	},
	context: {},
	predictableActionArguments: true,
	preserveActionOrder: true
})

const GlobalContext = createContext<ContextProps>()

export function GlobalContextProvider(props: any) {
	const [useMedusa, setMedusa] = createSignal<Medusa>(newMedusa())

	function newMedusa() {
		const medusa = new Medusa({
			maxRetries: 3,
			baseUrl: import.meta.env.VITE_PUBLIC_MEDUSA_BACKEND_URL
		})
		return medusa
	}
	const medusa = useMedusa()

  const [state, send] = useMachine(cartIDFetch)

	const cart = medusa.carts
		.create()
		.then(({ cart }) => {
			console.log('CART', cart)
			return cart
		})
		.catch(_ => {
			redirect('/404')
		})

	console.log('CART', cart)

	return (
		<GlobalContext.Provider value={{ medusa, cart }}>
			{props.children}
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(GlobalContext)!
