import React, { createContext, useState } from "react";
import { UserInterface } from "../utils/interfaces";

interface PersonalContextValue {
    user: UserInterface | null;
    setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
    restartIconCart: () => void;
    productsInCart: number;
    setProductsInCart: React.Dispatch<React.SetStateAction<number>>;
}

export const PersonalContext = createContext<PersonalContextValue | undefined>(undefined);

interface PersonalContextProviderProps {
    children: React.ReactNode;
}

const PersonalContextProvider = ({ children }: PersonalContextProviderProps) => {
    const [ user, setUser ] = useState<UserInterface | null>(null); // Estado que representa al usuario actual
    const [ productsInCart, setProductsInCart ] = useState<number>(0) // Cantidad de productos en el carrito

    const restartIconCart = () => { // Regresa a 0 este valor
        setProductsInCart(0)
    }

    return (
        <PersonalContext.Provider value={{ user, setUser, restartIconCart, productsInCart, setProductsInCart }}>
            {children}
        </PersonalContext.Provider>
    );
}

export default PersonalContextProvider;
