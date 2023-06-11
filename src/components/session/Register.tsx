import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { PersonalContext } from "../PersonalContext";
import { toastError, toastSuccess, toastWait } from '../../utils/toastify';
import { getJSONHeadersMulter } from '../../utils/http';
import disabledButton from '../../utils/disabledButton';

const Register = () => {
    const navigate = useNavigate();
    const personalContext = useContext(PersonalContext);
    if (!personalContext) return null

    const { user } = personalContext

    document.title = "Registro de usuario"

    const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const buttonSubmit = e.currentTarget.elements.namedItem("submit") as HTMLButtonElement
        disabledButton(buttonSubmit, true)
        toastWait("Espere por favor...")

        const formData = new FormData(e.currentTarget);
        
        interface objInt {
            [key: string]: FormDataEntryValue;
        }
        
        const obj: objInt = {}
        formData.forEach((value, key) => obj[key] = value)

        if (new Date() < new Date(obj.date as string)) {
            disabledButton(buttonSubmit, false)
            return toastError("Fecha de nacimiento inválida")
        }

        if (obj.password !== obj.password2) {
            disabledButton(buttonSubmit, false)
            return toastError("Contraseñas distintas")
        }

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions/register`, {
            method: "POST",
            body: formData, // Enviamos los datos al body. Multer se va a encargar de procesarlos
            credentials: "include",
            ...getJSONHeadersMulter()
        }).then(res => res.json())

        if (res.status === "success") {
            toastSuccess("Usuario registrado! Por favor loguéate...")
            navigate("/formUsers/login")

        } else {
            toastError(res.error)
            disabledButton(buttonSubmit, false)
        }
    }

    if (user) return <p className='mt-5 text-center font-semibold text-xl'>Hay una sesión abierta! Si deseas registrar una cuenta nueva, por favor desloguéate primero</p>

    return (
        <div className='p-4'>
            <h1 className='text-2xl mb-4 text-center font-semibold max-md:text-xl'>Formulario de registro de usuario</h1>

            <p className='mb-3'>No te preocupes! Al ser una simulación no se te piden datos reales</p>
            
            <form onSubmit={sendForm} className='mx-auto mb-5 px-2 max-w-lg flex flex-col justify-evenly border border-black rounded-sm h-[800px]'>
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
                    <input type="password" name="password2" required />
                </label>

                <label className='flex flex-col h-16 justify-evenly'>
                    <span> Dirección de envío </span>
                    <input type="text" name="direccion" required />
                </label>

                <label className='flex flex-col h-16 justify-evenly'>
                    <span> Fecha de nacimiento </span>
                    <input type="date" name="date" required />
                </label>
            
                <label className='flex flex-col h-16 justify-evenly'>
                    <span> Teléfono (opcional)</span>
                    <input type="number" name="phone" />
                </label>

                <label className='flex flex-col h-36 justify-evenly'>
                    <span> Foto o avatar (opcional) | Debido a restricciones de CORS y la configuración actual, no es posible registrarse con una imagen local cuando este sitio está subido a la web. Tengo pendiente solucionar este problema para archivos multimedia </span>
                    <input type="file" name="image" accept='image/*' disabled/>
                </label>

                <button className='mx-auto w-40 bg-blue-500 hover:bg-blue-600 text-white rounded-sm py-1 active:bg-blue-700' name="submit" type="submit">Registrarse</button>
            </form>
        
            <p>Si ya estás registrado, <Link className='text-blue-700' to="/formUsers/login">loguéate</Link></p>
        </div>
    );
}

export default Register;
