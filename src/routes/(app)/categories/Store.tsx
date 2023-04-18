import { useGlobalContext } from '~/Context/Providers'
import { useParams, Title, Meta, A } from 'solid-start'
import { createEffect, createSignal, For, Show } from 'solid-js'
import ProductPreview from '~/Components/nav_components/ProductPreview'

export default function Categories() {
	const params = useParams()
	const { categories } = useGlobalContext()
	const { setCurrentCategoryId } = useGlobalContext()
	const { categoryProducts } = useGlobalContext()

	function filterCategories() {
		return categories()?.filter(
			(category: any) => category.handle === params.handle
		)
	}

	function filterCategoriesRoot() {
		return categories()?.filter(
			(category: any) => category.parent_category === null
		)
	}

	const [currentCategory, setCategory] = createSignal(filterCategories())
	const [currentCategoryRoot, setCategoryRoot] = createSignal(
		filterCategoriesRoot()
	)

	createEffect(() => {
		console.log('currentCategoryRoot', currentCategoryRoot())
		setCategory(filterCategories())
		setCurrentCategoryId?.(
			currentCategoryRoot().map((category: any) => category.id)
		)
	}, [params.handle])

	return (
		<div>
			<Title>{currentCategory()[0]?.name}</Title>
			<Meta
				itemProp="description"
				content={currentCategory()[0]?.handle}
			/>
			<Meta
				itemProp="og:title"
				content={currentCategory()[0]?.name}
			/>

			<main>
				<div class="py-12 ">
					<div class="content-container py-12 ">
						<div class="flex flex-col  mb-16 ">
							<span class="text-base text-gray-600 mb-6">Latest products</span>
							<div class="text-2xl text-gray-900 ">
								<div class="grid grid-cols-8 object-center justify-center">
									<Show when={categories()}>
										<For each={categories()}>
											{(child: any) => (
												<div class="pb-3">
													<A href={`/categories/${child?.handle}`}>{child?.name}</A>
												</div>
											)}
										</For>
									</Show>
								</div>
							</div>
						</div>
						<ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
							<For each={currentCategoryRoot()}>
								{(rootCategory: any) => (
									<>
										<div class="pb-3">
											<A href={`/categories/${rootCategory?.handle}`}>
												{rootCategory?.name}
											</A>
										</div>
										<For each={categoryProducts()}>
											{(product: any) => {
												{
													console.log('DISEN', product, rootCategory.id)
												}
												if (product.category_id === rootCategory.id) {
													return (
														<li>
															<ProductPreview {...product} />
														</li>
													)
												}
											}}
										</For>
									</>
								)}
							</For>
						</ul>
					</div>
				</div>
			</main>
		</div>
	)
}
