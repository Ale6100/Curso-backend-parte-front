import React from 'react';
import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toastError, toastSuccess, toastWait } from '../../utils/toastify';
import { getJSONHeaders } from '../../utils/http';
import disabledButton from '../../utils/disabledButton';

const waitFor = (time) => new Promise((resolve, reject) => setTimeout(resolve, time))

const RestorePassword = () => {
    const navigate = useNavigate();
    let [ searchParams ] = useSearchParams();

    document.title = "Nueva contraseña"

    const sendForm = async (e) => {
        e.preventDefault()

        const buttonSubmit = e.target.elements.submit
        disabledButton(buttonSubmit, true)
        toastWait("Espere por favor...")

        const data = new FormData(e.target);
        const obj = {}
        data.forEach((value, key) => obj[key] = value)
        obj.token = searchParams.get("token") // Agrego el token pasado en la URL
    
        if (obj.password !== obj.password2) {
            disabledButton(buttonSubmit, false)
            return toastError("Contraseñas distintas")
        }

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions/restorePassword`, {
            method: "PUT",
            body: JSON.stringify(obj),
            ...getJSONHeaders(),
        })
        const res_json = await res.json()
    
        if (res_json.status === "success") {
            toastSuccess("Contraseña cambiada con éxito!")
            navigate("/formUsers/login")
        
        } else if (res.status !== 500) {
            toastError(res.error)

        } else {
            toastError("Error inesperado. Procura haber ingresado aquí desde tu mail. Redireccionando...")
            await waitFor(3000)
            navigate("/")
        }
        disabledButton(buttonSubmit, false)
    }

    return (
        <div className='p-3 flex flex-col justify-evenly'>
            <h1 className='mt-5 font-semibold text-center text-xl'>Nueva contraseña</h1>

            <p className='my-5 text-center'>Ingrese su nueva contraseña</p>

            <form onSubmit={sendForm} className='mx-auto px-2 w-80 flex flex-col justify-evenly border border-black rounded-sm h-40'>
                <label className='flex flex-col h-28 justify-evenly'>
                    <span>Nueva contraseña</span>
                    <input type="password" name="password" required/>
                    <input type="password" name="password2" required />
                </label>
                
                <button className='mx-auto w-40 bg-blue-500 hover:bg-blue-600 text-white rounded-sm active:bg-blue-700' name="submit" type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default RestorePassword;
