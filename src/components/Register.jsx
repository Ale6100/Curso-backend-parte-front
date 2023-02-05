import React, { useContext } from 'react';
import PageTitle from './PageTitle';
import { Link } from 'react-router-dom';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { useNavigate } from 'react-router-dom';
import { PersonalContext } from "./PersonalContext";

const Register = () => {
    const { user } = useContext(PersonalContext);
    const navigate = useNavigate();

    const sendForm = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        // const obj = {}
        // formData.forEach((value, key) => obj[key] = value)

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

        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/api/sessions/register`, {
            method: "POST",
            body: formData, // Enviamos los datos al body. Multer se va a encargar de procesarlos
            credentials: "include"
        }).then(res => res.json())
        
        if (res.status === "success") {
            Toastify({
                text: "Usuario registrado! Redireccionando...",
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

    if (user) {
        return (
            <p className='text-center'>Hay una sesión abierta! Si deseas registrar una cuenta nueva por favor desloguéate</p>
        )
    }

    return (
        <div className='p-4'>
            <PageTitle title="Registro de usuario" />
            <h1 className='text-2xl mb-4 text-center'>Formulario de registro de usuario</h1>
            
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
                    <p> Dirección </p>
                    <input type="text" name="direccion" required />
                </label>

                <label>
                    <p> Edad</p>
                    <input type="number" name="age" required /> 
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
