import { useContext, useState } from 'react';
import getUser from '../utils/getUser';
import { PersonalContext } from './PersonalContext';
import { toastError, toastWait, toastSuccess } from '../utils/toastify';
import { useNavigate } from 'react-router-dom';
import { getJSONHeaders } from '../utils/http';
import disabledButton from '../utils/disabledButton';
import { ProductInterface } from '../utils/interfaces';

const AddToCart = ({ product }: { product: ProductInterface }) => {
    const personalContext = useContext(PersonalContext)
    if (!personalContext) return null

    const { setUser, setProductsInCart } = personalContext
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

    const addToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (cantidadProducto === 0) return null // No quiero que haga nada si se pretende agregar cero productos
        
        const button = e.currentTarget

        disabledButton(button, true)
        toastWait("Espere por favor...")

        const user = await getUser(setUser, setProductsInCart)

        if (!user) {
            disabledButton(button, false)
            return toastError("Por favor, loguéate primero", () => navigate("/formUsers/login"))
        
        } else if (user.role === "admin") {
            disabledButton(button, false)
            return toastError("Los administradores no pueden realizar esta acción")
        } 

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/carts/${user.cartId}/products/${product._id}?cant=${cantidadProducto}`, { // Agrego "cantidadProducto" cantidad de veces un producto al carrito
            method: "POST",
            ...getJSONHeaders(),
        }).then(res => res.json())
        
        if (res.status === "success") {
            toastSuccess("Producto agregado al carrito!", () => navigate("/cart"))
            setCantidadProducto(0)
            setProductsInCart(totalQuantity => totalQuantity + cantidadProducto)

        } else if (res.error === "Error: Superas el stock disponible") {
            toastError("Error: Superas el stock disponible")
            
        } else {
            toastError("Error! Inténtalo de nuevo más tarde")
        }

        disabledButton(button, false)
    }

    return (
        <div className='flex items-center justify-evenly w-full'>
            <button onClick={botonMas} className='w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-sm font-bold text-xl active:bg-blue-700'>+</button>
            <p className='text-lg font-semibold'>{cantidadProducto}</p>
            <button onClick={botonMenos} className='w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-sm font-bold text-xl active:bg-blue-700'>-</button>
            <button onClick={addToCart} className='w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-sm active:bg-blue-700 flex justify-center items-center'>
                <img src="https://img.icons8.com/material-outlined/24/ffffff/shopping-cart--v1.png" alt="Icon add to cart" className='w-5 h-5 pointer-events-none' />
            </button>
        </div>
    );
}

export default AddToCart;
