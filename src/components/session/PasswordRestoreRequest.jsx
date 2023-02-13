import React from 'react';
import { toastError, toastSuccess, toastWait } from '../../utils/toastify';
import { getJSONHeaders } from '../../utils/http';

const PasswordRestoreRequest = () => { // Formulario donde se hace la petición para restaurar la contraseña
    document.title = "Restaurar contraseña"
    
    const sendForm = async (e) => {
        e.preventDefault()

        const data = new FormData(e.target);
        const obj = {}
        data.forEach((value, key) => obj[key] = value)
    
        toastWait("Espere por favor...")
    
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions/passwordRestoreRequest`, {
            method: "POST",
            body: JSON.stringify(obj),
            ...getJSONHeaders()
        }).then(res => res.json())
        
        if (res.status === "success") {
            toastSuccess("Mail enviado! Verifica tu bandeja de entrada")
        
        } else {
            toastError(res.error)
        }
    }
    
    return (
        <div className='p-3 flex flex-col justify-evenly'>
            <h1 className='mt-5 font-semibold text-center text-xl'>Restaurar contraseña</h1>

            <p className='my-5 text-center'>Ingrese su correo electrónico donde le informaremos los pasos a seguir</p>

            <form onSubmit={sendForm} className='mx-auto px-2 w-80 flex flex-col justify-evenly border border-black rounded-sm h-40'>
                <label className='flex flex-col h-16 justify-evenly'>
                    <span>Email</span>
                    <input type="email" name="email" required/>
                </label>
                
                <button className='mx-auto w-40' type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default PasswordRestoreRequest;
