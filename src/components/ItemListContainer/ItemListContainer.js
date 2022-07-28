import ItemCount from "../ItemCount/ItemCount"
import {useState, useEffect} from "react"
import {getProducts} from "../../asyncMock"
import ItemList from "./ItemList/ItemList"


const ItemListContainer = ({greeting, setShow, show}) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        getProducts().then(response => {
            setProducts(response);
        }).catch(error => {
            console.log(error)
        }).finally(() => {
        setLoading(false)
    })
    },[])

    /* const productosTransformados = products.map(product => (
        <li key={product.id}>{product.name}</li>
    )) */

    if(loading) {
        return <h1>Cargando productos...</h1>
    }

    const onAdd = (count) => {
        alert (`se agrego ${count} al carrito`);
    }; 
    return(
        <>
        <h1>{greeting}</h1>
        <button onClick={() => setShow(!show)} >show/hide</button>
        {show ? <ItemCount stock={10} initial={1} onAdd={onAdd}/> : null}
        <ItemList products={products}/>
        </>
    );
}


export default ItemListContainer