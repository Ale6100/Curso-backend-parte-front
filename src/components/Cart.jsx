import React, { useState, useEffect, useContext } from 'react';
import { PersonalContext } from './PersonalContext';
import CartOneProduct from './CartOneProduct';
import { useNavigate } from 'react-router-dom';
import MessageAutenticate from './MessageAutenticate';
import { toastError, toastSuccess, toastWait } from "../utils/toastify"
import Loading from "./Loading"
import getUser from '../utils/getUser';
import MessageOnlyUsers from "./MessageOnlyUsers"

const Cart = () => {
    const navigate = useNavigate();
    const { user, setUser, restartIconCart } = useContext(PersonalContext)
    const [ productos, setProductos ] = useState("loading")
    const [ totalPrice, setTotalPrice ] = useState(0)

    document.title = "Carrito" 

    const crearArrayDeProductos = async (user_) => {
        const objCart = await fetch(`${import.meta.env.VITE_BACK_URL}/api/cart/${user_.cartId}/products`).then(res => res.json().then(res => res.payload)) // Objeto que contiene al carrito del usuario actual
        const arrayProductos = objCart.contenedor.map(element => {  // Aca creo un array con los productos del carrito
            element.idProductInCart.quantity = element.quantity
            return element.idProductInCart
        })

        setProductos(arrayProductos)

        const preciosIndividuales = arrayProductos.map((product, i) => product.quantity*product.price)
        const precioFinal = preciosIndividuales.reduce((previousValue, currentValue) => previousValue+currentValue, 0)
        setTotalPrice(precioFinal)
    }

    useEffect(() => {
        getUser(setUser).then(user_ => {
            if (user_) {
                if (user_.role !== "admin") crearArrayDeProductos(user_)
            }
        })

    }, [])
    
    const comprar = async () => {
        const user = await getUser(setUser)

        if (!user) {
            toastError("Sesión expirada")
            return navigate("/formUsers/login")
        }

        const pedidoHTML = `
        <div>
            <h1>Nuevo pedido de ${user.first_name} ${user.last_name} | ${user.email}</h1>
            ${document.getElementById("divPedido").outerHTML}
            <p>Dirección de llegada: ${user.direccion}</p>
        </div>
        `

        const obj = {
            from: `${user.first_name} ${user.last_name}`,
            to: `${user.email}`,
            subject: "Confirmación de compra",
            html: pedidoHTML,
            user,
            products: productos
        }

        toastWait("Espere por favor...")

        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/cart/comprar`, { // Envio al objeto que me permitirá enviar el mail de confirmación
            method: "PUT",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())

        if (res.status === "success") {

            toastSuccess("Compra exitosa!")
            restartIconCart()
            navigate("/")
        
        } else if (res.error === "Valores incompletos") {
            toastError(res.error)

        } else {
            toastError("Error, vuelve a intentar más tarde")
        }
    }

    const deleteCart = async () => {
        const user = await getUser(setUser)

        if (!user) {
            toastError("Sesión expirada")
            return navigate("/formUsers/login")
        }

        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/api/cart/${user.cartId}`, { // Vacía el carrito asignado al usuario
            method: "DELETE"
        }).then(res => res.json())

        
        if (res.status === "success") {
            await crearArrayDeProductos(user)
            restartIconCart()
            
        } else {
            toastError("Error, vuelve a intentar más tarde")
        }
    }

    if (!user) return <MessageAutenticate />

    if (user.role === "admin") return <MessageOnlyUsers />

    if (productos === "loading") return (
        <div className='p-2'>
            <h1 className='text-center font-bold text-2xl'>Carrito</h1>

            <div className='mb-5 pb-5 border border-black border-dashed'>
                <h2 className='my-5 text-xl font-semibold text-center'>Mi lista</h2>

                <div id="divPedido" className="flex flex-wrap w-full justify-evenly"> 
                    <Loading />
                </div>
            </div>
        </div>
    )

    return (
        <div className='p-2'>
            <h1 className='text-center font-bold text-2xl'>Carrito</h1>

            <div className='mb-5 pb-5 border border-black border-dashed'>
                <h2 className='mt-5 text-xl font-semibold text-center'>Mi lista</h2>
                {(productos?.length !== 0 && <button onClick={deleteCart} className='my-5 ml-[5vw] px-1 rounded-sm'>Vaciar carrito</button>)}
                <div id="divPedido" className="flex flex-wrap w-full justify-evenly">
                    
                    {productos.length !== 0 ? productos.map((product) => (
                        <div key={product._id} className="p-1 flex flex-col justify-evenly text-center w-40 h-72 border border-black rounded-sm" >
                            <CartOneProduct product={product} user={user} crearArrayDeProductos={crearArrayDeProductos}/>
                        </div>
                    ))
                    : <p className='mt-5'>Carrito vacío</p>}
                </div>
            </div>

            {productos.length !== 0 && 
                <div className='mb-5 pb-5 border border-black border-dashed'>
                    <h2 className='mt-5 text-xl font-semibold text-center'>Pagos</h2>
                    <div className='p-1 flex flex-col w-full justify-evenly items-center h-52'>
                        <p>Precio total: <span className='font-semibold'>${totalPrice}</span></p>
                        <p>Dirección de envío: <span className='font-semibold'>{user.direccion}</span></p>
                        <p>Te llegará un mail como comprobante a <span className='font-semibold'>{user.email}</span> con los datos de tu compra</p>
                        <button onClick={comprar} className='w-24'>Comprar</button>
                        <p>PD: Este sitio web es una simulación, es por eso que para no generar desconfianza no solicito ningún método de pago.</p>
                    </div>
                </div>
            }

        </div>
    );
}

export default Cart;
