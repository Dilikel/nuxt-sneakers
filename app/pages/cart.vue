<script setup>
import CartItemList from '~/components/Cart/CartItemList.vue'
import { useCartStore } from '~/stores/cart'
import { useToast } from 'vue-toastification'
import { useOrderStore } from '~/stores/order'
import { storeToRefs } from 'pinia'

useHead({
	title: 'Корзина',
})

const cartStore = useCartStore()
const { cart, totalPrice } = storeToRefs(cartStore)
const toast = useToast()
const isLoading = ref(false)
const orderStore = useOrderStore()

async function SubmitOrder() {
	isLoading.value = true
	const orderId = Math.random().toString(36).substring(7)
	await $fetch('api/make-order', {
		method: 'POST',
		body: JSON.stringify({
			amount: {
				value: totalPrice.value.toString(),
				currency: 'RUB',
			},
			order_id: orderId,
		}),
	})
		.then(response => {
			window.location.replace(response.payment_url)
			orderStore.addOrder({
				orderId: orderId,
				payment_id: response.payment_id,
				totalPrice: totalPrice.value,
				status: 'pending',
				items: cart.value,
			})
			cartStore.cart = []
		})
		.catch(error => {
			console.error('Ошибка при оформлении заказа:', error)
			toast.error('Произошла ошибка при оформлении заказа.')
		})
		.finally(() => {
			isLoading.value = false
		})
}
</script>

<template>
	<div
		class="min-h-[100vh] py-12 animate__animated animate__fadeIn"
		v-auto-animate
	>
		<div
			v-if="cart.length === 0"
			class="flex flex-col items-center justify-center min-h-[60vh] p-6"
		>
			<h2 class="text-3xl font-extrabold text-gray-900 mb-4 animate-fade-in">
				Корзина пуста
			</h2>
			<img
				src="~/assets/icons/package-icon.png"
				alt="package"
				class="select-none w-32 h-32 opacity-80 transition-transform transform hover:scale-105 animate-bounce-slow"
			/>
			<p class="text-gray-600 text-lg mt-2 text-center max-w-md">
				Похоже, вы еще ничего не добавили в корзину. Давайте это исправим!
			</p>
			<NuxtLink
				to="/"
				class="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl"
			>
				Перейти к покупкам
			</NuxtLink>
		</div>
		<div class="max-w-[1400px] mx-auto px-6 lg:px-8" v-else>
			<div class="flex items-center justify-between mb-6 max-md:flex-col">
				<h1 class="text-4xl font-semibold text-gray-900">Корзина</h1>
				<h2 class="text-xl font-medium text-gray-600">
					Сумма заказа: {{ totalPrice }} ₽
				</h2>
			</div>
			<div>
				<CartItemList
					:items="cart"
					@remove-from-cart="cartStore.removeCartItem"
				/>

				<div
					class="flex justify-between items-center bg-white p-6 border border-slate-200 mt-8 rounded-xl"
				>
					<div class="text-lg font-semibold text-gray-700">Итоговая сумма:</div>
					<div class="text-2xl font-bold text-gray-800">{{ totalPrice }} ₽</div>
				</div>

				<div class="flex justify-center mt-8">
					<button
						class="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-lg text-white transition hover:bg-blue-600 shadow-lg"
						@click="SubmitOrder"
					>
						{{ isLoading ? 'Загрузка...' : 'Оформить заказ' }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
