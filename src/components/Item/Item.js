import './Item.css'
const Item = ({product}) => {
    return (
        <div key={product.id} className = 'containerCard_Item'>
            <img  className="productImg" src={product.img} alt={product.name}></img>
            <p className="productName">{product.name}</p>
            <p className="productPrice">$ {product.price}</p>
            <button>Detalle del producto</button>
        </div>
        
    )
}


export default Item