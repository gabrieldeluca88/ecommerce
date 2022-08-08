import './ItemDetail.css';
import ItemCount from '../ItemCount/ItemCount';
import { useState } from 'react';
import {Link} from 'react-router-dom'



const ItemDetail = ({product}) => {

    const [quantity, setQuantity] = useState(0)

    const onAdd = (count) => {
    alert (`se agrego ${count} al carrito`);
    setQuantity(count)
    }; 

    return(
        <div className='item_card'>
            <div className='img_detail'>   
                <img className='img_detail' src={product.img} alt={product.name}/>
            </div>
            <div className='detail'>
                <h3>{product.name}</h3>
                <h3>{product.category}</h3>
                <h3>Precio: {product.price}</h3>
                <h3>Stock: {product.stock}</h3>
                <div className='detailCount'>
                    {quantity > 0 ? <Link to='/cart'>Ir al carrito</Link> : <ItemCount stock={product.stock} initial={1} onAdd={onAdd}/>}
                </div>
                    <p>{product.description}</p>
            </div>
        </div>
        
    )
}


export default ItemDetail