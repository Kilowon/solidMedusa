import { A } from 'solid-start'
import { Hero } from '~/Components/layout/Hero'
import { hydrate } from 'solid-js/web'
export default function Home() {
	return (
		<main class="bg-[#35393b]">
			<Navigation />
			<Hero />
			<FeaturedProducts />
		</main>
	)
}

export function Navigation() {
	return (
		<div class="sticky top-0 inset-x-0 z-50 group sm:!fixed" /* : isHome */>
			<header class="relative h-16 mx-auto transition-colors border-b border-transparent duration-200 bg-transparent hover:bg-[#cccccc]">
				<nav class="text-gray-900 flex items-center justify-between w-full h-full text-sm transition-colors duration-200 text-white group-hover:text-gray-900 relative">
					<div class="flex-1 basis-0 h-full flex items-center">
						<div class="block sm:hidden">
							<Hamburger /* setOpen={toggle} */ />
						</div>
						<div class="hidden sm:block h-full ml-10">
							<DropdownMenu />
						</div>
					</div>

					<div class="flex items-center h-full">
						<A
							href="/"
							class="text-3xl font-semibold uppercase"
						>
							Acme
						</A>
					</div>

					<div class="flex items-center gap-x-10 h-full flex-1 basis-0 justify-end mr-10">
						<div class="hidden sm:flex items-center gap-x-2 h-full text-sm px-3">
							{process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
							<A href="/account">Account</A>
						</div>
						<CartDropdown />
					</div>
				</nav>
				<MobileMenu />
			</header>
		</div>
	)
}

export function Hamburger() {
	return (
		<div>
			<div>Hamburger</div>
		</div>
	)
}

export function CartDropdown() {
	return (
		<div class="text-2xl px-7">
			<div class="i-ion-cart-outline"></div>
		</div>
	)
}

export function MobileMenu() {
	return (
		<div>
			<div class="sm:invisible">MOBILE MENU</div>
		</div>
	)
}

export function DesktopSearchModal() {
	return (
		<div>
			<div>DESKTOP SEARCH MODAL</div>
		</div>
	)
}

import { createEffect, createSignal, For, Switch, Match, Show } from 'solid-js'
import { useRouteData, createRouteData } from 'solid-start'
import ProductPreview from '~/Components/nav_components/ProductPreview'
import clsx from 'clsx'
import { useGlobalContext } from '~/Context/Providers'
import { isServer } from 'solid-js/web'
import { Cart } from '~/types/types'
import { refetchRouteData } from 'solid-start'

import { IsClientCheck, getProductList } from '~/Services/medusaAPI'

export function routeData() {
	const { medusa } = useGlobalContext()
	const { cart }: Cart = useGlobalContext()

	return createRouteData(async () => {
		const responceProduct: any = IsClientCheck(
			await getProductList(
				medusa,
				cart.result?.cart.id,
				3,
				cart.result?.cart.region
			)
		)

		const featuredProducts: any = IsClientCheck(
			await getProductList(
				medusa,
				cart.result?.cart.id,
				4,
				cart.result?.cart.region
			)
		)

		const responceCollection = await medusa!.collections
			.list({ limit: 8 })
			.then(({ collections: newCollections }: any) => {
				return newCollections.map((c: any) => ({
					id: c.id,
					title: c.title
				}))
			})

		return { responceProduct, responceCollection, featuredProducts }
	})
}

export function DropdownMenu() {
	const { cart } = useGlobalContext()

	createEffect(() => {
		if (!isServer) {
			console.log('CLIENTSTATE', cart.result?.cart.id)
		}
	})
	const data = useRouteData<typeof routeData>()
	data()
	const [open, setOpen] = createSignal(false)

	createEffect(() => {
		if (
			data()?.responceProduct?.map((p: any) => p.price.original_price) !== null
		) {
			refetchRouteData()
			console.log(
				'PRICE',
				data()?.responceProduct?.map((p: any) => p.price.calculated_price)
			)
		}
	})

	return (
		<div
			class=" flex items-center justify-center h-full w-full  text-2xl hover:text-gray-5 hover:transition-colors hover:duration-400 hover:cursor-pointer px-3
			"
			onMouseOver={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			<div>
				<div class="mr-2 text-sm">Store - {cart.result?.cart.id}</div>
			</div>
			<Show when={open()}>
				<div class="bg-[#cccccc] absolute top-full w-full inset-x-0 text-sm text-gray-7 z-30 mx-auto px-8">
					<div class="relative py-8 ">
						<div class="flex items-start  mx-auto px-8 w-[75vw]">
							<div class="flex flex-col flex-1 max-w-[15vw]">
								<div class="text-base text-gray-900 mb-4 font-semibold ">
									Collections
								</div>
								<div class="flex items-start">
									<Show when={data()}>
										<ul class="min-w-[152px] max-w-[200px] pr-4">
											<For each={data()?.responceCollection}>
												{collection => (
													<div class="pb-3">
														<A
															href={`/collections/${collection.id}`}
															onClick={() => setOpen(false)}
														>
															{collection.title}
														</A>
													</div>
												)}
											</For>
										</ul>
									</Show>
								</div>
							</div>
							<div class="flex-1 ">
								<div class="grid grid-cols-3 gap-1">
									<Switch>
										<Match when={data.loading}>
											<div>Loading...</div>
										</Match>
										<Match when={data.error}>
											<div>Error:{data.error?.message}</div>
										</Match>
										<Match when={data()}>
											<For each={data()?.responceProduct}>
												{product => <ProductPreview {...product} />}
											</For>
										</Match>
									</Switch>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Show>
		</div>
	)
}

import UnderlineLink from '~/Components/common/Underline-link'

export function FeaturedProducts() {
	const data = useRouteData<typeof routeData>()
	data()

	return (
		<div class="py-12">
			<div class="z-30 mx-auto px-8 py-12">
				<div class="flex flex-col items-center text-center mb-16">
					<span class="text-base text-gray-600 mb-6">Latest products</span>
					<p class="text-2xl text-gray-900 max-w-lg mb-4">
						Our newest styles are here to help you look your best.
					</p>
					<UnderlineLink href="/store">Explore products</UnderlineLink>
				</div>
				<ul class="grid grid-cols-2 grid-cols-4 gap-x-4 gap-y-8">
					<For each={data()?.featuredProducts}>
						{product => (
							<li>
								<ProductPreview {...product} />
							</li>
						)}
					</For>
				</ul>
			</div>
		</div>
	)
}
