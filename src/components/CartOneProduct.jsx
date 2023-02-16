import React from 'react';
import { PersonalContext } from './PersonalContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toastError } from "../utils/toastify"
import getUser from "../utils/getUser"
import { getJSONHeaders } from '../utils/http';

const CartOneProduct = ({ product, crearArrayDeProductos }) => {
    const { setUser, changeCantInCart, setProductsInCart } = useContext(PersonalContext)
    const navigate = useNavigate();

    const deleteProduct = async () => {
        const user = await getUser(setUser, setProductsInCart)

        if (!user) {
            toastError("Sesión expirada")
            return navigate("/formUsers/login")
        }

        const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/carts/${user.cartId}/products/${product._id}`, {
            method: "DELETE",
            ...getJSONHeaders(),
        }).then(res => res.json())

        if (result.status === "success") changeCantInCart(-product.quantity)
        else toastError(result.error)

        if (user) crearArrayDeProductos(user)
    }

    return (
        <>
        <div className='h-40 flex justify-center items-center'>
            <img src={product.image} alt="" className='max-h-40 '/>
        </div>
        <p className='text-lg font-semibold'>{product.title}</p>
        <p>${product.price} (c/u)</p>
        <p>Llevas {product.quantity}</p>
        <button className='w-[80%] mx-auto' onClick={deleteProduct}>Eliminar</button>
        </>
    );
}

export default CartOneProduct;
