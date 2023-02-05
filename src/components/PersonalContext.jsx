import React, { createContext, useState } from "react";

export const PersonalContext = createContext()

const PersonalContextProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado que representa al usuario

    return (
        <PersonalContext.Provider value={{ user, setUser }}>
            {children}
        </PersonalContext.Provider>
    );
}

export default PersonalContextProvider;