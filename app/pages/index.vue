<script setup lang="ts">
import CardList from '~/components/CardList.vue'
import type { sneaker } from '~/types/sneaker'
import Loader from '~/components/Loader.vue'

const config = useRuntimeConfig()
const items = ref<sneaker[]>([])
const filters = reactive({
	sortBy: 'title',
	searchQuery: '',
})

async function fetchItems() {
	const params: Record<string, string> = {
		sortBy: filters.sortBy,
	}

	if (filters.searchQuery) {
		params['title'] = `*${filters.searchQuery}*`
	}
	await $fetch<sneaker[]>(`${config.public.API_URL}/items`, {
		method: 'GET',
		params,
	})
		.then((response: sneaker[]) => {
			items.value = response
		})
		.catch(error => {
			console.error(error)
		})
}

const onChangeSelect = (event: Event) => {
	const target = event.target as HTMLSelectElement
	filters.sortBy = target.value
}

const onChangeSearchInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	filters.searchQuery = target.value
}

watch(filters, async () => {
	await fetchItems()
})
onMounted(async () => {
	await fetchItems()
})
</script>

<template>
	<Loader v-if="!items.length" />
	<div class="max-w-[1400px] w-full px-5 mx-auto min-h-[100vh]">
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
				class="border px-3 py-2 rounded-md max-md:w-full border-gray-300 focus:outline-none"
			>
				<option value="title">По названию</option>
				<option value="price">По цене (дешевые)</option>
				<option value="-price">По цене (дорогие)</option>
			</select>
		</div>
		<CardList :items="items" :isFavorites="false" />
	</div>
</template>
