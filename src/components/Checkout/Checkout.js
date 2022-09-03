import React from "react";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { collection, addDoc, Timestamp, writeBatch, where, query, getDocs, documentId, } from "firebase/firestore";
import { db } from "../../services/firebase";
import './Checkout.css'




const Checkout = () => {
const [status, setStatus] = useState(0);
const [orderNumber, setorderNumber] = useState("");
const [outStock, setOutStock] = useState([]);
const { cart, getTotal, clearCart} = useContext(CartContext);
const [name, setName] = useState("");
const [dni, setDni] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState(0);

const { removeItem } = useContext(CartContext);

const Remove = (id) => {
    removeItem(id);
};

if (status === 1) {
    return (
    <div>
        <p>Compraste con exito!</p>
        <div className="OrderNumber">
            <p>Se ha realizado la orden exitosamente</p>
            <p>Tu número de orden es : {orderNumber}</p>
            <Link to='/' className='logo'>Ir a inicio</Link>
        </div>
    </div>
    );
}


if (status === 2) {
    return (
    <div>
        <p>Opps! Ocurrio un error</p>
        <div>
            <p>Los siguientes productos ya no estan disponibles</p>
            {outStock.map((item) => {
            return (
            <div key={item.id}>
                <Link  to={`/detail/${item.id}`}> <img src={item.img} alt={item.name}/></Link>
                <Link to={`/detail/${item.id}`}> {item.name}</Link>
                <Link to={`/detail/${item.id}`}> <p>$ {item.price}</p></Link>
                <Link to={"/cart"}  onClick={() => Remove(item.id)}>Quitar</Link>
            </div>
            );
            })}
        </div>
    </div>
    );
}

const createOrder = async (e) => {
    try {
    e.preventDefault();

    if (!validate()) return;
    
    if (cart.length === 0) return;
    
    const order = {
        buyer: {
        name: name,
        dni: dni,
        email: email,
        phone: phone,
        
        },
        items: cart,
        date: Timestamp.fromDate(new Date()),
        total:getTotal(),
    };

    const ids = cart.map((e) => e.id);
    const productRef = collection(db, "products");
    const prodOnFirestore = await getDocs(
        query(productRef, where(documentId(), "in", ids))
    );

    const { docs } = prodOnFirestore;
    const outOfStock = [];
    const batch = writeBatch(db);

    docs.forEach((doc) => {
        const dataDoc = doc.data();
        const dbStock = dataDoc.stock;
        const itemToAdd = cart.find((prod) => prod.id === doc.id);
        const localQuantity = itemToAdd?.quantity;
        
        if (dbStock >= localQuantity) {
        batch.update(doc.ref, { stock: dbStock - localQuantity });
        } else {
        outOfStock.push({ id: doc.id, ...dataDoc });
        }
    });
    if (outOfStock.length === 0) {
        const orderRef = collection(db, "orders");
        const orderAdded = await addDoc(orderRef, order);
        batch.commit();

        clearCart();
        setStatus(1);
        setorderNumber(orderAdded.id);
    } else {
        setOutStock(outOfStock);
        setStatus(2);
    }
    } catch (error) {
    console.log(error);
    }
};
const validate = () => {
    if (name.length <= 0) {
        alert("Completar nombre");
        return false;
    }
    if (dni.length <= 0) {
        alert("Completar DNI");
        return false;
        }
    if (email.length <= 0 || !String(email).includes("@")) {
        alert("Inserte un correo electrónico valido");
        return false;
    }
    if (phone.length <= 0 || isNaN(parseInt(phone))) {
        alert("Completar con numero de telefono");
        return false;
        }
    return true;
};

return (
    <form>
        
            <div className='FormContainer'>
                <h2>Ultimo paso</h2>

                <label>Nombre: 
                    <input type='text' onChange={(e) => setName(e.target.value)} required placeholder='Introduzca su nombre'/>
                </label>
                <label>DNI: 
                    <input type='number' onChange={(e) => setDni(e.target.value)} required placeholder='Introduzca su DNI'/>
                </label>
                <label>Email: 
                    <input type='email' onChange={(e) => setEmail(e.target.value)} required placeholder='Introduzca su email'/>
                </label>
                <label>telefono: 
                    <input type='phone' onChange={(e) => setPhone(e.target.value)} required placeholder='Introduzca su telefono'/>
                </label>
                <button className="Button" type="submit" onClick={createOrder}>Comprar</button>
                <Link className='Button'to='/cart'>Ir al carrito</Link>
            </div>
            
            

            <div className="detalle">
                <h1>Detalle de compra</h1>
                {cart.map((item) => {
                return (
                <div key={item.id}>
                    <Link  to={`/detail/${item.id}`}> <img src={item.img} alt={item.name}/></Link>
                    <Link to={`/detail/${item.id}`}> {item.name}</Link>
                    <Link to={`/detail/${item.id}`}> <p>precio $ {item.price}</p></Link>
                </div>);
                })}<h3>Total: ${getTotal()}</h3>
            </div>
    </form>
);
};

export default Checkout;