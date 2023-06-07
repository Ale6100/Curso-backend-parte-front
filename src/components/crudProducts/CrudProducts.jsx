import React, { useState, useContext } from 'react';
import { toastError } from '../../utils/toastify';
import CreateProduct from './CreateProduct';
import ReadProduct from './ReadProduct';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import { PersonalContext } from '../PersonalContext';
import MessageAutenticate from '../MessageAutenticate';
import MessageOnlyAdmins from "../MessageOnlyAdmins"
import { getJSONHeaders } from '../../utils/http';

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

            const { status, payload } = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/title/${titleInput}`, { // Analiza si el producto con ese título ya existe
                ...getJSONHeaders(),
            }).then(res => res.json())

            if (seleccion === "create") { // Si seleccionaste en crear un producto y ya existía, entonces no te dejará crearlo
                if (status === "success") return toastError("El producto ya existe, no puedes crearlo!");
            
            } else { // Si seleccionaste en la opción leer, actualizar o borrar algún producto y a su vez el producto no existía, no te dejará avanzar
                if (status === "error") return toastError("El producto no existe");
                setInfoProduct(payload)
            }
            setTituloElegido(titleInput)
            setSelectedValue(seleccion)
        }

        return (
            <div>
                <p>Seleccione si desea crear un nuevo producto, leer su información, actualizar algún parámetro, o borrarlo de la base de datos</p>
                <form onSubmit={submitFirstForm} className='mt-5'>
                    <div className='flex justify-evenly flex-wrap gap-y-5'>
                        <select name="action" id="selector" defaultValue="" >
                            <option value="" disabled>Seleccione una opción</option>
                            <option value="create">Crear producto</option>
                            <option value="read">Ver producto</option>
                            <option value="update">Actualizar producto</option>
                            <option value="delete">Borrar producto</option>
                        </select>

                        <div className='flex flex-col'>
                            <label className='w-full'>
                                <p>Nombre del producto</p>
                                <input type="text" name="title" className='border-2 border-gray-400' required />
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-center mt-2">
                        <button type="submit" className='w-60 p-1 border-2 border-gray-400 focus:bg-slate-600 focus:text-white'>OK</button>
                    </div>
                </form>

                <hr className='border-black my-5'/>

                <p><span className='font-bold'>Importante</span>: Debido a restricciones de CORS y la configuración actual, no es posible realizar cambios en las imágenes del backend desde este sitio cuando realizo los despliegues correspondientes en internet. Tengo pendiente solucionar este problema para archivos multimedia.</p>
                <p> Mientras tanto puedes irte al <a className='text-blue-800' href={import.meta.env.VITE_BACKEND_URL} target="_blank" rel="noopener noreferrer">backend</a> y modificar los datos desde la propia documentación</p>
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
            
            <div> {/* Dependiendo del valor elegido en el FirstForm, se renderiza alguno de los otros cuatro componentes, correspondientes al CRUD de productos*/}
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
