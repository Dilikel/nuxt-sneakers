import { defineStore } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useAuth } from '~/composables/useAuth'
import { useToast } from 'vue-toastification'

export const useFavoriteStore = defineStore('favorite', () => {
	const config = useRuntimeConfig()
	const token = useCookie('token')
	const userStore = useUserStore()
	const { fetchUser } = useAuth()
	const toast = useToast()
	const favorite = useState('favorite', () => [])

	async function loadFavorite() {
		if (process.client) {
			if (!token.value) {
				const localFavorites = localStorage.getItem('favorite')
				if (localFavorites) {
					favorite.value = JSON.parse(localFavorites)
				}
			}
		}
		if (token.value) {
			await fetchUser()
			favorite.value = userStore.user.favorites
		}
	}

	async function updateFavorite() {
		if (token.value) {
			await $fetch(`${config.public.API_URL}/users/${userStore.user.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token.value}`,
				},
				body: { favorites: favorite.value },
			})
				.then(() => {})
				.catch(error => {
					console.error(error)
					toast.error('Произошла ошибка при обновлении корзины.')
				})
		}
	}

	const toggleFavoriteItem = item => {
		const index = favorite.value.findIndex(
			favoriteItem => favoriteItem.id === item.id
		)
		if (index === -1) {
			favorite.value.push(item)
		} else {
			favorite.value.splice(index, 1)
		}
	}
	const removeFavoriteItem = item => {
		const index = favorite.value.findIndex(
			favoriteItem => favoriteItem.id === item.id
		)
		if (index !== -1) {
			favorite.value.splice(index, 1)
		}
	}
	const isInFavorite = computed(() => id => {
		return favorite.value.some(item => item.id === id)
	})

	const favoriteCount = computed(() => favorite.value.length)

	watch(
		favorite,
		() => {
			if (process.client) {
				token.value
					? updateFavorite()
					: localStorage.setItem('favorite', JSON.stringify(favorite.value))
			}
		},
		{ deep: true }
	)

	return {
		loadFavorite,
		favorite,
		toggleFavoriteItem,
		isInFavorite,
		removeFavoriteItem,
		favoriteCount,
	}
})
