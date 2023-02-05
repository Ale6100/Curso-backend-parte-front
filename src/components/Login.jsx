import React, { useContext } from 'react';
import PageTitle from './PageTitle';
import { Link } from 'react-router-dom';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { useNavigate } from 'react-router-dom';
import { getJSONHeaders } from "../utils/http"
import { PersonalContext } from "./PersonalContext";

const Login = () => {
    const { user } = useContext(PersonalContext);
    const navigate = useNavigate();

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
    
        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/api/sessions/login`, {
            method: "POST",
            body: JSON.stringify(obj),
            ...getJSONHeaders()
        }).then(res => res.json())
    
        if (res.status === "success") {
            Toastify({
                text: "Logueado!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
    
            navigate("/")
            
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

    if (user) {
        return (
            <p className='text-center'>Hay una sesión abierta! Si deseas loguearte con una cuenta distinta por favor desloguéate primero</p>
        )
    }

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
