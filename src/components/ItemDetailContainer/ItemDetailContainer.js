import { useState, useEffect } from "react";
import { getProduct } from "../../asyncMock";
import ItemDetail from '../ItemDetail/ItemDetail';


const ItemDetailContainer = (props) => {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        getProduct().then(response => {
            setProduct(response);
        }).catch(error => {
            console.log(error)
        }).finally(() => {
        setLoading(false)
    })
    },[])



    if(loading) {
        return <div className="cargando"></div>
    }

    
    return(
        <div className="itemdetail">
            <ItemDetail product={product}/>
        </div>
    );
}


export default ItemDetailContainer