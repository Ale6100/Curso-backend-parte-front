import React from 'react';

const CartOneProduct = ({ product }) => {
    return (
        <>
        <div className='h-40 flex justify-center items-center'>
            <img src={product.image} alt="" className='max-h-40 '/>
        </div>
        <p className='text-lg font-semibold'>{product.title}</p>
        <p>${product.price} (c/u)</p>
        <p>Llevas {product.quantity}</p>
        </>
    );
}

export default CartOneProduct;
