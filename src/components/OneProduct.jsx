import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toastError, toastSuccess, toastWait } from "../utils/Toastify"
import getUser from "../utils/getUser.js"
import { PersonalContext } from './PersonalContext';

const OneProduct = ({ product }) => {
    const [ cantidadProducto, setCantidadProducto ] = useState(0)
    const navigate = useNavigate();
    const { setUser } = useContext(PersonalContext)

    const botonMas = () => {
        if (cantidadProducto < product.stock) setCantidadProducto(cantidadProducto + 1)
    }

    const botonMenos = () => {
        if (cantidadProducto > 0) setCantidadProducto(cantidadProducto - 1)
    }

    const addToCart = async () => {
        if (cantidadProducto === 0) return null // No quiero que haga nada si se pretende agregar cero productos

        const user = await getUser(setUser)

        if (!user) return toastError("Por favor, loguéate primero", () => navigate("/formUsers/login"))

        toastWait("Espere por favor...")

        await fetch(`${import.meta.env.VITE_BACK_URL}/api/cart/${user.cartId}/products/${product._id}?cant=${cantidadProducto}`, { // Agrego "cant" cantidad de veces un producto al carrito
            method: "POST"
        })

        toastSuccess("Producto agregado al carrito!")

        setCantidadProducto(0)
    }

    return (
        <>
        <div className='h-40 flex justify-center items-center'>
            <img src={product.image} alt="" className='max-h-40 '/>
        </div>
        <p className='text-lg font-semibold'>{product.title}</p>
        <p>{product.description}</p>
        <p>${product.price} (c/u)</p>
        <div className='flex w-full justify-evenly'>
            <button onClick={botonMas} className='w-7 h-7'>+</button>
            <p>{cantidadProducto}</p>
            <button onClick={botonMenos} className='w-7 h-7'>-</button>
            <button onClick={addToCart} className='border-0'><img src="https://img.icons8.com/material-outlined/24/000000/shopping-cart--v1.png" alt="Icon add to cart" /></button>
        </div>
        </>
    );
}

export default OneProduct;
