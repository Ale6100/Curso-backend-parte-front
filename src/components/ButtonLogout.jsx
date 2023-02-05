import React, { useContext } from 'react';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { useNavigate } from 'react-router-dom';
import { PersonalContext } from "./PersonalContext";

const ButtonLogout = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(PersonalContext);

    const desloguearse = async () => {
        Toastify({
            text: "Espere por favor...",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, rgb(100, 100, 100), rgb(200, 200, 200))",
            }
        }).showToast();

        const result = await fetch(`${import.meta.env.VITE_BACK_URL}/api/sessions/logout`, {
            method: "GET",
            credentials: "include"
        }).then(res => res.json())
    
        if (result.status === "success") {
            Toastify({
                text: "Deslogueado!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
    
            setUser(null)
            navigate("/")
        
        } else {
            Toastify({
                text: "Error! Intente de nuevo más tarde",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, rgb(255, 0, 0), rgb(0, 0, 0))",
                }
            }).showToast();
        }
    }
    
    return (
        <button className='px-1' onClick={desloguearse}>Desloguearse</button>
    );
}

export default ButtonLogout;
