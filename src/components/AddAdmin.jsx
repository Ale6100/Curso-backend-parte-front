import React from 'react';
import PageTitle from "./PageTitle"
import { toastWait, toastSuccess, toastError } from '../utils/toastify';
import { getJSONHeaders } from '../utils/http';

const AddAdmin = () => {
    const sendForm = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        const obj = {}
        formData.forEach((value, key) => obj[key] = value)

        toastWait("Espere por favor...")

        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/api/sessions/addAdmin`, {
            method: "PUT",
            body: JSON.stringify(obj),
            ...getJSONHeaders()
        }).then(res => res.json())
        
        if (res.status === "success") {
            toastSuccess(`El usuario con mail ${obj.email} ha sido ascendido a administrador`)

        } else {
            toastError(res.error)
        }
    }

    return (
        <div onSubmit={sendForm}>
            <PageTitle title={"Agregar administrador"} />
            <h1 className='my-5 text-center font-semibold text-xl'>Agregar administrador</h1>
            <p className='text-center'>Ingresa el email de un usuario para cambiar su rol a administrador</p>
            <form className='my-5 mx-auto flex flex-col h-40 justify-evenly items-center border border-black rounded-sm w-60'>
                <label>Email</label>
                <input type="email" name="email" required />
                <button className='px-1' type="submit">Convertir a administrador</button>
            </form>
        </div>
    );
}

export default AddAdmin;
