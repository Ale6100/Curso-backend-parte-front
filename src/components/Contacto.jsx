import React from 'react';
import { toastWait, toastError, toastSuccess } from '../utils/toastify';

const Contacto = () => {
    const superTrim = (string) => {
        string = string.trim()
        while (string.includes("  ")) {
            string = string.replaceAll("  ", " ")
        }
        return string
    }

    const sendMail = async (e) => {
        e.preventDefault()

        const data = new FormData(e.target);
        const obj = {}
        data.forEach((value, key) => obj[key] = superTrim(value))
        
        if (!obj.name || !obj.email || !obj.message) return toastError("Valores incompletos")
        
        const message = `
        <div>
            <p> ${obj.name} dice: </p>
            <p> ${obj.message} </p>
        </div>
        `

        const objSend = {
            from: `${obj.email}`,
            to: `${import.meta.env.VITE_PERSONAL_MAIL}`,
            subject: `Nuevo mail enviado desde ${location.origin} de parte de ${obj.email}`,
            html: message
        }

        toastWait("Espere por favor...")
    
        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/sendNewMail`, { // Envio al objeto que me permitirá enviar el mail de confirmación
            method: "POST",
            body: JSON.stringify(objSend),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())

        if (res.status === "success") {
            toastSuccess("Mail enviado!")    
            
        } else if (res.error === "Valores incompletos") {
            toastError(res.error)

        } else {
            toastError("Error, vuelve a intentar más tarde")
        }
    }

    return (
        <div className='m-2'>
            <h1 className='mt-5 text-center font-semibold text-xl'>Formulario de contacto</h1>

            <p className='my-5 text-center'>Tienes alguna duda o sugerencia? No dudes en ponerte en contacto con nosotros!</p>

            <form onSubmit={sendMail} className='mx-auto px-2 max-w-lg flex flex-col justify-evenly border border-black rounded-sm h-[400px]'>
                <label className='flex flex-col h-16 justify-evenly'>
                    <span>Nombre</span>
                    <input type="text" name="name" required />
                </label>

                <label className='flex flex-col h-16 justify-evenly'>
                    <span>Email</span>
                    <input type="email" name="email" required />
                </label>

                <label className='flex flex-col justify-evenly'>
                    <span>Mensaje</span>
                    <textarea name="message" className='h-48 p-1 border border-gray-400 resize-none' required></textarea>
                </label>

                <button type="submit" className='mx-auto w-40'>Enviar</button>
            </form>
        </div>
    );
}

export default Contacto;
