import React from 'react';
import { useContext } from 'react';
import { PersonalContext } from "./PersonalContext";
import PageTitle from './PageTitle';
import moment from 'moment';

const Profile = () => {
    const { user } = useContext(PersonalContext);

    if (!user) return (<div>No hay usuario logueado</div>)

    const nacimiento = moment(user.date)
    const fechaActual = moment()
    const edad = fechaActual.diff(nacimiento, "years")

    return (
        <div>
            <PageTitle title={"Perfil :D"} />
            <h1 className='text-center text-2xl font-semibold'>Perfil</h1>
            <p>Nombre completo: {user.first_name} {user.last_name}</p>
            <p>Email: {user.email}</p>
            <p>Teléfono: {user.phone}</p>
            <p>Edad: {edad} años</p>
            <p>Dirección: {user.direccion}</p>
            <div>
                <img src={user.image} alt="Imagen de perfil" />
            </div>
        </div>
    );
}

export default Profile;
