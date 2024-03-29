import { PersonalContext } from '../PersonalContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toastError, toastWait } from "../../utils/toastify"
import getUser from "../../utils/getUser"
import { getJSONHeaders } from '../../utils/http';
import disabledButton from '../../utils/disabledButton';
import { ProductInterface, UserInterface } from '../../utils/interfaces';

type CombinedInterfaceCart = ProductInterface & { quantity: number };


const CartOneProduct = ({ product, crearArrayDeProductos }: { product: CombinedInterfaceCart, crearArrayDeProductos: (user_: UserInterface) => Promise<void> }) => {
    const personalContext = useContext(PersonalContext)
    
    if (!personalContext || !product) return null

    const { setUser, setProductsInCart } = personalContext
    const navigate = useNavigate();

    const deleteProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const buttonDelete = e.currentTarget

        disabledButton(buttonDelete, true)
        toastWait("Espere por favor...")

        const user = await getUser(setUser, setProductsInCart)

        if (!user) {
            toastError("Sesión expirada")
            return navigate("/formUsers/login")
        }

        const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/carts/${user.cartId}/products/${product._id}`, {
            method: "DELETE",
            ...getJSONHeaders(),
        }).then(res => res.json())

        if (result.status === "success") {
            setProductsInCart(totalQuantity => totalQuantity - product.quantity)
        }
        else toastError(result.error)
        
        disabledButton(buttonDelete, false)

        if (user) crearArrayDeProductos(user)
    }

    return (
        <div className="p-1 flex flex-col justify-evenly text-center w-40 h-96 border-2 border-black rounded-sm" >
            <div className='h-40 flex justify-center items-center'>
                <img src={product.image.includes("http") ? product.image : `${import.meta.env.VITE_BACKEND_URL}/`+product.image} alt="" className='max-h-40 '/>
            </div>
            <p className='text-sm font-semibold'>{product.title}</p>
            <p>${product.price} (c/u)</p>
            <p>Llevas {product.quantity}</p>
            <button className='w-[80%] mx-auto bg-blue-500 hover:bg-blue-600 text-white rounded-sm text-xl active:bg-blue-700' onClick={deleteProduct}>Eliminar</button>
        </div>
    );
}

export default CartOneProduct;
