import { toastError, toastSuccess, toastWait } from '../../utils/toastify';
import { getJSONHeaders } from '../../utils/http';
import disabledButton from '../../utils/disabledButton';

const PasswordRestoreRequest = () => { // Formulario donde se hace la petición para restaurar la contraseña
    document.title = "Restaurar contraseña"
    
    const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const buttonSubmit = e.currentTarget.elements.namedItem('submit') as HTMLButtonElement

        disabledButton(buttonSubmit, true)

        const data = new FormData(e.currentTarget);

        interface objInt {
            [key: string]: string
        }

        const obj: objInt = {}
        data.forEach((value, key) => obj[key] = value as string)
    
        toastWait("Espere por favor...")
    
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions/passwordRestoreRequest`, {
            method: "POST",
            body: JSON.stringify(obj),
            ...getJSONHeaders()
        }).then(res => res.json())

        disabledButton(buttonSubmit, false)
        
        if (res.status === "success") toastSuccess("Mail enviado! Verifica tu bandeja de entrada")
        else toastError(res.error)
    }
    
    return (
        <div className='p-3 flex flex-col justify-evenly'>
            <h1 className='mt-5 font-semibold text-center text-2xl max-md:text-xl'>Restaurar contraseña</h1>

            <p className='my-5 text-center'>Ingrese su correo electrónico donde le informaremos los pasos a seguir</p>

            <form onSubmit={sendForm} className='mx-auto px-2 w-80 flex flex-col justify-evenly border border-black rounded-sm h-40'>
                <label className='flex flex-col h-16 justify-evenly'>
                    <span>Email</span>
                    <input type="email" name="email" required/>
                </label>
                
                <button type="submit" name="submit" className='mx-auto w-40 bg-blue-500 hover:bg-blue-600 text-white rounded-sm active:bg-blue-700'>Enviar</button>
            </form>
        </div>
    );
}

export default PasswordRestoreRequest;
