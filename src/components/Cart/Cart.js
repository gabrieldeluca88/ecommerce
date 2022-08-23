import './Cart.css'
import { useContext } from "react"
import { CartContext } from '../../context/CartContext'
import CartItem from '../CartItem/CartItem'
import { Link } from 'react-router-dom'

const Cart = () => {
    const { cart, clearCart, getTotal, getQuantity } = useContext(CartContext)  

    const totalQuantity = getQuantity()
    const total = getTotal()

    if(totalQuantity === 0) {
        return (
            <div className='SinItems'>
                <h1>Oops! No hay items en el carrito</h1>
                <Link to='/' className='GoCart'>Ver nuestros productos</Link>
            </div>
        )
    }

    return (     
        <div className='Cart'>
            <h1>Mi Carrito</h1>
            <Link to='/' className='GoCart'>Seguir mirando</Link>
            { cart.map(p => <CartItem key={p.id} {...p}/>) }
            <h3>Total: ${total}</h3>
            <button onClick={() => clearCart()} className="Button">Vaciar carrito</button>
            {/* <button className="Button">Comprar</button> */}
            <Link to='/checkout' className='Button'>Comprar</Link>
        </div>
    )
}

export default Cart