import { useState, useEffect, useContext } from 'react';
import { PersonalContext } from '../PersonalContext';
import CartOneProduct from './CartOneProduct';
import { useNavigate } from 'react-router-dom';
import MessageAutenticate from '../MessageAutenticate';
import { toastError } from "../../utils/toastify"
import Loading from "../Loading"
import getUser from '../../utils/getUser';
import MessageOnlyUsers from "../MessageOnlyUsers"
import PaymentService from '../../utils/paymentService';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import Wrapper from '../Wrapper';
import { Elements } from '@stripe/react-stripe-js';
import { getJSONHeaders } from '../../utils/http';
import disabledButton from '../../utils/disabledButton';
import { UserInterface, ProductInterface } from '../../utils/interfaces';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

type CombinedInterfaceCart = ProductInterface & { quantity: number };

interface contenedorInt {
    idProductInCart: CombinedInterfaceCart,
    quantity: number
}

const Cart = () => {
    const personalContext = useContext(PersonalContext)
    if (!personalContext) return null

    const { user, setUser, restartIconCart, setProductsInCart } = personalContext
    const [ productos, setProductos ] = useState<string | CombinedInterfaceCart[]>("loading")
    const [ totalPrice, setTotalPrice ] = useState(0)
    const [ clientSecret, setClientSecret ] = useState<undefined | string>(undefined)
    const navigate = useNavigate();

    document.title = "Carrito" 

    const crearArrayDeProductos = async (user_: UserInterface) => {
        const objCart = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/carts/${user_.cartId}`, {
            ...getJSONHeaders(),
        }).then(res => res.json().then(res => res.payload)) // Objeto que contiene al carrito del usuario actual. Considerar que se hizo un populate para que idProductInCart en realidad sea el producto entero, y no su id

        let arrayProductos = objCart.contenedor.map((element: contenedorInt) => {  // Aca creo un array con los productos del carrito. Hago que la propiedad quantity esté dentro del idProductInCart, junto con las demás propiedades
            if (element.idProductInCart) { // Si un producto del carrito se eliminó, entonces retorna null y el filter que viene a continuación se encarga de eliminarlos
                element.idProductInCart.quantity = element.quantity
                return element.idProductInCart
            }
        })
        arrayProductos = arrayProductos.filter((e: contenedorInt) => e)        
        
        setProductos(arrayProductos)

        const preciosIndividuales = arrayProductos.map((product: CombinedInterfaceCart) => product.quantity*product.price)
        const precioFinal = preciosIndividuales.reduce((previousValue: number, currentValue: number) => previousValue+currentValue, 0)
        setTotalPrice(precioFinal)
    }

    useEffect(() => {
        getUser(setUser, setProductsInCart).then(user => {
            if (user) {
                if (user.role !== "admin") crearArrayDeProductos(user)
            }
        })
    }, [])
    
    const construirMailyBorrarCarrito = async () => {
        if (!user) return null
        let cuerpoPedido = '<div style="width: 100%; display: flex; justify-content: space-evenly; flex-wrap: wrap; row-gap: 10px; column-gap: 1px;">'

        if (productos.length !== 0 && Array.isArray(productos)) {
            productos.forEach((product) => {
            cuerpoPedido += `
            <div style="padding: 10px; border: 1px solid black; width: 300px">
                <p style="font-weight: bold;">${product.title}</p>
                <p style="text-align: center;"> Cantidad: ${product.quantity} | Precio: $${product.price}</p>                 
            </div>
            `
            })
            cuerpoPedido += `</div>`
        }

        const pedidoHTML = `
        <div>
            <h1 style="font-size: 1.25rem; text-align: center;">Gracias ${user.first_name} ${user.last_name} por tu compra! </h1>
            
            ${cuerpoPedido}
            <p>Precio final: $${totalPrice}</p>
            <p>Dirección de llegada: ${user.direccion}</p>

            <p style="font-size: 0.75rem;">Te ha llegado este mail a ${user.email}. Si consideras que es un error, desestima este mensaje</p>
        </div>
        `

        const obj = {
            from: `${user.first_name} ${user.last_name}`,
            to: `${user.email}`,
            subject: "Confirmación de compra",
            html: pedidoHTML,
            cartId: user.cartId,
            products: productos
        }

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payments/updateCartDeleteStockSendMail`, { // Envio al objeto que me permitirá enviar el mail de confirmación
            method: "PUT",
            body: JSON.stringify(obj),
            ...getJSONHeaders(),
        }).then(res => res.json())

        return res
    }

    const procederAlPago = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const buttonPago = e.currentTarget   
        
        disabledButton(buttonPago, true)
        const user = await getUser(setUser, setProductsInCart)

        if (!user) {
            toastError("Sesión expirada")
            return navigate("/formUsers/login")
        }
        
        const service = new PaymentService()

        const result = await service.createPaymentIntent({ body: { total: totalPrice, clientId: user._id, direccion: user.direccion, phone: user.phone } }).then(res => res.json())
        disabledButton(buttonPago, false)
        
        if (result.status === "success") {
            setClientSecret(result.payload.client_secret)

            buttonPago.setAttribute("hidden", "true")
            const contenedorPago = document.querySelector(".contenedor-pago") as HTMLElement | null;
            contenedorPago?.style.setProperty("height", "550px")

        } else if (result.error === "Incomplete values" ) {
            toastError("Valores incompletos")
        
        } else if (result.error === "Amount must be no more than $999,999.99") {
            toastError("La compra no debe exeder los $999999")
        
        } else {
            toastError("Error inesperado. Inténtalo de nuevo más tarde")
        }
    }

    const deleteCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const buttonVaciarCarrito = e.currentTarget
        
        disabledButton(buttonVaciarCarrito, true)

        const user = await getUser(setUser, setProductsInCart)

        if (!user) {
            toastError("Sesión expirada")
            return navigate("/formUsers/login")
        }

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/carts/${user.cartId}`, { // Vacía el carrito asignado al usuario
            method: "DELETE",
            ...getJSONHeaders(),
        }).then(res => res.json())

        
        if (res.status === "success") {
            await crearArrayDeProductos(user)
            restartIconCart()
            
        } else {
            toastError("Error, vuelve a intentar más tarde")
        }
        disabledButton(buttonVaciarCarrito, false)
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
            <h1 className='mb-5 text-center font-bold text-2xl'>Carrito</h1>

            <Wrapper hidden={Boolean(clientSecret)}>
                <div className='mb-5 pb-5 border border-black border-dashed'>
                    <h2 className='mt-5 text-xl font-semibold text-center'>Mi lista</h2>
                    {productos?.length !== 0 && <button onClick={deleteCart} className='my-5 ml-8 px-1 bg-blue-500 hover:bg-blue-600 text-white rounded-sm active:bg-blue-700'>Vaciar carrito</button>}
                    <div id="divPedido" className="flex flex-wrap gap-4 w-full justify-evenly">
                        {(Array.isArray(productos) && productos.length !== 0) ? productos.map((product) => (
                            <CartOneProduct key={product._id} product={product} crearArrayDeProductos={crearArrayDeProductos}/>
                        ))
                        : <p className='mt-5'>Carrito vacío</p>}
                    </div>
                </div>
            </Wrapper>

            <Wrapper hidden={productos.length === 0}>
                <div className='contenedor-pago p-5 transition-all duration-1000 pb-5 border border-black border-dashed'>
                    <h2 className='text-xl font-semibold text-center'>Pagos</h2>
                    
                    <div className='p-1 flex flex-col h-full w-full justify-evenly items-center'>
                        <p className='my-2'>Precio total: <span className='font-semibold'>${totalPrice}</span></p>
                        <p>Dirección de envío: <span className='font-semibold'>{user.direccion}</span></p>
                        <p className='my-2'>Te llegará un mail como comprobante a <span className='font-semibold'>{user.email}</span> con los datos de tu compra</p>
                        <button onClick={procederAlPago} className='w-48 bg-blue-500 hover:bg-blue-600 text-white rounded-sm text-xl active:bg-blue-700'>Proceder al pago</button>
                        <Wrapper hidden={!clientSecret || !stripePromise}> {/* Mantiene a Elements oculto hasta que clientSecret o stripePromise estén definidos */}
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <PaymentForm construirMailyBorrarCarrito={construirMailyBorrarCarrito}/>
                            </Elements>
                        <p>Al ser una simulación se te permite colocar 4242 4242 4242 4242 en el número de tarjeta</p>
                        </Wrapper>
                    </div>
                </div> 
            </Wrapper>
        </div>
    );
}

export default Cart;
