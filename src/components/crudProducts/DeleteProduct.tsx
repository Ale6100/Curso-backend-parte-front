import { toastError, toastSuccess } from '../../utils/toastify';
import { getJSONHeaders } from '../../utils/http';
import { ProductInterface } from '../../utils/interfaces';

const DeleteProduct = ({ infoProduct }: { infoProduct: ProductInterface | null }) => { // Formulario donde el administrador puede borrar productos
    if (!infoProduct) return null
    
    const deleteProduct = async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${infoProduct._id}`, {
            method: "DELETE",
            ...getJSONHeaders(),
        }).then(res => res.json())

        if (res.status === "success") toastSuccess("Producto eliminado!")
        else toastError(res.error)
    }
    
    return (
        <div className='mt-5'>
            <p>Estás seguro de que deseas eliminar el producto "{infoProduct.title}"? (_id: {infoProduct._id}) click <button onClick={deleteProduct} className='border-none text-red-700'>aquí</button> para confirmar</p>
        </div>
    )
}

export default DeleteProduct;
