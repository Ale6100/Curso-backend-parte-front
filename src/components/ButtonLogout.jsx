import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PersonalContext } from "./PersonalContext";
import { toastError, toastSuccess, toastWait } from '../utils/toastify';

const ButtonLogout = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(PersonalContext);

    const desloguearse = async () => {
        toastWait("Espere por favor...")

        const result = await fetch(`${import.meta.env.VITE_BACK_URL}/api/sessions/logout`, {
            method: "GET",
            credentials: "include"
        }).then(res => res.json())
    
        if (result.status === "success") {
            toastSuccess("Deslogueado!")
    
            setUser(null)
            navigate("/")
        
        } else {
            toastError("Error! Intente de nuevo más tarde")
        }
    }
    
    return (
        <button className='px-1' onClick={desloguearse}>Desloguearse</button>
    );
}

export default ButtonLogout;
