import './ItemCount.css'
import { useState } from 'react'

const ItemCount = ({stock = 0, initial = 1, onAdd})=> {
const [quantity, setQuantity] = useState(initial)

const increment = () => {
    if(quantity < stock) {
        setQuantity(quantity +1)
    }
}

const decrement = () => {
    if(quantity > 1) {
        setQuantity(quantity -1)
    }     
}

return(
<div className='count-container'>          
    <div className='count-container__contador'>
        <button className="count-container__button" onClick={decrement}>-</button>
        <span className='count-container__qty'>{quantity}</span>
        <button className="count-container__button" onClick={increment}>+</button>
    </div>
    <button className="button-agregar" onClick={() => onAdd(quantity)}>Agregar al carrito</button>
</div>
)

}
export default ItemCount