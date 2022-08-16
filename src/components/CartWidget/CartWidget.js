import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'

const CartWidget = () => {
    const { getQuantity } = useContext(CartContext)

    const quantity = getQuantity()
    if (quantity === 0){
        return (
            <Link to='/cart' className="CartWidget">
                <img src='/images/cart.svg' alt='cart' className='CartImg'/>
            </Link>
        );
    }

    return(
        <Link to='/cart' className="CartWidget">
            <img src='/images/cart.svg' alt='cart' className='CartImg'/>
            {quantity}
        </Link>
    );
}

export default CartWidget