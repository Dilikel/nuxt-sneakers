import { defineStore } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useToast } from 'vue-toastification'
import { useAuth } from '~/composables/useAuth'

export const useOrderStore = defineStore('order', {
	state: () => ({
		orders: [],
	}),

	actions: {
		addOrder(order) {
			const token = useCookie('token')
			this.orders.push(order)
			token.value ? this.saveOrdersToServer() : this.saveOrdersToLocalStorage()
		},
		changeStatus(orderId, newStatus) {
			const token = useCookie('token')
			const order = this.orders.find(order => order.orderId === orderId)
			if (order) {
				order.status = newStatus
				token.value
					? this.saveOrdersToServer()
					: this.saveOrdersToLocalStorage()
			} else {
				console.warn(`Заказ с ID ${orderId} не найден`)
			}
		},
		saveOrdersToLocalStorage() {
			if (process.client) {
				localStorage.setItem('orders', JSON.stringify(this.orders))
			}
		},
		loadOrdersFromLocalStorage() {
			if (process.client) {
				this.orders = JSON.parse(localStorage.getItem('orders')) || []
			}
		},
		async saveOrdersToServer() {
			const token = useCookie('token')
			if (!token.value) return
			const config = useRuntimeConfig()
			const toast = useToast()
			const userStore = useUserStore()
			const { fetchUser } = useAuth()
			await fetchUser()
			await $fetch(`${config.public.API_URL}/users/${userStore.user.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token.value}`,
				},
				body: { orders: this.orders },
			})
				.then(response => {})
				.catch(error => {
					toast.error('Произошла ошибка при сохранении заказов.')
				})
		},
		async loadFromServer() {
			const token = useCookie('token')
			if (!token.value) return
			const config = useRuntimeConfig()
			const toast = useToast()
			const userStore = useUserStore()
			const { fetchUser } = useAuth()
			await fetchUser()
			await $fetch(`${config.public.API_URL}/users/${userStore.user.id}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token.value}`,
				},
			})
				.then(response => (this.orders = response.orders))
				.catch(error => {
					toast.error('Произошла ошибка при загрузке заказов.')
				})
		},
	},

	getters: {
		getOrders: state => state.orders,
	},
})
