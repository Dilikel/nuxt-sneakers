import { defineStore } from 'pinia'
import type { User } from '@/types/user'

export const useUserStore = defineStore('UserStore', {
	state: (): { user: User } => ({
		user: {
			id: 0,
			name: '',
			email: '',
			totalPrice: 0,
		},
	}),
	actions: {
		setUser(userData: User) {
			this.user = userData
		},
		logout() {
			this.user = { id: 0, name: '', email: '', totalPrice: 0 }
		},
	},
	getters: {
		getUser(): User {
			return this.user
		},
	},
})
