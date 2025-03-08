export interface User {
	id: number
	name: string
	email: string
	cart: Array<any>
	favorites: Array<any>
	orders: Array<any>
}

export interface LoginResponse {
	token: string
	data: {
		id: number
		name: string
		email: string
		cart: Array<any>
		favorites: Array<any>
		orders: Array<any>
	}
}
