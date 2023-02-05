import React, { useEffect, useState } from 'react';
import PageTitle from "./PageTitle"
import OneProduct from './OneProduct';

const Home = () => {
    const [ products, setProducts ] = useState([])

    const traerProductos = async () => {
        const productos = await fetch(`${import.meta.env.VITE_BACK_URL}/api/products`).then(res => res.json())
        return productos.payload
    }

    useEffect(() => {
        traerProductos().then(res => {setProducts(res)})
    }, [])

    if (products.length === 0) {
        return (
            <p className='text-center'>No hay productos :(</p>
        )
    }

    return (
        <div className='p-1 flex flex-wrap justify-evenly w-full'>
            <PageTitle title={"Inicio"}/>
            {products.map((product) => (
                <div key={product._id} className="p-1 flex flex-col justify-evenly text-center w-40 h-96 border border-black">
                    <OneProduct product={product}/>
                </div>
            ))}
        </div>
    );
}

export default Home;
