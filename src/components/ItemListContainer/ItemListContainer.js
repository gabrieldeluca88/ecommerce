import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom"
import { getProducts } from '../../services/firebase/firestore'
import { fetcher } from '../../utils/fetcher'
import { useAsync } from '../../hooks/useAsync'

const ItemListContainer = (props) => {
    
    const {categoryId} = useParams()

    const { isLoading, data, error } = useAsync(fetcher(getProducts, categoryId), [categoryId])

    if(isLoading) {
        return <div className="loader"></div>
    }

    if(error) {
        return <h1>Hubo un error</h1>
    }


    return(
        <>
        <h1>{props.greeting}</h1>
        <ItemList products={data}/>
        </>
    );
}


export default ItemListContainer