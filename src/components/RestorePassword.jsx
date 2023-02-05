import React from 'react';
import { useSearchParams } from "react-router-dom";
import PageTitle from './PageTitle';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const RestorePassword = () => {
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();

    const sendForm = async (e) => {
        e.preventDefault()

        const data = new FormData(e.target);
        const obj = {}
        data.forEach((value, key) => obj[key] = value)
        obj.token = searchParams.get("token") // Agrego el token pasado en la URL
    
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
    
        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/api/sessions/restorePassword`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    
        if (res.status === "success") {
            Toastify({
                text: "Contraseña cambiada con éxito!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();

            navigate("/formUsers/login")
        
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
            <PageTitle title={"Nueva contraseña"} />
            <h1 className='text-center font-semibold text-xl'>Nueva contraseña</h1>

            <p>Ingrese su nueva contraseña</p>

            <form onSubmit={sendForm} className='flex flex-col justify-evenly h-32 border border-black w-full items-center'>
                <label>Nueva contraseña</label>
                
                <input type="password" name="password" required/>
                
                <button className='w-48' type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default RestorePassword;
