const Wrapper = ({ hidden, children }) => { // Oculta un componente contenido en él (el children) cuando hidden es true
    if (hidden) return null
    return children
}

export default Wrapper;
