import React from 'react';
import AddToCart from './AddToCart';

const Productdetail = ({ product }) => {

    return (
        <div className='m-5 h-96 flex border border-black rounded-sm'>
            <div className='flex items-center justify-center w-[40vw] max-h-96'>
                <img className='max-h-96' src={product.image} alt="Product image" />
            </div>
            
            <div className='w-[60vw] h-full px-2 flex flex-col justify-evenly'>
                <p className='text-lg'> <span className='font-semibold'>{product.title}</span> | ${product.price} </p>
                <p>{product.description}</p>
                {product.stock > 0 ? <p>Queda stock!</p> : <p>Lo sentimos, ya no queda stock</p>}
                <div className='flex justify-end'>
                    <div className='w-40'>
                        <AddToCart product={product}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Productdetail;
