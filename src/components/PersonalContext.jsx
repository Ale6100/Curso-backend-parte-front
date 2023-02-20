import React, { createContext, useState } from "react";

export const PersonalContext = createContext()

const PersonalContextProvider = ({ children }) => {
    const [ user, setUser ] = useState(null); // Estado que representa al usuario actual
    const [ productsInCart, setProductsInCart ] = useState(0) // Cantidad de productos en el carrito

    const changeCantInCart = (n) => { // Suma "n" veces el número que representa la cantidad de productos en el carrito (observar que también se pueden restar si pasamos un número negativo)
        setProductsInCart(productsInCart + n)
    }

    const restartIconCart = () => { // Regresa a 0 este valor
        setProductsInCart(0)
    }

    return (
        <PersonalContext.Provider value={{ user, setUser, changeCantInCart, restartIconCart, productsInCart, setProductsInCart }}>
            {children}
        </PersonalContext.Provider>
    );
}

export default PersonalContextProvider;
