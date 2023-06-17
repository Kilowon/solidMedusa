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

const SolidQueryDevtools = unstable_clientOnly(() => import('@adeora/solid-query-devtools'))

const queryClient = new QueryClient()
export default function Root() {
	return (
		<Html lang="en">
			<Head>
				<Title>Store</Title>
				<Meta charset="utf-8" />
				<Meta
					http-equiv="Content-Security-Policy"
					content="script-src https://medusa-public-images.s3.eu-west-1.amazonaws.com
					https://res.cloudinary.com/ https://solid.shauns.cool"
				/>

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
								<SuspenseList
									revealOrder="forwards"
									tail="collapsed"
								>
									<Suspense
										fallback={
											<section class="flex justify-center h-[100vh] w-[100vw] p-16 text-orange-600 bg-gray-100 text-xl">
												<div class="flex flex-col items-center">
													<Image
														src="https://res.cloudinary.com/contentdelivery/image/upload/v1684413389/couch_npht3q.webp"
														alt="logo"
														layout="constrained"
														width={600}
														height={600}
														priority={true}
														class="w-20 h-20 mt-35 md:mt-70"
													/>
													<div class="i-svg-spinners:bars-scale-fade" />
												</div>
											</section>
										}
									>
										<Routes>
											<FileRoutes />
										</Routes>
									</Suspense>
								</SuspenseList>
							</StoreProvider>
						</GlobalContextProvider>
					</QueryClientProvider>
				</ErrorBoundary>
				<Scripts />
			</Body>
		</Html>
	)
}
