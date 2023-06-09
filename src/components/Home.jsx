import React, { useEffect, useState } from 'react';
import OneProduct from './OneProduct';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import { getJSONHeaders } from '../utils/http';

const Home = () => {
    const [ products, setProducts ] = useState([])
    const [ finish, setFinish ] = useState(false)
    const [ tolerance, setTolerance ] = useState(true)

    document.title = "Inicio"

    const traerProductos = async () => {
        const toleranceTime = setTimeout(() => { // Define cinco segundos de tolerancia de espera hasta que lleguen los datos del backend. Si pasa ese tiempo, aparece un mensaje pidiendo disculpas
            setTolerance(false)
        }, 5000);

        const productos = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`,{
            ...getJSONHeaders(),
        }).then(res => res.json())

        clearTimeout(toleranceTime)
        setTolerance(true)
        return productos.payload
    }

    useEffect(() => {
        traerProductos().then(res => {
            setProducts(res)
            setFinish(true)
        })
    }, [])

    if (products.length === 0 && finish) return <p className='mt-5 text-xl text-center font-semibold'>No hay productos disponibles. Por favor <Link to="/contacto" className='hover:bg-slate-100 w-full text-blue-800'>infórmanos sobre esto</Link></p>

    if (products.length === 0) return (
        <>
        {tolerance || <p className='text-center mt-5'>Disculpa la demora. El servidor gratuito donde está alojado el backend suele demorarse</p>}
        <Loading />
        </>
    )

    if (products.every(product => product.stock <= 0)) return <p className='mt-5 text-xl text-center font-semibold'>Lo sentimos! Nuestro stock está agotado. Vuelva más tarde o <Link className='text-blue-700' to="/contacto">contáctate</Link> con nosotros</p>

    return (
        <div className='mt-5 p-1 flex flex-wrap gap-y-5 gap-x-1 justify-evenly w-full'>
            {products.map((product) => (
                <div key={product._id} hidden={product.stock <= 0}>{
                product.stock > 0 && 
                    <OneProduct product={product}/>
                }
                </div>
            ))}
        </div>
    );
}

export default Home;
