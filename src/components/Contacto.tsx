import { toastWait, toastError, toastSuccess } from '../utils/toastify';
import { getJSONHeaders } from '../utils/http';
import disabledButton from '../utils/disabledButton';

const Contacto = () => {
    document.title = "Formulario de contacto"

    const superTrim = (string: string) => {
        string = string.trim()
        while (string.includes("  ")) {
            string = string.replaceAll("  ", " ")
        }
        return string
    }

    const sendMail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const buttonSubmit = e.currentTarget.elements.namedItem("submit") as HTMLButtonElement

        const data = new FormData(e.currentTarget);
        interface objInt {
            [key: string]: string;
        }
        
        const obj: objInt = {}
        data.forEach((value, key) => obj[key] = superTrim(value as string))
        
        if (!obj.name || !obj.email || !obj.message) return toastError("Valores incompletos")

        disabledButton(buttonSubmit, true)

        const message = `
        <div>
            <p> ${obj.name} dice: </p>
            <p> ${obj.message} </p>
        </div>
        `

        const objSend = {
            from: `${obj.email}`,
            to: `${import.meta.env.VITE_PERSONAL_EMAIL}`,
            subject: `Nuevo mail enviado desde ${location.origin} de parte de ${obj.email}`,
            html: message
        }

        toastWait("Espere por favor...")
    
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sendNewMail`, { // Envio al objeto que me permitirá enviar el mail de confirmación
            method: "POST",
            body: JSON.stringify(objSend),
            ...getJSONHeaders()
        }).then(res => res.json())

        disabledButton(buttonSubmit, false)

        if (res.status === "success") toastSuccess("Mail enviado!")    
        else if (res.error === "Valores incompletos") toastError(res.error)
        else toastError("Error, vuelve a intentar más tarde")
    }

    return (
        <div className='m-2'>
            <h1 className='mt-5 text-center font-semibold text-xl'>Formulario de contacto</h1>

            <p className='my-5 text-center'>Tienes alguna duda o sugerencia? No dudes en ponerte en contacto con nosotros!</p>

            <form onSubmit={sendMail} className='mx-auto px-2 max-w-lg flex flex-col justify-evenly border border-gray-500 rounded-sm h-[425px]'>
                <label className='flex flex-col h-16 justify-evenly text-gray-700 font-bold'>
                    <span>Nombre</span>
                    <input type="text" name="name" required className='px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400' />
                </label>

                <label className='flex flex-col h-16 justify-evenly text-gray-700 font-bold'>
                    <span>Email</span>
                    <input type="email" name="email" required className='px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400' />
                </label>

                <label className='flex flex-col justify-evenly text-gray-700 font-bold'>
                    <span>Mensaje</span>
                    <textarea name="message" className='px-3 py-2 h-48 p-1 border border-gray-300 rounded-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400' required></textarea>
                </label>

                <button type="submit" name="submit" className='bg-blue-500 hover:bg-blue-600 text-white rounded-sm px-4 py-2 active:bg-blue-700'>Enviar</button>
            </form>
        </div>
    );
}

export default Contacto;
