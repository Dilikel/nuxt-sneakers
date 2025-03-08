<script setup>
import { useUserStore } from '~/stores/user'
import { useToast } from 'vue-toastification'
import { useAuth } from '~/composables/useAuth'
import Loader from '~/components/Loader.vue'
import { useCartStore } from '~/stores/cart'
import { useFavoriteStore } from '~/stores/favorite'

definePageMeta({
	middleware: ['auth'],
})

useHead({
	title: 'Профиль',
})

const toast = useToast()
const userStore = useUserStore()
const user = computed(() => userStore.user)
const token = useCookie('token')
const { fetchUser } = useAuth()
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()

function logout() {
	token.value = null
	userStore.logout()
	navigateTo('/')
	cartStore.loadCart()
	favoriteStore.loadFavorite()
	toast.success('Вы вышли из аккаунта!')
}

function editProfile() {
	toast.info('Редактирование пока не реализовано!')
}

onMounted(() => {
	fetchUser()
})
</script>

<template>
	<Loader v-if="!user?.id" />
	<div
		v-else
		class="flex items-center justify-center min-h-[80vh] py-6 px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn"
	>
		<div
			class="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8 md:p-12 border border-gray-200"
		>
			<div class="text-center mb-8">
				<h2 class="text-4xl font-semibold text-gray-800 mb-2">Ваш Профиль</h2>
				<p class="text-gray-500 text-lg">
					Посмотрите информацию о вашей учетной записи
				</p>
			</div>
			<div class="space-y-6">
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div
						class="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200"
					>
						<h3 class="text-lg font-medium text-gray-700">ID Пользователя</h3>
						<p class="mt-2 text-gray-500">{{ user.id }}</p>
					</div>

					<div
						class="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200"
					>
						<h3 class="text-lg font-medium text-gray-700">Имя</h3>
						<p class="mt-2 text-gray-500">{{ user.name }}</p>
					</div>
				</div>

				<div
					class="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200"
				>
					<h3 class="text-lg font-medium text-gray-700">Email</h3>
					<p class="mt-2 text-gray-500">{{ user.email }}</p>
				</div>
			</div>

			<div class="mt-8 text-center">
				<button
					class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 cursor-pointer"
					@click="editProfile"
				>
					Редактировать Профиль
				</button>
				<button
					class="w-full bg-red-500 text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 mt-2 cursor-pointer"
					@click="logout"
				>
					Выйти
				</button>
			</div>
		</div>
	</div>
</template>
