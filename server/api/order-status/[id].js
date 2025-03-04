export default defineEventHandler(async event => {
	const orderId = getRouterParam(event, 'id')

	if (!orderId) {
		return sendError(
			event,
			createError({ statusCode: 400, statusMessage: 'Missing order ID' })
		)
	}

	try {
		const shopId = process.env.YOOKASSA_SHOP_ID
		const secretKey = process.env.YOOKASSA_SECRET_KEY

		const response = await $fetch(
			`https://api.yookassa.ru/v3/payments/${orderId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Basic ${Buffer.from(
						`${shopId}:${secretKey}`
					).toString('base64')}`,
				},
			}
		)

		return { status: response.status }
	} catch (error) {
		console.error('Ошибка при получении статуса заказа:', error)
		return sendError(
			event,
			createError({
				statusCode: 500,
				statusMessage: 'Failed to fetch order status',
			})
		)
	}
})
