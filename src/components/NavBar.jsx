import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PersonalContext } from './PersonalContext';
import ButtonLogout from './ButtonLogout';
import getUser from '../utils/getUser';

const NavBar = () => {
    const [ navBarRespVisible, setNavBarRespVisible ] = useState(false)
    const [ menuUserVisible, setMenuUserVisible ] = useState(false)
    const [ menuUserResponsiveVisible, setMenuUserResponsiveVisible ] = useState(false)
    const { user, setUser } = useContext(PersonalContext)

    useEffect(() => { // Activa los scroll, pero antes debe asegurarse de que las secciones existan
        const fondoDifuminado = document.getElementById(`fondoDifuminadoResponsive`)
        fondoDifuminado.style.setProperty("backdrop-filter", "blur(3px)")
        fondoDifuminado.style.setProperty("filter", "brightness(75%)")
    }, []);

    useEffect(() => { 
        const navBarResponsive = document.querySelector(".navResponsive");
        const fondoDifuminado = document.getElementById(`fondoDifuminadoResponsive`)
        const botonNavBar = document.getElementById("botonNavBar")
        const anchoBotonNavBar = botonNavBar.offsetWidth

        if (navBarRespVisible) { // Comportamiento de la "navbar responsive", fondo difuminado, y el botón cuando dicha navbar es visible o no
            navBarResponsive.style.setProperty("transform", "translateX(-100vw)") // Hacemos que la navbar pequeña y el fondo se vean
            fondoDifuminado.style.setProperty("transform", "translateX(-100vw)")

            botonNavBar.children[0].style.setProperty("transform", `translate(0vw, ${Math.round(anchoBotonNavBar)/2}px) rotate(45deg) scale(1.41421356237)`) // Hacemos aparecer la X
            botonNavBar.children[1].style.setProperty("transform", "scale(0)")
            botonNavBar.children[2].style.setProperty("transform", `translate(0vw, ${Math.round(-anchoBotonNavBar)/2}px) rotate(-45deg) scale(1.41421356237)`)
        
        } else if (!navBarRespVisible) {
            navBarResponsive.style.setProperty("transform", "translateX(0vw)")
            fondoDifuminado.style.setProperty("transform", "translateX(0vw)")

            botonNavBar.children[0].style.setProperty("transform", `translate(0vw, 0px) rotate(0) scale(1)`)
            botonNavBar.children[1].style.setProperty("transform", "scale(1)")
            botonNavBar.children[2].style.setProperty("transform", `translate(0vw, 0px) rotate(0) scale(1)`)
        }
        
    }, [navBarRespVisible])

    useEffect(() => {
        const miniComponenteMenuPerfil = document.getElementById("miniComponenteMenuPerfil")
        
        if (menuUserVisible) miniComponenteMenuPerfil.style.setProperty("transform", "scale(1)")
        else miniComponenteMenuPerfil.style.setProperty("transform", "scale(0)")
    }, [ menuUserVisible ]);

    useEffect(() => {
        const miniComponenteMenuPerfil = document.getElementById("miniComponenteMenuPerfilResponsive")
        
        if (menuUserResponsiveVisible) miniComponenteMenuPerfil.style.setProperty("transform", "scale(1)")
        else miniComponenteMenuPerfil.style.setProperty("transform", "scale(0)")
    }, [ menuUserResponsiveVisible ]);

    const clickImage = async (text) => {
        await getUser(setUser)
        
        if (text === "navPC") setMenuUserVisible(!menuUserVisible) 
        else if (text === "navMobile") setMenuUserResponsiveVisible(!menuUserResponsiveVisible)
    }

    const MiniComponenteMenuPerfil = () => {
        if (!user) {
            return (
                <div className='p-2 h-28 flex flex-col justify-evenly text-end'>
                    <p className='font-semibold'>Usuario no logueado</p>
                    <Link onClick={() => setMenuUserVisible(!menuUserVisible)} to="/formUsers/login" className='hover:bg-slate-100 w-full'>Iniciar sesión</Link>
                    <Link onClick={() => setMenuUserVisible(!menuUserVisible)} to="/formUsers/register" className='hover:bg-slate-100 w-full'>Registrarse</Link>
                </div>
            )
        } else if (user.role === "user") {
            return (
                <div className='p-2 h-36 flex flex-col justify-evenly text-end'>
                    <p className='font-semibold'>{user.first_name} {user.last_name}</p>
                    <p>Rol: <span className='font-semibold'>user</span></p>
                    <Link to="/profile" className='hover:bg-slate-100 w-full'>Ver perfil</Link>
                    <ButtonLogout />
                </div>
            )
        } else if (user.role === "admin") {
            return (
                <div className='p-2 h-64 flex flex-col justify-evenly text-end'>
                    <p className='font-semibold'>{user.first_name} {user.last_name}</p>
                    <p>Rol: <span className='font-semibold'>admin</span></p>
                    <Link to="/profile" className='hover:bg-slate-100 w-full'>Ver perfil</Link>
                    <Link to="/formAdmins/addProducts" className='hover:bg-slate-100 w-full'>Agregar productos</Link>
                    <Link to="/formAdmins/addAdmin" className='hover:bg-slate-100 w-full'>Agregar administrador</Link>
                    <ButtonLogout />
                </div>
            )
        }

    }

    return (
        <>
        <header className="sticky z-50 h-12 top-0 w-full text-xl flex flex-col justify-center border-black border-b max-md:items-end">            
            <div id="botonNavBar" onClick={() => setNavBarRespVisible(!navBarRespVisible)} className='p-0 h-7 w-7 hidden max-md:flex mr-4 flex-col justify-between cursor-pointer select-none'>
                <div className="transition-all duration-200 h-0 outline outline-1"></div>
                <div className="transition-all duration-200 h-0 outline outline-1"></div>
                <div className="transition-all duration-200 h-0 outline outline-1"></div>
            </div>

            <nav className="w-full max-md:hidden"> {/* Por problemas relacionados a tailwind tuve que separar las nav */}
                <ul className="flex justify-evenly w-full h-full">
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/contacto">Contacto</Link>
                    </li>
                    <li>
                        <Link to="/cart">Carrito</Link>
                    </li>
                    <li>
                        <img onClick={ () => clickImage("navPC") } src={user?.image ?? "https://img.icons8.com/ios/50/000000/decision.png"} alt="Imagen de perfil" className='w-7 h-7 cursor-pointer bg-transparent' />
                    </li>
                </ul>
            </nav>
        </header>

        <div id="miniComponenteMenuPerfil" className='max-md:hidden fixed right-0 bg-red-300 transition-all duration-100 scale-0'>
            <MiniComponenteMenuPerfil />
        </div>


        <div id="fondoDifuminadoResponsive" onClick={() => setNavBarRespVisible(!navBarRespVisible)} className={`md:hidden fixed z-20 right-[-100vw] w-screen h-screen transition-all duration-200`}></div>
        
        <nav className="right-[-100vw] w-44 navResponsive md:hidden fixed z-30 rounded-bl-md bg-blue-400 transition-all duration-200">
            <div className="px-2 flex flex-col justify-evenly w-full h-36 text-end">
                <Link className='w-full hover:bg-slate-100' to="/">Inicio</Link>
                <Link className='w-full hover:bg-slate-100' to="/contacto">Contacto</Link>
                <Link className='w-full hover:bg-slate-100' to="/cart">Carrito</Link>
                <div className='flex justify-end'>
                    <img onClick={ () => clickImage("navMobile") } src={user?.image ?? "https://img.icons8.com/ios/50/000000/decision.png"} alt="Imagen de perfil" className='w-7 h-7 cursor-pointer bg-transparent' />
                </div>
            </div>
            <div id="miniComponenteMenuPerfilResponsive" className='fixed w-full left-[0vw] bg-red-300 transition-all duration-100 scale-0'>
                <MiniComponenteMenuPerfil />
            </div>
         </nav>
        </>
    );
}

export default NavBar;
