<script setup>
import CardList from '~/components/Home/CardList.vue'
import Loader from '~/components/Loader.vue'
import CartButton from '~/components/Home/CartButton.vue'
import { useCartStore } from '~/stores/cart'
import { useFavoriteStore } from '~/stores/favorite'

useHead({
	title: 'Главная',
})

const config = useRuntimeConfig()
const items = ref([])
const isLoading = ref(true)
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()

const filters = reactive({
	sortBy: 'title',
	searchQuery: '',
})

async function fetchItems() {
	const params = {
		sortBy: filters.sortBy,
	}
	if (filters.searchQuery) {
		params['title'] = `*${filters.searchQuery}*`
	}
	await $fetch(`${config.public.API_URL}/items`, {
		method: 'GET',
		params,
	})
		.then(response => {
			items.value = response
		})
		.catch(error => {
			console.error(error)
		})
		.finally(() => {
			isLoading.value = false
		})
}

const onChangeSelect = event => {
	filters.sortBy = event.target.value
}

const onChangeSearchInput = event => {
	filters.searchQuery = event.target.value
}

onMounted(async () => {
	await fetchItems()
})

watch(filters, async () => {
	await fetchItems()
})
</script>

<template>
	<Loader v-if="isLoading" />
	<div
		v-else
		class="max-w-[1400px] w-full px-5 mx-auto min-h-[100vh] animate__animated animate__fadeIn animate__faster"
	>
		<h2
			class="text-2xl font-bold mt-[10px] mb-[10px] text-center text-gray-800"
		>
			🔥 Все кроссовки
		</h2>
		<div
			class="flex justify-between items-center flex-wrap mb-5 gap-2.5 max-md:flex-col max-md:items-stretch"
		>
			<div class="relative flex items-center max-md:w-full rounded-lg">
				<img
					src="~/assets/icons/search.svg"
					class="absolute left-2 w-4 h-4 opacity-70 select-none"
				/>
				<input
					type="text"
					placeholder="Поиск..."
					@input="onChangeSearchInput"
					class="pl-8 pr-3 py-2 border rounded-md w-full text-sm border-gray-300 focus:outline-none"
				/>
			</div>
			<select
				@change="onChangeSelect"
				class="border px-3 py-2 rounded-md max-md:w-full border-gray-300 focus:outline-none bg-white"
			>
				<option value="title">По названию</option>
				<option value="price">По цене (дешевые)</option>
				<option value="-price">По цене (дорогие)</option>
			</select>
		</div>
		<CardList
			:items="items"
			:isFavorites="false"
			@add-to-cart="cartStore.toggleCartItem"
			@add-to-favorite="favoriteStore.toggleFavoriteItem"
		/>
		<CartButton class="hidden max-md:block" />
	</div>
</template>
