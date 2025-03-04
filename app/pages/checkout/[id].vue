<script setup>
import { useToast } from 'vue-toastification'
import Loader from '~/components/Loader.vue'
import { useOrderStore } from '~/stores/order'
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'

const route = useRoute()
const toast = useToast()
const orderId = route.params.id
const orderStatus = ref('pending')
const isLoading = ref(true)
const orderStore = useOrderStore()
let interval = null

const statusTranslations = {
	pending: 'Ожидает оплаты',
	succeeded: 'Оплачен',
	canceled: 'Ошибка оплаты',
}

async function fetchOrderStatus() {
	try {
		orderStore.loadOrdersFromLocalStorage()
		const order = orderStore.getOrders.find(order => order.orderId === orderId)
		if (!order) {
			toast.error('Заказ не найден.')
			return
		}
		const payment_id = order.payment_id
		const response = await $fetch(`/api/order-status/${payment_id}`)
		orderStatus.value = response.status
		if (orderStatus.value === 'succeeded' || orderStatus.value === 'canceled') {
			orderStore.changeStatus(orderId, orderStatus.value)
		}
	} catch (error) {
		console.error('Ошибка при получении статуса заказа:', error)
		toast.error('Не удалось получить статус заказа.')
	} finally {
		isLoading.value = false
	}
}

onMounted(() => {
	fetchOrderStatus()
	interval = setInterval(fetchOrderStatus, 5000)
})

onUnmounted(() => {
	clearInterval(interval)
})

watchEffect(() => {
	if (orderId) {
		useHead({
			title: `Статус заказа - ${
				statusTranslations[orderStatus.value] || 'Неизвестно'
			}`,
		})
	}
})
</script>

<template>
	<Loader v-if="isLoading" />
	<div
		v-else
		class="flex flex-col items-center justify-center px-4 py-12 min-h-screen animate__animated animate__fadeIn"
	>
		<div
			class="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md text-center animate__animated animate__fadeIn relative overflow-hidden"
		>
			<div
				class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-500"
			></div>
			<h1 class="text-3xl font-extrabold text-gray-900 mb-2">Статус заказа</h1>
			<p class="text-gray-600 text-lg">
				ID заказа: <span class="font-mono text-blue-600">{{ orderId }}</span>
			</p>
			<div class="mt-6">
				<p
					v-if="orderStatus === 'pending'"
					class="text-lg font-semibold text-yellow-500 animate-pulse flex items-center justify-center gap-2"
				>
					<span
						class="inline-block w-4 h-4 bg-yellow-500 rounded-full animate-bounce"
					></span>
					Ожидает оплаты...
				</p>
				<p
					v-else-if="orderStatus === 'succeeded'"
					class="text-lg font-semibold text-green-600 flex items-center justify-center gap-2"
				>
					✅ Оплачен
				</p>
				<p
					v-else-if="orderStatus === 'canceled'"
					class="text-lg font-semibold text-red-600 flex items-center justify-center gap-2"
				>
					❌ Ошибка оплаты
				</p>
			</div>
			<div class="mt-6">
				<NuxtLink
					to="/"
					class="select-none inline-block px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
				>
					Вернуться на главную
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<style>
.animate-pulse {
	animation: pulse 1.5s infinite;
}

@keyframes pulse {
	0% {
		opacity: 0.5;
	}
	50% {
		opacity: 1;
	}
	100% {
		opacity: 0.5;
	}
}
</style>
