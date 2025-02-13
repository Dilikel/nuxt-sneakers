<script setup>
const props = defineProps({
	id: Number,
	title: String,
	price: Number,
	imageUrl: String,
	removeItem: Function,
})
const router = useRouter()

const goToSneaker = () => {
	router.push(`/sneaker/${props.id}`)
}
</script>

<template>
	<div
		class="flex items-center border border-slate-200 p-5 rounded-xl gap-4 w-full"
	>
		<img
			class="w-16 h-16 cursor-pointer select-none"
			:src="imageUrl"
			:alt="title"
			@click="goToSneaker"
		/>

		<div class="flex flex-col flex-1">
			<p>{{ title }}</p>

			<div class="flex justify-between mt-2">
				<b class="flex-1">{{ price }} руб.</b>
				<button
					class="text-red-500 hover:text-red-700 transition-colors"
					@click="removeItem"
				>
					Удалить
				</button>
			</div>
		</div>
	</div>
</template>
