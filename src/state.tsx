import { createSignal } from 'solid-js'

const [openCart, setOpenCart] = createSignal(false)

export { openCart, setOpenCart }

const [openMenu, setOpenMenu] = createSignal(false)

export { openMenu, setOpenMenu }

const [accountStatus, setAccountStatus] = createSignal<'active' | 'inactive'>('inactive')

export { accountStatus, setAccountStatus }
