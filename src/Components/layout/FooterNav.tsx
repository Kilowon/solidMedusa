import { A } from 'solid-start'

export default function FooterNav() {
	return (
		<div class="max-w-[1440px] w-full mx-auto px8 flex flex-col gap-y-8 pt-16 pb-8 z-1">
			<div class="flex flex-col gap-y-6 sm:flex-row items-start justify-between">
				<div>
					<A
						href="/"
						class="text-sm  md:text-xl xl:text-3xl text-gray-5 font-bold uppercase no-underline hover:underline"
					>
						Modern Edge
					</A>
				</div>
				<div class="text-sm grid grid-cols-2 gap-x-16">
					<div class="flex flex-col gap-y-2">
						<span class="text-base font-bold my-5">Collections</span>
						<ul class="grid grid-cols-1 gap-y-2">
							<li>Collections go Here</li>
						</ul>
					</div>
					<div class="flex flex-col gap-y-2">
						<span class="text-base font-bold my-5">Medusa</span>
						<ul class="grid grid-cols-1 gap-y-10 sm:gap-y-2">
							<li>
								<a
									href="https://github.com/medusajs"
									target="_blank"
									rel="noreferrer"
									class="no-underline hover:underline text-black list-latin
									"
								>
									GitHub
								</a>
							</li>
							<li>
								<a
									href="https://docs.medusajs.com"
									target="_blank"
									rel="noreferrer"
									class="no-underline hover:underline  text-black
									"
								>
									Documentation
								</a>
							</li>
							<li>
								<a
									href="https://github.com/medusajs/nextjs-starter-medusa"
									target="_blank"
									rel="noreferrer"
									class="no-underline hover:underline text-black"
								>
									Source code
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="flex flex-col-reverse gap-y-4 justify-center sm:items-center sm:flex-row sm:items-end sm:justify-between">
				<span class="text-xs text-gray-500">© Copyright 2023 Modern Edge</span>
				<div class="min-w-[316px] flex sm:justify-end">{/* TODO: <CountrySelect /> */}</div>
			</div>
		</div>
	)
}
