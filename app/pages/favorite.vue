<script setup>
import CardList from '~/components/Home/CardList.vue'
import { useFavoriteStore } from '~/stores/favorite'
import { useCartStore } from '~/stores/cart'
import { storeToRefs } from 'pinia'

useHead({
	title: 'Закладки',
})

const favoriteStore = useFavoriteStore()
const { favorite } = storeToRefs(favoriteStore)
const cartStore = useCartStore()
</script>

<template>
	<div
		class="max-w-[1400px] w-full px-5 mx-auto min-h-screen flex flex-col items-center py-5 animate__animated animate__fadeIn"
	>
		<h1 class="text-3xl md:text-5xl font-bold text-gray-800 mb-8 text-center">
			Закладки
		</h1>
		<div class="w-full">
			<CardList
				:items="favorite"
				@add-to-cart="cartStore.toggleCartItem"
				@add-to-favorite="favoriteStore.toggleFavoriteItem"
			/>
		</div>

		<div v-if="favorite.length === 0" class="text-center">
			<p class="text-lg md:text-2xl text-gray-500">
				У вас пока нет избранных товаров
			</p>
		</div>
	</div>
</template>
