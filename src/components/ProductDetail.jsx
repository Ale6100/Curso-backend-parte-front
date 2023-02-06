import React, { useState } from 'react';
import AddToCart from './AddToCart';

const Productdetail = ({ product }) => {
    const [ cantidadProducto, setCantidadProducto ] = useState(0)

    return (
        <div className='m-5 mx-auto flex flex-col justify-evenly items-center max-w-xl h-96 border border-black rounded-sm'>
            <div>
                <img className='max-h-52' src={product.image} alt="Product image" />
            </div>
            <p className='text-lg'> <span className='font-semibold'>{product.title}</span> | ${product.price} </p>
            <p>{product.description}</p>
            {product.stock > 0 ? <p>Queda stock!</p> : <p>Lo sentimos, ya no queda stock</p>}
            <div className='w-40'>
                <AddToCart cantidadProducto={cantidadProducto} setCantidadProducto={setCantidadProducto} product={product}/>
            </div>
        </div>
    );
}

export default Productdetail;
