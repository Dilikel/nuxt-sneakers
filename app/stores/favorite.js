import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorite', () => {
	const favorite = ref([])
	const loadFavorite = () => {
		const localFavorites = localStorage.getItem('favorite')
		if (localFavorites) {
			favorite.value = JSON.parse(localFavorites)
		}
	}

	loadFavorite()
	watch(
		favorite,
		() => {
			localStorage.setItem('favorite', JSON.stringify(favorite.value))
		},
		{ deep: true }
	)
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

	return {
		favorite,
		toggleFavoriteItem,
		isInFavorite,
		removeFavoriteItem,
		favoriteCount,
	}
})
