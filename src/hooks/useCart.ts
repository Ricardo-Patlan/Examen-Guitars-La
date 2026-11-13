import { useState, useEffect, useMemo } from "react"
import { getGuitars, createGuitar } from "../data/db"

export const useCart = () => {

    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem('cart');
        try {
            const parsed = localStorageCart ? JSON.parse(localStorageCart) : [];
            // se descartan productos guardados con el formato anterior (sin "modelo")
            return Array.isArray(parsed) ? parsed.filter((item) => item && 'modelo' in item) : [];
        } catch (error) {
            console.error("Error al leer el carrito de localStorage:", error);
            localStorage.removeItem('cart');
            return [];
        }
    }

    const [data, setData] = useState<Guitar[]>([]);
    const [cart, setCart] = useState<CartItem[]>(initialCart);

    // al cargar la pagina se piden las guitarras a la base de datos
    useEffect(() => {
        getGuitars()
            .then(guitars => setData(guitars))
            .catch(error => console.error(error))
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart)); // guarda carrito convertido a string
    }, [cart]);

    // guarda la guitarra en la base de datos, regresa el mensaje de error o "" si se guardo
    async function addGuitar(guitar: GuitarForm): Promise<string> {
        try {
            const result = await createGuitar(guitar)
            if (result.errors) return result.errors[0].msg
            if (result.error) return result.error

            setData([...data, { ...result.data, precio: Number(result.data.precio) }])
            return ""
        } catch (error) {
            console.error(error)
            return "No se pudo conectar con el servidor"
        }
    }

    const MIN_ITEMS = 1;
    const MAX_ITEMS = 5;

    function addToCart(item: Guitar) {
        const itemExist = cart.findIndex(guitar => guitar.id === item.id);
        if (itemExist >= 0) {
            if (cart[itemExist].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart];
            updatedCart[itemExist] = {
                ...updatedCart[itemExist],
                quantity: updatedCart[itemExist].quantity + 1
            };
            setCart(updatedCart);
        } else {
            const newItem = { ...item, quantity: 1 };
            setCart([...cart, newItem]);
        }
    }
    function decreaseQuantity(id: Guitar['id']) {
        const updateCart = cart.map(
            (item) => {
                if (item.id === id && item.quantity > MIN_ITEMS) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    }
                }
                return item
            })
        setCart(updateCart)
    }
    function increaseQuantity(id: Guitar['id']) {
        const updateCart = cart.map(
            (item) => {
                if (item.id === id && item.quantity < MAX_ITEMS) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                }
                return item
            })
        setCart(updateCart)
    }
    function removeFromCart(id: Guitar['id']) {
        setCart(prevcart => prevcart.filter(guitar => guitar.id !== id));
    }
    function clearCart() {
        setCart([])
    }

    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.precio), 0), [cart])

    return {
        // todo lo que se necesita retornar
        //metodos / variables
        cart,
        data,
        addGuitar,
        addToCart,
        decreaseQuantity,
        increaseQuantity,
        removeFromCart,
        clearCart,
        isEmpty,
        cartTotal
    }
}
