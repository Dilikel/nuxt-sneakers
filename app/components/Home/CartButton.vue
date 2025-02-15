<script setup>
import { useCartStore } from '~/stores/cart'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { totalPrice, cartCount } = storeToRefs(cartStore)
</script>

<template>
	<div
		class="fixed bottom-5 right-5 z-50 bg-white shadow-lg rounded-full transition-all duration-300 ease-in-out hover:scale-110 p-3"
	>
		<router-link to="/cart" class="flex items-center gap-2">
			<div class="relative">
				<img
					src="~/assets/icons/cart.svg"
					alt="Корзина"
					class="w-8 h-8 text-gray-700 select-none"
				/>
				<transition name="fade">
					<div
						v-if="cartCount > 0"
						class="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
					>
						{{ cartCount }}
					</div>
				</transition>
			</div>
			<span class="text-sm font-medium text-gray-800">{{ totalPrice }} ₽</span>
		</router-link>
	</div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
