import { useContext } from 'react';
import { PersonalContext } from "./PersonalContext";
import moment from 'moment';
import MessageOnlyUsers from "./MessageOnlyUsers"

const Profile = () => {
    const personalContext = useContext(PersonalContext);
    if (!personalContext) return null
    
    const { user } = personalContext;

    document.title = "Perfil"
    
    if (!user) return <p className='mt-5 text-center font-semibold text-xl'>No hay usuario logueado </p>

    if (user.role === "admin") return <MessageOnlyUsers />

    const nacimiento = moment(user.date)
    const fechaActual = moment()
    const edad = fechaActual.diff(nacimiento, "years")

    return (
        <div className='max-sm:text-sm'>
            <h1 className='my-5 text-center text-2xl font-semibold'>Perfil</h1>
            <div className='p-1 flex border border-black mx-5 h-60'>
                <div className='w-[50%] flex flex-col justify-evenly items-center'>
                    <div className='h-48'>
                        <img className='h-full' src={user.image.includes("http") ? user.image : `${import.meta.env.VITE_BACKEND_URL}/`+user.image} alt="Imagen de perfil" />
                    </div>
                    <p>Nombre completo: <span className='font-semibold'>{user.first_name} {user.last_name} </span></p>
                </div>
            
                <div className='w-[50%] flex flex-col justify-evenly'>
                    <p>Email: <span className='font-semibold max-sm:text-xs'>{user.email} </span></p>
                    <p>Teléfono: <span className='font-semibold'>{user.phone || "No especificado"} </span></p>
                    <p>Edad: <span className='font-semibold'>{edad} años </span></p>
                    <p>Dirección de envío: <span className='font-semibold'>{user.direccion} </span></p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
