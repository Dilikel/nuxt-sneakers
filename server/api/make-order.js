export default defineEventHandler(async event => {
	const body = await readBody(event)
	if (
		!body.amount ||
		!body.amount.value ||
		!body.amount.currency ||
		!body.order_id
	) {
		return sendError(
			event,
			createError({ statusCode: 400, statusMessage: 'Invalid data' })
		)
	}

	const { amount, order_id } = body
	try {
		const shopId = process.env.YOOKASSA_SHOP_ID
		const secretKey = process.env.YOOKASSA_SECRET_KEY
		const idempotenceKey = Math.random().toString(36).substring(7)
		const host_url = process.env.HOST_URL

		const response = await $fetch('https://api.yookassa.ru/v3/payments', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Idempotence-Key': idempotenceKey,
				Authorization: `Basic ${Buffer.from(`${shopId}:${secretKey}`).toString(
					'base64'
				)}`,
			},
			body: JSON.stringify({
				amount: {
					value: amount.value.toString(),
					currency: amount.currency,
				},
				capture: true,
				confirmation: {
					type: 'redirect',
					return_url: `${host_url}/checkout/${order_id}`,
				},
				description: `Оплата заказа №${order_id}`,
			}),
		})
		return {
			payment_url: response.confirmation.confirmation_url,
			payment_id: response.id,
		}
	} catch (error) {
		console.error('YooKassa API error:', error)

		if (error.response) {
			const errorBody = await error.response.text()
			console.error('Error body:', errorBody)
		}

		return sendError(
			event,
			createError({
				statusCode: 500,
				statusMessage: 'Payment processing failed',
			})
		)
	}
})
