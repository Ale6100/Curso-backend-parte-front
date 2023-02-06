import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';

const OneProduct = ({ product }) => {
    const [ cantidadProducto, setCantidadProducto ] = useState(0)

    return (
        <>
        <div className='h-40 flex justify-center items-center'>
            <img src={product.image} alt="" className='max-h-40 '/>
        </div>
        <div className='flex w-full justify-center'>
            <p className='text-lg font-semibold mr-1'>{product.title}</p>
            <Link className='border-0 w-7 h-7' to={`/product/${product._id}`}><img src="https://img.icons8.com/wired/64/000000/info-popup.png" alt="Icon +info" /></Link>
        </div>
        <p>${product.price} (c/u)</p>
        <AddToCart cantidadProducto={cantidadProducto} setCantidadProducto={setCantidadProducto} product={product}/>
        </>
    );
}

export default OneProduct;
