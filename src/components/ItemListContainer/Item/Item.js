import './Item.css'
const Item = ({product}) => {
    return (
        <div className = 'containerCard_Item' key={product.id}>
            <img  className="productImg" src={product.img} alt={product.name}></img>
            <p className="productName">{product.name}</p>
            <p className="productPrice">$ {product.price}</p>
            <p className="productDescription">{product.description}</p>
            <p className="productCategoty">{product.category}</p>
            <p className="productStock">Stock {product.stock}</p>
            <button>Detalle del producto</button>
        </div>
        
    )
}


export default Item