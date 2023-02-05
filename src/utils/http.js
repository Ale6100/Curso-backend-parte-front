export const getJSONHeaders = () => { // Propiedades que irán en los fetch sin envío de imágenes con multer
    return {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        credentials: "include"
    }
}
