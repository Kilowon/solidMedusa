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
import { Footer } from '~/Components/layout/Footer'
import { GlobalContextProvider } from '~/Context/Providers'
import HttpStatusCode from 'solid-start'
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
								<NotFound />
							</>
						)}
					>
						<Suspense fallback={<>Loading...</>}>
							<Routes>
								<FileRoutes />
							</Routes>
							<Footer />
						</Suspense>
					</ErrorBoundary>
				</GlobalContextProvider>
				<Scripts />
			</Body>
		</Html>
	)
}
