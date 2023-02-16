import React from 'react';
import { toastError, toastSuccess } from '../../utils/toastify';
import { getJSONHeaders } from '../../utils/http';

const DeleteProduct = ({ inforProduct }) => {
    const deleteProduct = async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${inforProduct._id}`, {
            method: "DELETE",
            ...getJSONHeaders(),
        }).then(res => res.json())

        if (res.status === "success") {
            toastSuccess("Producto eliminado!")

        } else {
            toastError(res.error)
        }
    }
    
    return (
        <div className='mt-5'>
            <p>Estás seguro de que deseas eliminar el producto "{inforProduct.title}"? (_id: {inforProduct._id}) click <button onClick={deleteProduct} className='border-none text-red-700'>aquí</button> para confirmar</p>
        </div>
    )
}

export default DeleteProduct;
