import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import Loading from "../components/Loading"
import { getJSONHeaders } from '../utils/http';
import { ProductInterface } from '../utils/interfaces';

const ProductDetailContainer = () => {
    const { id } = useParams()
    const [ product, setProduct ] = useState<string | null | ProductInterface>("loading")

    const fetchProduct = async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, {
            ...getJSONHeaders(),
        }).then(res => res.json())
        return res
    }

    useEffect(() => {
        fetchProduct().then( res => {
            if (res.status === "success") {
                setProduct(res.payload)
            } else {
                setProduct(null)
            }
        })
    }, [id])

    if (typeof product === "string") return <Loading />
    if (!product) return <p className='mt-5 text-center font-semibold text-xl'>Lo sentimos, el producto no existe</p>

    return <ProductDetail product={product} />
}

export default ProductDetailContainer;
