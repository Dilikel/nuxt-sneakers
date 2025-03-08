<script setup lang="ts">
import 'animate.css'
import { useCartStore } from '~/stores/cart'
import { useFavoriteStore } from '~/stores/favorite'

const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()

onMounted(async () => {
	await cartStore.loadCart()
	await favoriteStore.loadFavorite()
})
</script>

<template>
	<NuxtLoadingIndicator />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
