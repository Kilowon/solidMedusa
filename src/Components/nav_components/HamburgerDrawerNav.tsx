import { createSignal, For, Show, Suspense } from 'solid-js'
import { A } from 'solid-start'
import { useGlobalContext } from '~/Context/Providers'
import { isServer } from 'solid-js/web'

export default function HamburgerDrawerNav(props: any) {
	const { rootCategories } = useGlobalContext()
	const { categories } = useGlobalContext()
	const { collections } = useGlobalContext()

	const [selectedRoot, setSelectedRoot] = createSignal(rootCategories())
	const [backButton, setBackButton] = createSignal('inactive')

	function getChildrenOfRoot(rootCategory: { name: string }[]) {
		return categories()?.filter((category: any) => rootCategory.some(cat => cat.name === category.name))
	}

	return (
		<Show when={isServer === false}>
			<Suspense fallback={<div>Loading...</div>}>
				<div>
					<div
						class="flex items-center rounded-full z-1 relative"
						style="position: fixed; top: 0.85vh; left: 0.5rem; width: 3.75rem; height: 3rem;"
						title="Menu"
						role="button"
						tabindex="0"
						onClick={() => {
							setSelectedRoot(rootCategories())
							props.setMenuDrawer({ cart: 'active', checkout: 'active' })
						}}
						onkeypress={() => props.setMenuDrawer({ cart: 'active', checkout: 'active' })}
					>
						<div class="i-ic-round-menu w-7 h-7 ml-2" />
					</div>
					<div
						class={`fixed inset-0 bg-white/30 z-200 transition-all duration-250 ease-in-out ${
							props.menuDrawer().cart === 'active' ? '' : 'opacity-0 pointer-events-none'
						}`}
						onClick={event => {
							if (event.target === event.currentTarget) {
								props.setMenuDrawer({ cart: 'hidden', checkout: 'active' })
							}
						}}
					>
						<div
							class={`fixed top-12 left-0 h-full w-[95vw] sm:w-[40vw] bg-white z-200 transform rounded-sm transition-transform duration-500 ease-in-out p-2 ${
								props.menuDrawer().cart === 'active' ? '' : ''
							}`}
							style={{ overflow: 'auto' }}
						>
							<Show when={selectedRoot()?.length > 0 && isServer === false}>
								<ol class=" text-xl space-y-2 h-[120vh] ">
									<Show when={backButton() === 'active'}>
										<Suspense fallback={<div>Loading...</div>}>
											<button
												class="flex space-x-2 items-center w-full py-1"
												onClick={() => {
													setSelectedRoot(rootCategories())
													setBackButton('inactive')
												}}
											>
												<div class="i-octicon-chevron-left-16 text-2xl" />
												<li class=" ml-2">Back</li>
											</button>
										</Suspense>
									</Show>
									<For each={selectedRoot()}>
										{collection => {
											if (collection?.category_children?.length > 0) {
												return (
													<Suspense fallback={<div>Loading...</div>}>
														<button
															class="flex justify-between justify-center items-center w-full py-1 "
															onClick={() => {
																setSelectedRoot(getChildrenOfRoot(collection.category_children))
																setBackButton('active')
															}}
														>
															<li class=" ml-2">{collection.name}</li>
															<div class="i-octicon-chevron-right-12 text-2xl" />
														</button>
													</Suspense>
												)
											}
											if (collection?.category_children?.length === 0) {
												return (
													<Suspense fallback={<div>Loading...</div>}>
														<li
															class=" ml-2 w-full  text-gray-6"
															onClick={() => {
																setBackButton('inactive')
																props.setMenuDrawer({ menu: 'hidden' })
															}}
														>
															<A
																href={`/categories/${collection?.handle}`}
																onClick={() => {
																	setBackButton('inactive')
																	props.setMenuDrawer({ menu: 'hidden' })
																}}
															>
																{collection?.name}
															</A>
														</li>
													</Suspense>
												)
											}
										}}
									</For>
									<div class="flex flex-col space-y-1 ">
										<div class="text-base text-gray-5 bg-gray-2 p-2">
											<A
												href={`/store/Store`}
												onClick={() => props.setMenuDrawer({ menu: 'hidden' })}
											>
												Shop All Our Items{' '}
											</A>
										</div>
										<Show when={collections()?.collections}>
											<For each={collections()?.collections}>
												{collection => {
													if (collection?.metadata?.menu !== 'hidden')
														return (
															<Suspense fallback={<div>Loading...</div>}>
																<div
																	class="text-base text-gray-5 bg-gray-2   p-2 rounded-0.5"
																	onClick={() => {
																		setBackButton('inactive')
																		props.setMenuDrawer({ menu: 'hidden' })
																	}}
																>
																	<A
																		href={`/collections/${collection?.handle}`}
																		onClick={() => props.setMenuDrawer({ menu: 'hidden' })}
																	>
																		Shop {collection?.title}
																	</A>
																</div>
															</Suspense>
														)
												}}
											</For>
										</Show>
									</div>
								</ol>
							</Show>
						</div>
					</div>
				</div>
			</Suspense>
		</Show>
	)
}
