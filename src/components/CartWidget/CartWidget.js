import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'

const CartWidget = () => {
    const {getQty} = useContext(CartContext)

    const quantity = getQty()
    if (quantity === 0){
        return (
            <Link to='/cart' className="CartWidget">
                <img src='/imagenes/cart.svg' alt='cart' className='CartImg'/>
            </Link>
        );
    }

    return(
        <Link to='/cart' className="CartWidget">
            <img src='/imagenes/cart.svg' alt='cart' className='CartImg'/>
            {quantity}
        </Link>
    );
}

export default CartWidget