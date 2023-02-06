import React from 'react';
import { PersonalContext } from './PersonalContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toastError } from "../utils/toastify"
import getUser from "../utils/getUser"

const CartOneProduct = ({ product, crearArrayDeProductos }) => {
    const { setUser } = useContext(PersonalContext)
    const navigate = useNavigate();

    const deleteProduct = async () => {
        const user = await getUser(setUser)

        if (!user) {
            toastError("Sesión expirada")
            return navigate("/formUsers/login")
        }

        await fetch(`${import.meta.env.VITE_BACK_URL}/api/cart/${user.cartId}/products/${product._id}`, {
            method: "DELETE"
        }).then(res => res.json())
        
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
        <button onClick={deleteProduct}>Eliminar</button>
        </>
    );
}

export default CartOneProduct;
