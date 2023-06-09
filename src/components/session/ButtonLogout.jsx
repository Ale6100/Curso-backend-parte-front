import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PersonalContext } from "../PersonalContext";
import { toastError, toastSuccess, toastWait } from '../../utils/toastify';
import { getJSONHeaders } from '../../utils/http';
import disabledButton from '../../utils/disabledButton';

const ButtonLogout = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(PersonalContext);

    const desloguearse = async (e) => {
        disabledButton(e.target, true)
        toastWait("Espere por favor...")

        const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions/logout`, {
            method: "GET",
            credentials: "include",
            ...getJSONHeaders(),
        }).then(res => res.json())
    
        if (result.status === "success") {
            setUser(null)
            toastSuccess("Deslogueado!")
            navigate("/")
        
        } else {
            toastError("Error! Intente de nuevo más tarde")
        }
        disabledButton(e.target, false)
    }
    
    return <button className='px-1 bg-blue-500 hover:bg-blue-600 text-white rounded-sm active:bg-blue-700' onClick={desloguearse}>Desloguearse</button>
}

export default ButtonLogout;
