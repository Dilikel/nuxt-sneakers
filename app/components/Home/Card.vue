<script setup>
import like1 from '~/assets/icons/like-1.svg'
import like2 from '~/assets/icons/like-2.svg'
import plusIcon from '~/assets/icons/plus.svg'
import checkedIcon from '~/assets/icons/checked.svg'
import { useRouter } from 'vue-router'

const props = defineProps({
	id: Number,
	title: String,
	imageUrl: String,
	price: Number,
	isFavorite: Boolean,
	isAdded: Boolean,
	onClickFavorite: Function,
	onClickAdd: Function,
})
const router = useRouter()
const goToSneaker = () => {
	router.push(`/sneaker/${props.id}`)
}
</script>

<template>
	<div class="card">
		<NuxtImg
			v-if="onClickFavorite"
			:src="!isFavorite ? like1 : like2"
			alt="Like"
			class="card__favorite"
			@click="onClickFavorite"
		/>

		<img
			:src="imageUrl"
			alt="Sneaker"
			class="card__image"
			@click="goToSneaker"
		/>

		<p class="card__title" @click="goToSneaker">{{ title }}</p>

		<div class="card__footer">
			<div class="card__price">
				<span class="card__price-label" @click="goToSneaker">Цена:</span>
				<b class="card__price-value" @click="goToSneaker">{{ price }} руб.</b>
			</div>

			<NuxtImg
				v-if="onClickAdd"
				@click="onClickAdd"
				:src="isAdded ? checkedIcon : plusIcon"
				alt="Add"
				class="card__add"
			/>
		</div>
	</div>
</template>

<style scoped>
.card {
	position: relative;
	background: #ffffff;
	border: 1px solid #e0e0e0;
	border-radius: 24px;
	padding: 24px;
	cursor: pointer;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	overflow: hidden;
	margin: 0 auto;
}

.card__image {
	width: 100%;
	height: auto;
	border-radius: 12px;
	transition: transform 0.3s ease;
}

img {
	user-select: none;
}

.card__title {
	font-size: 18px;
	font-weight: 600;
	color: #333333;
	margin-top: 16px;
	transition: color 0.3s ease;
}

.card__favorite {
	position: absolute;
	top: 20px;
	left: 20px;
	width: 35px;
	height: 35px;
	cursor: pointer;
	transition: transform 0.2s ease;
}

.card__footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 20px;
}

.card__price {
	display: flex;
	flex-direction: column;
}

.card__price-label {
	font-size: 14px;
	color: #777777;
}

.card__price-value {
	font-size: 20px;
	color: #333333;
}

.card__add {
	width: 32px;
	height: 32px;
	cursor: pointer;
	transition: transform 0.2s ease;
}

@media (hover: hover) {
	.card__add:hover {
		transform: scale(1.1);
	}
	.card__favorite:hover {
		transform: scale(1.1);
	}
	.card:hover .card__title {
		color: #007bff;
	}
	.card:hover {
		transform: translateY(-8px);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
	}
}

@media (max-width: 768px) {
	.card {
		padding: 12px;
		max-width: 100%;
	}

	.card__title {
		font-size: 14px;
	}

	.card__price-value {
		font-size: 16px;
	}

	.card__add {
		width: 28px;
		height: 28px;
	}
}
</style>
