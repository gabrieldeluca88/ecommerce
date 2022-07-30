import './ItemDetail.css';
import ItemCount from '../ItemCount/ItemCount';



const onAdd = (count) => {
    alert (`se agrego ${count} al carrito`);
}; 

const ItemDetail = ({product}) => {
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
            <ItemCount stock={product.stock} initial={1} onAdd={onAdd}/>
            </div>
                <p>{product.description}</p>
            </div>
        </div>
        
    )
}


export default ItemDetail