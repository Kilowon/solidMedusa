// @refresh reload
import { Suspense, onMount } from 'solid-js'
import {
	A,
	Body,
	ErrorBoundary,
	FileRoutes,
	Head,
	Html,
	Meta,
	Routes,
	Scripts,
	Title,
	Link,
	unstable_clientOnly
} from 'solid-start'
import 'uno.css'
import '@unocss/reset/tailwind-compat.css'
import { GlobalContextProvider } from '~/Context/Providers'
import { StoreProvider } from '~/Context/StoreContext'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import clsx from 'clsx'

function PlausibleScript() {
	onMount(() => {
		const script = document.createElement('script')
		script.defer = true
		script.dataset.domain = 'shauns.cool'
		script.src = 'https://plausible.shauns.cool/js/script.js'
		document.head.appendChild(script)
	})

	return null
}

function MetaTags() {
	let shouldRender = false

	onMount(() => {
		shouldRender = import.meta.env.VITE_DRAFT_SITE === 'false'
	})

	if (!shouldRender) {
		return null
	}

	return (
		<>
			<Meta
				http-equiv="Strict-Transport-Security"
				content="max-age=63072000 includeSubDomains"
			/>
			<Meta
				http-equiv="X-Content-Type-Options"
				content="nosniff"
			/>
			<Meta
				http-equiv="X-Frame-Options"
				content="DENY"
			/>
			<Meta
				http-equiv="X-XSS-Protection"
				content="1; mode=block"
			/>
			<Meta
				http-equiv="Content-Security-Policy"
				content="default-src https: data: "
			/>
		</>
	)
}

//@ts-ignore
const SolidQueryDevtools = unstable_clientOnly(() => import('@adeora/solid-query-devtools'))
import { openCart, openMenu } from '~/state'

const queryClient = new QueryClient()
export default function Root() {
	return (
		<Html
			lang="en"
			class={clsx(
				' bg-transparent scrollbar-gutter',
				openCart() === true && 'overflow-hidden',
				openMenu() === true && 'overflow-hidden',
				openCart() === false && openMenu() === false && 'overflow-y-scroll'
			)}
		>
			<Head>
				<MetaTags />
				<Title>Store</Title>
				<Meta charset="utf-8" />

				<Meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta
					name="description"
					content="SolidJs-MedusaJs-Ecommerce-Starter"
				/>
				<Meta
					name="robots"
					content="index, follow"
				/>
				<Meta
					name="keywords"
					content="SolidJs, MedusaJs, Ecommerce, Starter"
				/>
				<Meta
					name="author"
					content="SolidJs-MedusaJs-Ecommerce-Starter"
				/>
				<Link
					rel="icon"
					href="/favicon.ico"
				/>

				<link
					rel="preconnect"
					href="https://direct.shauns.cool/items/Primary"
				/>
				<PlausibleScript />
			</Head>
			<Body class="font-poppins">
				<ErrorBoundary
					fallback={(e: Error) => (
						<>
							{console.error(e)}
							{/* <NotFound /> */}
						</>
					)}
				>
					<QueryClientProvider client={queryClient}>
						<SolidQueryDevtools />
						<GlobalContextProvider>
							<StoreProvider>
								<Suspense
									fallback={
										<section class="flex justify-center h-[100vh] w-[100vw] p-16  bg-white text-xl">
											<div class="flex flex-col items-center">
												<div class="i-ic-round-menu  font-400 text-white">Loading.</div>
												<div class="i-la-user-plus font-500 text-white">{`Loading..`}</div>
												<div class="i-ion-cart-outline font-700 text-white">Loading...</div>
											</div>
										</section>
									}
								>
									<Routes>
										<FileRoutes />
									</Routes>
								</Suspense>
							</StoreProvider>
						</GlobalContextProvider>
					</QueryClientProvider>
				</ErrorBoundary>
				<Scripts />
			</Body>
		</Html>
	)
}
