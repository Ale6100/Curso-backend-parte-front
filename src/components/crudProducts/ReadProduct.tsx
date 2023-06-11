import { ProductInterface } from "../../utils/interfaces";

const ReadProduct = ({ infoProduct }: { infoProduct: ProductInterface | null }) => { // Formulario donde el administrador puede ver los detalles de un producto
    if (!infoProduct) return null
    
    const { _id, title, description, price, image, stock, created_at, updated_at } = infoProduct

    return (
        <div className='m-5 h-96 flex border border-black rounded-sm items-center max-md:flex-col max-md:h-auto max-md:gap-y-5 max-md:p-5'>
            <div className='flex items-center justify-center w-[40vw] max-lg:w-[45vw] max-h-96 max-md:w-full'>
                <img className='max-h-96' src={image.includes("http") ? image : `${import.meta.env.VITE_BACKEND_URL}/`+image} alt="Product image" />
            </div>

            <div className='w-[60vw] max-lg:w-[55vw] h-full px-2 flex flex-col justify-evenly max-md:w-full'>
                <p className='text-lg'> <span className='font-semibold'>Título:</span> {title}</p>
                <p><span className='font-semibold'>Precio: </span>${price}</p>
                <p><span className='font-semibold'>Descripción: </span>{description}</p>
                <p><span className='font-semibold'>Stock: </span>{stock}</p>
                <p><span className='font-semibold'>Creado el </span>{created_at}</p>
                <p><span className='font-semibold'>Actualizado el </span>{updated_at}</p>
                <p><span className='font-semibold'>ID: </span>{_id}</p>         
            </div>
        </div>
    )
}

export default ReadProduct;
