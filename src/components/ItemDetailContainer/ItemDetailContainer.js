import { useState, useEffect } from "react";
/* import { getProduct } from "../../asyncMock"; */
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from "react-router-dom";
import { db } from "../../services/firebase";
import { getDoc, doc } from "firebase/firestore";

const ItemDetailContainer = (props) => {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    const {productId} = useParams()

    useEffect(() =>{
      /*   getProduct(productId).then(response => {
            setProduct(response);
        }).catch(error => {
            console.log(error)
        }).finally(() => {
        setLoading(false)
    }) */
        getDoc(doc(db, 'products', productId)).then(response =>{
            const values = response.data()

            const product = {id: response.id, ...values}
            setProduct(product) 
        }).catch(error => { 
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    },[productId])



    if(loading) {
        return <div className="loader"></div>
    }

    
    return(
        <div className="itemdetail">
            <ItemDetail {...product}/>
        </div>
    );
}


export default ItemDetailContainer