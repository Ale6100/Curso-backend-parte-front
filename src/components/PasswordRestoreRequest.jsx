import React from 'react';
import PageTitle from "./PageTitle"
import { toastError, toastSuccess, toastWait } from '../utils/toastify';

const PasswordRestoreRequest = () => { // Formulario donde se hace la petición para restaurar la contraseña
    const sendForm = async (e) => {
        e.preventDefault()

        const data = new FormData(e.target);
        const obj = {}
        data.forEach((value, key) => obj[key] = value)
    
        toastWait("Espere por favor...")
    
        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/api/sessions/passwordRestoreRequest`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        
        if (res.status === "success") {
            toastSuccess("Mail enviado! Verifica tu bandeja de entrada")
        
        } else {
            toastError(res.error)
        }
    }
    
    return (
        <div className='p-2 flex flex-col h-52 justify-evenly'>
            <PageTitle title={"Restaurar contraseña"} />
            <h1>Restaurar contraseña</h1>

            <p>Ingrese su correo electrónico donde le informaremos los pasos a seguir</p>

            <form onSubmit={sendForm} className='flex flex-col justify-evenly h-32 border border-black w-full items-center'>
                <label>Email</label>
                
                <input type="email" name="email" required/>
                
                <button className='w-48' type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default PasswordRestoreRequest;
