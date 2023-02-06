import React, { useContext } from 'react';
import { toastWait, toastSuccess, toastError } from '../utils/toastify';
import { PersonalContext } from './PersonalContext';
import MessageAutenticate from './MessageAutenticate';
import MessageOnlyAdmins from "./MessageOnlyAdmins"

const AddProducts = () => {
    const { user } = useContext(PersonalContext)

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
        <div className='m-2'>
            <h1 className='my-5 text-center font-semibold text-xl'>Formulario para agregar productos</h1>

            <form onSubmit={sendProduct} className='mx-auto px-2 max-w-lg flex flex-col justify-evenly border border-black rounded-sm h-[400px]'>
                <label className='flex flex-col h-16 justify-evenly'>
                    <span>Título</span>
                    <input type="text" name='title' required />
                </label>

                <label className='flex flex-col h-16 justify-evenly'>
                    <span>Descripción</span>
                    <input type="text" name="description" required />
                </label>
                
                <label className='flex flex-col h-16 justify-evenly'>
                    <span>Precio</span>
                    <input type="number" name="price" required/>
                </label>
                
                <label className='flex flex-col h-16 justify-evenly'>
                    <span>Imagen</span>
                    <input type="file" name="image" required />
                </label>
                
                <label className='flex flex-col h-16 justify-evenly'>
                    <span>Stock</span>
                    <input type="number" name="stock" required/>
                </label>

                <button className='mx-auto w-40' type="submit">Agregar producto</button>
            </form>
        </div>
    );
}

export default AddProducts;
