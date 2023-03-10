import { getJSONHeaders } from "./http"

const getUser = async (setUser, setProductsInCart) => {
    
    let user = null
    const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions/current`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
        },
    }).then(res => res.json())

    user = result.payload
    
    if (user?.role === "user") {
        const objCart = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/carts/${user.cartId}`, {
            ...getJSONHeaders(),
        }).then(res => res.json().then(res => res.payload)) // Objeto que contiene al carrito del usuario actual
        const totalQuantity = objCart.contenedor.length > 0 ? objCart.contenedor.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0) : 0;
        setProductsInCart(totalQuantity)   
    } else {
        setProductsInCart(0)
    }

    setUser(user)
    return user
}

export default getUser
