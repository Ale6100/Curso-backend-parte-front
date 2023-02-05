import React, { useState, useContext } from 'react';
import { PersonalContext } from './PersonalContext';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { useNavigate } from 'react-router-dom';

const OneProduct = ({ product }) => {
    const { user } = useContext(PersonalContext)
    const [ cantidadProducto, setCantidadProducto ] = useState(0)
    const navigate = useNavigate();

    const botonMas = () => {
        if (cantidadProducto < product.stock) setCantidadProducto(cantidadProducto + 1)
    }

    const botonMenos = () => {
        if (cantidadProducto > 0) setCantidadProducto(cantidadProducto - 1)
    }

    const addToCart = async () => {
        if (!user) {
            return Toastify({
                text: "Por favor, loguéate primero",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, rgb(255, 0, 0), rgb(0, 0, 0))",
                },
                onClick: function(){navigate("/formUsers/login")} // Callback after click
            }).showToast();
        }

        Toastify({
            text: "Espere por favor...",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, rgb(100, 100, 100), rgb(200, 200, 200))",
            }
        }).showToast();

        for (let i=1; i <= cantidadProducto; i++) { // Agrego "cant" cantidad de veces un producto al carrito, uno a la vez (tanto esta como muchas otras cosas serán optimizadas luego)
            await fetch(`${import.meta.env.VITE_BACK_URL}/api/cart/${user.cartId}/products/${product._id}`, {
                method: "POST"
            })
        }

        Toastify({
            text: "Producto agregado al carrito!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();

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
