import React from 'react';
import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { PersonalContext } from "../PersonalContext";
import getUser from '../../utils/getUser';

const CheckLogger = () => { // Se encarga de preguntar si el usuario está logueado, cada vez que se cambia la url
    const { setUser, setProductsInCart } = useContext(PersonalContext);

    const location = useLocation();

    useEffect(() => { // Trae la información de un usuario cada vez que cambio de ruta
        getUser(setUser, setProductsInCart)
        
        // if (document.cookie) { // Trae la información siempre y cuando esté logueado //* Estoy analizando si uso este if. No creo
        //     getUser(setUser, setProductsInCart)
        // }
      
    }, [location]);

    return <></>;
}

export default CheckLogger;
