import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PersonalContext } from "../PersonalContext";
import { toastError, toastSuccess } from '../../utils/toastify';
import { getJSONHeaders } from '../../utils/http';

const ButtonLogout = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(PersonalContext);

    const desloguearse = async () => {
        const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions/logout`, {
            method: "GET",
            credentials: "include",
            ...getJSONHeaders(),
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
