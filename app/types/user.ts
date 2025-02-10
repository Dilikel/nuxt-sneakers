export interface User {
	id: number
	name: string
	email: string
	totalPrice: number
}

export interface LoginResponse {
	token: string
	data: {
		id: number
		name: string
		email: string
		totalPrice: number
	}
}
