import './CartItem.css'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'


const CartItem = ({ id, name, quantity, price, img}) => {
    const { removeProduct } = useContext(CartContext)

    const buttonDelete = (id) => {
        removeProduct(id)
    }

    return (
        <article className='CardCartItem'>
            <div>
                <img className='imgCart' src={img} alt={name}/>
            </div>
            <header className="HeaderCartItem">
                <h2 className="ItemHeaderCartItem">
                    {name}
                </h2>
            </header>
            <section className='ContainerItemCartItem'>
                <p className="InfoCartItem">
                    Cantidad: {quantity}
                </p>
                <p className="InfoCartItem">
                    Precio Unitario: ${price}
                </p>
            </section>           
            <footer className='ItemFooterCartItem'>
                <p className="InfoCartItem">
                    Subtotal: ${price * quantity}
                </p>
                <button className='ButtonCartItem' onClick={() => buttonDelete(id)}>X</button>
            </footer>
        </article>
    )
}

export default CartItem