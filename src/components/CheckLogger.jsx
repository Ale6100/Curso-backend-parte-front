import React from 'react';
import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { PersonalContext } from "./PersonalContext";

const CheckLogger = () => { // Se encarga de preguntar si el usuario está logueado, cada vez que se cambia la url
    const { user, setUser } = useContext(PersonalContext);

    const location = useLocation();

    const traerUsuario = async () => {
        const user = await fetch(`${import.meta.env.VITE_BACK_URL}/api/sessions/current`, {
            method: "GET",
            credentials: "include"
        }).then(res => res.json()).then(res => res.payload)
        return user
    }

    useEffect(() => { // Trae la información de un usuario siempre y cuando esté logueado
        if (document.cookie) {
            traerUsuario().then(res => setUser(res))
        }
      
    }, [location]);

    return (
        <>
            
        </>
    );
}

export default CheckLogger;
