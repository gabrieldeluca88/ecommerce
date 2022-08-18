import {useState, useEffect} from "react"
/* import {getProducts, getProductByCategory} from "../../asyncMock" */
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom"
import { getDocs, collection, query, where } from "firebase/firestore"
import { db } from "../../services/firebase"

const ItemListContainer = (props) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const {categoryId} = useParams()

    useEffect(() =>{
        /* const asyncFunction = categoryId ? getProductByCategory : getProducts

        asyncFunction(categoryId).then(response =>{
                setProducts(response)
            }).catch (error => {
                console.log(error)
            }).finally(() => {
                setLoading(false)
            }) */
            const collectionRef= !categoryId 
            ? collection(db, 'products')
            : query(collection(db, 'products'), where('category', '==', categoryId))

            getDocs(collectionRef).then(response=>{
                const products = response.docs.map(doc => {
                    const values = doc.data()
                    return { id: doc.id, ...values}
                })
                setProducts(products)
            }).catch(error =>{
                console.log(error);
            }).finally(() => {
                setLoading(false)
            })
    }, [categoryId]) 



    if(loading) {
        return <div className="loader"></div>
    }


    return(
        <>
        <h1>{props.greeting}</h1>
        <ItemList products={products}/>
        </>
    );
}


export default ItemListContainer