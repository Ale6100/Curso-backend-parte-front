export interface ProductInterface {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    created_at: string;
    updated_at: string;
}

export interface UserInterface {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    direccion: string;
    date: Date;
    phone: string;
    image: string;
    cartId: string;
    role: string;
}

interface contenedorInt {
    idProductInCart: string,
    quantity: number
}

export interface CartInterface {
    _id: string;
    contenedor: contenedorInt[]
}
