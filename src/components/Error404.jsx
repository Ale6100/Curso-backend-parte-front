import React, { useEffect } from 'react';
import PageTitle from "./PageTitle"

const Error404 = () => {
    return (
        <div>
            <PageTitle title={"Error 404"}/>
            <h1 className='mt-5 text-center text-xl font-semibold'>Error 404 | Sitio no encontrado</h1>
        </div>
    );
}

export default Error404;
