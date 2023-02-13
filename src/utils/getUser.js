const getUser = async (setUser, setProductsInCart) => {
    
    let user = null

    const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions/current`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json())
    
    if (result.status === "success") {
        user = result.payload
        if (user.role === "user") {
            const objCart = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/carts/${user.cartId}`).then(res => res.json().then(res => res.payload)) // Objeto que contiene al carrito del usuario actual
            const totalQuantity = objCart.contenedor.length > 0 ? objCart.contenedor.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0) : 0;
            setProductsInCart(totalQuantity)
        }
    } else {
        setProductsInCart(0)
    }

    setUser(user)

    return user
}

export default getUser
