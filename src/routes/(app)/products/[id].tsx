import { useParams } from 'solid-start'

export default function Products() {
	const params = useParams()
	return (
		<div>
			<h1>The {params.id} Page</h1>
		</div>
	)
}
