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
	Title
} from 'solid-start'
import 'uno.css'
import '@unocss/reset/tailwind.css'
import { Footer } from '~/Components/layout/Footer'
import { GlobalContextProvider } from '~/Context/Providers'

export default function Root() {
	return (
		<Html lang="en">
			<Head>
				<Title>SolidStart - Bare</Title>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Body>
				<GlobalContextProvider>
					<Suspense fallback={<>Loading...</>}>
						<ErrorBoundary>
							<Routes>
								<FileRoutes />
							</Routes>
							<Footer />
						</ErrorBoundary>
					</Suspense>
				</GlobalContextProvider>
				<Scripts />
			</Body>
		</Html>
	)
}
