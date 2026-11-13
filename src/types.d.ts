// Guitarra tal como viene de la API (tabla guitarras en PostgreSQL)
type Guitar = {
    id: number;
    marca: string;
    modelo: string;
    precio: number;
    descripcion: string;
}

type CartItem = Guitar & {
    quantity: number;
}

// Datos que se envían en el POST (sin id)
type GuitarForm = Omit<Guitar, 'id'>

type GuitarProps = {
    guitar: Guitar,
    addToCart: ((item: Guitar) => void)
}

type GuitarFormProps = {
    addGuitar: (guitar: GuitarForm) => Promise<string>
}

type CartProp = {
    cart: CartItem[],
    decreaseQuantity: (item: number) => void,
    increaseQuantity: (item: number) => void,
    removeFromCart: (item: number) => void,
    clearCart: () => void,
    isEmpty: boolean,
    cartTotal: number
}
