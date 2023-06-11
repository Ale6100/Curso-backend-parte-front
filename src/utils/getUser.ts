import { getJSONHeaders } from "./http"
import { UserInterface } from "./interfaces"

const getUser = async (setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>, setProductsInCart: React.Dispatch<React.SetStateAction<number>>) => {
    let user = null
    
    const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions/current`, {
        method: "GET",
        credentials: "include",
        ...getJSONHeaders(),
    }).then(res => res.json())

    user = result.payload

    if (user?.role === "user") {
        const objCart = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/carts/${user.cartId}`, {
            ...getJSONHeaders(),
        }).then(res => res.json().then(res => res.payload)) // Objeto que contiene al carrito del usuario actual
        
        if (objCart) {
            const totalQuantity = objCart.contenedor.length > 0 ? objCart.contenedor.reduce((previousValue: number, currentValue: { quantity: number }) => previousValue + currentValue.quantity, 0) : 0;
            setProductsInCart(totalQuantity)
        
        } else { // Si hay un usuario pero objCart no está definido, entonces está la sesión abierta de un usuario que ya no está más registrado... por lo tanto, lo deslogueo
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions/logout`, {
                method: "GET",
                credentials: "include",
                ...getJSONHeaders(),
            })
        }

    } else {
        setProductsInCart(0)
    }

    setUser(user)
    return user
}

export default getUser
