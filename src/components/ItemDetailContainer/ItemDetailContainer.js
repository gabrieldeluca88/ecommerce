import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/firebase/firestore";
import { useAsync } from '../../hooks/useAsync';
import { fetcher } from '../../utils/fetcher';

const ItemDetailContainer = () => {
    
    const {productId} = useParams()

    const { isLoading, data, error } = useAsync(fetcher(getProductById, productId), [productId]);


    if(isLoading) {
        return <div className="loader"></div>
    }

    if(error) {
        return <h1>Hubo un error</h1>
    }
    
    return(
        <div className="itemdetail">
            <ItemDetail {...data}/>
        </div>
    );
}


export default ItemDetailContainer