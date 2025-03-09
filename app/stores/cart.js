import { defineStore } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useAuth } from '~/composables/useAuth'
import { useToast } from 'vue-toastification'

export const useCartStore = defineStore('cart', () => {
	const config = useRuntimeConfig()
	const token = useCookie('token')
	const userStore = useUserStore()
	const { fetchUser } = useAuth()
	const toast = useToast()
	const cart = useState('cart', () => [])

	async function loadCart() {
		if (process.client) {
			if (!token.value) {
				const localCart = localStorage.getItem('cart')
				if (localCart) {
					cart.value = JSON.parse(localCart)
				}
			}
		}
		if (token.value) {
			await fetchUser()
			cart.value = userStore.user.cart
		}
	}

	async function updateCart() {
		if (token.value) {
			await $fetch(`${config.public.API_URL}/users/${userStore.user.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token.value}`,
				},
				body: { cart: cart.value },
			})
				.then(() => {})
				.catch(error => {
					console.error(error)
					toast.error('Произошла ошибка при обновлении корзины.')
				})
		}
	}

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

	watch(
		cart,
		() => {
			if (process.client) {
				token.value
					? updateCart()
					: localStorage.setItem('cart', JSON.stringify(cart.value))
			}
		},
		{ deep: true }
	)
	return {
		loadCart,
		cart,
		toggleCartItem,
		isInCart,
		totalPrice,
		removeCartItem,
		cartCount,
	}
})
