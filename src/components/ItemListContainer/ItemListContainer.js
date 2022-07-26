import ItemCount from "../ItemCount/ItemCount"

const ItemListContainer = ({greeting, setShow, show}) => {
    const onAdd = (count) => {
        alert (`se agrego ${count} al carrito`);
    }; 
    return(
        <>
        <h1>{greeting}</h1>
        <button onClick={() => setShow(!show)} >show/hide</button>
        {show ? <ItemCount stock={10} initial={1} onAdd={onAdd}/> : null}
        </>
    );
}


export default ItemListContainer