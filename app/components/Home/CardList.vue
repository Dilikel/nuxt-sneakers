<script setup>
import Card from './Card.vue'

defineProps({
	items: Array,
})
const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
	<div
		class="mx-auto mt-4 grid grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] gap-6 max-md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] max-sm:grid-cols-2"
		v-auto-animate
	>
		<Card
			v-for="item in items"
			:key="item.id"
			:id="item.id"
			:title="item.title"
			:imageUrl="item.imageUrl"
			:price="item.price"
			:onClickFavorite="isFavorites ? null : () => emit('addToFavorite', item)"
			:onClickAdd="isFavorites ? null : () => emit('addToCart', item)"
			:isFavorite="item.isFavorite"
			:isAdded="item.isAdded"
		/>
	</div>
</template>
