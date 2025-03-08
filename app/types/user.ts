import type { Product } from '@/types/product'

export interface User {
	id: number
	name: string
	email: string
	cart: Product[]
	favorites: Product[]
	orders: Array<any>
}

export interface LoginResponse {
	token: string
	data: {
		id: number
		name: string
		email: string
		cart: Product[]
		favorites: Product[]
		orders: Array<any>
	}
}
