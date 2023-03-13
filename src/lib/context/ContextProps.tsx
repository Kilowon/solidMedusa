//
//
//
// This is an example of how to use the Context API in SolidJS without errors from the TypeScript compiler.
// I leave this here for future reference. until SolidJS has a better solution. or the SolidJS docs are updated.
//
//

import {
	Accessor,
	Setter,
	createContext,
	useContext,
	createSignal,
	Component,
	createEffect
} from 'solid-js'
import { createStore } from 'solid-js/store'

interface ContextProps {
	count: Accessor<number> | null
	setCount: Setter<number>
	pageName: Accessor<string> | null
	setPageName: Setter<string>
}

const GlobalContext = createContext<ContextProps>()

///////////////////////////////////////////
//
// Wrap the app in the provider
//
///////////////////////////////////////////

export function GlobalContextProvider(props: any) {
	const [count, setCount] = createSignal(0)
	const [pageName, setPageName] = createSignal('')

	return (
		<GlobalContext.Provider value={{ count, setCount, pageName, setPageName }}>
			{props.children}
		</GlobalContext.Provider>
	)
}
///////////////////////////////////////////
//
// Remember to use the bang operator (!) to tell TypeScript that the value will never be null.
//
///////////////////////////////////////////

export const useGlobalContext = () => useContext(GlobalContext)!

///////////////////////////////////////////
//
// Usage: in a component
//
///////////////////////////////////////////

export const ContextExample: Component = () => {
	const { count, setCount, pageName, setPageName } = useGlobalContext()

	createEffect(() => {
		setCount(1)
		setPageName('Home')
	})

	return (
		<div>
			<h1>This is the {pageName}</h1>
			<p>This is the count: {count}</p>
		</div>
	)
}

///////////////////////////////////////////
//
// Usage: of diffrent Signal/Store types
//
///////////////////////////////////////////

const [countr, setCountr] = createSignal(0)
countr()
setCountr(countr => countr + 1)

const [myObject, setMyObject] = createSignal({ name: 'John', age: 30 })
myObject().name
setMyObject({ name: 'Jane', age: 30 })

const [myStore, setMyStore] = createStore({ name: 'John', age: 30 })
myStore.name
setMyStore('name', 'Jane')
