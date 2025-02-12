<script setup>
import CartItem from './CartItem.vue'

const props = defineProps({
	items: Array,
})

const emit = defineEmits(['removeFromCart'])
</script>

<template>
	<div class="space-y-6 mt-6">
		<CartItem
			v-for="item in props.items"
			:key="item.id"
			:id="item.id"
			:title="item.title"
			:price="item.price"
			:imageUrl="item.imageUrl"
			:removeItem="() => emit('removeFromCart', item)"
		/>
	</div>
</template>
