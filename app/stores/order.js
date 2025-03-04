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
