import React from 'react';
import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toastError, toastSuccess, toastWait } from '../../utils/toastify';
import { getJSONHeaders } from '../../utils/http';

const RestorePassword = () => {
    const navigate = useNavigate();
    let [ searchParams ] = useSearchParams();

    document.title = "Nueva contraseña"

    const sendForm = async (e) => {
        e.preventDefault()

        const data = new FormData(e.target);
        const obj = {}
        data.forEach((value, key) => obj[key] = value)
        obj.token = searchParams.get("token") // Agrego el token pasado en la URL
    
        toastWait("Espere por favor...")
    
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions/restorePassword`, {
            method: "PUT",
            body: JSON.stringify(obj),
            ...getJSONHeaders(),
        }).then(res => res.json())
    
        if (res.status === "success") {
            toastSuccess("Contraseña cambiada con éxito!")
            navigate("/formUsers/login")
        
        } else {
            toastError(res.error)
        }
    }

    return (
        <div className='p-3 flex flex-col justify-evenly'>
            <h1 className='mt-5 font-semibold text-center text-xl'>Nueva contraseña</h1>

            <p className='my-5 text-center'>Ingrese su nueva contraseña</p>

            <form onSubmit={sendForm} className='mx-auto px-2 w-80 flex flex-col justify-evenly border border-black rounded-sm h-40'>
                <label className='flex flex-col h-16 justify-evenly'>
                    <span>Nueva contraseña</span>
                    <input type="password" name="password" required/>
                </label>
                
                <button className='mx-auto w-40' type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default RestorePassword;
