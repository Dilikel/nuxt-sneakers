import { useUserStore } from '@/stores/user'
import type { LoginResponse } from '~/types/user'
import { useToast } from 'vue-toastification'

export function useAuth() {
	const userStore = useUserStore()
	const config = useRuntimeConfig()
	const toast = useToast()

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
				token.value = null
				toast.error('Ошибка при авторизации')
				navigateTo('/login')
			})
	}

	return {
		fetchUser,
	}
}
