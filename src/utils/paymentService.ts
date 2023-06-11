import { getJSONHeaders } from "./http"

interface bodyInt {
    total: number,
    clientId: string,
    direccion: string,
    phone: string
}

export default class PaymentService {
    createPaymentIntent = async ({ body }: { body: bodyInt }) => {
        return await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payments/payment-intents`, {
            method: "POST",
            body: JSON.stringify(body),
            ...getJSONHeaders(),
        })
    }
}
