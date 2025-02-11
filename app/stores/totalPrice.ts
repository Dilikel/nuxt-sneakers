import { defineStore } from 'pinia'

export const useTotalPriceStore = defineStore('totalPrice', {
	state: () => ({
		totalPrice: 0,
	}),
	actions: {
		updatePrice(newPrice: number) {
			this.totalPrice = newPrice
		},
	},
})
