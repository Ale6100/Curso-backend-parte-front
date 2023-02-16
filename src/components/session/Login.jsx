import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getJSONHeaders } from "../../utils/http"
import { PersonalContext } from "../PersonalContext";
import { toastSuccess, toastError } from '../../utils/toastify';

const Login = () => {
    const { user } = useContext(PersonalContext);
    const navigate = useNavigate();

    document.title = "Logueo de usuario"

    const sendForm = async (e) => {
        e.preventDefault()

        const data = new FormData(e.target);
        const obj = {}
        data.forEach((value, key) => obj[key] = value)

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions/login`, {
            method: "POST",
            body: JSON.stringify(obj),
            ...getJSONHeaders(),
            credentials: "include"
        }).then(res => res.json())

        if (res.status === "success") {
            toastSuccess("Logueado!")    
            navigate("/")
            
        } else {
            toastError("Error, por favor intente de nuevo más tarde")
        }
    }

    if (user) return <h1 className='mt-8 text-center text-xl font-semibold'>Hay una sesión abierta! Si deseas loguearte con una cuenta distinta, por favor desloguéate primero</h1>

    return (
        <div className='p-4'>
            <h1 className='text-2xl mb-4 text-center'>Formulario de logueo de usuario</h1>

            <form onSubmit={sendForm}  className='mx-auto mb-5 px-2 max-w-lg flex flex-col justify-evenly border border-black rounded-sm h-60'>    
                <label className='flex flex-col h-16 justify-evenly'>
                    <span>Email</span>
                    <input type="email" name="email" required />
                </label>
            
                <label className='flex flex-col h-16 justify-evenly'>
                    <span>Contraseña</span>
                    <input type="password" name="password" required />
                </label>
            
                <button className='mx-auto w-40' type="submit">Loguearse</button>
            </form>

            <p>Si no estás registrado, <Link className='text-blue-700' to="/formUsers/register">regístrate</Link></p>
            <Link className='text-blue-700' to="/formUsers/passwordRestoreRequest">¿Olvidaste tu contraseña?</Link>
        </div>
    );
}

export default Login;
