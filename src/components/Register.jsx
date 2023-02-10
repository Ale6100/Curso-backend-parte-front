import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { PersonalContext } from "./PersonalContext";
import { toastError, toastSuccess, toastWait } from '../utils/toastify';

const Register = () => {
    const { user } = useContext(PersonalContext);
    const navigate = useNavigate();

    document.title = "Registro de usuario"

    const sendForm = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        const obj = {}
        formData.forEach((value, key) => obj[key] = value)

        if (obj.password !== obj.password2) return toastError("Contraseñas distintas")

        toastWait("Espere por favor...")

        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/api/sessions/register`, {
            method: "POST",
            body: formData, // Enviamos los datos al body. Multer se va a encargar de procesarlos
            credentials: "include"
        }).then(res => res.json())
        
        if (res.status === "success") {
            toastSuccess("Usuario registrado! Redireccionando...")
            navigate("/formUsers/login")

        } else {
            toastError(res.error)
        }
    }

    if (user) return <p className='mt-5 text-center font-semibold text-xl'>Hay una sesión abierta! Si deseas registrar una cuenta nueva, por favor desloguéate primero</p>

    return (
        <div className='p-4'>
            <h1 className='text-2xl mb-4 text-center font-semibold'>Formulario de registro de usuario</h1>

            <p className='mb-3'>No te preocupes! Al ser una simulación no se te piden datos reales</p>
            
            <form onSubmit={sendForm} className='mx-auto mb-5 px-2 max-w-lg flex flex-col justify-evenly border border-black rounded-sm h-[700px]'>
                <label className='flex flex-col h-16 justify-evenly'>
                    <span> Nombre </span>
                    <input type="text" name="first_name" required />
                </label>
            
                <label className='flex flex-col h-16 justify-evenly'>
                    <span> Apellido </span>
                    <input type="text" name="last_name" required />
                </label>
            
                <label className='flex flex-col h-16 justify-evenly'>
                    <span> Email </span>
                    <input type="email" name="email" required />
                </label>
            
                <label className='flex flex-col h-16 justify-evenly'>
                    <span> Contraseña </span>
                    <input type="password" name="password" required />
                </label>

                <label className='flex flex-col h-16 justify-evenly'>
                    <span> Repetir contraseña </span>
                    <input type="password" name="password2"  required />
                </label>

                <label className='flex flex-col h-16 justify-evenly'>
                    <span> Dirección </span>
                    <input type="text" name="direccion" required />
                </label>

                <label className='flex flex-col h-16 justify-evenly'>
                    <span> Fecha de nacimiento </span>
                    <input type="date" name="date" required />
                </label>
            
                <label className='flex flex-col h-16 justify-evenly'>
                    <span> Teléfono </span>
                    <input type="string" name="phone" required />
                </label>

                <label className='flex flex-col h-16 justify-evenly'>
                    <span> Foto o avatar (opcional) </span>
                    <input type="file" name="image" />
                </label>

                <button className='mx-auto w-40' type="submit">Registrarse</button>
            </form>
        
            <p>Si ya estás registrado, <Link className='text-blue-700' to="/formUsers/login">loguéate</Link></p>
        </div>
    );
}

export default Register;
