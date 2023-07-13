// @refresh reload
import { Suspense, SuspenseList } from 'solid-js'
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
import NotFound from './routes/[...404]'
import { StoreProvider } from '~/Context/StoreContext'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { Image } from '@unpic/solid'
//@ts-ignore
const SolidQueryDevtools = unstable_clientOnly(() => import('@adeora/solid-query-devtools'))

const queryClient = new QueryClient()
export default function Root() {
	return (
		<Html
			lang="en"
			class="overflow-y-scroll"
		>
			<Head>
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
			</Head>
			<Body>
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
										<section class="flex justify-center h-[100vh] w-[100vw] p-16 text-gray-600 bg-gray-100 text-xl">
											<div class="flex flex-col items-center">Loading</div>
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
