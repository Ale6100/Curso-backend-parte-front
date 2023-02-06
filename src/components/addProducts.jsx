import React, { useContext } from 'react';
import { toastWait, toastSuccess, toastError } from '../utils/Toastify';
import { PersonalContext } from './PersonalContext';
import MessageAutenticate from './MessageAutenticate';
import MessageOnlyAdmins from "./MessageOnlyAdmins"

const AddProducts = () => {
    const { user, setUser } = useContext(PersonalContext)

    const sendProduct = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target);

        toastWait("Espere por favor...")

        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/api/products`, {
            method: "POST",
            body: formData, // Enviamos los datos al body. Multer se va a encargar de procesarlos
        }).then(res => res.json())

        if (res.status === "success") {
            toastSuccess("Producto agregado!")

        } else {
            toastError(res.error)
        }
    }

    if (!user) return <MessageAutenticate />
    if (user.role !== "admin") return <MessageOnlyAdmins />

    return (
        <div className='m-5'>
            <h1 className='text-center font-semibold text-xl'>Formulario para agregar productos</h1>

            <form onSubmit={sendProduct} className="p-2 h-96 flex flex-col justify-evenly border border-black rounded-sm">
                <label>
                    <p>Título</p>
                    <input type="text" name='title' required />
                </label>

                <label>
                    <p>Descripción</p>
                    <input type="text" name="description" required />
                </label>
                
                <label>
                    <p>Precio</p>
                    <input type="number" name="price" required/>
                </label>
                
                <label>
                    <p>Imagen</p>
                    <input type="file" name="image" required />
                </label>
                
                <label>
                    <p>Stock</p>
                    <input type="number" name="stock" required/>
                </label>

                <button className='w-80' type="submit">Agregar producto</button>
            </form>
        </div>
    );
}

export default AddProducts;
