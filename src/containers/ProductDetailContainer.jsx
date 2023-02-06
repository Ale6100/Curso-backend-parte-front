import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import Loading from "../components/Loading"

const ProductDetailContainer = () => {
    const { id } = useParams()
    const [ product, setProduct ] = useState("loading")

    const fetchProduct = async () => {
        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/api/products/${id}`).then(res => res.json())
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

    if (product === "loading") return <Loading />
    if (!product) return <p className='mt-5 text-center font-semibold text-xl'>Lo sentimos, el producto no existe</p>

    return (
        <>
            <ProductDetail product={product} />
        </> 
    );
}

export default ProductDetailContainer;
