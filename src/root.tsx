// @refresh reload
import { Suspense } from 'solid-js'
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
	Link
} from 'solid-start'
import 'uno.css'
import '@unocss/reset/tailwind.css'
import { GlobalContextProvider } from '~/Context/Providers'
import NotFound from './routes/[...404]'

export default function Root() {
	return (
		<Html lang="en">
			<Head>
				<Title>SolidStart - Bare</Title>
				<Meta charset="utf-8" />
				<Meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta
					name="description"
					content="SolidJs-MedusaJs-Starter"
				/>
				<Link
					rel="icon"
					href="/favicon.ico"
				/>
				<Link
					rel="preload"
					as="image"
					href="https://res.cloudinary.com/contentdelivery/image/upload/c_scale,w_600,z_1/v1677462156/hero_b4p7fs.webp"
				/>
				<Link
					rel="preload"
					as="image"
					href="https://res.cloudinary.com/contentdelivery/image/upload/c_scale,w_440/v1677462424/cta_three_voqqzi.webp"
				/>
			</Head>
			<Body>
				<GlobalContextProvider>
					<ErrorBoundary
						fallback={(e: Error) => (
							<>
								{console.error(e)}
								<NotFound />
							</>
						)}
					>
						<Suspense
							fallback={
								<section class="flex items-center justify-center h-full p-16 bg-gray-900 text-gray-100 text-4xl">
									<div class="i-svg-spinners:bars-scale-fade" />
								</section>
							}
						>
							<Routes>
								<FileRoutes />
							</Routes>
						</Suspense>
					</ErrorBoundary>
				</GlobalContextProvider>
				<Scripts />
			</Body>
		</Html>
	)
}
