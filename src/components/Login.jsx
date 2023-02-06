import React, { useContext } from 'react';
import PageTitle from './PageTitle';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getJSONHeaders } from "../utils/http"
import { PersonalContext } from "./PersonalContext";
import { toastSuccess, toastWait, toastError } from '../utils/Toastify';

const Login = () => {
    const { user } = useContext(PersonalContext);
    const navigate = useNavigate();

    const sendForm = async (e) => {
        e.preventDefault()

        const data = new FormData(e.target);
        const obj = {}
        data.forEach((value, key) => obj[key] = value)
        
        toastWait("Espere por favor...")

        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/api/sessions/login`, {
            method: "POST",
            body: JSON.stringify(obj),
            ...getJSONHeaders()
        }).then(res => res.json())
    
        if (res.status === "success") {
            toastSuccess("Logueado!")    
            navigate("/")
            
        } else {
            toastError(res.error)
        }
    }

    if (user) return <h1 className='mt-8 text-center text-xl font-semibold'>Hay una sesión abierta! Si deseas loguearte con una cuenta distinta por favor desloguéate primero</h1>

    return (
        <div className='p-4'>
            <PageTitle title="Logueo de usuario" />
            <h1 className='text-2xl mb-4 text-center'>Formulario de logueo de usuario</h1>

            <form onSubmit={sendForm}>    
                <label>Email
                    <input type="email" name="email" required />
                </label>
            
                <label>Contraseña
                    <input type="password" name="password" required />
                </label>
            
                <button type="submit">Loguearse</button>
            </form>

            <p>Si no estás registrado, <Link className='text-blue-700' to="/formUsers/register">regístrate</Link></p>
            <Link className='text-blue-700' to="/formUsers/passwordRestoreRequest">¿Olvidaste tu contraseña?</Link>
        </div>
    );
}

export default Login;
