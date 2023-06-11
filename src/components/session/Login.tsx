import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getJSONHeaders } from "../../utils/http"
import { PersonalContext } from "../PersonalContext";
import { toastSuccess, toastError, toastWait } from '../../utils/toastify';
import disabledButton from '../../utils/disabledButton';

const Login = () => {
    const personalContext = useContext(PersonalContext);
    if (!personalContext) return null

    const { user } = personalContext
    const navigate = useNavigate();

    document.title = "Logueo de usuario"

    const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const buttonSubmit = e.currentTarget.elements.namedItem('submit') as HTMLButtonElement

        disabledButton(buttonSubmit, true)
        toastWait("Espere por favor...")

        const data = new FormData(e.currentTarget);
        
        interface objInt {
            [key: string]: string;
        }
        
        const obj: objInt = {}
        data.forEach((value, key) => obj[key] = value as string)

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions/login`, {
            method: "POST",
            body: JSON.stringify(obj),
            ...getJSONHeaders(),
            credentials: "include"
        })
        const json = await res.json()

        if (json.status === "success") {
            toastSuccess("Logueado!")    
            navigate("/")
            
        } else if (res.status !== 500){
            toastError(json.error)
        } else {
            toastError("Error, por favor intente de nuevo más tarde")
        }
        disabledButton(buttonSubmit, false)
    }

    if (user) return <h1 className='mt-8 text-center text-xl font-semibold'>Hay una sesión abierta! Si deseas loguearte con una cuenta distinta, por favor desloguéate primero</h1>

    return (
        <div className='p-4'>
            <h1 className='text-2xl mb-4 text-center max-md:text-xl'>Formulario de logueo de usuario</h1>

            <form onSubmit={sendForm}  className='mx-auto mb-5 px-2 max-w-lg flex flex-col justify-evenly border border-black rounded-sm h-60'>    
                <label className='flex flex-col h-16 justify-evenly'>
                    <span>Email</span>
                    <input type="email" name="email" required />
                </label>
            
                <label className='flex flex-col h-16 justify-evenly'>
                    <span>Contraseña</span>
                    <input type="password" name="password" required />
                </label>
            
                <button className='mx-auto w-40 bg-blue-500 hover:bg-blue-600 text-white rounded-sm py-1 active:bg-blue-700' name="submit" type="submit">Loguearse</button>
            </form>

            <p>Si no estás registrado, <Link className='text-blue-700' to="/formUsers/register">regístrate</Link></p>
            <Link className='text-blue-700' to="/formUsers/passwordRestoreRequest">¿Olvidaste tu contraseña?</Link>
        </div>
    );
}

export default Login;
