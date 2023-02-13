const Wrapper = ({ hidden, children }) => { // Oculta un componente contenido en él cuando hidden es true
    if (hidden) return null
    return children
}

export default Wrapper;
