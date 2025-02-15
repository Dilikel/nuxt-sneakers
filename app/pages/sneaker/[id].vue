<script setup>
import Loader from '@/components/Loader.vue'
import CartButton from '~/components/Home/CartButton.vue'
import { useCartStore } from '~/stores/cart'
import { useFavoriteStore } from '~/stores/favorite'

const cartStore = useCartStore()
const route = useRoute()
const config = useRuntimeConfig()
const favoriteStore = useFavoriteStore()
const isLoading = ref(true)

const sneaker = ref({
	id: 0,
	title: '',
	imageUrl: '',
	price: 0,
})

const isAdded = computed(() => cartStore.isInCart(sneaker.value.id))
const isFavorite = computed(() => favoriteStore.isInFavorite(sneaker.value.id))

const toggleCartItem = () => {
	cartStore.toggleCartItem({
		id: sneaker.value.id,
		title: sneaker.value.title,
		imageUrl: sneaker.value.imageUrl,
		price: sneaker.value.price,
	})
}

const toggleFavoriteItem = () => {
	favoriteStore.toggleFavoriteItem({
		id: sneaker.value.id,
		title: sneaker.value.title,
		imageUrl: sneaker.value.imageUrl,
		price: sneaker.value.price,
	})
}

async function fetchSneaker() {
	try {
		const response = await $fetch(
			`${config.public.API_URL}/items/${route.params.id}`
		)
		sneaker.value = response
	} catch (error) {
		console.error('Ошибка при загрузке товара:', error)
	} finally {
		isLoading.value = false
	}
}

onMounted(fetchSneaker)
watchEffect(() => {
	if (sneaker.value.title) {
		useHead({ title: sneaker.value.title })
	}
})
</script>

<template>
	<Loader v-if="isLoading" />
	<div
		v-else
		class="min-h-[100vh] bg-gradient-to-br py-12 animate__animated animate__fadeIn"
	>
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div
				class="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all"
			>
				<div class="flex flex-col md:flex-row">
					<div class="md:w-1/2 relative">
						<img
							:src="sneaker.imageUrl"
							:alt="sneaker.title"
							class="w-full h-full object-cover select-none min-h-[512px] max-md:min-h-[302px]"
						/>
						<button
							@click="toggleFavoriteItem"
							class="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								:class="{
									'text-red-500 fill-current': isFavorite,
									'text-gray-300': !isFavorite,
								}"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
						</button>
					</div>
					<div class="md:w-1/2 p-8 flex flex-col justify-between">
						<div>
							<h1 class="text-4xl font-bold text-gray-900 mb-4">
								{{ sneaker.title }}
							</h1>
							<p class="text-gray-600 text-lg mb-6 leading-relaxed">
								{{ 'Описание отсутствует' }}
							</p>
							<div class="flex items-center mb-6">
								<span class="text-3xl font-bold text-gray-900">
									{{ sneaker.price }} ₽
								</span>
							</div>
						</div>
						<div class="flex flex-col space-y-4">
							<button
								@click="toggleCartItem"
								:class="{
									'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700':
										!isAdded,
									'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700':
										isAdded,
								}"
								class="w-full px-6 py-3 text-white font-semibold rounded-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
							>
								{{ isAdded ? 'Добавлено в корзину 🛒' : 'Добавить в корзину' }}
							</button>
							<button
								@click="toggleFavoriteItem"
								:class="{
									'bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700':
										!isFavorite,
									'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700':
										isFavorite,
								}"
								class="w-full px-6 py-3 text-white font-semibold rounded-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
							>
								{{ isFavorite ? 'В избранном ❤️' : 'Добавить в избранное' }}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<CartButton class="hidden max-md:block" />
	</div>
</template>
