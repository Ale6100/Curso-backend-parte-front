import { toastError, toastSuccess } from '../../utils/toastify';
import { getJSONHeaders, getJSONHeadersMulter } from '../../utils/http';
import { ProductInterface } from '../../utils/interfaces';

const UpdateProduct = ({ infoProduct }: { infoProduct: ProductInterface | null }) => { // Formulario donde el administrador puede actualizar las propiedades que quiera de un producto
    if (!infoProduct) return null
    
    const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const titleInput = formData.get("title")

        const { status } = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/title/${titleInput}`, {
            ...getJSONHeaders(),
        }).then(res => res.json())
        if (status === "success") return toastError("Este título ya existe!");

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${infoProduct._id}`, {
            method: "PUT",
            body: formData, // Enviamos los datos al body. Multer se va a encargar de procesarlos
            ...getJSONHeadersMulter(),
        }).then(res => res.json())

        if (res.status === "success") toastSuccess("Producto actualizado!")
        else toastError(res.error)
    }

    return (
        <div className='m-2'>
            <h1 className='my-5 text-center font-semibold text-xl'>Formulario para actualizar productos</h1>

            <p>Producto a actualizar: {infoProduct.title} (_id: {infoProduct._id})</p>
            <p className='my-5'>No necesitas rellenar todo! Los campos vacíos no se actualizarán</p>

            <form onSubmit={sendForm} className='formUpdateProduct mx-auto px-2 max-w-lg flex flex-col justify-evenly border border-black rounded-sm h-[400px]'>
                <label className='flex flex-col h-16 justify-evenly'>
                    <span>Título</span>
                    <input type="text" name='title' />
                </label>

                <label className='flex flex-col h-16 justify-evenly'>
                    <span>Descripción</span>
                    <input type="text" name="description" />
                </label>
                
                <label className='flex flex-col h-16 justify-evenly'>
                    <span>Precio</span>
                    <input type="number" name="price" />
                </label>
                
                <label className='flex flex-col h-16 justify-evenly'>
                    <span>Imagen</span>
                    <input type="file" name="image" accept='image/*'/>
                </label>
                
                <label className='flex flex-col h-16 justify-evenly'>
                    <span>Stock</span>
                    <input type="number" name="stock" />
                </label>

                <button className='mx-auto w-40' type="submit">Actualizar producto</button>
            </form>
        </div>
    )
}

export default UpdateProduct
