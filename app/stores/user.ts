import { defineStore } from 'pinia'
import type { User } from '@/types/user'

export const useUserStore = defineStore('UserStore', {
	state: (): { user: Pick<User, 'id' | 'name' | 'email' | 'totalPrice'> } => ({
		user: {
			id: 0,
			name: '',
			email: '',
			totalPrice: 0,
		},
	}),
	actions: {
		setUser(userData: Pick<User, 'id' | 'name' | 'email' | 'totalPrice'>) {
			this.user = userData
		},
		logout() {
			this.user = { id: 0, name: '', email: '', totalPrice: 0 }
		},
	},
	getters: {
		getUser(): Pick<User, 'id' | 'name' | 'email' | 'totalPrice'> {
			return this.user
		},
	},
})
