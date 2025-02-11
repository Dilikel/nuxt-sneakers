export interface sneaker {
	id: number
	title: string
	price: number
	imageUrl: string
	isFavorite: boolean
	isAdded: boolean
	onClickFavorite?: () => void
	onClickAdd?: () => void
}

export interface cartItem {
	id: number
	title: string
	price: number
	imageUrl: string
}
