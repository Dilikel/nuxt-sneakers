<script setup lang="ts">
import Loader from '@/components/Loader.vue'
import type { sneaker } from '~/types/sneaker'

const sneaker = ref<Partial<sneaker>>({})
const isLoading = ref(true)
const config = useRuntimeConfig()

watchEffect(() => {
	if (sneaker.value.title) {
		useHead({
			title: sneaker.value.title,
		})
	}
})

async function fetchSneaker() {
	await $fetch<sneaker>(
		`${config.public.API_URL}/items/${useRoute().params.id}`
	)
		.then((response: sneaker) => {
			sneaker.value = response
		})
		.catch((error: any) => {
			console.log(error)
		})
		.finally(() => {
			isLoading.value = false
		})
}

onMounted(() => {
	fetchSneaker()
})
</script>

<template>
	<Loader v-if="isLoading" />
	<div v-else class="min-h-[80vh] bg-gradient-to-br py-12">
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
							@click="sneaker.isFavorite = !sneaker.isFavorite"
							class="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								:class="{
									'text-red-500 fill-current': sneaker.isFavorite,
									'text-gray-300': !sneaker.isFavorite,
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
								@click="sneaker.isAdded = !sneaker.isAdded"
								:class="{
									'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700':
										!sneaker.isAdded,
									'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700':
										sneaker.isAdded,
								}"
								class="w-full px-6 py-3 text-white font-semibold rounded-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
							>
								{{
									sneaker.isAdded
										? 'Добавлено в корзину 🛒'
										: 'Добавить в корзину'
								}}
							</button>
							<button
								@click="sneaker.isFavorite = !sneaker.isFavorite"
								:class="{
									'bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700':
										!sneaker.isFavorite,
									'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700':
										sneaker.isFavorite,
								}"
								class="w-full px-6 py-3 text-white font-semibold rounded-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
							>
								{{
									sneaker.isFavorite ? 'В избранном ❤️' : 'Добавить в избранное'
								}}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
