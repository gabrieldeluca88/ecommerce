import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/firebase/firestore";
import { useAsync } from '../../hooks/useAsync';
import { fetcher } from '../../utils/fetcher';

const ItemDetailContainer = () => {
    /* const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true) */
    const {productId} = useParams()

    const { isLoading, data, error } = useAsync(fetcher(getProductById, productId), [productId]);

    /* useEffect(() =>{
         getProduct(productId).then(response => {
            setProduct(response);
        }).catch(error => {
            console.log(error)
        }).finally(() => {
        setLoading(false)
    }) 
        getDoc(doc(db, 'products', productId)).then(response =>{
            const values = response.data()

            const product = {id: response.id, ...values}
            setProduct(product) 
        }).catch(error => { 
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    },[productId]) */



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