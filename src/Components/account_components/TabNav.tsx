import clsx from 'clsx'

export default function TabNav(props: { activeTab: any; setActiveTab: any }) {
	return (
		<div class="mb-4 border-b border-normal_3 ">
			<ul
				class="flex -mb-px text-xs lg:text-base font-medium text-center space-x-0.25 md:space-x-4 lg:space-x-6 "
				id="myTab"
				data-tabs-toggle="#myTabContent"
				role="tablist"
			>
				<li
					class=""
					role="presentation"
				>
					<button
						class={clsx(
							'inline-block p-1 lg:p-3 border-b-2 rounded-t-lg h-full w-18 sm:w-25 lg:w-31 bg-normal_1 md:bg-normal_2',
							props.activeTab().overview === 'active' && ' border-text_2 text-text_2  ',
							props.activeTab().overview === 'inactive' && 'hover:text-text_2 hover:border-text_5 '
						)}
						id="description-tab"
						data-tabs-target="#description"
						type="button"
						role="tab"
						aria-controls="description"
						aria-selected="false"
						onClick={() => {
							if (props.activeTab().overview === 'inactive') {
								props.setActiveTab({
									overview: 'active',
									profile: 'inactive',
									orders: 'inactive',
									reviews: 'inactive',
									wishlist: 'inactive'
								})
								return
							}
							if (props.activeTab().overview === 'active') {
								props.setActiveTab({
									overview: 'inactive',
									profile: 'inactive',
									orders: 'inactive',
									reviews: 'inactive',
									wishlist: 'inactive'
								})
							}
						}}
					>
						<div class="flex flex-col lg:flex-row justify-center items-center">
							<div class="i-fluent-clipboard-text-ltr-24-regular sm:text-lg text-text_2 lg:mr-2 " />
							<div class="text-0.65rem sm:text-base">Overview</div>
						</div>
					</button>
				</li>
				<li
					class=""
					role="presentation"
				>
					<button
						class={clsx(
							'inline-block p-1 border-b-2 rounded-t-lg h-full w-18 sm:w-25 lg:w-33 bg-normal_1 md:bg-normal_2',
							props.activeTab().profile === 'active' && ' border-text_2 text-text_2  ',
							props.activeTab().profile === 'inactive' && 'hover:text-text_2 hover:border-text_5 '
						)}
						id="profile-tab"
						data-tabs-target="#profile"
						type="button"
						role="tab"
						aria-controls="profile"
						aria-selected="false"
						onClick={() => {
							if (props.activeTab().profile === 'inactive') {
								props.setActiveTab({
									overview: 'inactive',
									profile: 'active',
									orders: 'inactive',
									reviews: 'inactive',
									wishlist: 'inactive'
								})
								return
							}
							if (props.activeTab().profile === 'active') {
								props.setActiveTab({
									overview: 'inactive',
									profile: 'inactive',
									orders: 'inactive',
									reviews: 'inactive',
									wishlist: 'inactive'
								})
							}
						}}
					>
						<div class="flex flex-col lg:flex-row justify-center items-center ">
							<div class="i-vaadin-clipboard-user sm:text-lg bg-text_2 lg:mr-2" />
							<div class="text-0.65rem sm:text-base">Profile</div>
						</div>
					</button>
				</li>
				<li
					class=""
					role="presentation"
				>
					<button
						class={clsx(
							'inline-block p-1 border-b-2 rounded-t-lg h-full w-18 sm:w-25 lg:w-31 bg-normal_1 md:bg-normal_2',
							props.activeTab().orders === 'active' && ' border-text_2 text-text_2  ',
							props.activeTab().orders === 'inactive' && 'hover:text-text_2 hover:border-text_5 '
						)}
						id="orders-tab"
						data-tabs-target="#orders"
						type="button"
						role="tab"
						aria-controls="orders"
						aria-selected="false"
						onClick={() => {
							if (props.activeTab().orders === 'inactive') {
								props.setActiveTab({
									overview: 'inactive',
									profile: 'inactive',
									orders: 'active',
									reviews: 'inactive',
									wishlist: 'inactive'
								})
								return
							}
							if (props.activeTab().orders === 'active') {
								props.setActiveTab({
									overview: 'inactive',
									profile: 'inactive',
									orders: 'inactive',
									reviews: 'inactive',
									wishlist: 'inactive'
								})
							}
						}}
					>
						{' '}
						<div class="flex flex-col lg:flex-row justify-center items-center ">
							<div class="i-ph-truck sm:text-lg text-text_2 lg:mr-2" />
							<div class="text-0.65rem sm:text-base">Orders</div>
						</div>
					</button>
				</li>
				<li
					class=""
					role="presentation"
				>
					<button
						class={clsx(
							'inline-block p-1 border-b-2 rounded-t-lg  h-full  w-18 sm:w-25 lg:w-31 bg-normal_1 md:bg-normal_2',
							props.activeTab().reviews === 'active' && ' border-text_2 text-text_2  ',
							props.activeTab().reviews === 'inactive' && 'hover:text-text_2 hover:border-text_5 '
						)}
						id="reviews-tab"
						data-tabs-target="#reviews"
						type="button"
						role="tab"
						aria-controls="reviews"
						aria-selected="false"
						onClick={() => {
							if (props.activeTab().reviews === 'inactive') {
								props.setActiveTab({
									overview: 'inactive',
									profile: 'inactive',
									orders: 'inactive',
									reviews: 'active',
									wishlist: 'inactive'
								})
								return
							}
							if (props.activeTab().reviews === 'active') {
								props.setActiveTab({
									overview: 'inactive',
									profile: 'inactive',
									orders: 'inactive',
									reviews: 'inactive',
									wishlist: 'inactive'
								})
							}
						}}
					>
						<div class="flex flex-col lg:flex-row sm:space-x-1  lg:flex-row justify-center items-center">
							<div class="i-ic-baseline-star-rate sm:text-lg text-text_2 lg:mr-2" />
							<div class="text-0.65rem sm:text-base">Reviews</div>
						</div>
					</button>
				</li>
				<li
					class=""
					role="presentation"
				>
					<button
						class={clsx(
							'inline-block p-1 border-b-2 rounded-t-lg h-full w-18 sm:w-25 lg:w-31 bg-normal_1 md:bg-normal_2',
							props.activeTab().wishlist === 'active' && ' border-text_2 text-text_2  ',
							props.activeTab().wishlist === 'inactive' && 'hover:text-text_2 hover:border-text_5 '
						)}
						id="wishlist-tab"
						data-tabs-target="#wishlist"
						type="button"
						role="tab"
						aria-controls="wishlist"
						aria-selected="false"
						onClick={() => {
							if (props.activeTab().wishlist === 'inactive') {
								props.setActiveTab({
									overview: 'inactive',
									profile: 'inactive',
									orders: 'inactive',
									reviews: 'inactive',
									wishlist: 'active'
								})
								return
							}
							if (props.activeTab().wishlist === 'active') {
								props.setActiveTab({
									overview: 'inactive',
									profile: 'inactive',
									orders: 'inactive',
									reviews: 'inactive',
									wishlist: 'inactive'
								})
							}
						}}
					>
						{' '}
						<div class="flex flex-col lg:flex-row sm:space-x-1  justify-center items-center">
							<div class="i-fa6-regular-thumbs-up sm:sm:text-lg text-text_2 lg:mr-2" />
							<div class="text-0.65rem sm:text-base">Wish List</div>
						</div>
					</button>
				</li>
			</ul>
		</div>
	)
}
