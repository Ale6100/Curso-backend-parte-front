import React, { useContext, useState } from 'react';
import getUser from '../utils/getUser';
import { PersonalContext } from './PersonalContext';
import { toastError, toastWait, toastSuccess } from '../utils/toastify';
import { useNavigate } from 'react-router-dom';
import { getJSONHeaders } from '../utils/http';

const AddToCart = ({ product }) => {
    const { setUser, changeCantInCart, setProductsInCart } = useContext(PersonalContext)
    const [ cantidadProducto, setCantidadProducto ] = useState(0)
    const navigate = useNavigate();

    const botonMas = () => {
        if (product.stock === 0) {
            toastError("Lo sentimos, ya no queda stock disponible")
        } else if (product.stock === cantidadProducto) {
            toastError(`Lo sentimos, sólo nos quedan ${cantidadProducto} elementos de este producto`)
        } else if (cantidadProducto < product.stock) {
            setCantidadProducto(cantidadProducto + 1)
        }
    }

    const botonMenos = () => {
        if (cantidadProducto > 0) setCantidadProducto(cantidadProducto - 1)
    }

    const addToCart = async () => {
        if (cantidadProducto === 0) return null // No quiero que haga nada si se pretende agregar cero productos

        const user = await getUser(setUser, setProductsInCart)

        if (!user) return toastError("Por favor, loguéate primero", () => navigate("/formUsers/login"))
        if (user.role === "admin") return toastError("Los administradores no pueden realizar esta acción")

        toastWait("Espere por favor...")

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/carts/${user.cartId}/products/${product._id}?cant=${cantidadProducto}`, { // Agrego "cantidadProducto" cantidad de veces un producto al carrito
            method: "POST",
            ...getJSONHeaders(),
        }).then(res => res.json())

        if (res.status === "success") {
            toastSuccess("Producto agregado al carrito!")
            setCantidadProducto(0)
            changeCantInCart(cantidadProducto)

        } else if (res.error === "Error: Superas el stock disponible") {
            toastError("Error: Superas el stock disponible")
            
        } else {
            toastError("Error! Inténtalo de nuevo más tarde")
        }
    }

    return (
        <div className='flex w-full justify-evenly'>
            <button onClick={botonMas} className='w-7 h-7'>+</button>
            <p>{cantidadProducto}</p>
            <button onClick={botonMenos} className='w-7 h-7'>-</button>
            <button onClick={addToCart} className='border-0'><img src="https://img.icons8.com/material-outlined/24/000000/shopping-cart--v1.png" alt="Icon add to cart" /></button>
        </div>
    );
}

export default AddToCart;
