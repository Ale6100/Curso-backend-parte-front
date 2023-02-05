import React, { useState, useEffect, useContext } from 'react';
import { PersonalContext } from './PersonalContext';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import CartOneProduct from './CartOneProduct';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const { user } = useContext(PersonalContext)
    const [ productos, setProductos ] = useState([])
    const [ totalPrice, setTotalPrice ] = useState(0)

    const crearArrayDeProductos = async () => {
        const objCart = await await fetch(`${import.meta.env.VITE_BACK_URL}/api/cart/${user.cartId}/products`).then(res => res.json().then(res => res.payload)) // Objeto que contiene al carrito del usuario actual
        const carrito = objCart.contenedor // Su carrito asignado, que contiene el id de los productos dentro y la cantidad de cada uno

        const arrayProductos = []
        for (let i=0; i<carrito.length; i++) { // Aca creo un array con los productos del carrito
            const producto = await fetch(`${import.meta.env.VITE_BACK_URL}/api/products/${carrito[i].id}`).then(res => res.json()).then(res => res.payload)
            producto.quantity = carrito[i].quantity // A cada uno agrego su correspondiente cantidad en el carrito
            arrayProductos.push(producto)
        }
        setProductos(arrayProductos)

        const preciosIndividuales = arrayProductos.map((product, i) => product.quantity*product.price)
        const precioFinal = preciosIndividuales.reduce((previousValue, currentValue) => previousValue+currentValue, 0)
        setTotalPrice(precioFinal)
    }

    useEffect(() => {
        if (user) {
            crearArrayDeProductos()
        }
    }, [user])
    
    const comprar = async () => {

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
            user
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

        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/cart/comprar`, { // Envio al objeto que me permitirá enviar el mail de confirmación
            method: "PUT",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())

        if (res.status === "success") {
            // contenedorListaCart.innerHTML = `<h2>Lista</h2> <p>No hay productos por mostrar</p>`
            Toastify({
                text: "Compra exitosa!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
    
            navigate("/")
            
        } else {
            Toastify({
                text: "Error, vuelve a intentar más tarde",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, rgb(255, 0, 0), rgb(0, 0, 0))",
                }
            }).showToast();
        }
    }

    if (!user) {
        return (
            <p className='text-center'>Por favor loguéate</p>
        )
    }

    return (
        <div className='p-2'>



            <h1 className='text-center font-bold text-2xl'>Carrito</h1>

            <div className='mb-5 pb-5 border border-black border-dashed'>
                <h2 className='my-5 text-xl font-semibold text-center'>Mi lista</h2>

                <div id="divPedido" className="flex flex-wrap w-full justify-evenly">
                    
                    {productos.length !== 0 ? productos.map((product) => (
                        <div key={product._id} className="p-1 flex flex-col justify-evenly text-center w-40 h-64 border border-black rounded-sm" >
                            <CartOneProduct product={product} />
                        </div>
                    )) :
                    <p>Carrito vacío</p>}
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
