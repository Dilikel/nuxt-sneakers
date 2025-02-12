import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
	const cart = ref([])
	const loadCart = () => {
		const localCart = localStorage.getItem('cart')
		if (localCart) {
			cart.value = JSON.parse(localCart)
		}
	}

	loadCart()
	watch(
		cart,
		() => {
			localStorage.setItem('cart', JSON.stringify(cart.value))
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

	return {
		cart,
		toggleCartItem,
		isInCart,
		totalPrice,
		removeCartItem,
	}
})
