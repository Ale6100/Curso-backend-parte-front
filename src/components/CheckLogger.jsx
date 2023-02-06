import React from 'react';
import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { PersonalContext } from "./PersonalContext";
import getUser from '../utils/getUser';

const CheckLogger = () => { // Se encarga de preguntar si el usuario está logueado, cada vez que se cambia la url
    const { user, setUser } = useContext(PersonalContext);

    const location = useLocation();

    useEffect(() => { // Trae la información de un usuario siempre y cuando esté logueado
        if (document.cookie) {
            getUser(setUser)
        }
      
    }, [location]);

    return (
        <>
            
        </>
    );
}

export default CheckLogger;
