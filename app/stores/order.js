import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
	state: () => ({
		orders: process.client
			? JSON.parse(localStorage.getItem('orders')) || []
			: [],
	}),

	actions: {
		addOrder(order) {
			this.orders.push(order)
			this.saveOrdersToLocalStorage()
		},
		changeStatus(orderId, newStatus) {
			const order = this.orders.find(order => order.orderId === orderId)
			if (order) {
				order.status = newStatus
				this.saveOrdersToLocalStorage()
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
	},

	getters: {
		getOrders: state => state.orders,
	},
})
