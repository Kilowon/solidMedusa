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
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'
import clsx from 'clsx'
import { getWindowSize } from '@solid-primitives/resize-observer'

function PlausibleScript() {
	onMount(() => {
		const script = document.createElement('script')
		script.defer = true
		script.dataset.domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN
		script.src = import.meta.env.VITE_PLAUSIBLE_SCRIPT_SRC
		document.head.appendChild(script)
	})
	//ol
	return null
}

export function MetaTags() {
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
				content="max-age=63072000 includeSubDomains preload"
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
				content="default-src 'self' modernedge.app *.modernedge.app direct.shauns.cool services.shauns.cool endpoint.shauns.cool ; img-src https://*; child-src 'none'; "
			/>
			<Meta
				http-equiv="Referrer-Policy"
				content="strict-origin-when-cross-origin"
			/>
		</>
	)
}

import { openCart, openMenu, cartDrawer, menuDrawer } from '~/state'

const queryClient = new QueryClient()

export default function Root() {
	return (
		<Html
			lang="en"
			class={clsx(
				' bg-transparent ',
				openCart() === true && 'overflow-hidden scrollbar-gutter',
				openMenu() === true && 'overflow-hidden scrollbar-gutter',
				cartDrawer().cart === 'active' && 'overflow-hidden',
				menuDrawer().menu === 'active' && 'overflow-hidden',
				openCart() === false && openMenu() === false && getWindowSize().width > 1023 && 'overflow-y-scroll',
				cartDrawer().cart === 'hidden' &&
					menuDrawer().menu === 'hidden' &&
					getWindowSize().width <= 1023 &&
					'overflow-y-scroll'
			)}
		>
			<Head>
				<MetaTags />
				<Title>{import.meta.env.VITE_STORE_NAME}</Title>
				<Meta charset="utf-8" />
				<Meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta
					name="description"
					content={import.meta.env.VITE_STORE_DESCRIPTION}
				/>
				<Meta
					name="robots"
					content="index, follow"
				/>
				<Meta
					name="keywords"
					content={import.meta.env.VITE_STORE_KEYWORDS}
				/>
				<Meta
					name="twitter:title"
					content={import.meta.env.VITE_OL_TITLE || ''}
				/>
				<Meta
					name="twitter:description"
					content={import.meta.env.VITE_OL_DESC || ''}
				/>
				<Meta
					name="twitter:site"
					content={import.meta.env.VITE_OL_SITE || ''}
				/>{' '}
				<Meta
					name="twitter:domain"
					content={import.meta.env.VITE_OL_DOMAIN || ''}
				/>
				<Meta
					name="twitter:image"
					content={`${import.meta.env.VITE_DIRECTUS_URL}/assets/${import.meta.env.VITE_OL_LOGO}`}
				/>
				<Meta
					name="twitter:summary"
					content={import.meta.env.VITE_OL_DESC || ''}
				/>
				<Meta
					name="twitter:card"
					content={'summary_large_image'}
				/>
				<Link
					rel="icon"
					href={import.meta.env.VITE_STORE_FAVICON}
				/>
				<Link
					rel="preconnect"
					href={`${import.meta.env.VITE_DIRECTUS_URL}/items/Primary`}
				/>
				<Link
					rel="preconnect"
					href="https://fonts.googleapis.com"
				/>
				<Link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossorigin="anonymous"
				/>
		{/* 		<PlausibleScript /> */}
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
						<GlobalContextProvider>
							<StoreProvider>
								{/* <Suspense
									fallback={
										<section class="flex justify-center h-[100vh] w-[100vw] p-16  bg-white text-xl">
											<div class="flex flex-col items-center">
												<div class="i-ic-round-menu  font-400 text-white">Loading.</div>
												 <div class="i-la-user-plus font-500 text-white">{`Loading..`}</div>
												<div class="i-ion-cart-outline font-700 text-white">Loading...</div> 
											</div>
										</section>
									}
								> */}
								<Routes>
									<FileRoutes />
								</Routes>
								{/* </Suspense> */}
							</StoreProvider>
						</GlobalContextProvider>
						<SolidQueryDevtools initialIsOpen={false} />
					</QueryClientProvider>
				</ErrorBoundary>
				<Scripts />
			</Body>
		</Html>
	)
}
