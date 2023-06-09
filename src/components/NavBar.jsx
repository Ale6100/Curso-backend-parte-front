import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PersonalContext } from './PersonalContext';
import ButtonLogout from './session/ButtonLogout';

const NavBar = () => {
    const [ navBarRespVisible, setNavBarRespVisible ] = useState(false)
    const [ menuUserVisible, setMenuUserVisible ] = useState(false)
    const [ menuUserResponsiveVisible, setMenuUserResponsiveVisible ] = useState(false)
    const { user, productsInCart } = useContext(PersonalContext)
    
    useEffect(() => {
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
        
        if (menuUserVisible) {
            miniComponenteMenuPerfil.style.setProperty("transform", "scale(1)")
            miniComponenteMenuPerfil.style.setProperty("opacity", "1")
        }
        else {
            miniComponenteMenuPerfil.style.setProperty("transform", "scale(0.5)")
            miniComponenteMenuPerfil.style.setProperty("opacity", "0")
        }
    }, [ menuUserVisible ]);

    useEffect(() => {
        const miniComponenteMenuPerfil = document.getElementById("miniComponenteMenuPerfilResponsive")
        
        if (menuUserResponsiveVisible) {
            miniComponenteMenuPerfil.style.setProperty("transform", "scale(1)")
            miniComponenteMenuPerfil.style.setProperty("opacity", "1")
        }
        else {
            miniComponenteMenuPerfil.style.setProperty("transform", "scale(0.5)")
            miniComponenteMenuPerfil.style.setProperty("opacity", "0")
        }
    }, [ menuUserResponsiveVisible ]);

    const MiniComponenteMenuPerfil = ({ text }) => {
        if (!user) {
            if (text === "navPC") {
                return (
                    <div className='p-2 h-28 flex flex-col justify-evenly text-end'>
                        <p className='font-semibold'>Usuario no logueado</p>
                        <Link onClick={() => setMenuUserVisible(!menuUserVisible)} to="/formUsers/login" className='hover:bg-slate-100 w-full'>Iniciar sesión</Link>
                        <Link onClick={() => setMenuUserVisible(!menuUserVisible)} to="/formUsers/register" className='hover:bg-slate-100 w-full'>Registrarse</Link>
                    </div>
                )
            } else if (text === "navMobile") {
                return (
                    <div className='p-2 h-28 flex flex-col justify-evenly text-end'>
                        <p className='font-semibold'>Usuario no logueado</p>
                        <Link onClick={() => setNavBarRespVisible(!navBarRespVisible)} to="/formUsers/login" className='hover:bg-slate-100 w-full'>Iniciar sesión</Link>
                        <Link onClick={() => setNavBarRespVisible(!navBarRespVisible)} to="/formUsers/register" className='hover:bg-slate-100 w-full'>Registrarse</Link>
                    </div>
                )  
            }

        } else if (user.role === "user") {
            if (text === "navPC") {
                return (
                    <div className='p-2 h-48 flex flex-col justify-evenly text-end'>
                        <p className='font-semibold'>{user.first_name} {user.last_name}</p>
                        <p>Rol: <span className='font-semibold'>user</span></p>
                        <Link onClick={() => setMenuUserVisible(!menuUserVisible)} to="/profile" className='hover:bg-slate-100 w-full'>Ver perfil</Link>
                        <div onClick={() => setMenuUserVisible(!menuUserVisible)}>
                            <ButtonLogout />
                        </div>
                    </div>
                )
            } else if (text === "navMobile") {
                return (
                    <div className='p-2 h-48 flex flex-col justify-evenly text-end'>
                        <p className='font-semibold'>{user.first_name} {user.last_name}</p>
                        <p>Rol: <span className='font-semibold'>user</span></p>
                        <Link onClick={() => setNavBarRespVisible(!navBarRespVisible)} to="/profile" className='hover:bg-slate-100 w-full'>Ver perfil</Link>
                        <div onClick={() => setNavBarRespVisible(!navBarRespVisible)}>
                            <ButtonLogout />
                        </div>
                    </div>
                )  
            }    

        } else if (user.role === "admin") {
            if (text === "navPC") {
                return (
                    <div className='p-2 h-48 flex flex-col justify-evenly text-end'>
                        <p className='font-semibold'>{user.first_name} {user.last_name}</p>
                        <p>Rol: <span className='font-semibold'>admin</span></p>
                        <Link onClick={() => setMenuUserVisible(!menuUserVisible)} to="/formAdmins/CrudProducts" className='hover:bg-slate-100 w-full'>CRUD products</Link>
                        <div onClick={() => setMenuUserVisible(!menuUserVisible)}>
                            <ButtonLogout />
                        </div>
                    </div>
                )
            } else if (text === "navMobile") {
                return (
                    <div className='p-2 h-48 flex flex-col justify-evenly text-end'>
                        <p className='font-semibold'>{user.first_name} {user.last_name}</p>
                        <p>Rol: <span className='font-semibold'>admin</span></p>
                        <Link onClick={() => setNavBarRespVisible(!navBarRespVisible)} to="/formAdmins/CrudProducts" className='hover:bg-slate-100 w-full'>CRUD products</Link>
                        <div onClick={() => setNavBarRespVisible(!navBarRespVisible)}>
                            <ButtonLogout />
                        </div>
                    </div>
                )
            }
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

            <nav className="w-full max-md:hidden"> {/* Por problemas relacionados a tailwind tuve que separar la nav para PC y la nav para mobile */}
                <ul className="flex justify-evenly items-center w-full h-full">
                    <li>
                        <Link className='p-1 rounded-md hover:bg-gray-200' to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link className='p-1 rounded-md hover:bg-gray-200' to="/contacto">Contacto</Link>
                    </li>
                    <li>
                        <Link to="/cart" className='relative'>
                            <img className='p-1 rounded-md hover:bg-gray-200' src={productsInCart === 0 ? "https://img.icons8.com/ios-glyphs/30/000000/shopping-cart--v1.png" : "https://img.icons8.com/ios-glyphs/30/000000/shopping-cart--v2.png"} alt="Icon Cart" />
                            {productsInCart > 0 && <span className='absolute translate-x-[30px] translate-y-[-35px] border-black border rounded-full w-5 h-5 flex justify-center items-center text-xs'>{productsInCart}</span>}
                        </Link>
                    </li>
                    <li onClick={() => setMenuUserVisible(!menuUserVisible)} className='p-1 flex items-center cursor-pointer bg-transparent rounded-md hover:bg-gray-200'>
                        {!user && <p className='mr-1'>Identificarse</p>}
                        {user ? <img src={user.image.includes("http") ? user.image : `${import.meta.env.VITE_BACKEND_URL}/`+user.image} alt="Imagen de perfil" className='w-7 h-7' /> : <img src="https://img.icons8.com/ios/50/000000/decision.png" alt="Imagen de perfil" className='w-7 h-7' /> }
                    </li>
                </ul>
            </nav>
        </header>

        <div id="miniComponenteMenuPerfil" className='max-md:hidden fixed right-0 bg-blue-300 transition-all duration-200 scale-0 rounded-bl-sm border-l-4 border-b-4 border-blue-500'>
            <MiniComponenteMenuPerfil text={"navPC"}/>
        </div>


        <div id="fondoDifuminadoResponsive" onClick={() => setNavBarRespVisible(!navBarRespVisible)} className={`md:hidden fixed z-20 right-[-100vw] w-screen h-screen transition-all duration-200`}></div>
        
        <nav className="right-[-100vw] w-44 navResponsive md:hidden fixed z-30 bg-blue-300 transition-all duration-200">
            <div className="px-2 flex flex-col justify-evenly w-full h-48 text-end border-l-4 border-b-4 border-blue-500">
                <Link onClick={() => setNavBarRespVisible(!navBarRespVisible)} className='w-full hover:bg-slate-100 ' to="/"> Inicio</Link>
                <Link onClick={() => setNavBarRespVisible(!navBarRespVisible)} className='w-full hover:bg-slate-100' to="/contacto">Contacto</Link>
                <Link onClick={() => setNavBarRespVisible(!navBarRespVisible)} to="/cart" className='w-full hover:bg-slate-100 relative flex justify-end pr-3'>
                    <img src={productsInCart === 0 ? "https://img.icons8.com/ios-glyphs/30/000000/shopping-cart--v1.png" : "https://img.icons8.com/ios-glyphs/30/000000/shopping-cart--v2.png"} alt="Icon Cart" />
                    {productsInCart > 0 && <span className='absolute translate-x-[15px] translate-y-[-10px] border-black border rounded-full w-5 h-5 flex justify-center items-center text-xs'>{productsInCart}</span>}
                </Link>
                <div onClick={ () => setMenuUserResponsiveVisible(!menuUserResponsiveVisible) } className='cursor-pointer flex justify-end items-center hover:bg-slate-100 pr-3'>
                    {!user && <p className='mr-1'>Identificarse</p>}
                    {user ? <img src={user.image.includes("http") ? user.image : `${import.meta.env.VITE_BACKEND_URL}/`+user.image} alt="Imagen de perfil" className='w-7 h-7' /> : <img src="https://img.icons8.com/ios/50/000000/decision.png" alt="Imagen de perfil" className='w-7 h-7' /> }
                </div>
            </div>
            <div id="miniComponenteMenuPerfilResponsive" className='fixed w-full left-[0vw] bg-blue-300 transition-all duration-200 scale-0 rounded-bl-sm border-l-4 border-b-4 border-blue-500'>
                <MiniComponenteMenuPerfil text={"navMobile"}/>
            </div>
         </nav>
        </>
    );
}

export default NavBar;
