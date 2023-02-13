import { getJSONHeaders } from "./http"

export default class PaymentService {
    createPaymentIntent = async ({ body }) => {
        return await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payments/payment-intents`, {
            method: "POST",
            body: JSON.stringify(body),
            ...getJSONHeaders(),
        })
    }
}
