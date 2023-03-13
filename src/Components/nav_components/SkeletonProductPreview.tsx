function SkeletonProductPreview() {
	return (
		<div class="animate-pulse">
			<div class="aspect-[29/34] w-full bg-gray-100">
				<img
					src="https://fakeimg.pl/300x352/282828/?text=...&font=poppins"
					alt=""
				/>
			</div>
			<div class="text-base mt-2">
				<div class="w-3/5 h-6 bg-gray-8">...</div>

				<div class="w-2/5 h-6 bg-gray-8 mt-2"></div>
			</div>
		</div>
	)
}

export default SkeletonProductPreview
