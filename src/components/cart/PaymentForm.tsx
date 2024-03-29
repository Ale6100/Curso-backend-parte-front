import { useContext } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toastError, toastWait, toastSuccess } from '../../utils/toastify';
import { PersonalContext } from '../PersonalContext';
import { useNavigate } from 'react-router-dom';
import getUser from '../../utils/getUser';
import disabledButton from '../../utils/disabledButton';

const PaymentForm = ({ construirMailyBorrarCarrito }: { construirMailyBorrarCarrito: () => Promise<any> }) => {
    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();
    const personalContext = useContext(PersonalContext)
    if (!personalContext) return null

    const { restartIconCart, setUser, setProductsInCart } = personalContext
    
    const pagar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const buttonSubmit = e.currentTarget.elements.namedItem("submit") as HTMLButtonElement
        disabledButton(buttonSubmit, true)

        const user = await getUser(setUser, setProductsInCart)

        if (!user) {
            toastError("Sesión expirada")
            return navigate("/formUsers/login")
        }

        if (!stripe || !elements) return toastError("Error inesprado. Por favor reintente más tarde") // Esto no debería suceder nunca, pero lo dejo por si acaso

        toastWait("Espere por favor...")

        const result = await stripe.confirmPayment({
            elements,
            redirect: "if_required"
        })
        
        if (result.error) {
            toastError("Error inesprado. Por favor reintente más tarde")

        } else {
            const result2 = await construirMailyBorrarCarrito()

            if (result2.status === "success") restartIconCart()
            else toastWait("Se efectuó la compra pero no se logró borrar tu carrito") // Nunca debería mostrarse este mensaje

            toastSuccess("Compra exitosa!")
            navigate("/")
        }

        disabledButton(buttonSubmit, false)
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
