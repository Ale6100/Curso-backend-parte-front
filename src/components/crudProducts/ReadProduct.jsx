import React from 'react';

const ReadProduct = ({ inforProduct }) => {
    const { _id, title, description, price, image, stock, code, created_at, udated_at } = inforProduct

    return (
        <div className='my-5 mx-auto flex flex-col justify-evenly items-center max-w-sm h-96 border border-black rounded-sm'>
            <div>
                <img className='max-h-52' src={image} alt="Product image" />
            </div>
            <p className='text-lg'> <span className='font-semibold'>{title}</span> | ${price} </p>
            <p>Descripción {description}</p>
            <p>Stock: {stock}</p>
            <p>Creado el {created_at}</p>
            <p>Actualizado el {udated_at}</p>
            <p>ID: {_id}</p>
        </div>
    )
}

export default ReadProduct;
