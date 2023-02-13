import React from 'react';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';

const OneProduct = ({ product }) => {

    return (
        <div className={"p-1 flex flex-col justify-evenly text-center w-40 h-96 border border-black rounded-sm"}>
            <div className='h-48 flex justify-center items-center'>
                <img src={product.image} alt="" className='max-h-48 '/>
            </div>

            <p className='text-base font-semibold mr-1 h-20 flex items-center justify-center'>{product.title}</p>
            
            <div className='flex w-full justify-center'>
                <p>${product.price} (c/u)</p>
                <Link className='ml-1 border-0 w-7 h-7' to={`/product/${product._id}`}><img src="https://img.icons8.com/wired/64/000000/info-popup.png" alt="Icon +info" /></Link>
            </div>
            
            <AddToCart product={product}/>
        </div>
    );
}

export default OneProduct;
