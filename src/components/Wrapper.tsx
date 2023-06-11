import React from "react";

const Wrapper = ({ hidden, children }: { hidden: boolean, children: React.ReactNode }) => { // Oculta un componente contenido en él (el children) cuando hidden es un valor truly
    if (hidden) return null
    return children
}

export default Wrapper;
