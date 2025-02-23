import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
	const cart = useState('cart', () => [])
	const loadCart = () => {
		if (process.client) {
			const localCart = localStorage.getItem('cart')
			if (localCart) {
				cart.value = JSON.parse(localCart)
			}
		}
	}

	onMounted(() => {
		loadCart()
	})

	watch(
		cart,
		() => {
			if (process.client) {
				localStorage.setItem('cart', JSON.stringify(cart.value))
			}
		},
		{ deep: true }
	)
	const toggleCartItem = item => {
		const index = cart.value.findIndex(cartItem => cartItem.id === item.id)
		if (index === -1) {
			cart.value.push(item)
		} else {
			cart.value.splice(index, 1)
		}
	}
	const removeCartItem = item => {
		const index = cart.value.findIndex(cartItem => cartItem.id === item.id)
		if (index !== -1) {
			cart.value.splice(index, 1)
		}
	}
	const isInCart = computed(() => id => {
		return cart.value.some(item => item.id === id)
	})
	const totalPrice = computed(() =>
		cart.value.reduce((acc, item) => acc + item.price, 0)
	)

	const cartCount = computed(() => cart.value.length)

	return {
		cart,
		toggleCartItem,
		isInCart,
		totalPrice,
		removeCartItem,
		cartCount,
	}
})
