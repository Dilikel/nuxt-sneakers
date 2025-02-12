<script setup>
import CartItemList from '~/components/Cart/CartItemList.vue'
import { useCartStore } from '~/stores/cart'

useHead({
	title: 'Корзина',
})

const cart = ref([])
const cartStore = useCartStore()
const { totalPrice } = storeToRefs(cartStore)

onMounted(() => {
	cart.value = cartStore.cart
})
</script>

<template>
	<div class="min-h-[100vh] py-12">
		<div class="max-w-[1400px] mx-auto px-6 lg:px-8">
			<div class="flex items-center justify-between mb-6">
				<h1 class="text-4xl font-semibold text-gray-900">Корзина</h1>
				<h2 class="text-xl font-medium text-gray-600">
					Сумма заказа: {{ totalPrice }} ₽
				</h2>
			</div>

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
				>
					Перейти к оформлению
				</button>
			</div>
		</div>
	</div>
</template>
