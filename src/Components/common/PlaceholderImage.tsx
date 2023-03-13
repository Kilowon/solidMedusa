export function PlaceholderImage({ title }: any) {
	return (
		<img
			src={`https://fakeimg.pl/405x480/?text=${title}&font=poppins`}
			alt="placeholder image"
		/>
	)
}
