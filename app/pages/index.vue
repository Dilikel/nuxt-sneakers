<script setup>
import CardList from '~/components/Home/CardList.vue'
import Loader from '~/components/Loader.vue'
import { useTotalPriceStore } from '~/stores/totalPrice'

useHead({
	title: 'Главная',
})

const config = useRuntimeConfig()
const items = ref([])
const isLoading = ref(true)
const totalPriceStore = useTotalPriceStore()
const filters = reactive({
	sortBy: 'title',
	searchQuery: '',
})
const cart = ref([])

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
			items.value = response.map(obj => ({
				...obj,
				isFavorite: false,
				favoriteId: null,
				isAdded: cart.value.some(item => item.id === obj.id),
			}))
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

const onClickAddPlus = item => {
	if (!item.isAdded) {
		cart.value.push({ ...item, isAdded: true })
		item.isAdded = true
	} else {
		cart.value = cart.value.filter(cartItem => cartItem.id !== item.id)
		item.isAdded = false
	}
}

watch(
	cart,
	() => {
		localStorage.setItem('cart', JSON.stringify(cart.value))
		totalPriceStore.updatePrice(
			cart.value.reduce((acc, item) => acc + item.price, 0)
		)
	},
	{ deep: true }
)

onMounted(async () => {
	const localCart = localStorage.getItem('cart')
	if (localCart) {
		cart.value = JSON.parse(localCart)
	}
	await fetchItems()
})

watch(filters, async () => {
	await fetchItems()
})
</script>

<template>
	<Loader v-if="isLoading" />
	<div v-else class="max-w-[1400px] w-full px-5 mx-auto min-h-[100vh]">
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
		<CardList
			:items="items"
			:isFavorites="false"
			@add-to-cart="onClickAddPlus"
		/>
	</div>
</template>
