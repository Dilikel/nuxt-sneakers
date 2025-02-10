<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { useUserStore } from '~/stores/user'
import type { LoginResponse } from '~/types/user'

definePageMeta({
	middleware: ['auth'],
})

useHead({
	title: 'Регистрация',
})

const email = ref('')
const name = ref('')
const password = ref('')
const confirmPassword = ref('')
const passwordsMatch = ref(true)
const message = ref('')
const isLoading = ref(false)
const config = useRuntimeConfig()
const toast = useToast()
const userStore = useUserStore()
const token = useCookie<string | null>('token', { maxAge: 60 * 60 * 24 * 30 })

watch([password, confirmPassword], () => {
	passwordsMatch.value = password.value === confirmPassword.value
})

async function registerUser() {
	if (!passwordsMatch.value) {
		message.value = 'Пароли не совпадают'
		toast.error(message.value)
		return
	}

	isLoading.value = true
	message.value = ''

	await $fetch<LoginResponse>(`${config.public.API_URL}/register`, {
		method: 'POST',
		body: {
			email: email.value,
			name: name.value,
			password: password.value,
			totalPrice: 0,
		},
	})
		.then((response: LoginResponse) => {
			token.value = response.token
			userStore.setUser(response.data)
			toast.success('Вы успешно вошли в аккаунт!')
			navigateTo('/')
		})
		.catch((error: any) => {
			message.value =
				error?.response?.data?.detail || 'Ошибка. Проверьте Email и пароль.'
			toast.error(message.value)
		})
		.finally(() => {
			isLoading.value = false
		})
}
</script>

<template>
	<div
		class="flex items-center justify-center min-h-[80vh] max-md:p-4 animate__animated animate__fadeIn animate__fast"
	>
		<div
			class="max-w-md w-full bg-white rounded-xl shadow-xl p-8 md:p-10 border border-gray-200"
		>
			<h2
				class="text-3xl font-semibold text-center text-gray-800 mb-6 max-md:text-2xl"
			>
				Регистрация
			</h2>
			<p class="text-center text-gray-500 mb-8 max-md:text-sm">
				Создайте новую учетную запись
			</p>

			<form @submit.prevent="registerUser" class="space-y-6">
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700"
						>Email</label
					>
					<input
						id="email"
						type="email"
						v-model="email"
						required
						class="mt-1 block w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
						placeholder="Введите ваш email"
					/>
				</div>

				<div>
					<label for="name" class="block text-sm font-medium text-gray-700"
						>Ваше имя</label
					>
					<input
						id="name"
						type="text"
						v-model="name"
						required
						class="mt-1 block w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
						placeholder="Введите ваше имя"
					/>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-gray-700"
						>Пароль</label
					>
					<input
						id="password"
						type="password"
						v-model="password"
						required
						class="mt-1 block w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
						placeholder="Введите пароль"
					/>
				</div>

				<div>
					<label
						for="confirmPassword"
						class="block text-sm font-medium text-gray-700"
						>Подтвердите пароль</label
					>
					<input
						id="confirmPassword"
						type="password"
						v-model="confirmPassword"
						required
						class="mt-1 block w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
						placeholder="Введите пароль еще раз"
					/>
					<p v-if="!passwordsMatch" class="text-red-500 text-sm mt-1">
						Пароли не совпадают
					</p>
				</div>

				<div class="mt-6">
					<button
						type="submit"
						class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 cursor-pointer"
					>
						{{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
					</button>
				</div>
			</form>

			<div class="mt-8 text-center">
				<p class="text-sm text-gray-500">
					Уже есть аккаунт?
					<router-link to="/login" class="text-blue-500 hover:text-blue-600"
						>Войти</router-link
					>
				</p>
			</div>

			<div
				v-if="message"
				class="flex items-center justify-center gap-4 mt-5 p-4 rounded-2xl text-center font-bold bg-[#ff5252] shadow-lg shadow-red-500/40 ring-1 ring-red-600/30 text-white max-md:p-3 max-md:text-base"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="w-7 h-7 flex-shrink-0 fill-white"
				>
					<path
						d="M12 0C5.371 0 0 5.372 0 12s5.371 12 12 12 12-5.372 12-12S18.629 0 12 0zM13.5 18h-3v-3h3v3zm0-6h-3V6h3v6z"
					/>
				</svg>
				<p class="text-base leading-relaxed m-0">{{ message }}</p>
			</div>
		</div>
	</div>
</template>
