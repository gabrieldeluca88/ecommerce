import './Item.css'
import { Link } from 'react-router-dom';

const Item = ({product}) => {
    return (
        <div key={product.id} className = 'containerCard_Item'>
            <img  className="productImg" src={product.img} alt={product.name}></img>
            <p className="productName">{product.name}</p>
            <p className="productPrice">$ {product.price}</p>
            <Link className='productDetail'to={`/detail/${product.id}`} >Detalle del producto</Link>
        </div>
        
    )
}


export default Item