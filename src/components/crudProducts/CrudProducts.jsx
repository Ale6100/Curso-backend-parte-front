import React, { useState, useContext } from 'react';
import { toastError } from '../../utils/toastify';
import CreateProduct from './CreateProduct';
import ReadProduct from './ReadProduct';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import { PersonalContext } from '../PersonalContext';
import MessageAutenticate from '../MessageAutenticate';
import MessageOnlyAdmins from "../MessageOnlyAdmins"

const CrudAdmins = () => {
    const [ selectedValue, setSelectedValue ] = useState(null);
    const [ tituloElegido, setTituloElegido ] = useState(null)
    const [ inforProduct, setInfoProduct ] = useState({})

    const { user } = useContext(PersonalContext)

    document.title = "CRUD productos"

    const FirstForm = () => {
        const submitFirstForm = async (e) => {
            e.preventDefault()
            const seleccion = e.target.selector.value
            const titleInput = e.target.elements.title.value

            if (seleccion === "" || titleInput === "") return null

            const { status, payload } = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/title/${titleInput}`).then(res => res.json())

            if (seleccion === "create") {
                if (status === "success") return toastError("El producto ya existe, no puedes crearlo!");
            
            } else {
                if (status === "error") return toastError("El producto no existe");
                setInfoProduct(payload)
            }
            setTituloElegido(titleInput)
            setSelectedValue(seleccion)
        }

        return (
            <div>
                <p>Seleccione si desea crear un nuevo producto, leer su información, actualizar algún parámetro, o borrarlo de la base de datos</p>
                <form onSubmit={submitFirstForm}>
                    <select name="action" id="selector" defaultValue="" >
                        <option value="" disabled>Seleccione una opción</option>
                        <option value="create">Crear producto</option>
                        <option value="read">Ver producto</option>
                        <option value="update">Actualizar producto</option>
                        <option value="delete">Borrar producto</option>
                    </select>

                    <label>
                        <span>Nombre del producto</span>
                        <input type="text" name="title" className='ml-4 border-2 border-gray-400' required />
                    </label>

                    <button type="submit" className='m-auto p-1 border-2 border-gray-400 focus:bg-slate-600 focus:text-white'>OK</button>
                </form>
            </div>
        )
    }

    if (!user) return <MessageAutenticate />
    if (user.role !== "admin") return <MessageOnlyAdmins />

    return (
        <div className='m-5'>
            <h1 className='text-center text-2xl font-semibold'>CRUD general</h1>
            <h2 className='my-5 text-center text-xl font-semibold'>Visible sólo para los administradores</h2>
            {selectedValue && <p className="text-lg" > Click <span className='text-blue-900 underline cursor-pointer' onClick={() => setSelectedValue("")}>aquí</span> si deseas elegir una opción distinta</p>}
            
            <div>
                {!selectedValue ? <FirstForm /> : 
                selectedValue === "create" ? <CreateProduct tituloElegido={tituloElegido} /> :
                selectedValue === "read" ? <ReadProduct inforProduct={inforProduct} /> : 
                selectedValue === "update" ? <UpdateProduct inforProduct={inforProduct}/> :
                selectedValue === "delete" && <DeleteProduct inforProduct={inforProduct} />}
            </div>
        </div>
    );
}

export default CrudAdmins;
