<script setup>
import { useCartStore } from '~/stores/cart'
import { storeToRefs } from 'pinia'

const isMenuOpen = ref(false)
const cartStore = useCartStore()
const { totalPrice } = storeToRefs(cartStore)
</script>

<template>
	<header
		class="py-[20px] border-b-2 border-b-solid border-b-[rgba(0,0,0,0.082)] sticky top-0 bg-white z-50"
	>
		<div class="flex items-center justify-between px-5 max-w-[1400px] mx-auto">
			<router-link to="/" class="flex items-center center gap-[15px]">
				<img
					src="~/assets/icons/logo.svg"
					alt="logo"
					class="w-10 h-10 transition-transform duration-300 ease-in-out hover:scale-110 select-none"
				/>
				<div>
					<h1 class="text-xl font-bold uppercase m-0">Nuxt Sneakers</h1>
					<p class="text-gray-500 text-sm m-0">Магазин лучших кроссовок</p>
				</div>
			</router-link>
			<ul class="flex items-center list-none gap-[40px] m-0 p-0 max-md:hidden">
				<router-link
					to="/cart"
					class="flex items-center gap-3 cursor-pointer text-gray-500 transition-colors duration-300 ease-in-out hover:text-black"
				>
					<img src="~/assets/icons/cart.svg" alt="Cart" class="select-none" />
					<b>{{ totalPrice }} руб.</b>
				</router-link>
				<router-link
					to="/favorite"
					class="flex items-center gap-3 cursor-pointer text-gray-500 transition-colors duration-300 ease-in-out hover:text-black"
				>
					<img src="~/assets/icons/heart.svg" alt="Cart" class="select-none" />
					<span>Закладки</span>
				</router-link>

				<router-link
					to="/profile"
					class="flex items-center gap-3 cursor-pointer text-gray-500 transition-colors duration-300 ease-in-out hover:text-black"
				>
					<img
						src="~/assets/icons/profile.svg"
						alt="Cart"
						class="select-none"
					/>
					<span>Профиль</span>
				</router-link>
			</ul>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="hidden w-[45px] h-[45px] text-black transition-transform duration-300 ease-in-out max-md:block"
				@click="isMenuOpen = true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
				/>
			</svg>
		</div>
	</header>

	<div
		class="fixed inset-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[999] backdrop-blur-sm"
		v-if="isMenuOpen"
		@click="isMenuOpen = false"
	></div>
	<div
		v-if="isMenuOpen"
		class="fixed top-0 right-0 w-[300px] h-full bg-white border-b-2 border-opacity-10 border-black transition-[right] duration-300 ease-in-out z-[1000] animate__animated animate__fadeInRight animate__faster"
	>
		<div
			class="flex justify-between items-center p-[20px] border-b-2 border-b-[rgba(0,0,0,0.082)]"
		>
			<h2 class="m-0 text-[24px]">Меню</h2>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-[30px] h-[30px] text-black"
				@click="isMenuOpen = false"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</div>
		<ul class="list-none p-[20px] m-0">
			<router-link
				to="/cart"
				class="flex items-center gap-3 py-[15px] text-[#4a5568]"
				@click="isMenuOpen = false"
			>
				<img src="~/assets/icons/cart.svg" alt="Cart" />
				<span>Корзина</span>
			</router-link>
			<router-link
				to="/favorite"
				class="flex items-center gap-3 py-[15px] text-[#4a5568]"
			>
				<img src="~/assets/icons/heart.svg" alt="Cart" />
				<span>Закладки</span>
			</router-link>
			<router-link
				to="/profile"
				@click="isMenuOpen = false"
				class="flex items-center gap-3 py-[15px] text-[#4a5568]"
			>
				<img src="~/assets/icons/profile.svg" alt="Cart" />
				<span>Профиль</span>
			</router-link>
		</ul>
	</div>
</template>
