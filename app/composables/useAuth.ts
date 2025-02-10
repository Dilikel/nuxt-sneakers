import { useUserStore } from '@/stores/user'
import type { LoginResponse } from '~/types/user'

export function useAuth() {
	const userStore = useUserStore()
	const config = useRuntimeConfig()

	async function fetchUser() {
		const token = useCookie('token')
		if (!token.value || token.value.trim() === '') return

		await $fetch<
			Pick<LoginResponse['data'], 'id' | 'name' | 'email' | 'totalPrice'>
		>(`${config.public.API_URL}/auth_me`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token.value}`,
			},
		})
			.then(response => {
				userStore.setUser(response)
			})
			.catch((error: any) => {
				console.log(error)
			})
	}

	return {
		fetchUser,
	}
}
