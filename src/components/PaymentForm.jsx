import React, { useContext } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toastError, toastWait, toastSuccess } from '../utils/toastify';
import { PersonalContext } from './PersonalContext';
import { useNavigate } from 'react-router-dom';
import getUser from '../utils/getUser';

const PaymentForm = ({ construirMailyBorrarCarrito }) => {
    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();
    const { restartIconCart, setUser, setProductsInCart } = useContext(PersonalContext)
    
    const pagar = async (e) => {
        e.preventDefault()

        const user = await getUser(setUser, setProductsInCart)

        if (!user) {
            toastError("Sesión expirada")
            return navigate("/formUsers/login")
        }

        toastWait("Espere por favor...")

        const result = await stripe.confirmPayment({
            elements,
            redirect: "if_required"
        })

        if (result.error) {
            toastError(result.error.message)

        } else {
            const result2 = await construirMailyBorrarCarrito()

            if (result2.status === "success") restartIconCart()
            else toastWait("Se efectuó la compra pero no se logró borrar tu carrito") // Nunca debería mostrarse este mensaje

            toastSuccess("Compra exitosa!")
            navigate("/")
        }
    }

    return (
        <div>
            <form onSubmit={pagar} className="flex flex-col justify-evenly items-center">
                <PaymentElement />
                <button className='mt-5 w-20' type='submit'>Pagar</button>  
            </form>
        </div>
    );
}

export default PaymentForm;
