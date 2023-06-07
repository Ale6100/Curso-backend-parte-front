import React from 'react';
import AddToCart from './AddToCart';

const Productdetail = ({ product }) => {
    return (
        <div className='m-5 h-96 flex border border-black rounded-sm items-center max-md:flex-col max-md:h-auto max-md:gap-y-5 max-md:p-5'>
            <div className='flex items-center justify-center w-[40vw] max-lg:w-[45vw] max-h-96 max-md:w-full'>
                <img className='max-h-96' src={product.image.includes("http") || `${import.meta.env.VITE_BACKEND_URL}/`+product.image} alt="Product image" />
            </div>
            
            <div className='w-[60vw] max-lg:w-[55vw] h-full px-2 flex flex-col justify-evenly max-md:w-full'>
                <p className='text-lg'> <span className='font-semibold'>{product.title}</span> | ${product.price} </p>
                <p className=''>{product.description}</p>
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
