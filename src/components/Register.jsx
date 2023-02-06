import React, { useContext } from 'react';
import PageTitle from './PageTitle';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { PersonalContext } from "./PersonalContext";
import { toastError, toastSuccess, toastWait } from '../utils/Toastify';

const Register = () => {
    const { user } = useContext(PersonalContext);
    const navigate = useNavigate();

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

    if (user) return <p className='text-center'>Hay una sesión abierta! Si deseas registrar una cuenta nueva por favor desloguéate</p>

    return (
        <div className='p-4'>
            <PageTitle title="Registro de usuario" />
            <h1 className='text-2xl mb-4 text-center font-semibold'>Formulario de registro de usuario</h1>

            <p className='mb-3'>No te preocupes! Al ser una simulación no se te piden datos reales</p>
            
            <form onSubmit={sendForm} className='m-auto p-2 flex flex-col justify-evenly item h-[600px] w-96 border-black border rounded-sm'>
                <label>
                    <p> Nombre </p>
                    <input type="text" name="first_name" />
                </label>
            
                <label>
                    <p> Apellido </p>
                    <input type="text" name="last_name" required />
                </label>
            
                <label>
                    <p> Email </p>
                    <input type="email" name="email" required />
                </label>
            
                <label>
                    <p> Contraseña </p>
                    <input type="password" name="password" required />
                </label>

                <label>
                    <p> Repetir contraseña </p>
                    <input type="password" name="password2"  required />
                </label>

                <label>
                    <p> Dirección </p>
                    <input type="text" name="direccion" required />
                </label>

                <label>
                    <p> Fecha de nacimiento </p>
                    <input type="date" name="date" />
                </label>
            
                <label>
                    <p> Teléfono </p>
                    <input type="string" name="phone" required />
                </label>

                <label>
                    <p> Foto o avatar (opcional) </p>
                    <input type="file" name="image" />
                </label>

                <button className='mx-auto px-4 w-min bg-slate-200 hover:bg-slate-300 active:bg-slate-100' type="submit">Registrarse</button>
            </form>
        
            <p>Si ya estás registrado, <Link className='text-blue-700' to="/formUsers/login">loguéate</Link></p>
        </div>
    );
}

export default Register;
