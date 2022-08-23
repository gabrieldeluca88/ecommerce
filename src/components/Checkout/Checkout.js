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
const { cart, total, clearCart } = useContext(CartContext);
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
            <p>Tu número de orden es {orderNumber}</p>
            <Link className='GoCart'to='/cart'>Seguir mirando</Link>
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
                <Link  to={`/detail/${item.id}`}>
                    <img src={item.img} alt={item.name}/>
                </Link>
                <Link to={`/detail/${item.id}`}>
                {item.name}
                </Link>
                <p>{item.quantity}</p>
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
        total:`${total}`,
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
    alert("El nombre no debe quedar en blanco");
    return false;
    }
    if (phone.length <= 0 || isNaN(parseInt(phone))) {
    alert("El número de teléfono no puede contener caracteres");
    return false;
    }
    if (email.length <= 0 || !String(email).includes("@")) {
    alert("Inserte un correo electrónico valido");
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
                    <input type='number' onChange={(e) => setPhone(e.target.value)} required placeholder='Introduzca su telefono'/>
                </label>
            </div>
            
            <button className="Button" type="submit" onClick={createOrder}>Comprar</button>
    </form>
);
};

export default Checkout;