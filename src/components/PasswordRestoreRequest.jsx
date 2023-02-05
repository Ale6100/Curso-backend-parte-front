import React from 'react';
import PageTitle from "./PageTitle"
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const PasswordRestoreRequest = () => { // Formulario donde se hace la petición para restaurar la contraseña
    const sendForm = async (e) => {
        e.preventDefault()

        const data = new FormData(e.target);
        const obj = {}
        data.forEach((value, key) => obj[key] = value)
    
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
    
        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/api/sessions/passwordRestoreRequest`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    
        
        if (res.status === "success") {
            Toastify({
                text: "Mail enviado! Verifica tu bandeja de entrada",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
        
        } else {
            Toastify({
                text: res.error,
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
