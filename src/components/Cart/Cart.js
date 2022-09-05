import './Cart.css'
import { useContext } from "react"
import { CartContext } from '../../context/CartContext'
import CartItem from '../CartItem/CartItem'
import { Link } from 'react-router-dom'

const Cart = () => {
    const { cart, clearProductCart, getQty, totalPrice } = useContext(CartContext)  

    const totalQuantity = getQty()
    const total = totalPrice()

    if(totalQuantity === 0) {
        return (
            <div className='SinItems'>
                <h1>Oops! No hay items en el carrito</h1>
                <Link to='/' className='buttonBack'>Ver nuestros productos</Link>
            </div>
        )
    }

    return (     
        <div className='Cart'>
            <h1>Mi Carrito</h1>
            { cart.map(p => <CartItem key={p.id} {...p}/>) }
            <h3>Total: ${total}</h3>
            <div className='buttonBuy'>
                <Link to='/checkout' className='buttonBuy'>Comprar</Link>
            </div>
            <div className='buttonBuy'>
                <Link to='/' className='buttonBuy'>Seguir mirando</Link>
            </div>
            <div className='buttonClear'>
                <button onClick={() => clearProductCart()} className="buttonClear">Vaciar carrito</button>
            </div>
        </div>
    )
}

export default Cart