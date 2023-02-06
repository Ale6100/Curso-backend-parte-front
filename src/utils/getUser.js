const getUser = async (setUser) => {
    const user = await fetch(`${import.meta.env.VITE_BACK_URL}/api/sessions/current`, {
        method: "GET",
        credentials: "include"
    }).then(res => res.json()).then(res => res.payload)

    setUser(user)
    return user
}

export default getUser
