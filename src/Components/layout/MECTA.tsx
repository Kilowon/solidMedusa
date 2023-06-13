import { Image } from '@unpic/solid'

export default function MECTA() {
	return (
		<div class="py-4 flex justify-center items-center w-full">
			<div class="content-container flex justify-center">
				<span>
					<div class="relative hidden md:block ">
						<Image
							src="https://res.cloudinary.com/contentdelivery/image/upload/v1684413389/couch_npht3q.webp"
							width={100}
							height={100}
							alt="couch"
						/>
						<div class="absolute text-white top-6 right-3.5 z-15 text-2xl font-bold font-poppins ">ME</div>
					</div>
				</span>
			</div>
		</div>
	)
}