import { createEffect, createSignal, For, Show, Accessor } from 'solid-js'
import { A } from 'solid-start'
import { createQuery } from '@tanstack/solid-query'
import { useParams } from 'solid-start'

export default function Info(props: { handle: string }) {
	const params = useParams()

	const [paramsCurrent, setParamsCurrent] = createSignal(params)

	const primaryData = createQuery(() => ({
		queryKey: ['primary_data'],
		queryFn: async function () {
			const response = await fetch(`${import.meta.env.VITE_DIRECTUS_URL}/items/Primary`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			})
			const data = await response.json()
			return data
		},
		cacheTime: 15 * 60 * 1000,
		retry: 0,
		enabled: false
	}))

	function getBodyContent(params: any) {
		switch (params.handle) {
			case 'about':
				return primaryData.data?.data?.contact_us_body
			case 'faq':
				return primaryData.data?.data?.faq_body
			case 'tos':
				return primaryData.data?.data?.tos_body
			case 'refund':
				return primaryData.data?.data?.refunds_body
			case 'return':
				return primaryData.data?.data?.return_body
			default:
				return null
		}
	}

	function getTitleContent(params: any) {
		switch (params.handle) {
			case 'about':
				return primaryData.data?.data?.contact_title
			case 'faq':
				return primaryData.data?.data?.faq_title
			case 'tos':
				return primaryData.data?.data?.tos_title
			case 'refund':
				return primaryData.data?.data?.refund_title
			case 'return':
				return primaryData.data?.data?.return_title
			default:
				return null
		}
	}

	createEffect(() => {
		if (paramsCurrent().handle !== params.handle) {
			setParamsCurrent(params)
		}
	})

	return (
		<div class="flex justify-center min-h-60vh">
			<div class="pt-20 px-5">
				<div class="pb-20 text-2xl font-700">{getTitleContent(paramsCurrent())}</div>
				<div class="whitespace-break-spaces max-w-200 text-sm">{getBodyContent(paramsCurrent())}</div>
			</div>
		</div>
	)
}
