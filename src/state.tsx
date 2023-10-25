import { createSignal } from 'solid-js'

const [openCart, setOpenCart] = createSignal(false)

export { openCart, setOpenCart }

const [openMenu, setOpenMenu] = createSignal(false)

export { openMenu, setOpenMenu }

const [accountStatus, setAccountStatus] = createSignal<'active' | 'inactive'>('inactive')

export { accountStatus, setAccountStatus }

const [cartDrawer, setCartDrawer] = createSignal({
	cart: 'hidden' as 'hidden' | 'active'
})

export { cartDrawer, setCartDrawer }

const [menuDrawer, setMenuDrawer] = createSignal({
	menu: 'hidden' as 'hidden' | 'active'
})

export { menuDrawer, setMenuDrawer }

const [isScroll, setIsScroll] = createSignal(true)

export { isScroll, setIsScroll }

const [isVisible, setIsVisible] = createSignal(false)

export { isVisible, setIsVisible }
