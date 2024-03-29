import './ItemDetail.css';
import ItemCount from '../ItemCount/ItemCount';
import { useState, useContext } from 'react';
import {Link} from 'react-router-dom'
import { CartContext } from '../../context/CartContext'



const ItemDetail = ({id, name, img, category, price, description, stock}) => {

    const [quantity, setQuantity] = useState(0)
    const { addProduct, getProductQty } = useContext(CartContext)

    const quantityAdded = getProductQty(id)

    const onAdd = (quantity) => {
    console.log(`se agrego ${quantity} al carrito`);
    setQuantity(quantity)
    addProduct({id, name, price, quantity, img})
    };  

    if (stock === 0 ){
        return (
            <div className='item_card'>
            <div className='img_detail'>   
                <img className='img_detail' src={img} alt={name}/>
            </div>
            <div className='detail'>
                <h3>{name}</h3>
                <h3>{category}</h3>
                <h3>Precio: {price}</h3>
                <h3>Stock: Agotado </h3>
            <div className='detailCount'>
                <Link className='buttonBack'to='/cart'>Ir al carrito</Link> 
            </div>
                <p>{description}</p>
            </div>
            <Link to='/' className='buttonBackDatail'>Seguir mirando</Link>
            </div>
            
        );
        
    }

    return(
        <div className='item_card'>
            <div className='img_detail'>   
                <img className='img_detail' src={img} alt={name}/>
            </div>
            <div className='detail'>
                <h3>{name}</h3>
                <h3>{category}</h3>
                <h3>Precio: {price}</h3>
                <h3>Stock: {stock}</h3>
                <div className='detailCount'>
                    {quantity > 0 ? <Link className='buttonBack'to='/cart'>Ir al carrito</Link> : <ItemCount stock={stock} initial={quantityAdded} onAdd={onAdd}/>}
                </div>
                    <p>{description}</p>
            </div>
            <Link to='/' className='buttonBackDatail'>Volver</Link>
        </div>
    );
}


export default ItemDetail