import { useState, createContext } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext()

export const CartContextProvider = ({children}) => {
    const [cart, setCart] = useState([])

    const addProduct = (productToAdd) => {
        if(!isInCart(productToAdd.id)) {
            setCart([...cart, productToAdd])
        } else {
            const cartUpdated = cart.map(prod => {
                if(prod.id === productToAdd.id) {
                    const productUpdated = {
                        ...prod,
                        quantity: productToAdd.quantity
                    }
                    return productUpdated
                } else {
                    return prod
                }
            })
            setCart(cartUpdated)
        }
        toast.success('Agregado al carrito!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }


    const isInCart = (id) => {
        return cart.some(prod => prod.id === id)
    }


    const removeProduct = (id) => {
        const cartWithoutItem = cart.filter(prod => prod.id !== id)
        setCart(cartWithoutItem)
        toast.error('Eliminado del carrito!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }


    const getQty = () => {
        let accu = 0
        cart.forEach(prod => {
            accu += prod.quantity
        })
        return accu
    }


    const getProductQty = (id) => {
        const product = cart.find(prod => prod.id === id)
        return product?.quantity
    }


    const clearProductCart = () => {
        setCart([])
    }


    const totalPrice = () => {
        let accu = 0
        cart.forEach(prod => {accu += prod.quantity * prod.price})
        return accu
    }



    return (
        <CartContext.Provider value={{cart, clearProductCart, isInCart, removeProduct, getQty, getProductQty, totalPrice, addProduct}}>
            {children}
            <ToastContainer/> 
        </CartContext.Provider> 
    )
}