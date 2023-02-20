import React, { useContext } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toastError, toastWait, toastSuccess } from '../utils/toastify';
import { PersonalContext } from './PersonalContext';
import { useNavigate } from 'react-router-dom';
import getUser from '../utils/getUser';
import disabledButton from '../utils/disabledButton';

const PaymentForm = ({ construirMailyBorrarCarrito }) => {
    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();
    const { restartIconCart, setUser, setProductsInCart } = useContext(PersonalContext)
    
    const pagar = async (e) => {
        e.preventDefault()

        const buttonSubmit = e.target.elements.submit
        disabledButton(buttonSubmit, true)

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
        
        disabledButton(buttonSubmit, false)

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
                <button type='submit' name="submit" className='mt-5 w-full h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-sm text-xl active:bg-blue-700'>Pagar</button>  
            </form>
        </div>
    );
}

export default PaymentForm;
